// "Same person, two scanners": one example pair without change and one with a simulated
// finding, shown either as a plain subtraction or as the Lävi Delta map. No dependencies.
(function () {
  'use strict';
  var EX = {
    nochange: { v1: 'Philips', v2: 'Siemens', ring: null,
      alt: 'a healthy volunteer' },
    finding: { v1: 'Philips', v2: 'GE', ring: [{ x: 0.5625, y: 0.2331, r: 0.0417 }, { x: 0.4532, y: 0.6273, r: 0.0332 }],
      alt: 'a healthy volunteer, with simulated findings added to the second scan (marked with yellow rings)' }
  };
  Array.prototype.forEach.call(document.querySelectorAll('.scan-example'), function (root) {
    var state = { ex: 'nochange', view: 'sub' };
    var q = function (s) { return root.querySelectorAll(s); };
    function render() {
      var e = EX[state.ex], base = '/demo/scanner/' + state.ex + '/';
      var img = function (l) { return root.querySelector('img[data-layer="' + l + '"]'); };
      img('bl').src = base + 'bl.webp';
      img('bl').alt = 'Axial FLAIR MRI of ' + e.alt + ', first scanner (' + e.v1 + ').';
      img('fu').src = base + 'fu.webp';
      img('fu').alt = 'The same person and slice on a scanner from a different vendor (' + e.v2 + ').';
      img('third').src = base + (state.view === 'sub' ? 'sub.webp' : 'map.webp');
      img('third').alt = state.view === 'sub'
        ? 'Plain subtraction of the two scans after alignment and standard intensity scaling.'
        : 'Second scan with the Lävi Delta change map overlaid.';
      root.querySelector('[data-label="bl"]').textContent = 'Scanner 1 · ' + e.v1;
      root.querySelector('[data-label="fu"]').textContent = 'Scanner 2 · ' + e.v2;
      root.querySelector('[data-label="third"]').textContent = state.view === 'sub' ? 'Plain subtraction' : 'Lävi Delta map';
      // one ring per simulated finding crossing this slice, on every pane
      Array.prototype.forEach.call(q('.scan-frame'), function (f) {
        Array.prototype.forEach.call(f.querySelectorAll('.scan-ring'), function (r) { r.remove(); });
        (e.ring || []).forEach(function (g) {
          var r = document.createElement('span');
          r.className = 'scan-ring'; r.setAttribute('aria-hidden', 'true');
          r.style.left = (g.x - g.r) * 100 + '%';
          r.style.top = (g.y - g.r) * 100 + '%';
          r.style.width = r.style.height = g.r * 200 + '%';
          f.appendChild(r);
        });
      });
      root.querySelector('.scan-ring-note').hidden = !e.ring;
      Array.prototype.forEach.call(q('.scan-legend'), function (p) { p.hidden = p.getAttribute('data-for') !== state.view; });
      Array.prototype.forEach.call(q('.scan-ex'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ex') === state.ex ? 'true' : 'false'); });
      Array.prototype.forEach.call(q('.scan-view'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-view') === state.view ? 'true' : 'false'); });
    }
    Array.prototype.forEach.call(q('.scan-ex'), function (b) {
      b.addEventListener('click', function () { state.ex = b.getAttribute('data-ex'); render(); });
    });
    Array.prototype.forEach.call(q('.scan-view'), function (b) {
      b.addEventListener('click', function () { state.view = b.getAttribute('data-view'); render(); });
    });
    // images only once the example is on screen and the page has finished loading
    function go() { render(); }
    if (!('IntersectionObserver' in window)) { go(); return; }
    var io = new IntersectionObserver(function (es) {
      if (!es.some(function (e) { return e.isIntersecting; })) return;
      io.disconnect();
      if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
    }, { rootMargin: '300px 0px' });
    io.observe(root);
  });
})();
