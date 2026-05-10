/* ──────────────────────────────────────────────────────────────
   MAIN.JS — Lean init: no Three.js, simplified Lenis + GSAP
────────────────────────────────────────────────────────────── */

import './styles/reset.css';
import './styles/globals.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { runLoader }   from './loader.js';
import { initHero }    from './hero.js';
import { initAbout }   from './about.js';
import { initBuy }     from './buy.js';
import { initContact } from './contact.js';
import { initNav }     from './nav.js';
import { initCursor }  from './cursor.js';

// ── Register GSAP plugins ──
gsap.registerPlugin(ScrollTrigger);

// ── Lenis smooth scroll (tuned for performance) ──
const lenis = new Lenis({
  duration: 0.65,
  lerp: 0.1,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smoothTouch: false,
  syncTouch: false,
});

// ── Wire Lenis RAF → GSAP ticker (correct Lenis v1+ pattern) ──
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ── Sync ScrollTrigger on every Lenis scroll event ──
lenis.on('scroll', () => ScrollTrigger.update());

// ── Boot sequence ──
async function boot() {
  initCursor();
  initNav();

  try {
    await runLoader();
  } catch (e) {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }

  initHero();
  initAbout();
  initBuy();
  initContact();

  ScrollTrigger.refresh();

  // ── Change 8.1: Pause hero video when scrolled off-screen ──
  const heroVideo = document.getElementById('hero-bg');
  if (heroVideo && heroVideo.tagName === 'VIDEO') {
    const videoObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!heroVideo.ended) heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.1 });
    videoObs.observe(heroVideo);

    // ── Change 8.2: GPU compositing hint on mobile ──
    if (window.innerWidth < 768) {
      heroVideo.style.transform = 'translateZ(0)';
      heroVideo.playbackRate = 1.0;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// Change 6: Refresh ScrollTrigger after fonts finish loading
document.fonts.ready.then(() => {
  ScrollTrigger.refresh();
});

// Fix 7: Global video manager — only ONE video decodes at a time
window.addEventListener('load', () => {
  const videos = document.querySelectorAll('video');
  if (videos.length <= 1) return;

  const manager = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.ended) v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.15 });

  videos.forEach((v) => {
    v.pause();
    manager.observe(v);
  });
});
