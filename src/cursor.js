/* ──────────────────────────────────────────────────────────────
   CURSOR.JS — Custom pentagram cursor
────────────────────────────────────────────────────────────── */

import gsap from 'gsap';

export function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  if (!cursor || !cursorDot) return;

  // Check for touch/mobile — hide custom cursor
  if (window.matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  // Use GSAP quickSetter for max performance
  const xSetter = gsap.quickSetter(cursor, 'x', 'px');
  const ySetter = gsap.quickSetter(cursor, 'y', 'px');
  const dotXSetter = gsap.quickSetter(cursorDot, 'x', 'px');
  const dotYSetter = gsap.quickSetter(cursorDot, 'y', 'px');

  let mouseX = 0;
  let mouseY = 0;
  let curX = 0;
  let curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    dotXSetter(mouseX - 4);
    dotYSetter(mouseY - 4);
  });

  // Main cursor follows with lerp
  gsap.ticker.add(() => {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    xSetter(curX - 16);
    ySetter(curY - 16);
  });

  // Interactive element hover effects
  const interactiveEls = document.querySelectorAll(
    'a, button, .btn-primary, .btn-outline, .size-btn, .pill, .social-icon, input, textarea, .nav-link'
  );

  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 1.8,
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, { scale: 0, duration: 0.2 });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, { scale: 1, duration: 0.2 });
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    gsap.to(cursor, { scale: 0.8, duration: 0.1 });
  });

  document.addEventListener('mouseup', () => {
    gsap.to(cursor, { scale: 1, duration: 0.2, ease: 'back.out(3)' });
  });

  // Show cursor when mouse enters window
  document.addEventListener('mouseenter', () => {
    gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.3 });
  });
  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, cursorDot], { opacity: 0, duration: 0.3 });
  });
}
