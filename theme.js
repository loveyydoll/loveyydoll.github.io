/* The personal archive has one permanent dark theme. */
document.documentElement.dataset.theme = 'dark';
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('night-mode');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#090D12');
  document.querySelectorAll('.theme-toggle').forEach(button => button.remove());
});
