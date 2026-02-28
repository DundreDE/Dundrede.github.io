# Jakob's Portfolio (Neuaufbau)

Neues Portfolio als One-Page mit:
- HTML + CSS
- Anime.js Animationen
- TypeScript (`scripts.ts`) + kompilierte Browser-Datei (`scripts.js`)
- vorbereitetem Spline-3D-Slot

## Start
`index.html` im Browser öffnen.

## TypeScript kompilieren
Wenn TypeScript installiert ist:

```bash
tsc scripts.ts --target ES2020 --outFile scripts.js
```

## Spline aktivieren
In `index.html` beim Element `#spline-mount`:

```html
data-spline-url="DEIN_SPLINE_EMBED_LINK"
```
