/* ──────────────────────────────────────────────────────────────
   LOADER.JS — Full-screen seqwebp1 bg + pentagram/brand drop
────────────────────────────────────────────────────────────── */

import gsap from 'gsap';

export function runLoader() {
  return new Promise((resolve) => {
    const loader       = document.getElementById('loader');
    const loaderTop    = document.getElementById('loader-top');
    const loaderBottom = document.getElementById('loader-bottom');
    const loaderBg     = document.getElementById('loader-bg');
    const loaderOverlay= document.getElementById('loader-overlay');
    const pentagram    = document.getElementById('loader-pentagram');
    const brand        = document.getElementById('loader-brand');
    const text         = document.getElementById('loader-text');
    const line         = document.getElementById('loader-line');

    if (!loader) { resolve(); return; }

    const tl = gsap.timeline();

    // ── Step 1: Full-screen shoe image fades in (0–600ms) ──
    tl.to(loaderBg, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(loaderOverlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, '<')

    // ── Step 2: Pentagram drops from top (600ms–1300ms) ──
    .fromTo(pentagram,
      { y: -200, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
      '-=0.1'
    )

    // ── Step 3: Brand name + tagline fade in (1300ms–2000ms) ──
    .fromTo(brand,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo(text,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(line,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'center center' },
      '-=0.1'
    )

    // ── Step 4: Hold for impact (2000–2400ms) ──
    .to({}, { duration: 0.4 })

    // ── Step 5: Loader panels split (2400–3000ms) ──
    .to([loaderTop, loaderBottom], {
      y: (i) => (i === 0 ? '-100%' : '100%'),
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        resolve();
      },
    });
  });
}
