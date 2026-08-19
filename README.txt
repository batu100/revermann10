REVERMANN WEBSITE – so kommt sie online (GitHub + Vercel, ohne Terminal)
========================================================================

INHALT DIESES ORDNERS
  index.html ................ Startseite  (WICHTIG: exakt so heißen lassen!)
  reisen.html ............... Übersicht aller Reiseangebote
  reise-*.html .............. eigene Detailseiten der einzelnen Reisen
  busreisen.html
  skireise-karlsbad.html
  gruppenreisen.html
  kreuzfahrten.html
  radreisen.html
  fahrradanhaenger-mieten.html
  reiseschutz.html
  kontakt.html
  impressum.html / datenschutz.html / agb.html   (rechtliche Angaben ergänzen!)
  assets/ ................... Bilder, Stylesheet (style.css) und Script (app.js)

WICHTIG: Immer den GESAMTEN Ordnerinhalt hochladen – die HTML-Dateien
UND den kompletten assets-Ordner. Sonst fehlen Bilder und Design.

-------------------------------------------------------------------------
SCHRITT 1 · Auf GitHub hochladen (im Browser)
  1. github.com  ->  Repository  "revermann-website" (Public)
  2. "Add file" -> "Upload files"
  3. Diesen entpackten Ordnerinhalt komplett hineinziehen
     (index.html, alle anderen .html, und den Ordner assets)
  4. "Commit changes"

SCHRITT 2 · Bei Vercel veröffentlichen
  1. vercel.com  ->  mit GitHub anmelden
  2. "Add New" -> "Project" -> revermann-website "Import"
  3. Framework Preset: "Other"  ->  "Deploy"
  4. Fertig. Ihre Seite läuft unter  https://revermann-website.vercel.app
  Weil eine index.html vorhanden ist, erscheint sofort die Startseite
  (kein 404 mehr).

-------------------------------------------------------------------------
VOR DEM ECHTEN LIVEGANG
  - Reisebedingungen/AGB rechtlich prüfen und final freigeben
  - Reisetermine ohne bestätigtes Datum mit Revermann abstimmen
  - Öffnungs-/Erreichbarkeitszeiten ergänzen, falls gewünscht

FORMULARE
  Kontakt- und Kreuzfahrtformular öffnen beim Absenden das E-Mail-Programm
  mit einer fertig ausgefüllten Nachricht an info@revermann.de. Das
  funktioniert sofort ohne zusätzliche Technik. Wer ein "echtes"
  Formular möchte (Versand ohne Mailprogramm), kann später z. B.
  formspree.io einbinden – ein Hinweis dazu steht in assets/app.js.
