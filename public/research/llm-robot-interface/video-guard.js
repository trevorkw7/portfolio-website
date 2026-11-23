// Keeps the write-up's videos watchable everywhere.
//
// On some phones a video inside the page can sit in "playing" with no data
// at all (black frame, 00:00 / 00:00) even though the same file opens fine
// on its own. If a video hasn't produced a frame a few seconds after play is
// pressed, restart its loading once; if that still fails, offer a link that
// opens the file directly, which plays in the browser's own player.
//
// Add ?vdebug=1 to the URL to show a live log of what each video reports.
(() => {
  const STALL_MS = 6000;
  const videos = [...document.querySelectorAll('video')];
  if (!videos.length) return;
  const debug = /[?&]vdebug\b/.test(location.search);

  let panel = null;
  const t0 = performance.now();
  const log = (v, msg) => {
    if (!debug) return;
    if (!panel) {
      panel = document.createElement('pre');
      panel.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:2147483646;max-height:40vh;overflow:auto;margin:0;padding:8px;border-radius:6px;background:rgba(0,0,0,.85);color:#9f9;font:11px/1.35 ui-monospace,Menlo,monospace;white-space:pre-wrap';
      document.body.appendChild(panel);
    }
    const name = (v.currentSrc || v.querySelector('source')?.src || '?').split('/').pop();
    const err = v.error ? ` err=${v.error.code}${v.error.message ? ' ' + v.error.message : ''}` : '';
    panel.textContent += `${((performance.now() - t0) / 1000).toFixed(1)}s ${name} ${msg} rs=${v.readyState} ns=${v.networkState} t=${v.currentTime.toFixed(1)} d=${(v.duration || 0).toFixed(1)}${err}\n`;
    panel.scrollTop = panel.scrollHeight;
  };

  videos.forEach((v) => {
    const src = () => v.currentSrc || v.querySelector('source')?.src || v.src;
    let timer = 0;
    let retried = false;
    let fallback = null;

    const hideFallback = () => { if (fallback) fallback.hidden = true; };
    const showFallback = () => {
      log(v, 'showing fallback link');
      if (!fallback) {
        fallback = document.createElement('p');
        fallback.className = 'video-fallback';
        fallback.style.cssText = 'margin:8px 0 0;font:14px/1.4 var(--sans,system-ui,sans-serif);color:var(--muted,#555)';
        const a = document.createElement('a');
        a.href = src();
        a.textContent = 'Open the video directly';
        fallback.append('Video not loading? ', a);
        v.insertAdjacentElement('afterend', fallback);
      }
      fallback.hidden = false;
    };

    const check = () => {
      timer = 0;
      if (v.readyState >= 2 || v.paused) return;
      if (!retried) {
        retried = true;
        log(v, 'no data after play: reloading once');
        const resumeAt = v.currentTime;
        v.addEventListener('loadedmetadata', () => {
          if (resumeAt > 0) { try { v.currentTime = resumeAt; } catch (e) {} }
        }, { once: true });
        v.load();
        v.play().catch(() => {});
        timer = setTimeout(check, STALL_MS);
      } else {
        showFallback();
      }
    };
    const arm = () => {
      if (v.readyState >= 2) return;
      clearTimeout(timer);
      timer = setTimeout(check, STALL_MS);
    };

    v.addEventListener('play', arm);
    v.addEventListener('waiting', () => { if (!v.paused) arm(); });
    ['loadeddata', 'canplay', 'playing'].forEach((e) => v.addEventListener(e, () => {
      if (v.readyState >= 2) { clearTimeout(timer); timer = 0; hideFallback(); }
    }));
    v.addEventListener('error', showFallback);

    if (debug) {
      ['loadstart', 'progress', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'loadedmetadata',
        'loadeddata', 'canplay', 'canplaythrough', 'playing', 'waiting', 'seeking', 'seeked',
        'ended', 'play', 'pause'].forEach((e) => v.addEventListener(e, () => log(v, e)));
      log(v, 'ready to log');
    }
  });
})();
