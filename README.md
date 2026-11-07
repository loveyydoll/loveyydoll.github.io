# loveyy — a little corner of the internet

A static personal website. Open index.html, or serve this directory with any static web server. No build step or API keys are needed.

- index.html: spring/fall scrapbook homepage.
- portfolio.html: the workbench, featuring Aetherloom and music experiments.
- styles.css: shared base styles; scrapbook.css: seasonal scrapbook theme; workbench.css: portfolio layout.
- script.js: theme, copyright year, and automatic topic rotation.
- moodboard-data.js: local artwork, descriptions, and source links.
- image-credits.html: credits for the images used.

Scrapbooks start automatically and continue on hover. A hold checkbox pauses changes. Keyboard-focused links stay stable; reduced-motion preferences remove the fade. Titles are deduplicated. Small collections exchange positions so they keep shuffling when every item is already visible.

Keep one entry per title in moodboard-data.js. New images should be saved under assets/scrapbook and credited, with the initial HTML kept in sync for visitors without JavaScript.

Film and TV preferences supplied by loveyy are saved in `docs/film-tv-preferences.json`. Consult that reference for future content edits. Watched films and favorites are separate; do not infer individual movies from franchise labels.

Current listening is recorded in `docs/music-preferences.json`. Each artist appears once and the automatic shuffle visits the collection before refilling. Responsive image frames preserve image proportions with no cropping; image dimensions are stored alongside local artwork. TV posters use portrait frames.
The music collection includes artist images and one representative record per artist. It prioritizes unseen fragments while keeping the same artist out of multiple visible tiles. Record selections are documented in docs/music-preferences.json.

## Handmade journal / My Setup <3

`setup.html` is a dedicated kraft-paper setup page linked from the homepage and workbench. Its local navigation covers desk, everyday devices, guitar and future studio only. The existing workbench and all music, film, game and social content remain.

To add your photographs:
1. Put your own JPG, WebP or PNG files in `assets/setup/` (create that folder).
2. In `setup.js`, replace the four `null` values with relative paths such as `'assets/setup/desk.jpg'`.
3. Edit `setupAlt` with accurate descriptions of each photograph. Captions and device specs live in `setup.html`; personal notes are plain HTML too.
4. Preview before committing. Missing photo paths keep the labelled empty frame rather than showing a broken image. With JavaScript disabled the frames and all captions remain visible.

No photos are fabricated. Paper, tape and placeholder patterns are CSS; no new raster imagery or paid assets were added. Caveat is a free Google Font, with local cursive fallbacks; existing font families and credits remain. The reference image guided the kraft colour, handwritten headings and guitar area; it is not redistributed.

`journal.css` is the final shared design layer. It adds handwritten accents, taped photos, a setup invitation, wrapping navigation, larger controls and focus outlines. The setup paper keeps warm ink colours in both themes, while surrounding navigation follows the existing theme setting. The PC card includes only supplied CPU/GPU/RAM facts; remaining specifications are intentionally blank. All four studio upgrades are explicitly planned.

Validation (2026-11-07): JavaScript syntax checks; `git diff --check`; all four HTML pages checked for local asset paths, fragment targets, duplicate IDs and image alt attributes. Browser reviewed the full desktop setup page and mobile layout at 375px; setup, homepage and workbench had no horizontal overflow. Theme switching and the homepage hold control worked. This is a focused accessibility review, not a full WCAG audit. No framework or build step was introduced.
