(() => {
  const links = Array.from(document.querySelectorAll('.toc-rail a[href^="#"]'));
  const bar = document.querySelector('.read-progress');
  const targets = links
    .map((a) => ({ a, el: document.querySelector(a.getAttribute('href')) }))
    .filter((item) => item.el);

  let rafId = 0;
  const update = () => {
    rafId = 0;
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0;
      bar.style.width = pct.toFixed(1) + '%';
    }
    if (!targets.length) return;
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
    let active = targets[0];
    if (atBottom) {
      active = targets[targets.length - 1];
    } else {
      const threshold = Math.min(180, window.innerHeight * 0.25);
      for (const item of targets) {
        if (item.el.getBoundingClientRect().top <= threshold) {
          active = item;
        }
      }
    }
    for (const { a, el } of targets) {
      a.classList.toggle('is-active', el === active.el);
    }
  };

  const schedule = () => {
    if (!rafId) rafId = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  const openTargetDetails = () => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    const details = el?.closest('details');
    if (details) details.open = true;
  };
  window.addEventListener('hashchange', openTargetDetails);
  openTargetDetails();

  // Astranomy-style Full Results modal dialog
  const dlg = document.getElementById('full-results-dialog');
  if (dlg) {
    document.querySelectorAll('[data-open-ledger]').forEach((btn) => {
      btn.addEventListener('click', () => dlg.showModal());
    });
    dlg.querySelector('[data-close-ledger]')?.addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close();
    });
  }

  // Universal click-to-enlarge Lightbox for all figures & charts
  const imgs = Array.from(document.querySelectorAll('.paper figure img'));
  if (imgs.length) {
    const lb = document.createElement('dialog');
    lb.className = 'img-lightbox';
    lb.setAttribute('aria-label', 'Enlarged figure');
    lb.innerHTML =
      '<div class="img-lightbox-head"><button type="button" class="ledger-close" data-close-lb>Close</button></div>' +
      '<img class="img-lightbox-img" alt=""/>' +
      '<p class="img-lightbox-cap"></p>';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('.img-lightbox-img');
    const lbCap = lb.querySelector('.img-lightbox-cap');
    lb.querySelector('[data-close-lb]').addEventListener('click', () => lb.close());
    lb.addEventListener('click', (e) => {
      if (e.target === lb) lb.close();
    });
    imgs.forEach((img) => {
      img.title = 'Click to enlarge';
      img.addEventListener('click', () => {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || '';
        const cap = img.closest('figure')?.querySelector('figcaption');
        lbCap.textContent = cap ? cap.textContent.replace(/\s+/g, ' ').trim() : '';
        lb.showModal();
      });
    });
  }
  update();
})();
