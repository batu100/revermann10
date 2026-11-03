/* Einwilligungsbanner. Matomo und Google Analytics laden erst nach Einwilligung.
   Auswahl liegt in localStorage („consent_v1“), ändern über [data-consent-open] im Footer. */
(function () {
  var CONFIG = {
    matomoUrl: 'https://statistiken.eurobus.de/',
    matomoSiteId: '4',
    gaId: 'G-0QB53FVF8R'
  };
  var KEY = 'consent_v1';

  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }

  function loadMatomo() {
    if (!CONFIG.matomoUrl || !CONFIG.matomoSiteId || window._matomoLoaded) return;
    window._matomoLoaded = true;
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackPageView']); _paq.push(['enableLinkTracking']);
    _paq.push(['setTrackerUrl', CONFIG.matomoUrl + 'matomo.php']);
    _paq.push(['setSiteId', CONFIG.matomoSiteId]);
    var g = document.createElement('script'); g.async = true; g.src = CONFIG.matomoUrl + 'matomo.js';
    document.head.appendChild(g);
  }
  function loadGA() {
    if (!CONFIG.gaId || window._gaLoaded) return;
    window._gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
    gtag('js', new Date()); gtag('config', CONFIG.gaId, { anonymize_ip: true });
    var g = document.createElement('script'); g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.gaId);
    document.head.appendChild(g);
  }
  function apply(c) { if (c && c.matomo) loadMatomo(); if (c && c.ga) loadGA(); }

  var box;
  function build() {
    box = document.createElement('div');
    box.className = 'cc'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'false'); box.setAttribute('aria-labelledby', 'cc-t');
    box.innerHTML =
      '<p class="cc-title" id="cc-t">Datenschutz-Einstellungen</p>' +
      '<p>Wir möchten unsere Website mit Statistiken verbessern. Dafür nutzen wir Matomo und Google Analytics – aber nur mit Ihrer Einwilligung. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern. Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>' +
      '<div class="cc-opts">' +
        '<label class="cc-opt"><span><strong>Notwendig</strong><small>Speichert Ihre Auswahl. Immer aktiv.</small></span><input type="checkbox" checked disabled></label>' +
        '<label class="cc-opt"><span><strong>Matomo (Statistik)</strong><small>Reichweitenmessung über statistiken.eurobus.de.</small></span><input type="checkbox" id="cc-m"></label>' +
        '<label class="cc-opt"><span><strong>Google Analytics (Statistik)</strong><small>Analyse der Nutzung; Anbieter: Google Ireland Ltd. / Google LLC (USA).</small></span><input type="checkbox" id="cc-g"></label>' +
      '</div>' +
      '<div class="cc-btns">' +
        '<button type="button" class="btn btn-ghost" data-a="none">Nur notwendige</button>' +
        '<button type="button" class="btn btn-ghost" data-a="save" hidden>Auswahl speichern</button>' +
        '<button type="button" class="btn btn-primary" data-a="all">Alle akzeptieren</button>' +
      '</div>' +
      '<button type="button" class="cc-link" data-a="detail">Einstellungen anpassen</button>';
    document.body.appendChild(box);
    box.addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.getAttribute('data-a'); if (!a) return;
      if (a === 'detail') {
        box.classList.toggle('detail');
        box.querySelector('[data-a=save]').hidden = !box.classList.contains('detail');
        return;
      }
      var c = a === 'all' ? { matomo: true, ga: true } : a === 'none' ? { matomo: false, ga: false } :
        { matomo: box.querySelector('#cc-m').checked, ga: box.querySelector('#cc-g').checked };
      var before = read() || {};
      write(c); box.classList.remove('show');
      // Widerruf: bereits geladene Skripte lassen sich nur per Neuladen entfernen
      if ((before.matomo && !c.matomo) || (before.ga && !c.ga)) location.reload(); else apply(c);
    });
  }
  function open() {
    if (!box) build();
    var c = read() || {};
    box.querySelector('#cc-m').checked = !!c.matomo; box.querySelector('#cc-g').checked = !!c.ga;
    box.classList.add('show');
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-consent-open]');
    if (t) { e.preventDefault(); open(); box.classList.add('detail'); box.querySelector('[data-a=save]').hidden = false; }
  });
  var saved = read();
  if (saved) apply(saved); else open();
})();
