# Hosting on Cloudflare Pages

This is a static site. GitHub Pages and Cloudflare Pages can serve the same files.

In Cloudflare Pages, connect `loveyydoll/loveyydoll.github.io`, select the branch containing the redesign, and choose **None** as the framework preset. Set the build command to `exit 0` and set the output directory to `/` (the repository root). No environment variables, server, dependencies or API keys are required.

Use the generated preview URL before connecting a custom domain. Hosting setup is separate from this code change; no Cloudflare deployment has been created by this PR.

The home page is `index.html`; the artist collection is `artists.html`. Search runs in the browser. Existing content remains in `archive.html`, `setup.html` and `portfolio.html`, with image attribution in `image-credits.html`. Artist portraits use existing local assets; artists without a supplied portrait use a deliberate typographic card.

Reference: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
