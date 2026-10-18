# loveyy — a little corner of the internet

A static personal website. Open index.html, or serve this directory with any static web server. No build step or API keys are needed.

- index.html: spring/fall scrapbook homepage.
- portfolio.html: the workbench, featuring Aetherband and music experiments.
- styles.css: shared base styles; scrapbook.css: seasonal scrapbook theme; workbench.css: portfolio layout.
- script.js: theme, copyright year, and automatic topic rotation.
- moodboard-data.js: local artwork, descriptions, and source links.
- image-credits.html: credits for the images used.

Scrapbooks start automatically and continue on hover. A hold checkbox pauses changes. Keyboard-focused links stay stable; reduced-motion preferences remove the fade. Titles are deduplicated. Small collections exchange positions so they keep shuffling when every item is already visible.

Keep one entry per title in moodboard-data.js. New images should be saved under assets/scrapbook and credited, with the initial HTML kept in sync for visitors without JavaScript.

Film and TV preferences supplied by loveyy are saved in `docs/film-tv-preferences.json`. Consult that reference for future content edits. Watched films and favorites are separate; do not infer individual movies from franchise labels.
