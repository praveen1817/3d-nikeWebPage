/* ──────────────────────────────────────────────────────────────
   NAV.JS — Fixed navigation with scroll behavior + mobile menu
────────────────────────────────────────────────────────────── */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNav() {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!header) return;

  // ── Scroll-triggered header frosting (CSS class toggle — no GSAP filter) ──
  ScrollTrigger.create({
    start: 60,
    onEnter:     () => header.classList.add('frosted'),
    onLeaveBack: () => header.classList.remove('frosted'),
  });

  // ── Active section highlight via IntersectionObserver ──
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));

  // ── Mobile hamburger toggle ──
  let menuOpen = false;

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;

      if (menuOpen) {
        // Animate hamburger → X
        gsap.to(hamburger.querySelectorAll('.bar')[0], {
          rotation: 45,
          y: 7,
          duration: 0.3,
          ease: 'power2.inOut',
        });
        gsap.to(hamburger.querySelectorAll('.bar')[1], {
          opacity: 0,
          scaleX: 0,
          duration: 0.2,
        });
        gsap.to(hamburger.querySelectorAll('.bar')[2], {
          rotation: -45,
          y: -7,
          duration: 0.3,
          ease: 'power2.inOut',
        });

        // Open overlay
        mobileOverlay.style.display = 'flex';
        gsap.fromTo(
          mobileOverlay,
          { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.inOut' }
        );

        // Stagger mobile links
        gsap.fromTo(
          mobileLinks,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, delay: 0.3, duration: 0.5, ease: 'power3.out' }
        );

        document.body.style.overflow = 'hidden';
      } else {
        closeMobileMenu();
      }
    });

    // Close on link click
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => closeMobileMenu());
    });
  }

  function closeMobileMenu() {
    menuOpen = false;

    // Animate X → hamburger
    gsap.to(hamburger.querySelectorAll('.bar')[0], {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });
    gsap.to(hamburger.querySelectorAll('.bar')[1], {
      opacity: 1,
      scaleX: 1,
      duration: 0.2,
      delay: 0.1,
    });
    gsap.to(hamburger.querySelectorAll('.bar')[2], {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    gsap.to(mobileOverlay, {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        mobileOverlay.style.display = 'none';
        document.body.style.overflow = '';
      },
    });
  }
}
