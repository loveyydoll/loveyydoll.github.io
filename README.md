# Loveyy’s website

A coding-first portfolio with a separate personal scrapbook archive. It is a static, multi-page site built with HTML, CSS, and JavaScript.

**Live site:** [loveyydoll.github.io](https://loveyydoll.github.io)

## Page map

| Page | Purpose |
| --- | --- |
| `index.html` | Coding-focused homepage, developer profile, stack, and interests |
| `portfolio.html` | Public project notes and coding workbench |
| `archive.html` | Personal scrapbook: music, films, games, and other inspirations |
| `artists.html` | Searchable listening collection |
| `setup.html` | Personal desk and setup journal |
| `image-credits.html` | Credits for third-party artwork and photography |

The coding portfolio is the front door. Personal interests stay available through the archive, with routes back to the coding home from the archive pages.

## Source layout

```text
index.html                 Coding-focused home
portfolio.html             Project case studies and workbench
archive.html               Personal archive
artists.html               Listening collection
setup.html                 Setup journal
image-credits.html         Image credits
assets/
  css/coding.css           Shared design system for the coding pages
  js/coding.js             Theme preference and toggle
  scrapbook/               Local scrapbook imagery
  setup/                   Setup journal imagery
copy.json                  Optional local-copy editing data
moodboard-data.js           Data for rotating archive tiles
```

The archive retains its own visual layer: `styles.css`, `scrapbook.css`, `theme.css`, and `journal.css`. The coding home and workbench share `assets/css/coding.css` and `assets/js/coding.js`.

## Design and accessibility

- Responsive layouts with semantic landmarks and a skip link
- Light and dark themes; the coding pages follow the system preference by default and remember a manual choice in this browser
- Reduced-motion preferences are respected
- The artwork remains credited on the site; no ownership of third-party work is claimed

## Local preview

Open `index.html` directly, or serve the repository root with any static web server. There is no package installation or build step.

GitHub Pages publishes the static site from the repository. Keep relative links and asset paths working when editing pages.

## Editing content

Keep public project descriptions factual and label work clearly. Personal archive content is maintained on its own pages so the coding portfolio can stay focused.
