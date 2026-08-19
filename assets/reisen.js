/* Reiseübersicht und eigenständige Reise-Detailseiten */
(function () {
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
  const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const calendar = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>';
  const clock = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
  const bus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="12" rx="3"/><path d="M3 11h18"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/></svg>';

  const trips = {
    flusskreuzfahrt: {
      title: 'Romantische Flusskreuzfahrt', category: 'Flusskreuzfahrt',
      date: 'Termin auf Anfrage', duration: '5 Tage', location: 'Rhein & Mosel', departure: 'Ab/bis Badbergen',
      price: '1.090 €', priceNote: 'ab p. P.', image: 'assets/img/reise-flusskreuzfahrt.webp',
      alt: 'Flusslandschaft an Rhein und Mosel',
      intro: 'Entspannt über Rhein und Mosel reisen: an Bord eines komfortablen Flussschiffs, begleitet vom Revermann-Reisebus für das Ausflugsprogramm.',
      highlights: ['Busreise nach Köln und zurück', '4 Übernachtungen an Bord', 'Vollpension auf dem Schiff', 'Stadtführungen und ausgewählte Ausflüge', 'Gepäckservice bei Ein- und Ausschiffung', 'Persönliche Reisebegleitung'],
      itinerary: [['Anreise & Einschiffung', 'Busfahrt nach Köln, Stadtrundfahrt und Einschiffung.'], ['Rhein & Mosel erleben', 'Cochem, Koblenz, Rüdesheim und das Siebengebirge entdecken.'], ['Ausschiffung & Heimreise', 'Frühstück an Bord und entspannte Rückfahrt mit dem Reisebus.']]
    },
    masuren: {
      title: 'Malerische Masuren', category: 'Bus-Rundreise',
      date: 'Termin auf Anfrage', duration: '8 Tage', location: 'Masuren, Polen', departure: 'Ab/bis Badbergen',
      price: '1.150 €', priceNote: 'ab p. P.', image: 'assets/img/reise-masuren.webp',
      alt: 'See und Schilflandschaft in den Masuren',
      intro: 'Das Land der tausend Seen verbindet stille Natur, historische Städte, traditionelle Gastfreundschaft und besondere Schifffahrten.',
      highlights: ['7 Übernachtungen mit Frühstück', '6 Abendessen und ein Grillabend', 'Ganztagesführungen durch Nord- und Südmasuren', 'Kloster Heilige Linde mit Orgelkonzert', 'Schifffahrt auf den Masurischen Seen', 'Stadtführungen in Posen und Stettin'],
      itinerary: [['Posen & Anreise', 'Fahrt über Berlin nach Posen und gemeinsames Abendessen.'], ['Masuren entdecken', 'Seenlandschaft, Heilige Linde, Johannisburger Heide und regionale Kultur.'], ['Oberländer Kanal & Ostsee', 'Besondere Schifffahrt, Elbląg und Weiterreise nach Stettin.'], ['Heimreise', 'Rückfahrt ins Artland mit vielen neuen Eindrücken.']]
    },
    allgaeu: {
      title: 'Schlösser, Almabtrieb und Allgäuer Berge', category: 'Busreise',
      date: 'Termin auf Anfrage', duration: '5 Tage', location: 'Allgäu & Tirol', departure: 'Ab/bis Badbergen',
      price: '995 €', priceNote: 'ab p. P.', image: 'assets/img/reise-allgaeu.webp',
      alt: 'Schloss Neuschwanstein vor der Allgäuer Berglandschaft',
      intro: 'Königliche Schlösser, Allgäuer Bergpanorama und gelebte Tradition rund um den Almabtrieb – komfortabel als geführte Busreise.',
      highlights: ['Fahrt im komfortablen Reisebus', '4 Übernachtungen im 4-Sterne-Hotel', 'Frühstück und Abendessen', 'Besuch königlicher Schlösser', 'Traditioneller Almabtrieb', 'Ausflüge im Allgäu und in Tirol'],
      itinerary: [['Anreise ins Allgäu', 'Ankunft im Hotel und gemeinsames Abendessen.'], ['Schlösser & Bergwelt', 'Königliche Bauwerke und eindrucksvolle Panoramen erleben.'], ['Almabtrieb', 'Tradition, Musik und regionale Atmosphäre vor Ort genießen.'], ['Heimreise', 'Entspannte Rückfahrt ins Artland.']]
    },
    rheinschnuppern: {
      title: 'R(h)einschnuppern', category: 'Flusskreuzfahrt',
      date: 'Termin auf Anfrage', duration: '5 Tage', location: 'Rhein & Mosel', departure: 'Ab/bis Badbergen',
      price: '1.180 €', priceNote: 'ab p. P.', image: 'assets/img/reise-rheinschnuppern.webp',
      alt: 'Rheinlandschaft mit Weinbergen und Flussschiff',
      intro: 'Die kompakte Flussreise zum Kennenlernen: historische Städte, Weinlandschaften und entspannte Stunden an Bord.',
      highlights: ['Busanreise nach Köln', '4 Übernachtungen an Bord', 'Vollpension während der Kreuzfahrt', 'Cochem und Koblenz', 'UNESCO-Welterbe Oberes Mittelrheintal', 'Rüdesheim und ausgewählte Führungen'],
      itinerary: [['Köln & Einschiffung', 'Busanreise und Bezug der Kabinen am Nachmittag.'], ['Cochem & Koblenz', 'Stadtrundgänge und Moselwein in eindrucksvoller Kulisse.'], ['Mittelrhein & Rüdesheim', 'Loreley, Weinberge und historische Altstadt.'], ['Rückreise', 'Ausschiffung und Heimfahrt im Reisebus.']]
    },
    'rhein-mosel-saar': {
      title: 'Rhein–Mosel–Saar: Einfach wunderbar', category: 'Flusskreuzfahrt',
      date: 'Termin auf Anfrage', duration: '6 Tage', location: 'Rhein, Mosel & Saar', departure: 'Ab/bis Badbergen',
      price: '1.499 €', priceNote: 'ab p. P.', image: 'assets/img/reise-rhein-mosel-saar.webp',
      alt: 'Flussschiffe vor einer historischen Stadt an Rhein und Mosel',
      intro: 'Drei Flüsse, abwechslungsreiche Landschaften und sorgfältig geplante Landgänge – verbunden mit dem Komfort eines schwimmenden Hotels.',
      highlights: ['Busanreise und Rückfahrt', '5 Übernachtungen an Bord', 'Vollpension auf dem Schiff', 'Begleiteter Ausflugsbus', 'Stadt- und Landschaftsführungen', 'Festliches Gala-Abendessen'],
      itinerary: [['Einschiffung', 'Anreise zum Hafen und Begrüßung an Bord.'], ['Drei-Flüsse-Erlebnis', 'Historische Orte, Weinlandschaften und abwechslungsreiche Ufer entdecken.'], ['Ausflüge & Genuss', 'Geführte Landgänge und entspannte Zeit auf dem Schiff.'], ['Ausschiffung', 'Frühstück und Rückreise ins Artland.']]
    },
    'rhein-symphonie': {
      title: 'Rhein-Symphonie & Mosel-Intermezzo', category: 'Flusskreuzfahrt',
      date: 'Termin auf Anfrage', duration: '6 Tage', location: 'Köln bis Basel', departure: 'Ab/bis Badbergen',
      price: '1.499 €', priceNote: 'ab p. P.', image: 'assets/img/reise-rhein-symphonie.webp',
      alt: 'Flussschiff auf dem Rhein zwischen Weinbergen',
      intro: 'Von Köln Richtung Basel führt diese Reise zu berühmten Rheinorten, eindrucksvollen Weinlandschaften und geschichtsträchtigen Städten.',
      highlights: ['Busfahrt nach Köln und zurück', '5 Übernachtungen an Bord', 'Vollpension', 'Cochem, Koblenz und Rüdesheim', 'Mannheim, Speyer und Straßburg', 'Begleitete Stadtführungen'],
      itinerary: [['Köln & Einschiffung', 'Anreise, Einschiffung und Begrüßung an Bord.'], ['Mosel & Mittelrhein', 'Cochem, Koblenz, Loreley und Rüdesheim.'], ['Mannheim, Speyer & Straßburg', 'Kultur, Stadtbilder und festliches Dinner an Bord.'], ['Basel & Heimreise', 'Ausschiffung und komfortable Rückfahrt.']]
    },
    baltikum: {
      title: 'Jubiläumsreise ins Baltikum', category: 'Eventreise 2026',
      date: '22.09. – 29.09.2026', duration: '8 Tage', location: 'Litauen & Lettland', departure: 'Ab/bis Quakenbrück',
      price: '1.580 €', priceNote: 'p. P. im DZ', image: 'assets/img/reise-baltikum.webp',
      alt: 'Berg der Kreuze in Litauen',
      intro: 'Mit DFDS Seaways nach Klaipėda und weiter zu Kurischer Nehrung, Riga, Vilnius und Trakai – mit First-Class-Hotels und örtlicher Reiseleitung.',
      highlights: ['Gesamte Busreise gemäß Programm', 'Fährüberfahrten Kiel–Klaipėda–Kiel', '2 Übernachtungen in Innenkabinen', '5 Hotelübernachtungen mit Frühstück', 'Stadtführungen in Klaipėda, Riga und Vilnius', 'Kurische Nehrung, Berg der Kreuze und Wasserburg Trakai', 'Örtliche Reiseleitung ab/bis Klaipėda', 'Ausgewählte Eintritte und Abendessen'],
      itinerary: [['22.–23. September', 'Busfahrt nach Kiel, Nachtfähre und Ankunft in Klaipėda.'], ['24. September', 'Klaipėda und Ganztagesausflug auf die Kurische Nehrung.'], ['25.–26. September', 'Berg der Kreuze, Riga und Weiterreise nach Vilnius.'], ['27. September', 'Vilnius und die imposante Wasserburg Trakai.'], ['28.–29. September', 'Rückfahrt nach Klaipėda, Nachtfähre und Heimreise ab Kiel.']]
    }
  };

  const header = `
    <header class="site-header"><div class="nav-shell">
      <a href="index.html" class="logo" aria-label="Bustouristik Revermann – Startseite"><img src="assets/img/logo.png" alt="Bustouristik Revermann – Ihr Reisepartner aus dem Artland" width="460" height="157"></a>
      <nav class="nav-links" aria-label="Hauptnavigation">
        <a href="index.html">Startseite</a>
        <div class="dropdown" id="ddReisen"><button aria-expanded="false" aria-haspopup="true" style="background:var(--gold-50);color:var(--gold-dark);font-weight:600">Reisen <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></button>
          <div class="dropdown-menu" role="menu"><a href="reisen.html">Aktuelle Reisen</a><a href="busreisen.html">Busreisen &amp; Tagesfahrten</a><a href="skireise-karlsbad.html">Skireise Karlsbad</a><a href="gruppenreisen.html">Gruppen- &amp; Vereinsreisen</a></div>
        </div>
        <a href="kreuzfahrten.html">Kreuzfahrten</a><a href="radreisen.html">Radreisen</a><a href="reiseschutz.html">Reiseschutz</a><a href="kontakt.html">Kontakt</a>
      </nav>
      <div class="nav-right"><a href="tel:+491723415004" class="nav-phone">${bus} 0172 3415004</a><a href="kontakt.html" class="btn btn-primary">Reise anfragen <span class="arr">→</span></a><button class="menu-btn" id="menuOpen" aria-label="Menü öffnen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button></div>
    </div></header>
    <div class="mobile-menu" id="mobileMenu"><div class="mm-top"><img src="assets/img/logo.png" alt="Bustouristik Revermann"><button class="close" id="menuClose" aria-label="Menü schließen"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><a href="index.html">Startseite</a><a href="reisen.html">Aktuelle Reisen</a><a href="busreisen.html">Busreisen &amp; Tagesfahrten</a><a href="skireise-karlsbad.html" class="mm-sub">Skireise Karlsbad</a><a href="gruppenreisen.html" class="mm-sub">Gruppen- &amp; Vereinsreisen</a><a href="kreuzfahrten.html">Kreuzfahrten</a><a href="radreisen.html">Radreisen</a><a href="fahrradanhaenger-mieten.html" class="mm-sub">Fahrradanhänger mieten</a><a href="reiseschutz.html">Reiseschutz</a><a href="kontakt.html">Kontakt</a><a href="kontakt.html" class="btn btn-primary">Reise anfragen →</a></div>`;

  const footer = `
    <footer class="site-footer"><div class="container"><div class="footer-grid">
      <div class="footer-brand"><img src="assets/img/logo-light.png" alt="Bustouristik Revermann" width="460" height="157"><p>Ihr Reisepartner aus dem Artland – persönlich beraten und zuverlässig organisiert.</p><form class="newsletter" id="newsletterForm"><input type="email" placeholder="E-Mail für Reise-Tipps" aria-label="E-Mail-Adresse"><button type="submit">Anmelden</button></form></div>
      <div><h5>Reisen</h5><ul><li><a href="reisen.html">Aktuelle Reisen</a></li><li><a href="busreisen.html">Busreisen &amp; Tagesfahrten</a></li><li><a href="skireise-karlsbad.html">Skireise Karlsbad</a></li><li><a href="gruppenreisen.html">Gruppenreisen</a></li></ul></div>
      <div><h5>Kreuzfahrten &amp; Rad</h5><ul><li><a href="kreuzfahrten.html">Kreuzfahrten</a></li><li><a href="radreisen.html">Radreisen im Artland</a></li><li><a href="fahrradanhaenger-mieten.html">Fahrradanhänger mieten</a></li></ul></div>
      <div><h5>Service</h5><ul><li><a href="reiseschutz.html">Reiseschutz</a></li><li><a href="kontakt.html">Kontakt &amp; Anfrage</a></li><li><a href="tel:+491723415004">0172 3415004</a></li><li><a href="mailto:info@revermann.de">info@revermann.de</a></li></ul></div>
    </div><div class="footer-bottom"><span>© <span id="year">2026</span> Bustouristik Revermann · Ihr Reisepartner aus dem Artland</span><div class="legal"><a href="impressum.html">Impressum</a><a href="agb.html">AGB</a><a href="datenschutz.html">Datenschutz</a></div></div></div></footer>
    <div class="mobile-cta"><a href="tel:+491723415004" class="btn btn-ghost">Anrufen</a><a href="kontakt.html" class="btn btn-primary">Reise anfragen</a></div>`;

  function card(key, trip, featured) {
    const href = key === 'ski' ? 'skireise-karlsbad.html' : `reise-${key}.html`;
    return `<article class="trip-card reveal"><a class="trip-img" href="${href}"><img src="${trip.image}" alt="${trip.alt}"><span class="trip-cat ${featured ? 'signal' : ''}">${trip.category}</span></a><div class="trip-body"><div class="trip-meta"><span>${trip.date}</span><span>${trip.duration}</span></div><h2 class="trip-title">${trip.title}</h2><p class="trip-desc">${trip.intro}</p><div class="trip-foot"><div class="trip-price">${trip.price}<small>${trip.priceNote}</small></div><a href="${href}" class="trip-link">Details ${arrow}</a></div></div></article>`;
  }

  function renderOverview(root) {
    const ski = {title:'Skireise Karlsbad 2027',category:'Skireise',date:'29.01. – 02.02.2027',duration:'5 Tage',price:'790 €',priceNote:'p. P. im DZ',image:'assets/img/ski.jpg',alt:'Wintersport im Skigebiet bei Karlsbad',intro:'Skipass, Wellness, Halbpension und Stadtführung – auch ideal für Nicht-Skifahrer.'};
    root.innerHTML = `<section class="page-hero"><div class="container"><div class="reveal"><p class="crumbs"><a href="index.html">Start</a> › Reisen</p><span class="eyebrow">Reiseangebot</span><h1 class="display">Aktuelle Reisen.</h1><p class="lead">Alle Reisen auf einen Blick. Für Angebote ohne veröffentlichten Termin erhalten Sie die aktuellen Daten direkt bei uns.</p></div><div class="page-hero-media reveal"><img src="assets/img/bus.jpg" alt="Reisebus der Bustouristik Revermann"></div></div></section>
      <section><div class="container"><div class="section-head reveal"><div><span class="eyebrow">Reisen entdecken</span><h2 class="display">Persönlich geplant.<br>Entspannt unterwegs.</h2></div><p>Fragen Sie Ihre Wunschreise unverbindlich an. Wir beraten Sie zu Termin, Zustieg und verfügbaren Plätzen.</p></div><div class="trip-grid trip-grid-wide">${card('baltikum', trips.baltikum, true)}${card('ski', ski, true)}${card('flusskreuzfahrt', trips.flusskreuzfahrt)}${card('masuren', trips.masuren)}${card('allgaeu', trips.allgaeu)}${card('rheinschnuppern', trips.rheinschnuppern)}${card('rhein-mosel-saar', trips['rhein-mosel-saar'])}${card('rhein-symphonie', trips['rhein-symphonie'])}</div></div></section>
      <section><div class="container"><div class="cta-band reveal"><h2>Nicht das passende Reiseziel dabei?</h2><div class="hero-ctas"><a href="kontakt.html" class="btn btn-light">Wunschreise anfragen <span class="arr">→</span></a><a href="tel:+491723415004" class="btn btn-ghost-light">0172 3415004</a></div></div></div></section>`;
  }

  function renderDetail(root, trip) {
    const details = trip.highlights.map(item => `<li>${check}${item}</li>`).join('');
    const route = trip.itinerary.map(([title, text]) => `<li><span class="vl-dot">${calendar}</span><div><b>${title}</b><span>${text}</span></div></li>`).join('');
    const request = encodeURIComponent(`${trip.title} (${trip.date})`);
    root.innerHTML = `<section class="page-hero" style="padding-bottom:.25rem"><div class="container"><div class="reveal"><p class="crumbs"><a href="index.html">Start</a> › <a href="reisen.html">Reisen</a> › ${trip.title}</p></div></div></section>
      <section style="padding-top:0"><div class="container"><div class="trip-detail reveal"><div class="narrow"><div class="td-head"><div><span class="eyebrow on-dark">${trip.category}</span><h1 class="display">${trip.title}</h1><div class="td-facts"><span>${calendar}${trip.date}</span><span>${clock}${trip.duration}</span><span>${pin}${trip.location}</span><span>${bus}${trip.departure}</span></div><p class="td-lead">${trip.intro}</p><div class="td-cta-row"><a class="btn btn-primary" href="kontakt.html?reise=${request}">Diese Reise anfragen <span class="arr">→</span></a></div></div><div class="td-visual"><div class="td-img"><img src="${trip.image}" alt="${trip.alt}"></div><div class="td-price-badge"><small>Reisepreis</small><b>${trip.price}</b><small>${trip.priceNote}</small></div></div></div><div class="td-cols"><div class="td-panel"><h3>Enthaltene Leistungen</h3><ul class="leistungen">${details}</ul></div><div class="td-panel"><h3>Reiseverlauf kompakt</h3><ul class="verlauf">${route}</ul></div></div>${trip.date === 'Termin auf Anfrage' ? `<div class="td-note">${clock}<span>Der derzeit veröffentlichte Reisetermin ist abgelaufen oder noch nicht neu bestätigt. Bitte fragen Sie den aktuellen Termin und die Verfügbarkeit direkt bei Revermann an.</span></div>` : ''}</div></div></div></section>
      <section><div class="container"><div class="cta-band reveal"><h2>Interesse an „${trip.title}“?</h2><div class="hero-ctas"><a href="kontakt.html?reise=${request}" class="btn btn-light">Unverbindlich anfragen <span class="arr">→</span></a><a href="tel:+491723415004" class="btn btn-ghost-light">0172 3415004</a></div></div></div></section>`;
  }

  const root = document.getElementById('reisePage');
  if (!root) return;
  document.body.insertAdjacentHTML('afterbegin', header);
  const key = document.body.dataset.reise;
  if (document.body.dataset.page === 'overview') renderOverview(root);
  else if (trips[key]) renderDetail(root, trips[key]);
  document.body.insertAdjacentHTML('beforeend', footer);
})();
