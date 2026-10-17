(() => {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
