# Jakob's Portfolio (Neuaufbau)

Neues Portfolio als One-Page mit:
- HTML + CSS
- Anime.js Animationen
- TypeScript (`scripts.ts`) + kompilierte Browser-Datei (`scripts.js`)
- zentraler Content-Config (`site.config.js`)

## Start
`index.html` im Browser öffnen.

## Schnelle Anpassung
Alle wichtigen Inhalte liegen in:

`site.config.js`

Dort kannst du schnell aendern:
- Titel + Meta Daten
- Brand + Navigation
- Hero Texte + CTA
- Kennzahlen
- Projekte
- Leistungen
- About Text
- Kontakt E-Mail + Button Text

## TypeScript kompilieren
Wenn TypeScript installiert ist:

```bash
tsc scripts.ts --target ES2020 --outFile scripts.js
```
