// 서브페이지 공통: [data-reveal] 블러+상승 리빌 (Landing과 동일 결)
window.dvReveal = function (root) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.__dvIO) {
    window.__dvIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target; window.__dvIO.unobserve(el);
      el.style.opacity = '';
      const big = el.hasAttribute('data-reveal-panel');
      el.animate([
        { opacity: 0, transform: big ? 'scale(0.955)' : 'translateY(28px)', filter: 'blur(10px)' },
        { opacity: 1, transform: 'none', filter: 'blur(0)' }
      ], { duration: 900, delay: +el.dataset.delay || 0, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  }
  (root || document).querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => {
    el.setAttribute('data-rv', '');
    if (reduce) return;
    el.style.opacity = '0';
    window.__dvIO.observe(el);
  });
};
window.dvScrollTo = function (id, offset) {
  const el = document.getElementById(id); if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - (offset == null ? 132 : offset);
  window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
};
