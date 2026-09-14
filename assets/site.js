(() => {
  const body = document.body;
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      nav.setAttribute('aria-hidden', String(!open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
      toggle?.setAttribute('aria-expanded', 'false');
      nav?.setAttribute('aria-hidden', 'true');
      toggle?.focus();
    }
  });

  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    const updateVisibility = () => backToTop.classList.toggle('is-visible', window.scrollY > 700);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const current = location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const target = new URL(link.href, location.origin).pathname.replace(/\/+$/, '') || '/';
    if (target === current) link.setAttribute('aria-current', 'page');
  });

  document.querySelectorAll('a[href="/documents/constitution-of-apuk-youth-for-change.docx"]').forEach((link) => {
    link.href = '/constitution/';
    link.textContent = 'Read Constitution';
  });
})();
