/* ──────────────────────────────────────────────────────────────
   HERO.JS — Text drops from top, video starts from frame 0 at t=2s
────────────────────────────────────────────────────────────── */

import gsap from 'gsap';

export function initHero() {
  const heroBg      = document.getElementById('hero-bg');
  const heroHeading = document.getElementById('hero-heading');
  const heroSub     = document.getElementById('hero-sub');
  const heroCta     = document.getElementById('hero-cta');

  // ── Ensure video does NOT autoplay — we control it entirely ──
  if (heroBg) {
    heroBg.pause();
    heroBg.currentTime = 0;
  }

  // SEQUENCE (all times relative to initHero call, which runs after loader):
  // t=0.0s  — pure BLACK screen, video paused at frame 0
  // t=0.2s  — heading falls from TOP of viewport to center
  // t=0.7s  — subtitle fades up from below
  // t=1.0s  — button fades up from below
  // t=2.0s  — video starts from frame 0, fades in full-screen
  // t=3.4s  — video fully visible

  const tl = gsap.timeline();

  // Step 1: heading drops from high above (well outside viewport top)
  if (heroHeading) {
    gsap.set(heroHeading, { opacity: 0, y: -300 });
    tl.to(heroHeading, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power4.out',   // fast drop, decelerates naturally
    }, 0.2);                 // starts at 0.2s on the timeline
  }

  // Step 2: subtitle fades up
  if (heroSub) {
    gsap.set(heroSub, { opacity: 0, y: 30 });
    tl.to(heroSub, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
    }, 0.7);                 // starts at 0.7s
  }

  // Step 3: button fades up
  if (heroCta) {
    gsap.set(heroCta, { opacity: 0, y: 20 });
    tl.to(heroCta, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 1.0);                 // starts at 1.0s
  }

  // Step 4: rewind video to frame 0, start playing, then fade in
  if (heroBg) {
    tl.call(() => {
      heroBg.currentTime = 0;          // rewind to frame 0 — always starts fresh
      heroBg.play().catch(() => {});   // start playing from beginning
    }, [], 1.95);                      // called 0.05s before the fade starts

    tl.to(heroBg, {
      opacity: 1,
      duration: 1.4,
      ease: 'power2.inOut',
    }, 2.0);                           // fade starts at exactly 2.0s

    // Free GPU after fade completes
    tl.call(() => heroBg.classList.add('loaded'), [], 3.5);
  }

  // CTA scroll to about section
  if (heroCta) {
    heroCta.addEventListener('click', () => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Pause/resume video as hero enters/leaves viewport
  if (heroBg) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) heroBg.play().catch(() => {});
        else heroBg.pause();
      });
    }, { threshold: 0.1 });
    obs.observe(heroBg);
  }
}
