# Website audit and redesign notes

Date: 2026-10-17
Repository: https://github.com/loveyydoll/loveyydoll.github.io

## Summary

The original site was a single large HTML document containing page structure, a substantial inline stylesheet, and JavaScript, alongside a second stylesheet with overlapping rules. This makes visual changes difficult to reason about and increases the chance that one style silently overrides another.

## Findings from source inspection

- **Structure and styling are coupled:** much of the page CSS lived in `index.html`; `custom silly stuff.css` repeated styling for body, containers, dark mode, buttons, and content panels.
- **Malformed favicon markup:** the favicon link began with an extra `<!`, so it was not a valid HTML link element.
- **Fragile visual state management:** dark-mode styles were applied through several class combinations across body and child elements, creating a lot of state-specific CSS.
- **Inline styling:** multiple content elements used inline style attributes, making global adjustments and responsive behavior harder.
- **Placeholder social content:** the homepage contained hard-coded “latest X posts” and dates. Static snippets can become stale and can be mistaken for live embeds.
- **Accessibility opportunities:** social links opened new tabs without consistently declaring `rel`; several interactive tabs required additional state management; the redesign adds a skip link, semantic navigation and sections, visible focus styles, accessible theme toggle labels, and reduced-motion handling.
- **External dependencies:** the old page used Font Awesome and Google Fonts. The redesign removes Font Awesome in favor of text/CSS marks, while retaining Google Fonts as progressive enhancement; system fallbacks remain available.
- **Maintainability:** the old stylesheet duplicated some rules and had multiple responsive breakpoints modifying the same components.

## Changes in this redesign

- Rebuilt the page around semantic sections: hero, projects, listening moodboard, about, and footer.
- Split files into `index.html`, `styles.css`, and `script.js`.
- Added direct repository cards for Aetherband and JigsawEngine. Both are labelled as in development, and repository links are the source of truth for status.
- Introduced an editorial, grain-inspired, night-listening visual direction with warm neutrals, muted rose, acid-lime accents, serif italics, and restrained motion.
- Replaced fabricated-looking static X post previews with an honest outbound profile link.
- Added responsive layouts, keyboard focus states, a skip link, reduced-motion support, accessible external links, and a theme toggle that works even if localStorage is unavailable.
- Fixed the favicon link and dynamic footer year.

## Verification limits

This change was prepared through the GitHub repository API. No browser-based visual regression, assistive-technology test, or local HTML/CSS/JavaScript test has been run here. The page should be checked at mobile and desktop widths after deployment. The Spotify link currently points to Spotify's homepage because a specific public profile/playlist URL was not confirmed; replace it with a confirmed link when available.
