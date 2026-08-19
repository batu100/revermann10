/* ═══════════════════════════════════════════════════════════
   BUSTOURISTIK REVERMANN · gemeinsames Script (alle Seiten)
   ═══════════════════════════════════════════════════════════ */

/* Empfänger für alle Formular-Anfragen */
const REVERMANN_MAIL = "info@revermann.de";

/* Aktuelle Reisen als echte Unterseite in alle vorhandenen Menüs einhängen */
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  if (!menu.querySelector('a[href="reisen.html"]')) {
    menu.insertAdjacentHTML('afterbegin', '<a href="reisen.html">Aktuelle Reisen</a>');
  }
});
const mobileStart = document.querySelector('#mobileMenu > a[href="index.html"]');
if (mobileStart && !document.querySelector('#mobileMenu > a[href="reisen.html"]')) {
  mobileStart.insertAdjacentHTML('afterend', '<a href="reisen.html">Aktuelle Reisen</a>');
}

/* ── Dropdown "Reisen" ─────────────────────────────────────── */
const dd = document.getElementById('ddReisen');
if (dd){
  const ddBtn = dd.querySelector('button');
  ddBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = dd.classList.toggle('open');
    ddBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', () => {
    dd.classList.remove('open');
    ddBtn.setAttribute('aria-expanded', 'false');
  });
}

/* ── Mobile-Menü ──────────────────────────────────────────── */
const menu = document.getElementById('mobileMenu');
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
if (menu && menuOpen){
  menuOpen.addEventListener('click', () => {
    menu.classList.add('open'); document.body.style.overflow = 'hidden';
  });
  const closeMenu = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };
  menuClose.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

/* ── Newsletter ───────────────────────────────────────────── */
document.getElementById('newsletterForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const mail = e.target.querySelector('input').value.trim();
  e.target.querySelector('input').value = '';
  btn.textContent = '✓ Danke';
  if (mail){
    window.location.href = 'mailto:' + REVERMANN_MAIL +
      '?subject=' + encodeURIComponent('Newsletter-Anmeldung') +
      '&body=' + encodeURIComponent('Bitte tragen Sie mich in den Newsletter ein: ' + mail);
  }
  setTimeout(() => btn.textContent = 'Anmelden', 3000);
});

/* ── Formular-Verarbeitung ────────────────────────────────────
   Ohne Server-Backend: Bei "Absenden" wird eine vorbefüllte
   E-Mail an Revermann geöffnet. Das funktioniert sofort nach dem
   Deployment, ganz ohne zusätzliche Technik.
   Wer später ein echtes Formular-Backend möchte, kann z. B.
   Formspree (formspree.io) einbinden – dann diese Funktion durch
   ein fetch() auf den Formspree-Endpunkt ersetzen.
   ──────────────────────────────────────────────────────────── */
function label(el){
  const f = el.closest('.field, .radio-group, .checkbox-row');
  const l = f?.querySelector('label, .rg-label');
  return (l ? l.textContent : el.name || el.id).replace(/\s+/g,' ').trim().replace(/\*$/,'');
}

function buildMail(form, betreff){
  const zeilen = [];
  form.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.type === 'checkbox'){
      if (el.id.includes('datenschutz')) return;
      if (el.checked) zeilen.push(label(el) + ': Ja');
      return;
    }
    if (el.type === 'radio'){
      if (el.checked) zeilen.push(label(el) + ': ' + el.value);
      return;
    }
    const v = (el.value || '').trim();
    if (v) zeilen.push(label(el) + ': ' + v);
  });
  const body = 'Anfrage über revermann.de\n\n' + zeilen.join('\n') +
    '\n\n— gesendet über das Anfrageformular auf revermann.de';
  return 'mailto:' + REVERMANN_MAIL +
    '?subject=' + encodeURIComponent(betreff) +
    '&body=' + encodeURIComponent(body);
}

function handleForm(form, betreff){
  if (!form) return;
  const success = form.querySelector('.form-success');
  const submitRow = form.querySelector('.submit-row');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(el => {
      const leer = el.type === 'checkbox' ? !el.checked : !el.value.trim();
      if (leer){
        ok = false;
        el.style.borderColor = '#d9534f';
        setTimeout(() => el.style.borderColor = '', 2500);
      }
    });
    if (!ok) return;

    // E-Mail-Programm mit vorbefüllter Nachricht öffnen
    window.location.href = buildMail(form, betreff);

    if (success && submitRow){
      success.classList.add('show');
      submitRow.style.display = 'none';
      success.scrollIntoView({ behavior:'smooth', block:'center' });
      setTimeout(() => {
        form.reset();
        success.classList.remove('show');
        submitRow.style.display = '';
        document.getElementById('cf-linkField')?.classList.remove('show');
      }, 7000);
    }
  });
}
handleForm(document.getElementById('bookForm'), 'Reiseanfrage über revermann.de');
handleForm(document.getElementById('cruiseForm'), 'Kreuzfahrt-Anfrage über revermann.de');

/* Bedingtes Feld: Link zur Kreuzfahrt */
const gefunden = document.getElementById('cf-gefunden');
gefunden?.addEventListener('change', () => {
  document.getElementById('cf-linkField')?.classList.toggle('show', gefunden.checked);
});

/* ── Reise per URL vorbefüllen (?reise=…) ─────────────────────
   Buttons "Diese Reise anfragen" auf anderen Seiten verlinken auf
   kontakt.html?reise=Skireise%20Karlsbad – hier wird das Feld gesetzt. */
(function prefillReise(){
  const select = document.getElementById('bf-reise');
  if (!select) return;
  const p = new URLSearchParams(location.search).get('reise');
  if (!p) return;
  let opt = [...select.options].find(o => o.value === p || o.text === p);
  if (!opt){ opt = new Option(p, p); select.add(opt); }
  select.value = opt.value;
  // sanft hervorheben
  select.style.borderColor = 'var(--gold)';
  setTimeout(() => select.style.borderColor = '', 2500);
})();

/* ── Reveal beim Scrollen ─────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── Aktuelles Jahr im Footer ─────────────────────────────── */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
