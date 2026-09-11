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
    ddBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', () => {
    dd.classList.remove('open');
    ddBtn.setAttribute('aria-expanded', 'false');
  });
  dd.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    dd.classList.remove('open');
    ddBtn.setAttribute('aria-expanded', 'false');
    ddBtn.focus();
  });
}

/* ── Mobile-Menü ──────────────────────────────────────────── */
const menu = document.getElementById('mobileMenu');
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
if (menu && menuOpen){
  menuOpen.addEventListener('click', () => {
    menu.classList.add('open');
    menuOpen.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    menuClose?.focus();
  });
  const closeMenu = () => {
    menu.classList.remove('open');
    menuOpen.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  menuClose?.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  menu.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeMenu();
    menuOpen.focus();
  });
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

/* ── Anfrageformulare ─────────────────────────────────────────
   Die API verarbeitet Anfragen ausschließlich serverseitig. Der
   Resend-Schlüssel liegt nur als Vercel-Umgebungsvariable vor.
   ──────────────────────────────────────────────────────────── */
function label(el){
  const f = el.closest('.field, .radio-group, .checkbox-row');
  const l = f?.querySelector('label, .rg-label');
  return (l ? l.textContent : el.name || el.id).replace(/\s+/g,' ').trim().replace(/\*$/,'');
}

function formFields(form){
  const fields = [];
  form.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.name === 'website') return;
    if (el.type === 'checkbox'){
      if (el.id.includes('datenschutz')) return;
      if (el.checked) fields.push({ label: label(el), value: 'Ja' });
      return;
    }
    if (el.type === 'radio'){
      if (el.checked) fields.push({ label: label(el), value: el.value });
      return;
    }
    const v = (el.value || '').trim();
    if (v) fields.push({ label: label(el), value: v });
  });
  return fields;
}

function showFormMessage(success, message, isError = false){
  if (!success) return;
  success.classList.toggle('error', isError);
  const text = success.querySelector('span');
  if (text) text.innerHTML = isError
    ? '<b>Das hat leider nicht geklappt.</b> ' + message
    : '<b>Vielen Dank!</b> ' + message;
  success.classList.add('show');
  success.scrollIntoView({ behavior:'smooth', block:'center' });
}

function handleForm(form, kind){
  if (!form) return;
  const success = form.querySelector('.form-success');
  const submitRow = form.querySelector('.submit-row');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(el => {
      const invalid = el.type === 'checkbox' ? !el.checked : !el.validity.valid;
      if (invalid){
        ok = false;
        el.style.borderColor = '#d9534f';
        setTimeout(() => el.style.borderColor = '', 2500);
      }
    });
    if (!ok) return;

    const email = form.querySelector(kind === 'cruise' ? '#cf-mail' : '#bf-mail')?.value.trim() || '';
    const phone = form.querySelector(kind === 'cruise' ? '#cf-tel' : '#bf-tel')?.value.trim() || '';
    if (kind === 'cruise' && !email && !phone){
      showFormMessage(success, 'Bitte geben Sie mindestens eine E-Mail-Adresse oder Telefonnummer an.', true);
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalButtonText = button?.innerHTML;
    if (button){
      button.disabled = true;
      button.textContent = 'Wird gesendet …';
    }

    try {
      const response = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          firstName: form.querySelector(kind === 'cruise' ? '#cf-vorname' : '#bf-vorname')?.value.trim() || '',
          lastName: form.querySelector(kind === 'cruise' ? '#cf-nachname' : '#bf-nachname')?.value.trim() || '',
          email,
          phone,
          consent: form.querySelector(kind === 'cruise' ? '#cf-datenschutz' : '#bf-datenschutz')?.checked === true,
          website: form.querySelector('[name="website"]')?.value || '',
          fields: formFields(form)
        })
      });
      if (!response.ok) throw new Error('request-failed');

      if (submitRow) submitRow.style.display = 'none';
      showFormMessage(success, 'Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns persönlich bei Ihnen.');
      setTimeout(() => {
        form.reset();
        success.classList.remove('show');
        success.classList.remove('error');
        submitRow.style.display = '';
        document.getElementById('cf-linkField')?.classList.remove('show');
      }, 7000);
    } catch (_error) {
      showFormMessage(success, 'Bitte versuchen Sie es später erneut oder rufen Sie uns unter 05431 3415 an.', true);
    } finally {
      if (button){
        button.disabled = false;
        button.innerHTML = originalButtonText;
      }
    }
  });
}
handleForm(document.getElementById('bookForm'), 'travel');
handleForm(document.getElementById('cruiseForm'), 'cruise');

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
