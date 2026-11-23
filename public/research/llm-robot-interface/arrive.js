// Runs in <head> before first paint. When the visitor arrives from the home
// page, cover the page in the home page's background colour and ease it away,
// so a dark home page brightens into the write-up instead of flashing white.
(() => {
  let from = null;
  try { from = sessionStorage.getItem('arrive-from'); sessionStorage.removeItem('arrive-from'); } catch (e) {}
  if (!from || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.style.setProperty('--arrive-from', from);
  root.classList.add('arriving');
  setTimeout(() => root.classList.remove('arriving'), 900);
})();
