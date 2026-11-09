(() => {
  const root = document.documentElement;
  const button = document.querySelector('[data-theme-toggle]');
  const saved = (() => { try { return localStorage.getItem('loveyy-theme'); } catch { return null; } })();
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.dataset.theme = saved || preferred;
  function updateButton() {
    if (!button) return;
    const dark = root.dataset.theme === 'dark';
    button.textContent = dark ? '☼ light' : '☾ dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  updateButton();
  button?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('loveyy-theme', root.dataset.theme); } catch {}
    updateButton();
  });
})();
