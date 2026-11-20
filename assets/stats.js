/* AI Sanely: anonymous visit counting via GoatCounter (no cookies, no third-party scripts).
   Usage: <script src="assets/stats.js"></script> in the <head> of every page (on 404.html use "/assets/...").

   TO TURN ON: put the GoatCounter site code into KOD (e.g. 'aisanely' for https://aisanely.goatcounter.com).
   While KOD is empty nothing is sent anywhere and the privacy page shows the texts without statistics.

   Data is sent only if: KOD is set, the site runs on https://aisanely.com or www.aisanely.com,
   the page is not inside a frame (iframe) and the browser has neither Do Not Track nor Global Privacy Control on.
   Requests follow the /count API from https://www.goatcounter.com/help/pixel (p, t, r, e, q, s, b, rnd). */
(function () {
  'use strict';
  var KOD = '';

  var d = document, w = window, n = navigator || {};
  var configured = /^[a-z0-9-]+$/.test(KOD);
  // Statistics texts (data-stats="on") are shown only when the code is set. CSS is on privacy.html.
  if (configured) d.documentElement.classList.add('stats-on');

  var dnt = n.doNotTrack === '1' || n.doNotTrack === 'yes' || w.doNotTrack === '1' || n.msDoNotTrack === '1' || n.globalPrivacyControl === true;
  var framed = true; try { framed = w.top !== w.self; } catch (e) {}
  var live = /^(www\.)?aisanely\.com$/.test(location.hostname) && location.protocol === 'https:';
  var on = configured && live && !dnt && !framed;
  var END = 'https://' + KOD + '.goatcounter.com/count';

  // page name for events: index, games, start, schools, privacy, corrections, 404
  var is404 = function () { var s = d.querySelector('script[src$="stats.js"][data-page="404"]'); return !!s; };
  var slug = function () {
    if (is404()) return '404';
    var f = location.pathname.split('/').pop() || 'index.html';
    return f.replace(/\.html$/, '') || 'index';
  };
  var bot = function () {
    if (w.callPhantom || w._phantom || w.phantom) return 150;
    if (w.__nightmare) return 151;
    if (d.__selenium_unwrapped || d.__webdriver_evaluate || d.__driver_evaluate) return 152;
    if (n.webdriver) return 153;
    return 0;
  };
  function send(v) {
    if (!on) return;
    var data = { p: v.p, t: v.t, r: v.r, e: v.e ? 'true' : '', q: v.e ? '' : location.search, s: (w.screen && w.screen.width) || '', b: bot() || '', rnd: Math.random().toString(36).slice(2, 7) };
    var qs = [];
    for (var k in data) if (data[k] !== '' && data[k] != null) qs.push(k + '=' + encodeURIComponent(data[k]));
    var url = END + '?' + qs.join('&');
    try { if (n.sendBeacon && n.sendBeacon(url)) return; } catch (e) {}
    var img = new Image(); img.src = url;
  }

  // Event, e.g. ludStat('game-start/summit'). Does nothing while statistics are off.
  w.ludStat = function (name, title) { if (on && name) send({ p: String(name).slice(0, 200), t: title || location.pathname + location.hash, e: true }); };

  function pageview() {
    var p = location.pathname.replace(/\/index\.html$/, '/') || '/';
    try { p = decodeURI(p); } catch (e) {}
    if (is404()) p = '404: ' + p;
    send({ p: p, t: d.title, r: d.referrer });
  }

  // Link clicks: Instagram, free PDFs, e-mail. Skipping the story.
  function click(e) {
    if (!on) return;
    var el = e.target && e.target.closest ? e.target.closest('a[href],button') : null;
    if (!el) return;
    var h = el.getAttribute('href') || '', s = slug();
    if (/instagram\.com\/aisanely/i.test(h)) w.ludStat('instagram-click/' + s);
    else if (/^mailto:info@aisanely\.com/i.test(h)) w.ludStat('email-click/' + s);
    else if (/#free$/.test(h)) w.ludStat('pdf-click/' + s);
    else if (el.matches('.st-ctl .skp')) w.ludStat('story-skipped');
  }

  if (!on) return;
  d.addEventListener('click', click, true);
  d.addEventListener('auxclick', function (e) { if (e.button === 1) click(e); }, true);
  var go = function () {
    if (!('visibilityState' in d) || d.visibilityState === 'visible') return pageview();
    var f = function () { if (d.visibilityState !== 'visible') return; d.removeEventListener('visibilitychange', f); pageview(); };
    d.addEventListener('visibilitychange', f);
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', go); else go();
})();
