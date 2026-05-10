/* ──────────────────────────────────────────────────────────────
   ABOUT.JS — Fix 6: Text slides from left, THEN video fades in
────────────────────────────────────────────────────────────── */

import gsap from 'gsap';

export function initAbout() {
  const section = document.getElementById('about');
  if (!section) return;

  const aboutBg = document.getElementById('about-bg');
  const heading = section.querySelector('.about-heading');
  const divider = section.querySelector('.divider-line');
  const quotes  = section.querySelectorAll('.quote-block');
  const pills   = section.querySelectorAll('.pill');
  const buyBtn  = section.querySelector('.btn-primary');

  // All text elements start hidden — slide in from left on enter
  const textEls = [heading, divider, ...quotes, ...pills, buyBtn].filter(Boolean);
  gsap.set(textEls, { opacity: 0, x: -60 });

  // Keep about video paused until section enters view
  if (aboutBg) aboutBg.pause();

  // Main entry observer — fires once
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // SEQUENCE:
      // t=0.0s  — section enters, BLACK bg (video hidden)
      // t=0.0s+ — text elements slide in with 0.12s stagger
      // t=1.5s  — video starts fading in behind text

      const tl = gsap.timeline();

      textEls.forEach((el, i) => {
        tl.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, i * 0.12);
      });

      if (aboutBg) {
        aboutBg.play().catch(() => {});
        tl.to(aboutBg, {
          opacity: 1,
          duration: 1.4,
          ease: 'power2.inOut',
        }, 1.5);
      }

      obs.disconnect();
    });
  }, { threshold: 0.2 });

  obs.observe(section);

  // Buy Now scroll
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
