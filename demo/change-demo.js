// Lävi Delta output demo: baseline, follow-up and follow-up + change map, paged through
// slice by slice. No dependencies. Images load only once the demo is near the viewport;
// the slices advance on their own unless the visitor prefers reduced motion or takes over
// with the wheel, a swipe, the keyboard or the slider.
(function () {
  'use strict';
  var root = document.getElementById('change-demo');
  if (!root || !root.querySelector('canvas').getContext) return;

  var CASES = [
    { dir: '/demo/DEMO-MS-03/', n: 11, start: 1, ms: 420,
      label: 'FLAIR MRI of a person with multiple sclerosis' },
    { dir: '/demo/DEMO-BM-05/', n: 100, start: 58, ms: 110,
      label: 'Contrast-enhanced T1 (T1C) MRI of a person with brain metastases' }
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

  function load(ci) {
    if (images[ci]) return;
    var c = CASES[ci];
    images[ci] = LAYERS.map(function (layer) {
      var arr = [];
      for (var k = 1; k <= c.n; k++) {
        var im = new Image();
        im.decoding = 'async';
        im.onload = onLoaded;
        im.src = c.dir + layer + '-' + pad(k) + '.webp';
        arr.push(im);
      }
      return arr;
    });
  }

  function onLoaded() { if (this.src.indexOf(CASES[state.c].dir) !== -1) draw(); }

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
        if (e.isIntersecting) start();
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
