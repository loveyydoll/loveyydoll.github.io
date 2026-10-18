/* Resolve the theme before styles paint, then share it across pages and tabs. */
(() => {
  const root = document.documentElement;
  const key = 'loveyy-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { const value = localStorage.getItem(key); if (value === 'light' || value === 'dark') saved = value; } catch {}
  function apply(theme) {
    root.dataset.theme = theme;
    document.body?.classList.toggle('night-mode', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#292720' : '#f3eddf');
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      const label = button.querySelector('.theme-label');
      if (label) label.textContent = theme === 'dark' ? 'light mode' : 'dark mode';
    });
  }
  apply(saved || (system.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelectorAll('.theme-toggle').forEach(button => button.addEventListener('click', () => {
      saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, saved); } catch {}
      apply(saved);
    }));
  });
  system.addEventListener('change', () => { if (!saved) apply(system.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    saved = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
    apply(saved || (system.matches ? 'dark' : 'light'));
  });
})();
