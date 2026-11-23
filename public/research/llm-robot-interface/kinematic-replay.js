(() => {
  const root = document.getElementById('cot-replay');
  if (!root) return;

  const TRAJ = {"A":[{"t":290.2,"cmd":"move_joints","q":[-30.5,-59.2,46.1,35.5,-58.7],"g":35.5,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[74.3,-0.3,116.6],[12.6,-36.7,207.9],[125.2,29.7,241.7],[164.8,74.0,218.7],[240.6,126.6,176.9],[240.6,126.6,176.9]]},{"t":298.9,"cmd":"move_joints","q":[-39.7,-38.0,31.7,51.0,-27.4],"g":69.6,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[73.9,5.4,116.6],[47.9,-16.2,227.6],[150.8,69.2,245.7],[172.8,111.0,202.9],[222.1,156.8,127.2],[222.1,156.8,127.2]]},{"t":303.5,"cmd":"move_joints","q":[-48.7,-16.8,17.7,66.5,4.1],"g":69.6,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[72.6,10.8,116.6],[78.3,17.3,232.3],[167.4,118.7,233.5],[169.5,148.4,177.2],[190.8,172.1,81.1],[190.8,172.1,81.1]]},{"t":308.2,"cmd":"move_joints","q":[-57.7,4.4,3.3,82.2,34.8],"g":69.6,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.5,15.9,116.6],[97.2,58.1,221.3],[168.9,171.5,206.6],[153.8,181.5,145.5],[154.3,174.1,44.5],[154.3,174.1,44.5]]},{"t":375.3,"cmd":"move_joints","q":[-57.7,8.8,13.6,68.9,34.8],"g":69.6,"act":[0,1,1,1,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.5,15.9,116.6],[101.4,64.8,217.2],[168.8,171.3,168.9],[152.9,180.0,107.8],[152.0,170.5,6.9],[152.0,170.5,6.9]]},{"t":378.9,"cmd":"move_joints","q":[-58.1,8.6,13.6,68.3,34.8],"g":17.3,"act":[0,0,0,0,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.4,16.1,116.6],[100.8,64.9,217.4],[167.5,172.1,169.5],[151.9,181.4,108.4],[151.9,173.1,7.5],[151.9,173.1,7.5]]},{"t":383.4,"cmd":"move_joints","q":[-58.1,-5.1,-0.1,79.7,35.5],"g":17.3,"act":[0,1,1,1,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.4,16.1,116.6],[87.3,43.3,228.1],[158.2,157.1,243.7],[151.5,180.7,184.9],[166.5,196.3,85.9],[166.5,196.3,85.9]]},{"t":416.4,"cmd":"move_joints","q":[-37.6,-5.1,-0.1,79.8,55.1],"g":17.3,"act":[1,0,0,0,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[74.1,4.1,116.6],[99.4,23.5,228.1],[205.6,105.4,243.7],[207.6,129.8,184.8],[229.5,138.6,86.4],[229.5,138.6,86.4]]},{"t":417.8,"cmd":"move_joints","q":[-17.7,-5.1,-0.1,79.8,75.4],"g":17.3,"act":[1,0,0,0,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[73.4,-8.2,116.6],[103.8,1.5,228.1],[231.5,42.3,243.7],[241.7,64.6,184.8],[267.9,65.0,87.0],[267.9,65.0,87.0]]},{"t":419.2,"cmd":"move_joints","q":[2.5,-5.1,-0.1,79.8,95.5],"g":17.3,"act":[1,0,0,0,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[68.4,-19.6,116.6],[100.3,-21.0,228.1],[234.3,-26.8,243.7],[251.5,-9.5,184.8],[278.9,-18.5,87.8],[278.9,-18.5,87.8]]},{"t":421.6,"cmd":"move_joints","q":[23.4,-2.2,10.4,82.0,115.6],"g":17.3,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.5,-28.8,116.6],[93.9,-43.8,226.4],[217.0,-97.0,210.4],[224.2,-80.4,149.3],[224.3,-88.3,48.4],[224.3,-88.3,48.4]]},{"t":424.1,"cmd":"move_joints","q":[24.0,1.9,20.6,67.6,115.6],"g":17.3,"act":[0,1,1,1,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.2,-29.1,116.6],[100.5,-47.5,223.4],[215.6,-98.7,174.8],[223.1,-82.2,113.7],[223.4,-90.2,12.8],[223.4,-90.2,12.8]]},{"t":435.7,"cmd":"move_joints","q":[24.0,2.3,20.8,67.1,115.6],"g":54.5,"act":[0,0,0,0,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.2,-29.1,116.6],[101.2,-47.8,223.1],[215.8,-98.8,173.2],[223.2,-82.3,112.1],[223.3,-90.2,11.1],[223.3,-90.2,11.1]]},{"t":440.1,"cmd":"move_joints","q":[24.0,-2.9,9.9,82.6,115.6],"g":54.6,"act":[0,1,1,1,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.2,-29.1,116.6],[92.2,-43.8,226.8],[215.0,-98.4,213.7],[222.9,-82.2,152.6],[224.0,-90.5,51.7],[224.0,-90.5,51.7]]},{"t":444.6,"cmd":"move_joints","q":[24.0,-25.4,15.3,64.8,115.6],"g":54.6,"act":[0,1,1,1,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.2,-29.1,116.6],[51.2,-25.5,232.3],[172.0,-79.3,259.2],[211.8,-77.2,209.5],[264.9,-108.7,129.2],[264.9,-108.7,129.2]]}],"B":[{"t":144.0,"cmd":"move_joints","q":[-30.2,-58.4,45.0,36.6,-58.5],"g":16.6,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[74.3,-0.5,116.6],[13.5,-35.9,208.8],[126.3,29.8,243.4],[165.8,73.7,219.5],[241.4,125.6,176.5],[241.4,125.6,176.5]]},{"t":148.6,"cmd":"move_joints","q":[-39.2,-37.5,29.3,53.8,-27.3],"g":31.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[73.9,5.0,116.6],[48.5,-15.7,227.9],[151.7,68.4,250.4],[173.5,109.6,207.0],[222.3,154.2,130.2],[222.3,154.2,130.2]]},{"t":153.2,"cmd":"move_joints","q":[-48.3,-16.5,13.7,70.6,4.4],"g":46.5,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[72.7,10.5,116.6],[78.9,17.5,232.2],[168.4,118.0,242.2],[170.4,147.4,185.7],[191.5,170.4,89.3],[191.5,170.4,89.3]]},{"t":157.8,"cmd":"move_joints","q":[-57.3,4.3,-1.9,87.6,35.3],"g":61.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.6,15.7,116.6],[97.5,57.5,221.4],[170.4,171.1,219.1],[155.3,181.1,158.0],[155.7,173.5,57.0],[155.7,173.5,57.0]]},{"t":203.5,"cmd":"move_joints","q":[-57.2,9.6,14.1,67.7,35.3],"g":61.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.7,15.7,116.6],[102.7,65.4,216.4],[170.4,170.4,165.2],[154.5,179.2,104.1],[153.6,169.5,3.3],[153.6,169.5,3.3]]},{"t":206.5,"cmd":"move_joints","q":[-57.3,9.4,13.8,66.9,35.3],"g":17.4,"act":[0,0,0,0,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.6,15.7,116.6],[102.4,65.2,216.6],[170.2,170.7,166.5],[155.0,180.6,105.4],[155.3,172.9,4.4],[155.3,172.9,4.4]]},{"t":240.0,"cmd":"move_joints","q":[-57.3,3.6,-2.2,88.0,35.8],"g":17.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[70.6,15.7,116.6],[96.8,56.5,222.0],[169.7,170.1,222.1],[155.0,180.6,161.0],[156.0,173.9,59.9],[156.0,173.9,59.9]]},{"t":244.4,"cmd":"move_joints","q":[-36.9,2.4,1.1,88.1,55.5],"g":17.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[74.1,3.6,116.6],[111.1,31.4,223.0],[219.0,112.4,218.1],[206.9,126.0,157.0],[205.2,116.6,56.2],[205.2,116.6,56.2]]},{"t":248.9,"cmd":"move_joints","q":[-17.5,-0.5,4.0,86.6,75.1],"g":17.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[73.3,-8.3,116.6],[112.2,4.0,225.2],[240.9,44.5,220.3],[235.6,61.8,159.2],[236.0,54.0,58.2],[236.0,54.0,58.2]]},{"t":253.3,"cmd":"move_joints","q":[2.3,-2.3,6.9,86.6,95.1],"g":17.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[68.5,-19.5,116.6],[105.8,-21.0,226.4],[240.5,-26.4,218.9],[240.2,-8.3,157.9],[238.7,-16.1,56.9],[238.7,-16.1,56.9]]},{"t":257.7,"cmd":"move_joints","q":[22.8,-4.4,9.8,85.4,114.9],"g":17.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.8,-28.6,116.6],[90.5,-41.5,227.7],[214.6,-93.7,218.4],[221.1,-76.8,157.3],[220.3,-84.3,56.3],[220.3,-84.3,56.3]]},{"t":267.7,"cmd":"move_joints","q":[22.6,0.7,23.5,66.1,114.9],"g":17.4,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.9,-28.6,116.6],[99.6,-45.1,224.3],[214.5,-92.9,172.1],[221.4,-76.2,111.0],[221.4,-84.0,10.0],[221.4,-84.0,10.0]]},{"t":270.1,"cmd":"move_joints","q":[22.6,1.2,23.8,64.9,114.9],"g":59.5,"act":[0,0,0,0,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.9,-28.6,116.6],[100.5,-45.5,223.9],[214.7,-93.0,169.9],[222.0,-76.4,108.8],[222.7,-84.5,7.9],[222.7,-84.5,7.9]]},{"t":274.8,"cmd":"move_joints","q":[22.6,-4.5,9.4,85.5,115.2],"g":59.5,"act":[1,1,1,1,1],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.9,-28.6,116.6],[90.4,-41.3,227.8],[214.8,-93.1,219.6],[221.6,-76.3,158.5],[221.5,-84.1,57.5],[221.5,-84.1,57.5]]},{"t":284.6,"cmd":"move_joints","q":[22.6,-29.4,19.8,65.4,115.2],"g":59.5,"act":[0,1,1,1,0],"pts":[[0.0,0.0,0.0],[38.8,-0.0,62.4],[59.9,-28.6,116.6],[44.4,-22.1,231.4],[166.7,-73.0,257.2],[205.6,-69.6,206.8],[257.9,-99.2,125.3],[257.9,-99.2,125.3]]}]};
  const JOINTS = ['pan', 'lift', 'elbow', 'wrist', 'roll'];
  const JKEYS = ['shoulder_pan', 'shoulder_lift', 'elbow_flex', 'wrist_flex', 'wrist_roll'];
  const N = Math.max(TRAJ.A.length, TRAJ.B.length);

  // Authentic Claude-style LLM turn metadata synced to each physical move (0..14)
  // Real thinking durations, real Python code/stdout, and real verbatim assistant text.
  const TURN_A = [
    { think: 'Thought for 283s (opaque CoT)', say: null },
    { think: 'Thought for 283s (same turn)', say: '“Arm is moving toward a hover above the Fujicolor 200 carton…”' },
    { think: 'Thought for 283s (same turn)', say: null },
    { think: 'Thought for 283s (same turn)', say: null },
    { think: 'Thought for 64s (opaque CoT)', say: null },
    { think: 'Thought for 64s (same turn)', say: null },
    { think: 'Thought for 64s (same turn)', say: '“Carton is grasped and lifted; now carrying it over to the goal…”' },
    { think: 'Thought for 27s (opaque CoT)', say: null },
    { think: 'Thought for 27s (same turn)', say: null },
    { think: 'Thought for 27s (same turn)', say: null },
    { think: 'Thought for 27s (same turn)', say: null },
    { think: 'Thought for 27s (same turn)', say: null },
    { think: 'Thought for 9s (opaque CoT)', say: null },
    { think: 'Thought for 9s (same turn)', say: null },
    { think: 'Thought for 3s · finish(p=0.85)', say: '“top face centre at pixel (637, 500), against projected goal (633, 505)”' },
  ];

  const TURN_B = [
    { think: 'Thought for 5s', py: 'backproj((705,931), -5)  # 20 px grid', out: '[184., 220., -5.]  # Fuji 200 @ (156, 202)' },
    { think: 'Thought for 12s', py: 'ik([156, 202, 58])  # + collision check', out: '[-29.8, -58.4, 44.8, 36.9, -58.3]' },
    { think: 'Thought for 5s', py: 'body_points(q)  # floor & keep-out ok', out: 'step 3/4 → [-48.0, -16.8, 13.7, 71.1, 4.4]' },
    { think: 'Thought for 5s', py: 'body_points(q)  # hover over carton', out: 'step 4/4 → [-57.0, 4.0, -1.9, 88.1, 35.8]' },
    { think: 'Thought for 11s', py: 'backproj((775,698), 57.2)  # jaw check', out: 'descent → [-57.0, 9.5, 13.9, 66.9, 35.8]' },
    { think: 'Thought for 4s', py: null, out: null, say: '“Hovering above the carton now; descending to grasp.”' },
    { think: 'Thought for 11s', py: 'qplace = ik([221.5, -85, 9.0], xd)', out: '[22.9, 1.0, 23.6, 65.7, 115.7]' },
    { think: 'Thought for 11s', py: 'tip_path(q_lift, q_place_h, n=5)', out: 'carry 1/4 → [-37.1, 1.9, 0.9, 87.5, 55.7]' },
    { think: 'Thought for 11s', py: 'tip_path(q_lift, q_place_h, n=5)', out: 'carry 2/4 → [-17.1, -0.3, 3.7, 86.8, 75.7]' },
    { think: 'Thought for 11s', py: 'tip_path(q_lift, q_place_h, n=5)', out: 'carry 3/4 → [2.9, -2.5, 6.5, 86.2, 95.7]' },
    { think: 'Thought for 4s', py: null, out: null, say: '“Carton is gripped and hovering over the goal point in the tray.”' },
    { think: 'Thought for 4s', py: 'qplace  # pre-solved 5-DOF target', out: '[22.9, 1.0, 23.6, 65.7, 115.7]' },
    { think: 'Thought for 4s', py: null, out: null, say: '“Lowering it, releasing, and withdrawing now.”' },
    { think: 'Thought for 4s', py: null, out: null },
    { think: 'Thought for 2s · finish(p=0.85)', py: 'cv2.imread(snap_0005)[460:600, 540:740]', out: 'verified on tray · 4.5 mm · 4:49 total' },
  ];

  function formatMoveCall(frame) {
    const k = frame.act.reduce((a, b) => a + b, 0);
    if (k === 0) return `move_joints({ gripper: ${Math.round(frame.g)} })`;
    const parts = [];
    for (let i = 0; i < 5; i++) {
      if (frame.act[i]) parts.push(`${JOINTS[i]}: ${frame.q[i]}`);
    }
    return `move_joints({ ${parts.join(', ')} })`;
  }

  // Move phase labels for human clarity
  function moveTag(frame) {
    const k = frame.act.reduce((a, b) => a + b, 0);
    if (k === 0) return frame.g < 25 ? 'gripper close' : 'gripper open';
    if (k === 5) return '5/5 coupled';
    if (k === 2) return '2/5 pan+roll slew';
    if (k === 3) return '3/5 planar';
    return k + '/5 joints';
  }

  root.innerHTML = `
    <div class="kin-top">
      <button type="button" class="kin-btn" data-act="play">Pause</button>
      <input type="range" class="kin-scrub" min="0" max="${N - 1}" step="0.01" value="0" aria-label="Scrub 3D joint trajectory and LLM turn trace"/>
      <span class="kin-step" data-step>Move 1 / ${N}</span>
      <span class="kin-hint">Drag to orbit 3D</span>
    </div>
    <div class="kin-grid">
      <div class="kin-pane" data-pane="A">
        <div class="kin-head">
          <strong>Tools only</strong>
          <span class="kin-tag" data-tag="A">5/5 coupled</span>
        </div>
        <canvas class="kin-canvas" data-cv="A" width="380" height="290"></canvas>
        <div class="kin-joints" data-j="A">
          ${JOINTS.map((n, i) => `<span class="kin-j" data-ji="${i}"><i></i>${n}</span>`).join('')}
        </div>
        <div class="kin-llm" data-llm="A">
          <div class="kin-think-row"><span class="kin-spark">✦</span><span data-th="A"></span></div>
          <div class="kin-say" data-say="A" hidden></div>
          <div class="kin-tool-call"><span class="kin-tool-dot kin-dot-move"></span><code data-mv="A"></code></div>
        </div>
      </div>
      <div class="kin-pane" data-pane="B">
        <div class="kin-head">
          <strong>Tools + Python</strong>
          <span class="kin-tag kin-tag-b" data-tag="B">5/5 coupled</span>
        </div>
        <canvas class="kin-canvas" data-cv="B" width="380" height="290"></canvas>
        <div class="kin-joints" data-j="B">
          ${JOINTS.map((n, i) => `<span class="kin-j" data-ji="${i}"><i></i>${n}</span>`).join('')}
        </div>
        <div class="kin-llm" data-llm="B">
          <div class="kin-think-row"><span class="kin-spark">✦</span><span data-th="B"></span></div>
          <div class="kin-py-block" data-pybox="B" hidden>
            <div class="kin-py-in"><span class="kin-tool-dot kin-dot-py"></span><code data-py="B"></code></div>
            <div class="kin-py-out" data-out="B"></div>
          </div>
          <div class="kin-say" data-say="B" hidden></div>
          <div class="kin-tool-call"><span class="kin-tool-dot kin-dot-move"></span><code data-mv="B"></code></div>
        </div>
      </div>
    </div>
  `;

  const btnPlay = root.querySelector('[data-act="play"]');
  const scrub = root.querySelector('.kin-scrub');
  const stepEl = root.querySelector('[data-step]');
  const cvA = root.querySelector('[data-cv="A"]');
  const cvB = root.querySelector('[data-cv="B"]');
  const tagA = root.querySelector('[data-tag="A"]');
  const tagB = root.querySelector('[data-tag="B"]');
  const jointsA = Array.from(root.querySelectorAll('[data-j="A"] .kin-j'));
  const jointsB = Array.from(root.querySelectorAll('[data-j="B"] .kin-j'));
  const uiA = { th: root.querySelector('[data-th="A"]'), say: root.querySelector('[data-say="A"]'), mv: root.querySelector('[data-mv="A"]') };
  const uiB = { th: root.querySelector('[data-th="B"]'), pybox: root.querySelector('[data-pybox="B"]'), py: root.querySelector('[data-py="B"]'), out: root.querySelector('[data-out="B"]'), say: root.querySelector('[data-say="B"]'), mv: root.querySelector('[data-mv="B"]') };

  // Shared 3D camera orbit (radians) — matches front-camera perspective (+x left, +y toward viewer, +z up)
  let yaw = 0.18;
  let pitch = 0.54;
  let tPos = 0;
  let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastTs = 0;

  // High-DPI canvas setup
  function setupCanvas(cv) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = cv.getBoundingClientRect();
    const w = Math.max(260, Math.round(rect.width || 370));
    const h = Math.round(w * 0.74);
    if (cv.width !== w * dpr || cv.height !== h * dpr) {
      cv.width = w * dpr;
      cv.height = h * dpr;
    }
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  // 3D -> 2D perspective projection matching the front desk camera (+x left, +y foreground, -y tray in back)
  function project(p, w, h) {
    const cx = 155, cy = 35, cz = 75;
    const x = p[0] - cx, y = p[1] - cy, z = p[2] - cz;
    const cyaw = Math.cos(yaw), syaw = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    // Screen right (+x1) aligns with -x at yaw=0; depth (+d1) aligns with -y (into scene)
    const x1 = -x * cyaw + y * syaw;
    const d1 = -x * syaw - y * cyaw;
    const screenUp = z * cp + d1 * sp;
    const camDepth = d1 * cp - z * sp;
    const dist = 920;
    const scale = (w * 0.00192) * (dist / (dist + camDepth));
    return [w * 0.50 + x1 * scale, h * 0.56 - screenUp * scale, camDepth];
  }

  function lerpPts(p0, p1, u) {
    return p0.map((pt, i) => [
      pt[0] + (p1[i][0] - pt[0]) * u,
      pt[1] + (p1[i][1] - pt[1]) * u,
      pt[2] + (p1[i][2] - pt[2]) * u,
    ]);
  }

  function drawScene(cv, frames, accent, softAccent, sideKey) {
    const { ctx, w, h } = setupCanvas(cv);
    ctx.clearRect(0, 0, w, h);

    const maxI = frames.length - 1;
    const clamped = Math.min(tPos, maxI);
    const i0 = Math.floor(clamped);
    const i1 = Math.min(maxI, i0 + 1);
    const u = clamped - i0;
    // Smoothstep easing between waypoints
    const s = u * u * (3 - 2 * u);
    const f0 = frames[i0], f1 = frames[i1];
    const pts = lerpPts(f0.pts, f1.pts, s);
    const grip = f0.g + (f1.g - f0.g) * s;

    const P = (pt) => project(pt, w, h);

    // 1. Subtle architectural floor grid (z = 0)
    ctx.strokeStyle = '#e7ece8';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= 340; gx += 68) {
      const a = P([gx, -160, 0]), b = P([gx, 240, 0]);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    for (let gy = -160; gy <= 240; gy += 80) {
      const a = P([0, gy, 0]), b = P([340, gy, 0]);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }

    // 2. Shallow tray outline (x: 94..346, y: -154..14, z: 0)
    const tray = [[94,-154,0],[346,-154,0],[346,14,0],[94,14,0]].map(P);
    ctx.fillStyle = 'rgba(226, 234, 228, 0.42)';
    ctx.strokeStyle = '#aebbb2';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    tray.forEach((p, idx) => idx ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 3. Unmarked 15 mm goal ring at G1 (220, -68, 0)
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    for (let a = 0; a <= 32; a++) {
      const th = (a / 32) * Math.PI * 2;
      const gp = P([220 + 15 * Math.cos(th), -68 + 15 * Math.sin(th), 1]);
      if (a === 0) ctx.moveTo(gp[0], gp[1]); else ctx.lineTo(gp[0], gp[1]);
    }
    ctx.stroke();
    const gCenter = P([220, -68, 1]);
    ctx.fillStyle = '#b45309';
    ctx.beginPath(); ctx.arc(gCenter[0], gCenter[1], 2.2, 0, Math.PI * 2); ctx.fill();

    // 4. Fuji 200 carton position (starts at (156, 202, 18), moves with tip while held, rests at goal after release)
    const heldStart = 5, heldEnd = 12;
    let boxPos;
    if (clamped < heldStart) boxPos = [156, 202, 18];
    else if (clamped < heldEnd) boxPos = [pts[pts.length - 1][0], pts[pts.length - 1][1], Math.max(18, pts[pts.length - 1][2] - 12)];
    else boxPos = sideKey === 'A' ? [217, -67, 18] : [218.6, -63.7, 18];
    const bp = P(boxPos);
    ctx.fillStyle = '#22a055';
    ctx.strokeStyle = '#14532d';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.roundRect(bp[0] - 9, bp[1] - 6, 18, 12, 2);
    ctx.fill();
    ctx.stroke();

    // 5. Full ghosted tip trail + active trail up to current step
    const tips = frames.map(f => P(f.pts[f.pts.length - 1]));
    ctx.strokeStyle = 'rgba(130, 145, 136, 0.25)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    tips.forEach((p, idx) => idx ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.stroke();
    ctx.setLineDash([]);

    // Active trail segments: solid when 5/5 coupled, dashed when partial (2/3-DOF)
    for (let k = 0; k < i0; k++) {
      const pA = tips[k], pB = tips[k + 1];
      const coupled = frames[k + 1].act.reduce((a, b) => a + b, 0) === 5;
      ctx.strokeStyle = coupled ? accent : '#a45b39';
      ctx.lineWidth = coupled ? 2.2 : 1.7;
      ctx.setLineDash(coupled ? [] : [4, 3]);
      ctx.beginPath(); ctx.moveTo(pA[0], pA[1]); ctx.lineTo(pB[0], pB[1]); ctx.stroke();
    }
    ctx.setLineDash([]);
    if (i0 < maxI) {
      const curTip = P(pts[pts.length - 1]);
      const coupled = f1.act.reduce((a, b) => a + b, 0) === 5;
      ctx.strokeStyle = coupled ? accent : '#a45b39';
      ctx.lineWidth = coupled ? 2.2 : 1.7;
      ctx.setLineDash(coupled ? [] : [4, 3]);
      ctx.beginPath(); ctx.moveTo(tips[i0][0], tips[i0][1]); ctx.lineTo(curTip[0], curTip[1]); ctx.stroke();
      ctx.setLineDash([]);
    }

    // 6. Shadow of arm on floor (z = 0) for instant 3D depth perception
    const shadowPts = pts.map(p => P([p[0], p[1], 0]));
    ctx.strokeStyle = 'rgba(29, 36, 32, 0.10)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    shadowPts.forEach((p, idx) => idx ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.stroke();

    // 7. Articulated 3D SO-101 arm links
    const arm2d = pts.map(P);
    // Base pedestal
    ctx.fillStyle = '#d4ded7';
    ctx.strokeStyle = '#73827a';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(arm2d[0][0], arm2d[0][1], 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    const widths = [6.5, 5.5, 4.8, 4.0, 3.2, 2.5];
    for (let k = 0; k < arm2d.length - 1; k++) {
      ctx.strokeStyle = k === arm2d.length - 2 ? '#1d2420' : accent;
      ctx.lineWidth = widths[k] || 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(arm2d[k][0], arm2d[k][1]);
      ctx.lineTo(arm2d[k + 1][0], arm2d[k + 1][1]);
      ctx.stroke();
    }
    // Joint pins
    for (let k = 1; k < arm2d.length - 1; k++) {
      ctx.fillStyle = '#fcfcfa';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(arm2d[k][0], arm2d[k][1], 3.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    // Gripper tip dot
    const tip2d = arm2d[arm2d.length - 1];
    ctx.fillStyle = grip < 25 ? '#b45309' : accent;
    ctx.beginPath(); ctx.arc(tip2d[0], tip2d[1], 3.8, 0, Math.PI * 2); ctx.fill();

    // Update joint pills, move tag, and authentic Claude-style LLM turn inspector
    const activeIdx = u > 0.05 ? i1 : i0;
    const activeFrame = frames[activeIdx];
    const tagEl = sideKey === 'A' ? tagA : tagB;
    const jEls = sideKey === 'A' ? jointsA : jointsB;
    const kActive = activeFrame.act.reduce((a, b) => a + b, 0);
    tagEl.textContent = moveTag(activeFrame);
    tagEl.dataset.coupled = kActive === 5 ? 'full' : (kActive === 0 ? 'grip' : 'partial');
    jEls.forEach((el, ji) => {
      el.classList.toggle('is-on', activeFrame.act[ji] === 1);
    });

    if (sideKey === 'A') {
      const item = TURN_A[Math.min(TURN_A.length - 1, activeIdx)];
      uiA.th.textContent = item.think;
      uiA.mv.textContent = formatMoveCall(activeFrame);
      if (item.say) { uiA.say.textContent = item.say; uiA.say.hidden = false; }
      else { uiA.say.hidden = true; }
    } else {
      const item = TURN_B[Math.min(TURN_B.length - 1, activeIdx)];
      uiB.th.textContent = item.think;
      uiB.mv.textContent = formatMoveCall(activeFrame);
      if (item.py) {
        uiB.py.textContent = item.py;
        uiB.out.textContent = item.out ? '→ ' + item.out : '';
        uiB.pybox.hidden = false;
      } else {
        uiB.pybox.hidden = true;
      }
      if (item.say) { uiB.say.textContent = item.say; uiB.say.hidden = false; }
      else { uiB.say.hidden = true; }
    }
  }

  function renderAll() {
    drawScene(cvA, TRAJ.A, '#5a4b5e', '#ebe6ed', 'A');
    drawScene(cvB, TRAJ.B, '#215a49', '#dce9e2', 'B');
    scrub.value = tPos.toFixed(2);
    stepEl.textContent = `Move ${Math.min(N, Math.floor(tPos) + 1)} / ${N}`;
    btnPlay.textContent = playing ? 'Pause' : 'Play';
  }

  function loop(ts) {
    if (playing) {
      if (!lastTs) lastTs = ts;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      tPos += dt * 1.15;
      if (tPos >= N - 1) tPos = 0;
      renderAll();
    } else {
      lastTs = 0;
    }
    requestAnimationFrame(loop);
  }

  // Drag-to-orbit on either canvas rotates both 3D views together
  let dragging = false, lx = 0, ly = 0;
  [cvA, cvB].forEach(cv => {
    cv.addEventListener('pointerdown', (e) => {
      dragging = true; lx = e.clientX; ly = e.clientY;
      cv.setPointerCapture(e.pointerId);
    });
    cv.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      yaw += (e.clientX - lx) * 0.008;
      pitch = Math.max(0.15, Math.min(1.35, pitch + (e.clientY - ly) * 0.007));
      lx = e.clientX; ly = e.clientY;
      renderAll();
    });
    cv.addEventListener('pointerup', () => { dragging = false; });
    cv.addEventListener('pointercancel', () => { dragging = false; });
  });

  btnPlay.addEventListener('click', () => {
    playing = !playing;
    renderAll();
  });
  scrub.addEventListener('input', () => {
    playing = false;
    tPos = Number(scrub.value);
    renderAll();
  });
  window.addEventListener('resize', renderAll, { passive: true });

  renderAll();
  requestAnimationFrame(loop);
})();
