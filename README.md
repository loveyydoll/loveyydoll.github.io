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

### Photos and text

The four supplied images are in `assets/setup/` and appear directly in `setup.html`, including with JavaScript disabled. Replace those files or change the image `src` and `alt` attributes. Desk photos use a 16:9 crop; product images fit completely inside 16:9 frames. The guitar keeps a portrait frame so the whole instrument stays visible. Other scrapbook media and hero photo areas are widescreen too. User-supplied MacBook and iPhone pictures are product illustrations, not personal photographs or independent model verification.

For an easy text-editing workflow:
1. Serve the site locally, then open `index.html?edit`, `setup.html?edit` or `portfolio.html?edit`.
2. Enter the password `root` when prompted, then click outlined copy and type. Drafts save in this browser and persist between editor visits. Add `?edit` separately when moving to another page.
3. Click **Export copy.json**. Replace the repository's `copy.json` with the download, commit it and deploy normally. Normal visitors only see the committed copy; the editor has no server write access.
4. Use **Discard local draft** to return to the committed text. This clears the draft across pages after confirmation.

`copy.json` is also directly editable in a text editor: keys match stable `data-copy` attributes in HTML. Do not rename existing IDs when changing wording. Text is inserted as plain text, preserving the surrounding design and preventing HTML injection. Update matching HTML when changing public copy if you need the no-JavaScript fallback to match. Rotating card descriptions stay in `moodboard-data.js`; links, image descriptions, navigation labels and structural edits remain in HTML. Theme labels and the dynamic year are not editable in Pencil mode.

The decorative opening title card runs once per tab session, closes automatically after 1.4 seconds and has no skip button. Reduced-motion visitors receive a still 0.65-second title card. Editing mode omits it. CSS also makes the normal card disappear if script execution stops after insertion. Soft one-time paper reveals use IntersectionObserver; content is visible without it. Motion follows reduced-motion settings; no audio, mouse trails or continuous parallax.

The reference image guided the kraft colour, handwritten headings and guitar area; it is not redistributed. Paper and tape are CSS, and fonts remain free Google Fonts with fallbacks. No AI-generated imagery was added.

`journal.css` is the final shared design layer. It adds handwritten accents, taped photos, a setup invitation, wrapping navigation, larger controls and focus outlines. The setup paper keeps warm ink colours in both themes, while surrounding navigation follows the existing theme setting. The PC card includes only supplied CPU/GPU/RAM facts; remaining specifications are intentionally blank. All four studio upgrades are explicitly planned.

Validation (2026-11-07): JavaScript syntax checks; `git diff --check`; all four HTML pages checked for local asset paths, fragment targets, duplicate IDs and image alt attributes. Browser reviewed the full desktop setup page and mobile layout at 375px; setup, homepage and workbench had no horizontal overflow. Theme switching and the homepage hold control worked. This is a focused accessibility review, not a full WCAG audit. No framework or build step was introduced.

Follow-up validation: supplied images load in their matching frames; desktop and 375px setup/home/workbench layouts reviewed without horizontal overflow. Pencil mode editing persisted across reload, and exporting copy.json produced a download. The opening title card appeared without a skip button and dismissed itself. Image fitting preserves complete guitar and product silhouettes. JavaScript syntax, local links/assets, copy IDs and diff whitespace checked again.

Pencil mode asks for `root` on every editor page visit. Cancel, Escape or an incorrect password never enables editing or loads the local draft. This is a client-side convenience gate, not secure authentication: the password is visible in the public source and can be bypassed. Publishing still requires repository access; real exclusive editor access would require server-side authentication.
