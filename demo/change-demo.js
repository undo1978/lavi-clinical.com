// Lävi Delta output demo: baseline, follow-up and follow-up + change map, paged through
// slice by slice. No dependencies. Images load only once the demo is on screen and the page
// has finished loading: the first 10 slices first, the rest in the background. The slices
// advance on their own unless the visitor prefers reduced motion or takes over
// with the wheel, a swipe, the keyboard or the slider. Each case starts on a slice where a
// lesion is visible (start, 1-based) and plays on from there.
(function () {
  'use strict';
  var root = document.getElementById('change-demo');
  if (!root || !root.querySelector('canvas').getContext) return;

  var CASES = [
    { dir: '/demo/DEMO-BM-10/', n: 100, start: 53, ms: 110,
      label: 'Contrast-enhanced T1 (T1C) MRI of a person with brain metastases' },
    { dir: '/demo/DEMO-MS-03/', n: 11, start: 3, ms: 420,
      label: 'FLAIR MRI of a person with multiple sclerosis' }
  ];
  var LAYERS = ['bl', 'fu', 'map'];

  var panes = root.querySelector('.demo-panes');
  var canvases = root.querySelectorAll('canvas');
  var ctx = Array.prototype.map.call(canvases, function (c) { return c.getContext('2d'); });
  var playBtn = root.querySelector('.demo-play');
  var mapBtn = root.querySelector('.demo-map');
  var slider = root.querySelector('.demo-slider');
  var sliceOut = root.querySelector('.demo-slice');
  var caseBtns = root.querySelectorAll('.demo-case');
  var viewBtns = root.querySelectorAll('.demo-view');
  var paneEls = root.querySelectorAll('.demo-pane');

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = { c: 0, i: 0, dir: 1, playing: !reduced, map: true, visible: false, started: false };
  var images = [];   // images[case][layer][slice]
  var timer = null;

  function pad(k) { return ('00' + k).slice(-3); }

  // Slices in loading order: the 10 from the start slice on first, then outward from it.
  function order(c) {
    var s0 = c.start - 1, out = [], k;
    for (k = 0; k < Math.min(10, c.n); k++) out.push((s0 + k) % c.n);
    for (var d = 1; out.length < c.n; d++) {
      [s0 + 9 + d, s0 - d].forEach(function (j) {
        if (j >= 0 && j < c.n && out.indexOf(j) === -1) out.push(j);
      });
    }
    return out;
  }

  var queue = [], inflight = 0, MAX_INFLIGHT = 6;
  function pump() {
    while (inflight < MAX_INFLIGHT && queue.length) {
      var job = queue.shift();
      inflight++;
      job.im.onload = job.im.onerror = function () { inflight--; onLoaded.call(this); pump(); };
      job.im.src = job.src;
    }
  }

  function load(ci) {
    if (images[ci]) return;
    var c = CASES[ci];
    images[ci] = LAYERS.map(function () { return []; });
    for (var k = 0; k < c.n; k++) {
      LAYERS.forEach(function (layer, li) {
        var im = new Image();
        im.decoding = 'async';
        images[ci][li][k] = im;
      });
    }
    // the selected case goes to the front of the queue
    var jobs = [];
    order(c).forEach(function (k) {
      LAYERS.forEach(function (layer, li) {
        jobs.push({ im: images[ci][li][k], src: c.dir + layer + '-' + pad(k + 1) + '.webp' });
      });
    });
    queue = jobs.concat(queue);
    pump();
  }

  function onLoaded() { if (this.src && this.src.indexOf(CASES[state.c].dir) !== -1) draw(); }

  function ready(im) { return im && im.complete && im.naturalWidth > 0; }

  function draw() {
    var set = images[state.c];
    if (!set) return;
    var bl = set[0][state.i], fu = set[1][state.i], mp = set[2][state.i];
    for (var p = 0; p < 3; p++) {
      var g = ctx[p], w = canvases[p].width, h = canvases[p].height;
      var base = p === 0 ? bl : fu;
      if (!ready(base)) continue;
      g.drawImage(base, 0, 0, w, h);
      if (p === 2 && state.map && ready(mp)) g.drawImage(mp, 0, 0, w, h);
    }
    slider.value = String(state.i + 1);
    sliceOut.textContent = 'Slice ' + (state.i + 1) + ' / ' + CASES[state.c].n;
  }

  function setAlt() {
    var c = CASES[state.c];
    Array.prototype.forEach.call(canvases, function (cv) {
      var alt = cv.getAttribute('data-alt') + '. ' + c.label + '.';
      if (cv === canvases[2] && !state.map) alt += ' Map hidden.';
      cv.setAttribute('aria-label', alt);
    });
  }

  function step() {
    var n = CASES[state.c].n;
    if (n < 2) return;
    var next = state.i + state.dir;
    if (next >= n || next < 0) { state.dir = -state.dir; next = state.i + state.dir; }
    var set = images[state.c];
    // wait for a slice still loading rather than show a gap
    if (!set || !ready(set[0][next]) || !ready(set[1][next]) || !ready(set[2][next])) {
      return;
    }
    state.i = next;
    draw();
  }

  function schedule() {
    clearInterval(timer);
    timer = null;
    if (state.playing && state.visible) timer = setInterval(step, CASES[state.c].ms);
    playBtn.textContent = state.playing ? 'Pause' : 'Play';
    // a running stack should not be read out frame by frame
    sliceOut.setAttribute('aria-live', state.playing ? 'off' : 'polite');
  }

  function stop() { if (state.playing) { state.playing = false; schedule(); } }

  function go(k) {
    var n = CASES[state.c].n;
    state.i = Math.max(0, Math.min(n - 1, k));
    draw();
  }

  function selectCase(ci) {
    state.c = ci;
    state.i = CASES[ci].start - 1;
    state.dir = 1;
    slider.max = String(CASES[ci].n);
    Array.prototype.forEach.call(caseBtns, function (b, k) { b.setAttribute('aria-pressed', k === ci ? 'true' : 'false'); });
    Array.prototype.forEach.call(root.querySelectorAll('[data-case-note]'), function (el) { el.hidden = el.getAttribute('data-case-note') !== String(ci); });
    ctx.forEach(function (g, p) { g.clearRect(0, 0, canvases[p].width, canvases[p].height); });
    if (state.started) load(ci);
    setAlt();
    draw();
    schedule();
  }

  function selectView(v) {
    Array.prototype.forEach.call(viewBtns, function (b, k) { b.setAttribute('aria-pressed', k === v ? 'true' : 'false'); });
    Array.prototype.forEach.call(paneEls, function (el, k) { el.classList.toggle('is-shown', k === v); });
  }

  // ---- controls ----
  playBtn.addEventListener('click', function () { state.playing = !state.playing; schedule(); });
  mapBtn.addEventListener('click', function () {
    state.map = !state.map;
    mapBtn.setAttribute('aria-checked', state.map ? 'true' : 'false');
    mapBtn.textContent = state.map ? 'Map on' : 'Map off';
    setAlt();
    draw();
  });
  slider.addEventListener('input', function () { stop(); go(parseInt(slider.value, 10) - 1); });
  Array.prototype.forEach.call(caseBtns, function (b, k) { b.addEventListener('click', function () { selectCase(k); }); });
  Array.prototype.forEach.call(viewBtns, function (b, k) { b.addEventListener('click', function () { selectView(k); }); });

  // wheel over the images pages through the slices (the page scrolls everywhere else)
  var wheelAcc = 0;
  panes.addEventListener('wheel', function (e) {
    e.preventDefault();
    stop();
    wheelAcc += e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
    var per = CASES[state.c].n > 30 ? 25 : 60;
    while (Math.abs(wheelAcc) >= per) {
      go(state.i + (wheelAcc > 0 ? 1 : -1));
      wheelAcc -= wheelAcc > 0 ? per : -per;
    }
  }, { passive: false });

  // horizontal drag / swipe pages through the slices; vertical movement still scrolls the page
  var drag = null;
  panes.addEventListener('pointerdown', function (e) {
    drag = { x: e.clientX, i: state.i, moved: false };
  });
  panes.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 6) return;
    drag.moved = true;
    stop();
    var px = Math.max(4, panes.clientWidth / Math.max(CASES[state.c].n, 12) / (window.innerWidth < 720 ? 1 : 3));
    go(drag.i + Math.round(dx / px));
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
    panes.addEventListener(t, function () { drag = null; });
  });

  panes.addEventListener('keydown', function (e) {
    var k = e.key, d = 0;
    if (k === 'ArrowUp' || k === 'ArrowRight') d = 1;
    else if (k === 'ArrowDown' || k === 'ArrowLeft') d = -1;
    else if (k === 'PageUp') d = 10;
    else if (k === 'PageDown') d = -10;
    else if (k === 'Home') { stop(); go(0); e.preventDefault(); return; }
    else if (k === 'End') { stop(); go(CASES[state.c].n - 1); e.preventDefault(); return; }
    else if (k === ' ' || k === 'Spacebar') { state.playing = !state.playing; schedule(); e.preventDefault(); return; }
    else return;
    e.preventDefault();
    stop();
    go(state.i + d);
  });

  // ---- load and run only when the demo is (nearly) on screen ----
  function start() {
    if (state.started) return;
    state.started = true;
    load(state.c);
    draw();
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          // never compete with the page's own loading
          if (document.readyState === 'complete') start();
          else window.addEventListener('load', start, { once: true });
        }
        state.visible = e.isIntersecting;
        schedule();
      });
    }, { threshold: 0.01 }).observe(root);
  } else {
    state.visible = true;
    start();
  }

  root.classList.add('is-live');
  selectCase(0);
})();
