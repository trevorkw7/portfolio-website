// The annotated edit and complete recordings share the same trial clock.
(() => {
  const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
  function interpolate(value, start, end, nextStart, nextEnd) {
    if (end <= start) return nextStart;
    return nextStart + clamp((value - start) / (end - start), 0, 1) * (nextEnd - nextStart);
  }
  function originalTime(edition, time, config) {
    if (edition.rate) {
      const elapsed = time * edition.rate;
      return elapsed >= config.finish - .00001 ? config.finish : Math.max(0, elapsed);
    }
    const part = config.timeline.find(segment => time < segment.videoEnd);
    return part ? interpolate(time, part.videoStart, part.videoEnd, part.sourceStart, part.sourceEnd) : config.finish;
  }
  function playerTime(edition, time, config) {
    if (time <= 0) return 0;
    if (edition.rate) return Math.min(time, config.finish) / edition.rate;
    // The edit has a 30 fps presentation grid. End selects the first full result card.
    if (time >= config.finish) return (Math.ceil((config.timeline.at(-1).videoEnd - 1e-8) * 30) + .25) / 30;
    const part = config.timeline.find(segment => time <= segment.sourceEnd);
    return part ? interpolate(time, part.sourceStart, part.sourceEnd, part.videoStart, part.videoEnd) : config.timeline.at(-1).videoEnd;
  }
  // Starting another native seek while a decoder is still seeking can strand it on a poster.
  // Wait for that frame, then deliver only the most recent requested destination.
  function presentAt(video, time, resume, isCurrent) {
    const apply = () => {
      if (!isCurrent()) return;
      if (video.readyState < 1) {
        video.addEventListener('loadedmetadata', apply, {once:true});
        video.preload = 'auto';
        return;
      }
      if (video.seeking) {
        video.addEventListener('seeked', apply, {once:true});
        return;
      }
      const target = clamp(time, 0, Math.max(0, video.duration - .001));
      if (Math.abs(video.currentTime - target) > .000001) video.currentTime = target;
      if (resume) video.play().catch(() => {});
      video.dispatchEvent(new Event('trialseekapplied'));
    };
    apply();
  }
  window.so101Clock = { originalTime, playerTime, presentAt };
  const elements = [...document.querySelectorAll('[data-trial-timeline]')];
  if (!elements.length) return;
  const config = JSON.parse(document.querySelector('#activity-replay-data, #activity-clock-map').textContent);
  const stamp = seconds => {
    const n = Math.floor(Math.max(0, seconds) + .001);
    return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0');
  };
  const make = (tag, cls, txt) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (txt !== undefined) el.textContent = txt;
    return el;
  };

  // Seek the film to a trial time. The site is served with HTTP byte ranges,
  // so the browser can seek the network stream directly. (This used to
  // download the whole film and swap the player to an in-memory blob when the
  // video had not loaded yet; iOS in-app browsers cannot play blob video, so
  // a tap on the timeline before pressing play broke the player.)
  function standalonePlayer(video) {
    let revision = 0;
    return (time, resume) => {
      const request = ++revision;
      // Before metadata, ask for it now; this runs inside the tap, which iOS
      // requires before it will load media.
      if (video.readyState < 1 && video.networkState !== 2) video.load();
      presentAt(video, time, resume, () => request === revision);
    };
  }

  function mount(section, data) {
    const video = section.parentElement.querySelector('video');
    if (!video) return;
    const dynamic = video.id === 'paired-film';
    const pairControl = document.querySelector('#pair-choice');
    const paceControl = document.querySelector('#pace-choice');
    const seek = standalonePlayer(video);
    const colors = new Map(data.legend.map(item => [
      item.id, item.id === 'model' ? { ...item, label: 'Model response open' } : item
    ]));
    const head = make('div', 'activity-head');
    const clock = make('span', 'activity-clock');
    head.append(make('strong', '', 'Trial timeline'), clock);
    const body = make('div', 'activity-body');
    const rowLabels = make('div', 'activity-row-labels');
    for (const name of ['Without Python', 'With Python']) rowLabels.append(make('span', '', name));
    const plot = make('div', 'activity-plot');
    const tracks = [make('div','activity-track'), make('div','activity-track')];
    const input = make('input','activity-range');
    input.type = 'range'; input.min = '0'; input.step = 'any';
    input.setAttribute('aria-label','Seek both sessions by trial time');
    const hint = make('div','activity-preview');
    hint.hidden = true;
    plot.append(...tracks, make('span','activity-playhead'), input, hint);
    body.append(rowLabels, plot);
    const legend = make('div', 'activity-legend');
    const status = make('p', 'activity-readout');
    section.replaceChildren(head, body, legend, status);
    let key, group, seconds, activePointer = null, wasPlaying = false, awaitingSeek = false;
    const edition = () => dynamic ? config[key].editions[paceControl.value] : {};
    const stateName = (side, time) => {
      const actor = group.conditions[side];
      if (time >= actor.finish_s) return colors.get('finished').label;
      const part = actor.intervals.find(p => time >= p.start_s && time < p.end_s);
      return colors.get(part?.state)?.label || 'Other / unobserved';
    };
    const labelsAt = time => ['left','right'].map(side => stateName(side,time));
    const paint = time => {
      seconds = clamp(time, 0, group.duration_s);
      input.value = seconds;
      plot.style.setProperty('--playhead', (100 * seconds / group.duration_s) + '%');
      const labels = labelsAt(seconds), elapsed = stamp(seconds);
      const start = config[key].timeline[0].videoStart;
      const briefing = seconds === 0 && !edition().rate && video.currentTime < start &&
        activePointer === null && !awaitingSeek;
      clock.textContent = briefing ? 'Trial clock starts at ' + stamp(start) : elapsed + ' / ' + stamp(group.duration_s);
      status.textContent = briefing ? 'The opening photos introduce the pilot and the target.' :
        'Without Python: ' + labels[0] + '\n' + 'With Python: ' + labels[1];
      input.setAttribute('aria-valuetext', briefing ? 'Opening photographs. Trial clock has not started.' :
        elapsed+' of '+stamp(group.duration_s)+'. Without Python, '+labels[0]+'. With Python, '+labels[1]+'.');
    };
    const draw = () => {
      key = dynamic ? pairControl.value : section.dataset.trialTimeline;
      group = data.pairs[key];
      input.max = group.duration_s;
      awaitingSeek = false;
      activePointer = null;
      const present = new Set();
      ['left','right'].forEach((side,i) => {
        const actor = group.conditions[side];
        const fragments = actor.intervals.map(part => {
          const segment = make('i', part.state === 'finished' ? 'activity-finished' : '');
          segment.style.left = (100 * part.start_s / group.duration_s) + '%';
          segment.style.width = (100 * (part.end_s - part.start_s) / group.duration_s) + '%';
          segment.style.backgroundColor = colors.get(part.state).color;
          present.add(part.state);
          return segment;
        });
        for (const time of actor.markers) {
          const tick = make('span', 'activity-program-tick');
          tick.style.left = (100 * time / group.duration_s) + '%';
          fragments.push(tick);
        }
        tracks[i].replaceChildren(...fragments);
        tracks[i].setAttribute('aria-hidden','true');
      });
      const items = data.legend.filter(item => present.has(item.id)).map(item => {
        const entry = make('span'), swatch = make('i');
        swatch.style.backgroundColor = item.color;
        entry.append(swatch, document.createTextNode(colors.get(item.id).label));
        return entry;
      });
      if (group.conditions.right.markers.length) {
        const markers = make('span');
        markers.append(make('i', 'activity-result-key'), document.createTextNode('Python result'));
        items.push(markers);
      }
      legend.replaceChildren(...items);
      section.hidden = false;
      paint(originalTime(edition(),video.currentTime || 0,config[key]));
    };
    const commit = (target, resume = !video.paused && !video.ended) => {
      const t = clamp(target, 0, group.duration_s);
      awaitingSeek = true;
      paint(t);
      if (dynamic) video.dispatchEvent(new CustomEvent('trialseek',{detail:{seconds:t,resume}}));
      else seek(playerTime(edition(),t,config[key]),resume);
    };
    const pointerTime = event => {
      const box = plot.getBoundingClientRect();
      return clamp((event.clientX - box.left) / box.width, 0, 1) * group.duration_s;
    };
    input.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      event.preventDefault();
      input.focus({preventScroll:true});
      input.setPointerCapture(event.pointerId);
      activePointer = event.pointerId;
      wasPlaying = !video.paused && !video.ended;
      video.pause();
      hint.hidden = true;
      paint(pointerTime(event));
    });
    input.addEventListener('pointermove', event => {
      if (event.pointerId === activePointer) { paint(pointerTime(event)); return; }
      if (event.pointerType === 'touch' || activePointer !== null) return;
      const t = pointerTime(event);
      hint.hidden = false;
      hint.textContent = stamp(t) + '\u2003' + labelsAt(t).join(' / ');
      hint.style.left = clamp(100 * t / group.duration_s, 22, 78) + '%';
    });
    input.addEventListener('pointerup', event => {
      if (event.pointerId !== activePointer) return;
      const t = pointerTime(event);
      activePointer = null;
      hint.hidden = true;
      commit(t,wasPlaying);
    });
    input.addEventListener('pointercancel', event => {
      if (event.pointerId !== activePointer) return;
      activePointer = null; hint.hidden = true;
      if (wasPlaying) video.play().catch(() => {});
      paint(originalTime(edition(), video.currentTime || 0, config[key]));
    });
    input.addEventListener('pointerleave', () => { hint.hidden = true; });
    // Native input events include a screen reader changing the slider through its accessibility API.
    input.addEventListener('input', () => { if (activePointer === null) commit(Number(input.value)); });
    input.addEventListener('keydown', event => {
      const by = event.shiftKey ? 15 : 1;
      const action = {ArrowRight:seconds+by,ArrowLeft:seconds-by,ArrowUp:seconds+by,ArrowDown:seconds-by,Home:0,End:group.duration_s,PageUp:seconds+30,PageDown:seconds-30};
      if (!Object.hasOwn(action,event.key)) return;
      event.preventDefault(); commit(action[event.key]);
    });
    const tick = () => {
      if (activePointer === null && !awaitingSeek) paint(originalTime(edition(),video.currentTime || 0,config[key]));
    };
    video.addEventListener('trialseekapplied', () => { awaitingSeek = false; tick(); });
    for (const type of ['timeupdate','loadedmetadata','ended','seeked']) video.addEventListener(type,tick);
    let frame = 0;
    const followPlayback = () => {
      frame = 0;
      if (video.paused || video.ended) return;
      tick();
      frame = requestAnimationFrame(followPlayback);
    };
    video.addEventListener('playing', () => { if (!frame) frame = requestAnimationFrame(followPlayback); });
    video.addEventListener('pause', () => { cancelAnimationFrame(frame); frame = 0; });
    if (dynamic) video.addEventListener('editionchange',draw);
    draw();
  }
  const FALLBACK_DATA = {"legend":[{"id":"model","label":"Model turn open","color":"#E7C878"},{"id":"python","label":"Python execution","color":"#78B4ED"},{"id":"arm","label":"Arm command","color":"#62C4A5"},{"id":"camera","label":"Camera observation","color":"#C3A9D5"},{"id":"other","label":"Other / unobserved","color":"#849295"},{"id":"finished","label":"Finished","color":"#68767A"}],"pairs":{"precision":{"duration_s":448.73220443725586,"conditions":{"left":{"finish_s":448.73220443725586,"intervals":[{"start_s":0.0,"end_s":0.490493,"state":"other"},{"start_s":0.490493,"end_s":0.989722,"state":"model"},{"start_s":0.989722,"end_s":1.534722,"state":"camera"},{"start_s":1.534722,"end_s":2.113348,"state":"other"},{"start_s":2.113348,"end_s":285.623068,"state":"model"},{"start_s":285.623068,"end_s":290.249068,"state":"arm"},{"start_s":290.249068,"end_s":290.270389,"state":"other"},{"start_s":290.270389,"end_s":290.292389,"state":"other"},{"start_s":290.292389,"end_s":290.309456,"state":"other"},{"start_s":290.309456,"end_s":290.331456,"state":"other"},{"start_s":290.331456,"end_s":290.345482,"state":"other"},{"start_s":290.345482,"end_s":290.378482,"state":"other"},{"start_s":290.378482,"end_s":290.39111,"state":"other"},{"start_s":290.39111,"end_s":290.93411,"state":"camera"},{"start_s":290.93411,"end_s":291.672942,"state":"other"},{"start_s":291.672942,"end_s":294.151999,"state":"model"},{"start_s":294.151999,"end_s":298.879999,"state":"arm"},{"start_s":298.879999,"end_s":298.89443,"state":"other"},{"start_s":298.89443,"end_s":303.52343,"state":"arm"},{"start_s":303.52343,"end_s":303.540779,"state":"other"},{"start_s":303.540779,"end_s":308.166779,"state":"arm"},{"start_s":308.166779,"end_s":308.186807,"state":"other"},{"start_s":308.186807,"end_s":308.727807,"state":"camera"},{"start_s":308.727807,"end_s":309.464825,"state":"other"},{"start_s":309.464825,"end_s":373.72513,"state":"model"},{"start_s":373.72513,"end_s":375.27813,"state":"arm"},{"start_s":375.27813,"end_s":375.291269,"state":"other"},{"start_s":375.291269,"end_s":378.937269,"state":"arm"},{"start_s":378.937269,"end_s":378.955187,"state":"other"},{"start_s":378.955187,"end_s":383.367187,"state":"arm"},{"start_s":383.367187,"end_s":383.379934,"state":"other"},{"start_s":383.379934,"end_s":383.927934,"state":"camera"},{"start_s":383.927934,"end_s":384.735618,"state":"other"},{"start_s":384.735618,"end_s":412.230403,"state":"model"},{"start_s":412.230403,"end_s":416.405403,"state":"arm"},{"start_s":416.405403,"end_s":416.42456,"state":"other"},{"start_s":416.42456,"end_s":417.78556,"state":"arm"},{"start_s":417.78556,"end_s":417.798827,"state":"other"},{"start_s":417.798827,"end_s":419.154827,"state":"arm"},{"start_s":419.154827,"end_s":419.175082,"state":"other"},{"start_s":419.175082,"end_s":421.566082,"state":"arm"},{"start_s":421.566082,"end_s":421.581144,"state":"other"},{"start_s":421.581144,"end_s":424.056144,"state":"arm"},{"start_s":424.056144,"end_s":424.073946,"state":"other"},{"start_s":424.073946,"end_s":424.619946,"state":"camera"},{"start_s":424.619946,"end_s":425.201114,"state":"other"},{"start_s":425.201114,"end_s":433.707976,"state":"model"},{"start_s":433.707976,"end_s":435.751976,"state":"arm"},{"start_s":435.751976,"end_s":435.768359,"state":"other"},{"start_s":435.768359,"end_s":440.137359,"state":"arm"},{"start_s":440.137359,"end_s":440.152054,"state":"other"},{"start_s":440.152054,"end_s":444.572054,"state":"arm"},{"start_s":444.572054,"end_s":444.586151,"state":"other"},{"start_s":444.586151,"end_s":445.125151,"state":"camera"},{"start_s":445.125151,"end_s":445.868165,"state":"other"},{"start_s":445.868165,"end_s":448.730724,"state":"model"},{"start_s":448.730724,"end_s":448.73220443725586,"state":"other"}],"markers":[]},"right":{"finish_s":289.07511591911316,"intervals":[{"start_s":0.0,"end_s":0.471631,"state":"other"},{"start_s":0.471631,"end_s":1.053862,"state":"model"},{"start_s":1.053862,"end_s":1.587862,"state":"camera"},{"start_s":1.587862,"end_s":2.161967,"state":"other"},{"start_s":2.161967,"end_s":6.879121,"state":"model"},{"start_s":6.879121,"end_s":6.880499,"state":"python"},{"start_s":6.880499,"end_s":6.882959,"state":"model"},{"start_s":6.882959,"end_s":7.403831,"state":"other"},{"start_s":7.403831,"end_s":8.759552,"state":"model"},{"start_s":8.759552,"end_s":8.761104,"state":"python"},{"start_s":8.761104,"end_s":8.761966,"state":"model"},{"start_s":8.761966,"end_s":9.31839,"state":"other"},{"start_s":9.31839,"end_s":17.4092,"state":"model"},{"start_s":17.4092,"end_s":17.421379,"state":"python"},{"start_s":17.421379,"end_s":17.860081,"state":"other"},{"start_s":17.860081,"end_s":51.427868,"state":"model"},{"start_s":51.427868,"end_s":51.490376,"state":"python"},{"start_s":51.490376,"end_s":52.013039,"state":"other"},{"start_s":52.013039,"end_s":55.53283,"state":"model"},{"start_s":55.53283,"end_s":55.535356,"state":"python"},{"start_s":55.535356,"end_s":55.539646,"state":"model"},{"start_s":55.539646,"end_s":56.029855,"state":"other"},{"start_s":56.029855,"end_s":96.838214,"state":"model"},{"start_s":96.838214,"end_s":96.844437,"state":"python"},{"start_s":96.844437,"end_s":97.457004,"state":"other"},{"start_s":97.457004,"end_s":106.628942,"state":"model"},{"start_s":106.628942,"end_s":110.877534,"state":"python"},{"start_s":110.877534,"end_s":111.694318,"state":"other"},{"start_s":111.694318,"end_s":133.450935,"state":"model"},{"start_s":133.450935,"end_s":133.565681,"state":"python"},{"start_s":133.565681,"end_s":134.23476,"state":"other"},{"start_s":134.23476,"end_s":139.390477,"state":"model"},{"start_s":139.390477,"end_s":143.970477,"state":"arm"},{"start_s":143.970477,"end_s":143.984537,"state":"other"},{"start_s":143.984537,"end_s":148.556537,"state":"arm"},{"start_s":148.556537,"end_s":148.57385,"state":"other"},{"start_s":148.57385,"end_s":153.20685,"state":"arm"},{"start_s":153.20685,"end_s":153.223591,"state":"other"},{"start_s":153.223591,"end_s":157.848591,"state":"arm"},{"start_s":157.848591,"end_s":157.863322,"state":"other"},{"start_s":157.863322,"end_s":158.409322,"state":"camera"},{"start_s":158.409322,"end_s":158.986449,"state":"other"},{"start_s":158.986449,"end_s":171.698105,"state":"model"},{"start_s":171.698105,"end_s":171.727432,"state":"python"},{"start_s":171.727432,"end_s":172.369624,"state":"other"},{"start_s":172.369624,"end_s":176.660495,"state":"model"},{"start_s":176.660495,"end_s":176.662605,"state":"python"},{"start_s":176.662605,"end_s":176.671618,"state":"model"},{"start_s":176.671618,"end_s":177.183025,"state":"other"},{"start_s":177.183025,"end_s":197.534989,"state":"model"},{"start_s":197.534989,"end_s":197.630185,"state":"python"},{"start_s":197.630185,"end_s":198.116921,"state":"other"},{"start_s":198.116921,"end_s":201.825257,"state":"model"},{"start_s":201.825257,"end_s":203.481257,"state":"arm"},{"start_s":203.481257,"end_s":203.49431,"state":"other"},{"start_s":203.49431,"end_s":206.54131,"state":"arm"},{"start_s":206.54131,"end_s":206.560199,"state":"other"},{"start_s":206.560199,"end_s":207.102199,"state":"camera"},{"start_s":207.102199,"end_s":207.716043,"state":"other"},{"start_s":207.716043,"end_s":217.586206,"state":"model"},{"start_s":217.586206,"end_s":217.607078,"state":"python"},{"start_s":217.607078,"end_s":218.38714,"state":"other"},{"start_s":218.38714,"end_s":221.573797,"state":"model"},{"start_s":221.573797,"end_s":221.576391,"state":"python"},{"start_s":221.576391,"end_s":221.585774,"state":"model"},{"start_s":221.585774,"end_s":222.295793,"state":"other"},{"start_s":222.295793,"end_s":233.631231,"state":"model"},{"start_s":233.631231,"end_s":233.729568,"state":"python"},{"start_s":233.729568,"end_s":234.429174,"state":"other"},{"start_s":234.429174,"end_s":235.377105,"state":"model"},{"start_s":235.377105,"end_s":240.047105,"state":"arm"},{"start_s":240.047105,"end_s":240.063065,"state":"other"},{"start_s":240.063065,"end_s":244.441065,"state":"arm"},{"start_s":244.441065,"end_s":244.456402,"state":"other"},{"start_s":244.456402,"end_s":248.874402,"state":"arm"},{"start_s":248.874402,"end_s":248.886085,"state":"other"},{"start_s":248.886085,"end_s":253.254085,"state":"arm"},{"start_s":253.254085,"end_s":253.269493,"state":"other"},{"start_s":253.269493,"end_s":257.686493,"state":"arm"},{"start_s":257.686493,"end_s":257.697888,"state":"other"},{"start_s":257.697888,"end_s":258.239888,"state":"camera"},{"start_s":258.239888,"end_s":258.886436,"state":"other"},{"start_s":258.886436,"end_s":263.068804,"state":"model"},{"start_s":263.068804,"end_s":267.745804,"state":"arm"},{"start_s":267.745804,"end_s":267.768188,"state":"other"},{"start_s":267.768188,"end_s":270.112188,"state":"arm"},{"start_s":270.112188,"end_s":270.125077,"state":"other"},{"start_s":270.125077,"end_s":274.803077,"state":"arm"},{"start_s":274.803077,"end_s":274.819693,"state":"other"},{"start_s":274.819693,"end_s":274.841693,"state":"other"},{"start_s":274.841693,"end_s":274.857911,"state":"other"},{"start_s":274.857911,"end_s":275.397911,"state":"camera"},{"start_s":275.397911,"end_s":276.207262,"state":"other"},{"start_s":276.207262,"end_s":280.173934,"state":"model"},{"start_s":280.173934,"end_s":284.601934,"state":"arm"},{"start_s":284.601934,"end_s":286.016089,"state":"model"},{"start_s":286.016089,"end_s":286.029724,"state":"python"},{"start_s":286.029724,"end_s":286.697614,"state":"other"},{"start_s":286.697614,"end_s":289.074205,"state":"model"},{"start_s":289.074205,"end_s":289.07511591911316,"state":"other"},{"start_s":289.07511591911316,"end_s":448.73220443725586,"state":"finished"}],"markers":[6.880499,8.761104,17.421379,51.490376,55.535356,96.844437,110.877534,133.565681,171.727432,176.662605,197.630185,217.607078,221.576391,233.729568,286.029724]}}}}};
  fetch('data/agent-activity-timeline.json').then(response => {
    if (!response.ok) throw new Error('Activity records unavailable');
    return response.json();
  }).catch(() => FALLBACK_DATA).then(data => elements.forEach(section => mount(section,data)));
})();
