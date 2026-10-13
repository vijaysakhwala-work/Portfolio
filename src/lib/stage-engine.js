/* ============ The cube stage ============ */
export function startStage(o) {
  'use strict';
  var TAU = Math.PI * 2, C30 = Math.sqrt(3) / 2;
  var stage = o.stage, pin = o.pin, canvas = o.canvas, T = o.tags;
  var ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return function () {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var offs = [], observers = [];
  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); offs.push(function () { t.removeEventListener(ev, fn, opt); }); }

  /* ---------- Four arrangements of the same 27 cubes ---------- */
  var N = 27, L = [];
  var g = [];
  for (var y = -1; y <= 1; y++) for (var z = -1; z <= 1; z++) for (var x = -1; x <= 1; x++) g.push([x, y, z]);
  L[0] = g;                                                                   /* the logo cube */
  L[1] = g.map(function (p) { return [p[0] * 1.85, p[1] * 1.85, p[2] * 1.85]; });   /* spread apart: pick the goal */
  var depths = [2, 2, 2, 3], p2 = [], zc = 0, PADIDX = [];
  depths.forEach(function (d, k) {
    var start = p2.length;
    for (var iz = 0; iz < d; iz++) for (var ix = 0; ix < 3; ix++) p2.push([ix - 1, k - 1, -(zc + iz)]);
    PADIDX.push([start, p2.length]);
    zc += d;
  });
  L[2] = p2;                                                                  /* milestones: a staircase of four platforms */
  var heights = [2, 3, 3, 5, 6, 8], p3 = [];
  heights.forEach(function (h, c) { for (var l = 0; l < h; l++) p3.push([c * 1.7, l - 1, 0]); });
  L[3] = p3;                                                                  /* results: bars that grew */
  var TOP = N - 1, GOAL = TOP;                                                /* the goal cube is the one that ends on top of the tallest bar */

  /* Bounding box of each arrangement, in unit screen space, so the camera can dolly to fit */
  function proj(x, y, z) { return [(x - z) * C30, (x + z) * 0.5 - y]; }
  var BB = L.map(function (arr) {
    var a = 1e9, b = -1e9, c = 1e9, d = -1e9;
    arr.forEach(function (p) {
      for (var i = 0; i < 8; i++) {
        var q = proj(p[0] + ((i & 1) ? .5 : -.5), p[1] + ((i & 2) ? .5 : -.5), p[2] + ((i & 4) ? .5 : -.5));
        if (q[0] < a) a = q[0]; if (q[0] > b) b = q[0]; if (q[1] < c) c = q[1]; if (q[1] > d) d = q[1];
      }
    });
    return [a, b, c, d];
  });

  /* ---------- Helpers ---------- */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function inOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function backOut(t) { var c1 = 1.25, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

  /* ---------- State ---------- */
  var W = 0, H = 0, dpr = 1, shade = '7,27,80';
  var introStart = null, introDone = reduce.matches;
  var px = -999, py = -999, lifts = new Float32Array(N);
  var activeIdx = -1, raf = 0, lastT = 0, visible = true, ready = reduce.matches;
  var SEG = [[.17, .29], [.41, .53], [.65, .77]];
  var HOLD = [0, .35, .59, .9];                                               /* scroll positions that show each arrangement */

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = pin.clientWidth; H = pin.clientHeight;
    canvas.width = Math.max(2, Math.floor(W * dpr));
    canvas.height = Math.max(2, Math.floor(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var s = getComputedStyle(document.documentElement).getPropertyValue('--shade').trim();
    if (s) shade = s;
    var pr = getComputedStyle(document.documentElement).getPropertyValue('--paper-rgb').trim();
    if (pr) { var m = pr.split(',').map(Number); if (m.length === 3 && !m.some(isNaN)) PAPER = m; }
  }
  function progress() {
    var r = stage.getBoundingClientRect(), span = r.height - window.innerHeight;
    return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
  }
  function setActive(i) { activeIdx = i; o.onActive(i); }


  /* ---------- Drawing ---------- */
  var COL = { top: '#35c6f2', left: '#3a5af5', right: '#ff7437' };
  function shrink(pts, k) {
    var cx = 0, cy = 0, i;
    for (i = 0; i < pts.length; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= pts.length; cy /= pts.length;
    return pts.map(function (p) { return [cx + (p[0] - cx) * (1 - k), cy + (p[1] - cy) * (1 - k)]; });
  }
  function poly(pts, color) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }
  var OX = 0, OY = 0, S = 1;
  function P(x, y, z) { return [OX + (x - z) * C30 * S, OY + (x + z) * 0.5 * S - y * S]; }
  var PAPER = [246, 247, 244];
  function hex2rgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  var BASE = { top: hex2rgb(COL.top), left: hex2rgb(COL.left), right: hex2rgb(COL.right) };
  function mix(c, t) { return 'rgb(' + Math.round(lerp(c[0], PAPER[0], t)) + ',' + Math.round(lerp(c[1], PAPER[1], t)) + ',' + Math.round(lerp(c[2], PAPER[2], t)) + ')'; }
  function drawCube(x, y, z, alpha, dim) {
    var a = 0.5, b = 0.5, k = 0.05;
    ctx.globalAlpha = alpha;
    /* opaque underlay in the page colour: hides cubes behind and leaves the white seams of the logo */
    poly([P(x - a, y + a, z - a), P(x + a, y + a, z - a), P(x + a, y - a, z - a), P(x + a, y - a, z + a), P(x - a, y - a, z + a), P(x - a, y + a, z + a)], 'rgb(' + PAPER[0] + ',' + PAPER[1] + ',' + PAPER[2] + ')');
    poly(shrink([P(x - b, y + b, z - b), P(x + b, y + b, z - b), P(x + b, y + b, z + b), P(x - b, y + b, z + b)], k), mix(BASE.top, dim));
    poly(shrink([P(x - b, y + b, z + b), P(x + b, y + b, z + b), P(x + b, y - b, z + b), P(x - b, y - b, z + b)], k), mix(BASE.left, dim));
    poly(shrink([P(x + b, y + b, z + b), P(x + b, y + b, z - b), P(x + b, y - b, z - b), P(x + b, y - b, z + b)], k), mix(BASE.right, dim));
    ctx.globalAlpha = 1;
  }

  var pos = []; for (var q = 0; q < N; q++) pos.push([0, 0, 0, 0]);
  var order = []; for (q = 0; q < N; q++) order.push(q);

  function render(dt, now) {
    var i;
    /* First load: the cubes drop in, bottom layer first */
    var introT = 99;
    if (!introDone) {
      if (introStart === null) introStart = now;
      introT = (now - introStart) / 1000;
      if (introT > 0.15 + 26 * 0.045 + 0.95) introDone = true;
    }

    /* Which arrangement(s) are we between? */
    var p = progress();
    var f = smooth(SEG[0][0], SEG[0][1], p) + smooth(SEG[1][0], SEG[1][1], p) + smooth(SEG[2][0], SEG[2][1], p);
    var A = Math.min(Math.floor(f), 2), u = f - A;
    if (f >= 3) { A = 2; u = 1; }
    var a = ready ? (f < .5 ? 0 : f < 1.5 ? 1 : f < 2.5 ? 2 : 3) : 0;
    if (ready && a !== activeIdx) setActive(a);

    /* Camera: fit whatever the cubes are currently making */
    var bA = BB[A], bB = BB[A + 1], ue = inOut(u), bb = [];
    for (i = 0; i < 4; i++) bb.push(lerp(bA[i], bB[i], ue));
    var mobile = W < 761;
    var ax, ay, aw, ah;
    if (mobile) { ax = W * 0.06; ay = H * 0.1; aw = W * 0.88; ah = H * 0.36; }
    else { ax = W * 0.42; ay = H * 0.13; aw = W * 0.56; ah = H * 0.76; }
    var bw = bb[1] - bb[0], bh = bb[3] - bb[2];
    S = Math.min(aw / (bw * 1.1), ah / (bh * 1.16));
    OX = ax + aw / 2 - ((bb[0] + bb[1]) / 2) * S;
    OY = ay + ah / 2 - ((bb[2] + bb[3]) / 2) * S;

    /* Positions with per-cube stagger, intro drop and pointer lift */
    for (i = 0; i < N; i++) {
      var dly = i / (N - 1);
      var li = clamp(u * 1.5 - dly * 0.5, 0, 1); li = inOut(li);
      var pa = L[A][i], pb = L[A + 1][i];
      var x = lerp(pa[0], pb[0], li), y = lerp(pa[1], pb[1], li), z = lerp(pa[2], pb[2], li);
      var alpha = 1, drop = 0;
      if (introT < 90) {
        var t = clamp((introT - 0.15 - i * 0.045) / 0.95, 0, 1);
        drop = (1 - backOut(t)) * 15; alpha = clamp(t * 4, 0, 1);
        if (t <= 0) alpha = 0;
      }
      /* pointer lift: the closer the pointer, the higher the cube floats */
      var sp = P(x, y, z), d2 = (sp[0] - px) * (sp[0] - px) + (sp[1] - py) * (sp[1] - py), sg = S * 1.5;
      var target = (!reduce.matches && introDone && px > -900) ? 0.5 * Math.exp(-d2 / (2 * sg * sg)) : 0;
      lifts[i] += (target - lifts[i]) * (dt > 0 ? Math.min(1, dt * 10) : 1);
      pos[i][0] = x; pos[i][1] = y + drop + lifts[i]; pos[i][2] = z; pos[i][3] = alpha;
    }

    /* Draw, farthest first */
    order.sort(function (m, n) { return (pos[m][0] + pos[m][1] + pos[m][2]) - (pos[n][0] + pos[n][1] + pos[n][2]); });
    ctx.clearRect(0, 0, W, H);

    var w1 = clamp(1 - Math.abs(f - 1) * 2, 0, 1), w2 = clamp(1 - Math.abs(f - 2) * 2, 0, 1), w3 = clamp(1 - Math.abs(f - 3) * 2, 0, 1);

    /* soft contact shadows */
    var floorY = lerp(lerp(lerp(-1.5, -2.4, smooth(0, 1, f)), -1.5, smooth(1, 2, f)), -1.5, smooth(2, 3, f));
    ctx.fillStyle = 'rgba(' + shade + ',0.045)';
    for (i = 0; i < N; i++) {
      var pp = pos[i]; if (pp[3] < .5 || pp[1] - floorY > 1.7) continue;
      var sf = P(pp[0], floorY, pp[2]);
      ctx.beginPath(); ctx.ellipse(sf[0], sf[1], 0.62 * S, 0.3 * S, 0, 0, TAU); ctx.fill();
    }

    /* the goal: an orange target under the highlighted cube while arrangement 1 is showing */
    var gp = pos[GOAL];
    if (w1 > 0.02) {
      var gf = P(gp[0], floorY, gp[2]), tt = (now || 0) / 1000;
      ctx.save(); ctx.strokeStyle = '#ff7435'; ctx.lineWidth = 2;
      ctx.globalAlpha = w1;
      ctx.beginPath(); ctx.ellipse(gf[0], gf[1], 0.8 * S, 0.4 * S, 0, 0, TAU); ctx.stroke();
      var pr = (tt * 0.7) % 1;
      ctx.globalAlpha = w1 * (1 - pr) * 0.8;
      ctx.beginPath(); ctx.ellipse(gf[0], gf[1], (0.8 + pr * 0.9) * S, (0.4 + pr * 0.45) * S, 0, 0, TAU); ctx.stroke();
      var gt = P(gp[0], gp[1] - 0.5, gp[2]);
      ctx.globalAlpha = w1 * 0.55; ctx.setLineDash([5, 6]);
      ctx.beginPath(); ctx.moveTo(gt[0], gt[1]); ctx.lineTo(gf[0], gf[1]); ctx.stroke();
      ctx.restore();
    }

    for (var k = 0; k < N; k++) {
      i = order[k];
      var c = pos[i]; if (c[3] <= 0.01) continue;
      drawCube(c[0], c[1], c[2], c[3], i === GOAL ? 0 : 0.7 * w1);           /* everything else steps back while we pick the goal */
    }

    /* Labels follow the cubes they describe */
    function place(el, wx, wy, wz, w) {
      var s2 = P(wx, wy, wz);
      el.style.opacity = w > 0.02 ? String(w) : '0';
      el.style.transform = 'translate(' + (s2[0] - el.offsetWidth / 2).toFixed(1) + 'px,' + (s2[1] - el.offsetHeight - 6).toFixed(1) + 'px)';
    }
    place(T.goal, gp[0], gp[1] + 0.55, gp[2], w1);
    PADIDX.forEach(function (r, m) {
      var sx = 0, sy = 0, sz = 0, cnt = r[1] - r[0];
      for (var j = r[0]; j < r[1]; j++) { sx += pos[j][0]; sy += pos[j][1]; sz += pos[j][2]; }
      place(T.m[m], sx / cnt, sy / cnt + 0.6, sz / cnt, w2);
    });
    var tp = pos[TOP]; place(T.impact, tp[0], tp[1] + 0.6, tp[2], w3);
  }

  /* ---------- Loop ---------- */
  function frame(now) {
    var dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016;
    lastT = now; render(dt, now); raf = requestAnimationFrame(frame);
  }
  function play() { if (!raf && visible && !reduce.matches && !document.hidden) { lastT = 0; raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  var still = 0;
  function renderOnce() { if (still) return; still = requestAnimationFrame(function () { still = 0; render(0, performance.now()); }); }

  resize();
  render(0, performance.now());
  if (!reduce.matches) { setTimeout(function () { ready = true; }, 450); play(); }
  else { setActive(0); }

  on(window, 'resize', function () { resize(); if (!raf) renderOnce(); });
  on(window, 'scroll', function () { if (!raf) renderOnce(); }, { passive: true });
  on(pin, 'pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = canvas.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top;
  }, { passive: true });
  on(pin, 'pointerleave', function () { px = py = -999; });
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; visible ? play() : stop(); }, { threshold: 0 }); vio.observe(stage); observers.push(vio);
  }
  on(document, 'visibilitychange', function () { document.hidden ? stop() : play(); });
  var onMotion = function () { if (reduce.matches) { stop(); introDone = true; ready = true; renderOnce(); } else { play(); } };
  if (reduce.addEventListener) reduce.addEventListener('change', onMotion); else if (reduce.addListener) reduce.addListener(onMotion);
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  var onTheme = function () { resize(); if (!raf) renderOnce(); };
  if (dark.addEventListener) dark.addEventListener('change', onTheme);
  var mo = new MutationObserver(onTheme); mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] }); observers.push(mo);

  return {
    jump: function (i) {
      var r = stage.getBoundingClientRect(), top = r.top + window.scrollY, span = r.height - window.innerHeight;
      window.scrollTo({ top: top + span * HOLD[i], behavior: reduce.matches ? 'auto' : 'smooth' });
    },
    destroy: function () { stop(); offs.forEach(function (f) { f(); }); observers.forEach(function (x) { x.disconnect(); }); }
  };
}
