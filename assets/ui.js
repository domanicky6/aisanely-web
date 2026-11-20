/* AI Sanely: shared header, footer and small helpers for subpages */
(function () {
  'use strict';
  var PAGES = [
    { href: 'news/', t: 'News' },
    { href: 'start.html', t: 'Start here' },
    { href: 'games.html', t: 'Games' },
    { href: 'schools.html', t: 'For schools' },
    { href: 'parents.html', t: 'For parents' },
    { href: './#free', t: 'Free PDFs' }
  ];
  // On the 404 page (body data-root="/") links must be absolute, because GitHub Pages serves it for deep paths too.
  var ROOT = (document.body && document.body.getAttribute('data-root')) || '';
  var u = function (h) { return ROOT ? ROOT + h.replace(/^\.\//, '') : h; };
  var here = (location.pathname.split('/').pop() || 'index.html');
  var ig = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="0.6"></circle></svg>';
  var head = document.getElementById('site-header');
  if (head) {
    head.className = 'top';
    head.innerHTML = '<a class="skip" href="#main">Skip to content</a><div class="wrap" style="position:relative">' +
      '<a class="logo" href="' + u('./') + '"><span class="d" aria-hidden="true"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></span>AI Sanely</a>' +
      '<nav class="nav" id="nav" aria-label="Main navigation">' + PAGES.map(function (p) { return '<a href="' + u(p.href) + '"' + (p.href === here || (p.href === 'news/' && /\/news\//.test(location.pathname)) ? ' aria-current="page"' : '') + '>' + p.t + '</a>'; }).join('') + '</nav>' +
      '<div class="tools"><button type="button" class="round" id="bigBtn" aria-pressed="false" aria-label="Larger text">A+</button>' +
      '<a class="round dark" href="https://www.instagram.com/aisanely/" aria-label="Follow @aisanely on Instagram">' + ig + '<span class="igtxt">@aisanely</span></a>' +
      '<button type="button" class="round burger" id="burger" aria-controls="nav" aria-expanded="false" aria-label="Open menu">☰</button></div></div>';
    var nav = document.getElementById('nav'), bur = document.getElementById('burger');
    bur.onclick = function () { var o = nav.classList.toggle('open'); bur.setAttribute('aria-expanded', o); bur.textContent = o ? '✕' : '☰'; bur.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); bur.textContent = '☰'; bur.setAttribute('aria-expanded', 'false'); } });
    var big = false; try { big = localStorage.getItem('aisanely-big') === '1'; } catch (e) {}
    var bb = document.getElementById('bigBtn');
    var apply = function () { document.documentElement.classList.toggle('big', big); bb.setAttribute('aria-pressed', big); bb.textContent = big ? 'A−' : 'A+'; };
    bb.onclick = function () { big = !big; try { localStorage.setItem('aisanely-big', big ? '1' : '0'); } catch (e) {} apply(); };
    apply();
  }
  var foot = document.getElementById('site-footer');
  if (foot) {
    foot.className = 'foot';
    foot.innerHTML = '<div class="wrap"><div class="cols">' +
      '<div><a class="logo" href="' + u('./') + '" style="color:#fff"><span class="d" aria-hidden="true"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></span>AI Sanely</a><p style="margin:.8rem 0 0;line-height:1.6">AI explained in plain English. News with a source and a date, no scare stories.</p></div>' +
      '<div><h3>Who it’s for</h3><ul><li><a href="' + u('start.html') + '">New to AI</a></li><li><a href="' + u('parents.html') + '">For parents</a></li><li><a href="' + u('schools.html') + '">For schools</a></li><li><a href="' + u('games.html') + '">Games for kids</a></li></ul></div>' +
      '<div><h3>Trust</h3><ul><li><a href="' + u('./#verify') + '">How we check facts</a></li><li><a href="' + u('corrections.html') + '">Corrections</a></li><li><a href="' + u('privacy.html') + '">Privacy</a></li></ul></div>' +
      '<div><h3>Contact</h3><ul><li><a href="https://www.instagram.com/aisanely/">Instagram @aisanely</a></li><li><a href="mailto:info@aisanely.com">info@aisanely.com</a></li></ul></div>' +
      '</div><small>No sign-up and no cookies. Games and progress are saved only in your browser. <a href="' + u('privacy.html') + '" style="color:inherit">More about privacy</a></small></div>';
  }
  // gentle reveal of sections
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 }) : null;
  Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) { if (io) io.observe(el); else el.classList.add('in'); });
  // copy prompts
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    var t = b.getAttribute('data-copy'), old = b.textContent;
    var done = function () { b.textContent = '✓ Copied'; setTimeout(function () { b.textContent = old; }, 1800); };
    try { navigator.clipboard.writeText(t).then(done, function () {}); } catch (x) {}
  });
  // Ludko for subpages
  window.ludkoSVG = function (expr, w) {
    var mouth = expr === 'star' ? '<path d="M132 172 Q150 198 168 172 Z" fill="#17153B"/><path d="M140 182 Q150 190 160 182" fill="#FF8A8A"/>' : '<path d="M136 176 Q150 190 164 176" stroke="#17153B" stroke-width="5" fill="none" stroke-linecap="round"/>';
    return '<svg class="ludko" viewBox="40 30 270 200" width="' + (w || 200) + '" aria-hidden="true">' +
      '<path d="M76 168 Q48 176 46 214" stroke="#A29BFE" stroke-width="11" fill="none" stroke-linecap="round"/>' +
      '<path class="arm" d="M226 156 Q252 128 246 86" stroke="#A29BFE" stroke-width="11" fill="none" stroke-linecap="round"/>' +
      '<rect x="70" y="70" width="160" height="146" rx="30" fill="#A29BFE" stroke="#17153B" stroke-width="3"/><rect x="73" y="108" width="154" height="105" rx="27" fill="#FFFFFF"/><rect x="73" y="108" width="154" height="40" fill="#FFFFFF"/>' +
      '<circle cx="97" cy="89" r="6.5" fill="#FF5F57"/><circle cx="117" cy="89" r="6.5" fill="#FEBC2E"/><circle cx="137" cy="89" r="6.5" fill="#28C840"/>' +
      '<ellipse cx="112" cy="174" rx="9" ry="4.5" fill="#FFB8B8"/><ellipse cx="188" cy="174" rx="9" ry="4.5" fill="#FFB8B8"/>' +
      '<g class="eyes"><ellipse cx="128" cy="152" rx="9.5" ry="12" fill="#17153B"/><ellipse cx="172" cy="152" rx="9.5" ry="12" fill="#17153B"/><circle cx="130" cy="147" r="3.4" fill="#FFFFFF"/><circle cx="174" cy="147" r="3.4" fill="#FFFFFF"/></g>' +
      mouth + (expr === 'star' ? '<text x="258" y="76" text-anchor="middle" font-size="50" fill="#FEBC2E" stroke="#17153B" stroke-width="2">★</text>' : '') + '</svg>';
  };
  Array.prototype.forEach.call(document.querySelectorAll('[data-ludko]'), function (el) { el.innerHTML = window.ludkoSVG(el.getAttribute('data-ludko') || 'hi', +el.getAttribute('data-w') || 200); });
})();
