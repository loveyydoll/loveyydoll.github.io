(() => {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-mode");
      toggle.setAttribute("aria-pressed", String(isLight));
      const label = toggle.querySelector(".theme-label");
      if (label) label.textContent = isLight ? "day mode" : "night mode";
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", isLight ? "#eee9df" : "#171613");
    });
  }
})();

/* Living Moodboard: curated, no third-party API calls or image scraping. */
(() => {
  const grid = document.querySelector('[data-living-moodboard]');
  const pauseButton = document.querySelector('#moodboard-pause');
  const shuffleButton = document.querySelector('#moodboard-shuffle');
  const items = window.LOVEYY_MOODBOARD_ITEMS;
  if (!grid || !pauseButton || !shuffleButton || !Array.isArray(items)) return;

  const tiles = Array.from(grid.querySelectorAll('a.archive-image'));
  if (!tiles.length || items.length <= tiles.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const INTERVAL_MS = 30000;
  let paused = reduceMotion.matches;
  let busy = false;
  let timer = null;
  let cursor = 0;
  // The initial HTML deliberately contains the first entries as a useful no-JS fallback.
  const active = tiles.map((_, index) => index);

  function updateControls() {
    pauseButton.textContent = paused ? 'play ▶' : 'pause Ⅱ';
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Resume image rotation' : 'Pause image rotation');
    grid.classList.toggle('moodboard-paused', paused);
  }

  function shouldRotate() {
    return !paused && !document.hidden && !grid.matches(':hover') && !grid.contains(document.activeElement);
  }

  function swapOne() {
    if (busy || !shouldRotate()) return;
    const available = items.map((_, index) => index).filter(index => !active.includes(index));
    if (!available.length) return;
    const slot = cursor++ % tiles.length;
    const next = available[Math.floor(Math.random() * available.length)];
    const item = items[next];
    const tile = tiles[slot];
    const image = tile.querySelector('img');
    const number = tile.querySelector('.archive-number');
    const title = tile.querySelector('.archive-title');
    const caption = tile.querySelector('.archive-caption');
    if (!image || !number || !title || !caption) return;
    busy = true;
    const preloaded = new Image();
    let settled = false;
    const watchdog = window.setTimeout(() => finish(false), 10000);
    function finish(ok) {
      if (settled) return;
      settled = true;
      window.clearTimeout(watchdog);
      if (ok && shouldRotate()) {
        tile.classList.add('moodboard-changing');
        image.src = item.url;
        image.alt = item.alt;
        image.style.visibility = '';
        tile.classList.remove('image-unavailable');
        tile.href = item.link;
        number.textContent = String(slot + 1).padStart(2, '0') + ' / ' + item.type;
        title.textContent = item.title;
        caption.textContent = item.caption + ' ↗';
        active[slot] = next;
        window.setTimeout(() => tile.classList.remove('moodboard-changing'), 650);
      }
      busy = false;
    }
    preloaded.onload = () => finish(true);
    preloaded.onerror = () => finish(false);
    preloaded.src = item.url;
  }

  function startTimer() {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(swapOne, INTERVAL_MS);
  }

  pauseButton.addEventListener('click', () => {
    paused = !paused;
    updateControls();
    startTimer();
  });
  shuffleButton.addEventListener('click', () => {
    // A manual shuffle is allowed even when the automatic rotation is paused.
    if (busy) return;
    const wasPaused = paused;
    paused = false;
    // Ignore hover/focus suppression only for this direct user action.
    const originalShouldRotate = shouldRotate;
    void originalShouldRotate;
    const available = items.map((_, index) => index).filter(index => !active.includes(index));
    if (available.length) {
      const slot = cursor++ % tiles.length;
      const next = available[Math.floor(Math.random() * available.length)];
      const item = items[next], tile = tiles[slot], image = tile.querySelector('img');
      busy = true;
      const preloaded = new Image();
      let settled = false;
      const watchdog = window.setTimeout(() => complete(false), 10000);
      function complete(ok) {
        if (settled) return;
        settled = true;
        window.clearTimeout(watchdog);
        if (ok && image) {
          tile.classList.add('moodboard-changing');
          image.src = item.url;
          image.alt = item.alt;
          image.style.visibility = '';
          tile.classList.remove('image-unavailable');
          tile.href = item.link;
          tile.querySelector('.archive-number').textContent = String(slot + 1).padStart(2, '0') + ' / ' + item.type;
          tile.querySelector('.archive-title').textContent = item.title;
          tile.querySelector('.archive-caption').textContent = item.caption + ' ↗';
          active[slot] = next;
          window.setTimeout(() => tile.classList.remove('moodboard-changing'), 650);
        }
        busy = false;
      }
      preloaded.onload = () => complete(true);
      preloaded.onerror = () => complete(false);
      preloaded.src = item.url;
    }
    paused = wasPaused;
    updateControls();
    startTimer();
  });
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', event => {
    paused = event.matches;
    updateControls();
  });
  updateControls();
  startTimer();
})();
