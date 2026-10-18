(() => {
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const night = document.body.classList.toggle('night-mode');
    toggle.setAttribute('aria-pressed', String(night));
    toggle.querySelector('.theme-label').textContent = night ? 'paper mode' : 'night mode';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? '#231f23' : '#f0e9dc');
  });
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hold = document.querySelector('#hold-pages');
  document.querySelectorAll('[data-scrapbook]').forEach((board, boardIndex) => {
    const pool = window.LOVEYY_SCRAPBOOKS?.[board.dataset.scrapbook];
    const tiles = [...board.querySelectorAll('.scrap')];
    if (!pool?.length || !tiles.length) return;
    const active = tiles.map(tile => pool.findIndex(item => tile.querySelector('img').getAttribute('src') === item.url));
    const failed = new Set();
    let cursor = 0;
    let busy = false;
    async function turnPage() {
      if (busy || document.hidden || hold?.checked) return;
      const slots = tiles.map((_, i) => (cursor + i) % tiles.length).filter(i => !tiles[i].contains(document.activeElement));
      const candidates = pool.map((_, i) => i).filter(i => !active.includes(i) && !failed.has(i));
      if (!slots.length || !candidates.length) return;
      busy = true;
      const slot = slots[0];
      const next = candidates[Math.floor(Math.random() * candidates.length)];
      const item = pool[next];
      const preload = new Image();
      try {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(Error('Image timeout')), 6000);
          preload.onload = () => { clearTimeout(timeout); resolve(); };
          preload.onerror = () => { clearTimeout(timeout); reject(Error('Image unavailable')); };
          preload.src = item.url;
        });
        if (document.hidden || hold?.checked || tiles[slot].contains(document.activeElement)) return;
        const tile = tiles[slot];
        const image = tile.querySelector('img');
        image.src = item.url;
        image.alt = item.alt;
        tile.href = item.link;
        tile.querySelector('.scrap-meta').textContent = `fragment ${String(slot + 1).padStart(2, '0')} / ${item.type.toLowerCase()}`;
        tile.querySelector('.scrap-title').textContent = item.title;
        tile.querySelector('.scrap-caption').textContent = item.caption + ' ↗';
        if (!reduced.matches) {
          tile.classList.remove('page-turn');
          void tile.offsetWidth;
          tile.classList.add('page-turn');
        }
        active[slot] = next;
        cursor = (slot + 1) % tiles.length;
      } catch { failed.add(next); } finally { busy = false; }
    }
    // Start automatically. Hover never blocks the scrapbook; focused links stay stable.
    setTimeout(turnPage, 2200 + boardIndex * 1300);
    setInterval(turnPage, 6500 + boardIndex * 900);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) turnPage(); });
  });
})();
