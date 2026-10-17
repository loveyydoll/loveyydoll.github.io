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