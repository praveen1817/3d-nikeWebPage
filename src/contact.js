/* ──────────────────────────────────────────────────────────────
   CONTACT.JS — Change 5: IntersectionObserver + CSS from-left anim
   GSAP removed from enter animations.
────────────────────────────────────────────────────────────── */

export function initContact() {
  const section = document.getElementById('contact');
  if (!section) return;

  // ── IntersectionObserver for enter animations ──
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll('[data-anim]').forEach((el, i) => {
        el.style.animationDelay = (i * 0.1) + 's';
        el.classList.add('from-left', 'visible');
      });

      obs.disconnect();
    });
  }, { threshold: 0.1 });

  obs.observe(section);

  // ── Floating labels ──
  const formGroups = section.querySelectorAll('.form-group');
  formGroups.forEach((group) => {
    const input = group.querySelector('input, textarea');
    if (!input) return;
    const checkFilled = () => group.classList.toggle('filled', !!input.value.trim());
    input.addEventListener('focus', () => group.classList.add('active'));
    input.addEventListener('blur', () => { group.classList.remove('active'); checkFilled(); });
    input.addEventListener('input', checkFilled);
    checkFilled();
  });

  // ── Form submit ──
  const form = section.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit-btn span');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ MESSAGE SENT';
        setTimeout(() => { btn.textContent = orig; }, 3000);
      }
      form.reset();
      formGroups.forEach((g) => g.classList.remove('filled', 'active'));
    });
  }

  // ── Social icons — CSS hover handles scale via transform ──
  section.querySelectorAll('.social-icon').forEach((icon) => {
    icon.addEventListener('mouseenter', () => { icon.style.transform = 'scale(1.2)'; });
    icon.addEventListener('mouseleave', () => { icon.style.transform = ''; });
  });
}
