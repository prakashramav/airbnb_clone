# Airbnb Listing Page Clone

An original, production-quality, desktop-optimized clone of the canonical Airbnb listing page built with Next.js App Router, JavaScript, and Tailwind CSS. Engineered for visual fidelity, performance, and accessibility (WCAG 2.1 AA).

---

## Overview
This project delivers an authentic reproduction of the modern desktop Airbnb listing experience. It encompasses the 5-photo hero gallery, dedicated Photo Tour view, full-screen Lightbox viewer with focus trapping, interactive sticky reservation widget with real-time price arithmetic, categorized amenities modal dialog, and comprehensive review and host profiles.

---

## Key Features

- **Desktop Listing Page:**
  - Sticky header with Airbnb brand identity, compact search widget, and user profile menu.
  - Property header with dynamic star rating, review count, guest favorite badge, and interactive Share (copy to clipboard) and Save (heart toggle) buttons.
  - Canonical 5-photo hero gallery with subtle hover darkening, corner radii rounding, and floating "Show all photos" trigger.
  - Two-column responsive desktop layout (details & highlights on left; sticky booking card on right).
  - Editorial description with collapsible "Show more" / "Show less" toggle.
  - Sleeping arrangements previewing all 4 bedrooms with bed iconography.
  - Categorized amenities section with 10 preview items and a full modal dialog showcasing all 45 amenities.
  - Sticky reservation card with dynamic check-in/checkout dates, guest counter dropdown (adults & children), and live price calculations.
  - Reviews section with 6 category progress bars and verified guest testimonial cards.
  - Host section showcasing Superhost credentials, response times, and AirCover security notice.
  - Location section with a stylized interactive map preview and neighborhood proximity guide.
  - Desktop footer with comprehensive navigation columns and currency/language controls.

- **Photo Tour (`/photo-tour` route & modal overlay):**
  - Dedicated full-screen photo tour view.
  - Categorized navigation filters (All, Exterior & Grounds, Living room, Kitchen & Dining, Bedrooms, Bathrooms).
  - High-resolution photography with room captions.
  - Direct click-to-open lightbox integration for any image.

- **Lightbox Modal:**
  - Immersive full-screen viewer with dark backdrop (`bg-black/95`).
  - Centered high-resolution image stage preserving natural aspect ratios.
  - Live photo counter (`X / Y`) with screen reader live region announcements.
  - Previous (`<`) and Next (`>`) navigation controls.
  - Full keyboard control (`ArrowLeft`, `ArrowRight`, `Escape`).
  - Circular focus trap preventing focus from escaping the modal.
  - Focus restoration returning focus to the thumbnail that opened the viewer.
  - Body scroll lock with scrollbar width compensation to eliminate layout shift.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript (ES6+ throughout, no TypeScript per requirements)
- **Styling:** Tailwind CSS with custom Airbnb design tokens
- **Icons:** Lucide React
- **State & Lifecycle:** React (`useState`, `useEffect`, `useRef`, `useCallback`)
- **Data:** Centralized local datasets (`data/property.js`, `data/photos.js`)
- **Linting:** ESLint (`next/core-web-vitals`)

---

## Project Structure

```
PlayPower Assignment/
├── app/
│   ├── layout.js              # Root layout with SEO metadata & smooth scrolling
│   ├── page.js                # Server Component entry for listing page
│   ├── globals.css            # Tailwind directives, focus rings, reduced-motion
│   └── photo-tour/
│       └── page.js            # Dedicated Photo Tour route
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx         # Sticky top brand header with search pill & user menu
│   │   └── Footer.jsx         # Desktop multi-column footer with legal & currency
│   ├── property/
│   │   ├── ListingPageClient.jsx # Client orchestration for modals and layout
│   │   ├── PropertyHeader.jsx    # H1 title, badges, share link & save toggle
│   │   ├── PropertyDetails.jsx   # Capacities, host avatar, highlights
│   │   ├── Description.jsx       # Editorial space description with expander
│   │   ├── SleepingArrangements.jsx # Bedroom cards with bed icons
│   │   ├── Amenities.jsx         # Top 10 preview & full 45-item dialog modal
│   │   ├── BookingCard.jsx       # Sticky reservation card with dynamic math
│   │   ├── ReviewsSection.jsx    # Ratings breakdown bars & review cards
│   │   ├── HostSection.jsx       # Host bio, response times, AirCover notice
│   │   └── LocationSection.jsx   # Stylized map preview & proximities
│   ├── gallery/
│   │   ├── PhotoGrid.jsx      # 5-photo hero gallery with floating button
│   │   ├── PhotoTour.jsx      # Categorized full-screen gallery view
│   │   └── GalleryImage.jsx   # Accessible Next.js image button component
│   ├── lightbox/
│   │   ├── Lightbox.jsx       # Accessible modal with focus trap & keyboard nav
│   │   ├── LightboxControls.jsx # Prev, Next, and Close accessible buttons
│   │   └── ImageCounter.jsx   # Screen-reader polite live region counter
│   └── ui/
│       ├── Button.jsx         # Reusable button with Airbnb variants
│       └── IconButton.jsx     # Reusable icon button
│
├── data/
│   ├── property.js            # Structured property metadata & reviews
│   └── photos.js              # Curated high-res listing images & captions
│
├── hooks/
│   ├── useLightbox.js         # Lightbox index and toggle state
│   ├── useKeyboardNavigation.js # Escape, Arrow keys, and Tab focus trap
│   └── useBodyScrollLock.js   # Body scroll lock with scrollbar shift compensation
│
├── utils/
│   └── gallery.js             # Photo categorization, currency & index utilities
│
├── docs/
│   ├── REFERENCE_ANALYSIS.md  # Exhaustive visual & behavioral analysis
│   ├── ARCHITECTURE.md        # Production-scale distributed system design
│   ├── ACCESSIBILITY.md       # WCAG 2.1 AA audit & keyboard checklist
│   ├── VISUAL_QA.md           # Component comparison matrix & remediation
│   ├── AI_WORKFLOW.md         # Multi-agent development methodology
│   ├── architecture-diagram.png # High-res architecture visual diagram
│   └── architecture-diagram.pdf # High-res architecture diagram PDF
│
├── .agent/                    # Multi-agent personas & skill sheets
├── .claude/                   # Claude AI project settings & rules
├── AGENTS.md                  # Agent architecture & execution protocol
├── CLAUDE.md                  # Claude / AI development guidelines
├── architecture-diagram.png   # Production architecture diagram (PNG)
├── architecture-diagram.pdf   # Production architecture diagram (PDF)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── next.config.js
```

---

## Production Architecture
A high-level architecture diagram and deep-dive for an enterprise-scale vacation rental marketplace handling 50M+ MAUs is documented in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Visual assets are available as [`architecture-diagram.png`](architecture-diagram.png) and [`architecture-diagram.pdf`](architecture-diagram.pdf).

It details:
- Edge CDN caching & WAF protection (Cloudflare)
- Next.js SSR & Incremental Static Regeneration (ISR)
- Distributed microservices fleet (User, Listing, Search, Booking, Payment, Review, Notification)
- Multi-tier caching with Redis Cluster & Redlock concurrency guards
- Sharded PostgreSQL database cluster with Citus and read replicas
- Real-time search engine with Elasticsearch / OpenSearch
- Asynchronous event bus with Apache Kafka
- Multi-region disaster recovery and observability

---

## Accessibility (WCAG 2.1 AA)
The application satisfies WCAG 2.1 AA guidelines. See [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) for verification details.

- **Full Keyboard Operability:** All buttons, gallery thumbnails, inputs, and modals are accessible via `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, `ArrowLeft`, and `ArrowRight`.
- **Focus Trapping:** Inside the Lightbox and Amenities modal, Tab navigation is strictly trapped between interactive controls.
- **Focus Restoration:** Closing a modal automatically returns focus to the initiating button element.
- **Screen Reader Support:** All icon buttons contain descriptive `aria-label` attributes; dialogs have `role="dialog"` and `aria-modal="true"`.
- **Reduced Motion:** Respects OS preferences (`prefers-reduced-motion`) to minimize or disable non-essential animations.

---

## AI-Assisted Development & Prompt Logs
The project was constructed following an AI-Native multi-agent methodology. Detailed prompt history logs, agent prompts, negative constraints, and execution sequences are available in [`PROMPT_LOGS.md`](PROMPT_LOGS.md) and [`PROMPT_LOGS.txt`](PROMPT_LOGS.txt). System agent personas and skills are documented in [`docs/AI_WORKFLOW.md`](docs/AI_WORKFLOW.md), [`AGENTS.md`](AGENTS.md), and the [`.agent/`](.agent/) directory.

---

## Local Setup & Development

### 1. Prerequisites
- Node.js 18.17+ or 20+ (Node v24 supported)
- npm 9+

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the listing page.

---

## Production Build & Verification

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

---

## Deployment to Vercel
1. Push this project to a private Git repository or deploy via the Vercel CLI:
   ```bash
   npx vercel
   ```
2. In the Vercel Dashboard, confirm that the build command is `npm run build` and the output directory is `.next`.
3. The application will deploy as an edge-optimized Next.js web application.

---

## Assignment Notes
- **Desktop-Only Implementation:** Optimized specifically for desktop viewports (`1440x900`, `1536x864`, and `1920x1080`).
- **100% Original Implementation:** Authored independently using modern Next.js App Router and Tailwind CSS without copying proprietary source code, styles, or scripts from the reference.
- **Zero TypeScript:** Written entirely in clean, modular, and idiomatic JavaScript.
