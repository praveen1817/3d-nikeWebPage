/* ──────────────────────────────────────────────────────────────
   BUY.JS — Updated to handle buy-bg video playing once and pausing at end
────────────────────────────────────────────────────────────── */

import gsap from 'gsap';

export function initBuy() {
  const section = document.getElementById('buy');
  if (!section) return;

  const buyBg = document.getElementById('buy-bg');
  const buyCardVideo = document.getElementById('buy-card-video');
  const stockEl = section.querySelector('.stock-count');

  if (buyBg) buyBg.pause();
  if (buyCardVideo) buyCardVideo.pause();

  // ── IntersectionObserver for enter animations ──
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Animate all data-anim elements with CSS classes
      entry.target.querySelectorAll('[data-anim]').forEach((el, i) => {
        el.style.animationDelay = (i * 0.1) + 's';
        el.classList.add('from-left', 'visible');
      });

      // Stock counter — keep GSAP for number tween
      if (stockEl) {
        const obj = { val: 666 };
        gsap.to(obj, {
          val: 641,
          duration: 2.5,
          ease: 'power1.inOut',
          onUpdate: () => { stockEl.textContent = Math.round(obj.val); },
        });
      }

      if (buyBg) {
        buyBg.play().catch(() => {});
        gsap.to(buyBg, { opacity: 1, duration: 1.4, ease: 'power2.inOut', delay: 0.5 });
      }

      if (buyCardVideo) {
        buyCardVideo.play().catch(() => {});
      }

      obs.disconnect();
    });
  }, { threshold: 0.1 });

  obs.observe(section);

  // ── Size selector ──
  const sizeBtns = section.querySelectorAll('.size-btn');
  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── ADD TO CART feedback ──
  const cartBtn = section.querySelector('.add-to-cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      const spanEl = cartBtn.querySelector('span');
      const orig = spanEl.textContent;
      spanEl.textContent = '✓ ADDED';
      setTimeout(() => { spanEl.textContent = orig; }, 2000);
    });
  }
}
