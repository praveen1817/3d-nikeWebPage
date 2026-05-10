# SATAN AIR — BORN FROM DARKNESS

> **Nike Air Max 97 × Hell Edition** — A premium 3D branding website concept. Limited to 666 pairs worldwide.

![Hero Preview](./webp/seqwebp1.webp)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Bundler | Vite (vanilla JS) |
| 3D / WebGL | Three.js r0.158.0 |
| Animation | GSAP 3.12 + ScrollTrigger |
| Smooth Scroll | @studio-freight/lenis v1.0 |
| Text Tokenizer | Splitting.js |
| Fonts | Cinzel Decorative + Inter (Google Fonts) |
| Assets | WebP only (seqwebp1.webp, final.webp) |

---

## Project Structure

```
shoeDesign/
├── index.html               ← Full HTML with all sections + semantic markup
├── vite.config.js           ← Vite config (code splitting, public dir)
├── package.json
│
├── public/
│   ├── pentagram.svg        ← Reusable pentagram icon (favicon + cursor)
│   └── assets/
│       ├── seqwebp1.webp    ← Hero shoe falling image (loader + hero)
│       └── final.webp       ← About/Buy section splash image
│
├── src/
│   ├── main.js              ← Entry: Lenis, GSAP register, ScrollTrigger, boot
│   ├── loader.js            ← Phase 1/2/3 cinematic intro sequence
│   ├── hero.js              ← Three.js particle scene + hero animations
│   ├── about.js             ← About scroll-triggered reveal animations
│   ├── buy.js               ← Product card, size selector, counter
│   ├── contact.js           ← Form floating labels + social hover
│   ├── nav.js               ← Fixed nav scroll + mobile hamburger
│   ├── cursor.js            ← Custom SVG pentagram cursor
│   └── styles/
│       ├── reset.css        ← CSS reset + custom properties
│       └── globals.css      ← Typography, components, all section layouts
│
└── webp/                    ← Original asset source folder
    ├── seqwebp1.webp
    └── final.webp
```

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--clr-bg` | `#000000` | Pure black background |
| `--clr-surface` | `#0a0a0a` | Card/section surfaces |
| `--clr-red` | `#8B0000` | Primary accent (deep blood red) |
| `--clr-red-viv` | `#CC0000` | Hover/active states |
| `--clr-gold` | `#B8860B` | Luxury secondary accent |
| `--clr-text` | `#E8E8E8` | Primary text |
| `--clr-muted` | `#666666` | Secondary text |
| `--clr-border` | `rgba(139,0,0,0.3)` | Subtle red borders |

---

## Sections

### 1. Loader (Cinematic Intro)
Three-phase entry sequence:
- **Phase 1 (0–1200ms):** Pentagram SVG drops from top with `back.out` ease → "LUKE 10:18" text fades in → red line draws left-to-right
- **Phase 2 (1200–2200ms):** `seqwebp1.webp` shoe falls into frame at `power4.out` with scale bounce
- **Phase 3 (2200–2800ms):** Screen splits — top panel slides up, bottom panel slides down revealing the hero

### 2. Hero (`#home`)
- **Three.js WebGL canvas:** 2000 blood-red floating particles (500 on mobile) with mouse parallax
- **Splitting.js char animation:** "BORN FROM DARKNESS" animates in character by character
- **Hero shoe:** Fixed center-bottom with drop-shadow, hover rock effect
- **Scroll behavior:** Shoe subtly rises as you scroll

### 3. About (`#about`)
- **Image reveal:** `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` wipe with Ken Burns scale settle
- **Corner accents:** SVG stroke-dashoffset animation draws red corner lines
- **Quotes:** 3 quote blocks stagger in from left on scroll
- **Spec pills:** `HELL EDITION | LIMITED 666 PAIRS | AIR MAX 97 BASE`

### 4. Buy (`#buy`)
- **Card entrance:** `rotateX(15deg)` perspective flip on scroll enter
- **3D hover:** Card tilts toward mouse cursor on `mousemove`
- **Stock counter:** Counts down 666 → 641 over 3 seconds via GSAP on scroll enter
- **Size selector:** US 6–15 pill grid with active state toggle

### 5. Contact (`#contact`)
- **Floating labels:** Inputs with animated label float on focus/fill
- **Social icons:** Instagram, TikTok, X with GSAP scale hover
- **Submit feedback:** "SUMMON" → "✓ MESSAGE SENT" animation

---

## Navigation
- **Fixed header:** Transparent → `rgba(0,0,0,0.9) + blur(20px)` at 60px scroll
- **Active section:** IntersectionObserver highlights current nav link with red underline draw
- **Mobile:** Hamburger → X morph via GSAP, full-screen overlay with stagger links

---

## Custom Cursor
- SVG pentagram (32px) with GSAP `quickSetter` for zero-lag tracking
- Red dot follower with instant position
- Scale + opacity change on interactive element hover
- Hidden on touch devices

---

## Performance
| Rule | Implementation |
|------|---------------|
| Particle count | 2000 desktop / 500 mobile |
| Pixel ratio | `Math.min(devicePixelRatio, 2)` |
| `will-change` | Applied during animation, removed `onComplete` |
| Image loading | `eager` hero only, `lazy` all others |
| Mobile blur | `backdrop-filter` disabled on mobile |
| CSS containment | `contain: layout style` per section |
| Code splitting | Vite splits `three`, `gsap`, `lenis` into separate chunks |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Changelog

### v1.0.0 — 2026-05-10
- Initial build: Full 5-section premium branding website
- Three.js WebGL particle scene with mouse parallax
- GSAP 3-phase cinematic loader
- Lenis smooth scroll with ScrollTrigger proxy integration
- Splitting.js char animations on all headings
- Custom SVG pentagram cursor with GSAP quickSetter
- Mobile-responsive layout with hamburger nav
- Product card with 3D perspective entrance and hover tilt
- Stock counter animation (666 → 641)
- Floating label contact form
- Full semantic HTML with ARIA attributes
- WebP-only assets for performance
