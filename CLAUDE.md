# CLAUDE.md

## Project Overview
This repository contains a production-quality, original clone of the canonical Airbnb listing page built with Next.js 14 App Router, Tailwind CSS, and pure JavaScript.

---

## Core Guidelines & Architectural Rules

### 1. Technology & Language Constraints
- **Pure JavaScript Only**: Use `.js` and `.jsx` exclusively. Never introduce TypeScript (`.ts`, `.tsx`, or `@types/*` dependencies).
- **Framework**: Next.js 14 App Router (`app/layout.js`, `app/page.js`, `app/photo-tour/page.js`).
- **Styling**: Tailwind CSS with custom Airbnb design tokens defined in `tailwind.config.js`.
- **Icons**: `lucide-react` for UI icons.

### 2. React & Next.js Conventions
- Prefer **React Server Components (RSC)** by default for static sections (layout, static descriptions, footer).
- Isolate `"use client"` exclusively to components requiring user interaction or client state:
  - `components/property/ListingPageClient.jsx`
  - `components/property/BookingCard.jsx`
  - `components/lightbox/Lightbox.jsx`
  - `components/gallery/PhotoTour.jsx`
  - `components/property/Amenities.jsx`
  - `components/layout/Header.jsx`
- Use Next.js `<Image />` for optimized image rendering with descriptive `alt` tags and responsive `sizes`.

### 3. Design Tokens & Visual Fidelity
- **Brand Red / Rausch**: `#FF385C` (Hover: `#E00B41`)
- **Primary Text**: `#222222` (Charcoal Black)
- **Muted Text**: `#717171` (Cool Gray)
- **Borders**: `#EBEBEB` (Dividers), `#DDDDDD` (Cards/Pills), `#B0B0B0` (Inputs)
- **Backgrounds**: `#FFFFFF` (Surface), `#F7F7F7` (Pills/Hover)
- **Target Desktop Viewports**: 1440×900, 1536×864, and 1920×1080.

### 4. Accessibility (WCAG 2.1 AA)
- **Focus Management**: Trap focus within open modal dialogs (`Lightbox`, `AmenitiesModal`) and restore focus to trigger buttons on dismissal.
- **Scroll Lock**: Use scrollbar width compensation (`useBodyScrollLock.js`) to prevent layout jump when locking background scrolling.
- **Keyboard Controls**: Support `Escape` (dismiss), `ArrowLeft`/`ArrowRight` (lightbox photo navigation), `Tab`/`Shift+Tab` (focus trapping), `Enter`/`Space` (activation).
- **Semantic HTML & ARIA**: Use proper heading hierarchy (`h1` -> `h2` -> `h3`), `role="dialog"`, `aria-modal="true"`, and `aria-label` for icon-only buttons.
- **Reduced Motion**: Honor `@media (prefers-reduced-motion: reduce)` in `globals.css`.

---

## Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```
