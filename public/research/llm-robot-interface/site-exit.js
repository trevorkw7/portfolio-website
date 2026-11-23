// Links back to the home page fade this page to the home page's background
// (black or white, whichever theme the visitor last chose) before
// navigating, mirroring the fade the home page uses on the way in.
(() => {
  const EXIT_MS = 260;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const homeColor = () => {
    let t = null;
    try { t = localStorage.getItem('theme'); } catch (e) {}
    if (t !== 'light' && t !== 'dark') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return t === 'light' ? '#ffffff' : '#000000';
  };

  let veil = null;
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a');
    if (!a || a.target === '_blank' || a.getAttribute('href') !== '/') return;
    e.preventDefault();
    veil = document.createElement('div');
    veil.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:none;opacity:0;' +
      'background:' + homeColor() + ';transition:opacity ' + EXIT_MS + 'ms cubic-bezier(.4,0,.2,1)';
    document.body.appendChild(veil);
    void veil.offsetWidth; // commit the transparent start so the fade runs
    veil.style.opacity = '1';
    setTimeout(() => location.assign('/'), EXIT_MS);
  });

  // Back-forward cache can restore this page with the veil still up.
  addEventListener('pageshow', e => { if (e.persisted && veil) { veil.remove(); veil = null; } });
})();
