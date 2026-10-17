(() => {
  const themeToggle = document.querySelector("#themeToggle");
  const themeGlyph = themeToggle?.querySelector(".theme-glyph");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  const applyTheme = (isLight) => {
    document.body.classList.toggle("light-theme", isLight);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      themeToggle.setAttribute("aria-pressed", String(isLight));
    }
    if (themeGlyph) themeGlyph.textContent = isLight ? "☼" : "◐";
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("arpeggi-theme"); } catch { /* Storage can be unavailable. */ }
  applyTheme(savedTheme ? savedTheme === "light" : false);

  themeToggle?.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-theme");
    applyTheme(isLight);
    try { localStorage.setItem("arpeggi-theme", isLight ? "light" : "dark"); } catch { /* Theme still works for this visit. */ }
  });
})();
