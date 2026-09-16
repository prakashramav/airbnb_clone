# AI Prompt Logs & Engineering History

## 1. Prompting Philosophy & Methodology
This project was developed using an **AI-Native Multi-Agent Orchestration Workflow**. Rather than using a single generic prompt, the development process was structured into specialized prompt stages with distinct engineering personas, strict negative constraints, deterministic acceptance criteria, and progressive validation loops.

### Core Prompting Principles Applied:
1. **Role-Based Partitioning:** Each prompt assigned a dedicated persona (System Architect, UI Engineer, Accessibility Auditor, Visual QA Specialist, Code Reviewer).
2. **Explicit Negative Constraints:** Strict boundaries were enforced across all prompts (e.g., *"Zero TypeScript"*, *"No copied reference code"*, *"No layout shift on modal open"*, *"No inline mock hacks"*).
3. **Acceptance-Criteria Driven:** Every prompt defined tangible exit criteria, including lint rules, keyboard behaviors, ARIA semantics, and target viewports.
4. **Iterative Audit & Refinement:** Each implementation prompt was followed by a verification prompt checking edge cases and compliance.

---

## 2. Chronological Prompt Sequence

### Prompt 1: Reference Analysis & Deconstruction
* **Role / Agent:** `reference-analyzer`
* **Prompt Text:**
  ```text
  You are an expert Frontend Reverse-Engineer and UI/UX Analyst.
  Carefully analyze the canonical Airbnb desktop listing page.
  Extract and deconstruct:
  1. Complete layout grid: container max-width, gutters, breakpoints (1440x900, 1536x864, 1920x1080).
  2. Visual tokens: color palette (brand red Rausch #FF385C, charcoal #222222, muted gray #717171, borders #EBEBEB/#DDDDDD), typography scale, border radii, and drop shadows.
  3. Structural components: sticky top header, property title row with share/save, 5-photo hero gallery grid with floating "Show all photos" button, two-column split (details left, sticky booking card right), amenities preview, reviews breakdown, host bio, location map, and desktop footer.
  4. Interactive and modal behaviors: Photo Tour view, Lightbox viewer, Amenities modal dialog, guest count selector, and live price arithmetic.
  5. Accessibility and keyboard requirements: WCAG 2.1 AA, Tab order, focus trapping, Escape dismissal, and arrow key cycling.
  
  Deliverable: Author an exhaustive specification document saved to docs/REFERENCE_ANALYSIS.md.
  Constraint: Do not copy any proprietary source code, HTML, or CSS from the reference site.
  ```
* **Key Artifact Generated:** `docs/REFERENCE_ANALYSIS.md` (12,400+ characters of detailed structural and token specs).

---

### Prompt 2: Project Architecture, Constraints & Data Modeling
* **Role / Agent:** `ui-architect`
* **Prompt Text:**
  ```text
  You are the UI Architect for a production-grade Next.js 14 App Router application.
  Based on docs/REFERENCE_ANALYSIS.md, establish the technical foundation:
  1. Scaffold Next.js 14 with Tailwind CSS using custom Airbnb design tokens in tailwind.config.js.
  2. Language Constraint: 100% pure JavaScript (ES6+ with .js and .jsx). Strictly NO TypeScript (.ts, .tsx, or @types dependencies).
  3. Server vs Client Boundaries: Keep layout.js and page.js as React Server Components (RSC). Define client component boundaries solely where interaction/state is required.
  4. Data Modeling: Create data/property.js and data/photos.js with realistic, rich property attributes, 12+ curated high-resolution photos, 45 categorized amenities, bedroom sleeping arrangements, and verified reviews.
  5. Custom Hooks: Create hooks/useLightbox.js, hooks/useKeyboardNavigation.js, and hooks/useBodyScrollLock.js.
  ```
* **Key Artifacts Generated:** `tailwind.config.js`, `data/property.js`, `data/photos.js`, `hooks/useLightbox.js`, `hooks/useKeyboardNavigation.js`, `hooks/useBodyScrollLock.js`.

---

### Prompt 3: Core Page Header & Hero Photo Gallery
* **Role / Agent:** `implementation-agent`
* **Prompt Text:**
  ```text
  Implement the desktop listing header and the canonical 5-photo hero gallery:
  1. components/layout/Header.jsx:
     - Sticky top bar (h-20) with Airbnb brand SVG logo in #FF385C.
     - Centered pill search widget ("Anywhere · Any week · Add guests") with search button icon.
     - Right menu: "Airbnb your home", globe icon, and user menu pill with dropdown menu.
  2. components/property/PropertyHeader.jsx:
     - H1 property title (26px font-semibold).
     - Sub-header row: Guest Favorite badge, 4.98 star rating, review link, location link.
     - Interactive Share button (copies URL to clipboard with visual toast feedback).
     - Interactive Save button (animated heart toggle between outlined and filled #FF385C).
  3. components/gallery/PhotoGrid.jsx:
     - 5-photo desktop layout: 1 large photo on left (50% width, rounded-l-2xl), 2x2 grid on right (50% width, rounded-tr-2xl and rounded-br-2xl).
     - 8px grid gap. Subtle hover dimming on non-hovered photos.
     - Floating bottom-right "Show all 12 photos" button with 9-dot grid icon.
     - Clicking any photo or the floating button triggers the Photo Tour / Lightbox view.
  ```
* **Key Artifacts Generated:** `components/layout/Header.jsx`, `components/property/PropertyHeader.jsx`, `components/gallery/PhotoGrid.jsx`, `components/gallery/GalleryImage.jsx`.

---

### Prompt 4: Main Content Sections & Sticky Booking Widget
* **Role / Agent:** `implementation-agent`
* **Prompt Text:**
  ```text
  Implement the main two-column desktop content area:
  1. Left Column (lg:col-span-8):
     - PropertyDetails.jsx: Host overview, capacity pill (8 guests · 4 bedrooms · 5 beds · 4.5 baths), Superhost badge, key highlights (Dedicated workspace, Self check-in, Free cancellation).
     - Description.jsx: Editorial property description with collapsible "Show more" / "Show less" toggle.
     - SleepingArrangements.jsx: 4 bedroom cards with bed icons (King bed, Queen bed, Single beds).
     - Amenities.jsx: 10 preview amenities with icons + "Show all 45 amenities" button opening a full modal dialog categorized by room/type.
     - ReviewsSection.jsx: 4.98 overall rating, 6 category progress bars (Cleanliness, Accuracy, Communication, Location, Check-in, Value), verified guest review cards.
     - HostSection.jsx: Superhost profile, response rate (100%), response time (< 1 hr), bio, and AirCover protection note.
     - LocationSection.jsx: Stylized map preview with pulsing pin and neighborhood commute guide.
  2. Right Column (lg:col-span-4):
     - BookingCard.jsx: Sticky card at top-28. Price per night ($685), rating, check-in and checkout date selectors, guest counter dropdown (adults/children), gradient Reserve CTA button ("You won't be charged yet"), and dynamic live price arithmetic (nights × price, cleaning fee, service fee, taxes, total).
  3. Footer.jsx: Desktop 3-column navigation footer with currency/language controls and legal copyright.
  ```
* **Key Artifacts Generated:** `PropertyDetails.jsx`, `Description.jsx`, `SleepingArrangements.jsx`, `Amenities.jsx`, `ReviewsSection.jsx`, `HostSection.jsx`, `LocationSection.jsx`, `BookingCard.jsx`, `Footer.jsx`.

---

### Prompt 5: Photo Tour View & Lightbox Modal
* **Role / Agent:** `implementation-agent`
* **Prompt Text:**
  ```text
  Implement the dedicated Photo Tour view and the full-screen Lightbox modal:
  1. components/gallery/PhotoTour.jsx & app/photo-tour/page.js:
     - Full-screen photo exploration view accessible as a modal or standalone route (/photo-tour).
     - Sticky filter bar with category pills: "All", "Exterior & Grounds", "Living room", "Kitchen & Dining", "Bedrooms", "Bathrooms".
     - Categorized photo grid with high-resolution images, hover states, and room captions.
     - Clicking any image launches the Lightbox at that specific photo index.
  2. components/lightbox/Lightbox.jsx:
     - Full-screen dark backdrop (bg-black/95).
     - Natural aspect-ratio image containment (object-contain) with smooth transition.
     - Previous / Next circular arrow navigation buttons.
     - Live image counter (e.g., "4 / 12") with screen reader polite announcements.
     - Close button ('X') and ESC key dismissal.
  ```
* **Key Artifacts Generated:** `components/gallery/PhotoTour.jsx`, `app/photo-tour/page.js`, `components/lightbox/Lightbox.jsx`, `components/lightbox/LightboxControls.jsx`, `components/lightbox/ImageCounter.jsx`.

---

### Prompt 6: Accessibility (WCAG 2.1 AA) & Focus Trapping Audit
* **Role / Agent:** `accessibility-reviewer`
* **Prompt Text:**
  ```text
  Perform a strict accessibility audit against WCAG 2.1 Level AA criteria:
  1. Keyboard Navigation:
     - Verify full Tab and Shift+Tab traversal across all interactive controls.
     - Implement circular focus trapping in useKeyboardNavigation.js for Lightbox and Amenities modal dialogs so focus cannot escape into the background.
     - Implement focus restoration: capture document.activeElement before opening a modal and restore focus to the trigger button when the modal closes.
     - Support Escape key to close any modal or dropdown, and ArrowLeft / ArrowRight to cycle photos in the Lightbox.
  2. Layout Shift & Scroll Lock:
     - Audit useBodyScrollLock.js. Calculate window.innerWidth - document.documentElement.clientWidth to compensate paddingRight, preventing layout jump when locking body scroll.
  3. Screen Readers & ARIA:
     - Add role="dialog", aria-modal="true", and aria-label to all modals.
     - Ensure all icon-only buttons have descriptive aria-labels.
     - Add aria-live="polite" to ImageCounter.jsx.
  4. Reduced Motion:
     - Add @media (prefers-reduced-motion: reduce) rules in globals.css.
  
  Deliverable: Document audit results in docs/ACCESSIBILITY.md.
  ```
* **Key Artifacts Generated:** Enhanced `useKeyboardNavigation.js`, `useBodyScrollLock.js`, `globals.css`, and `docs/ACCESSIBILITY.md`.

---

### Prompt 7: Visual QA & Desktop Viewport Validation
* **Role / Agent:** `visual-qa-agent`
* **Prompt Text:**
  ```text
  Validate visual fidelity and layout containment across target desktop viewports:
  - 1440 × 900 px (Primary desktop target)
  - 1536 × 864 px (Common laptop target)
  - 1920 × 1080 px (Widescreen desktop target)
  
  Inspect:
  1. Photo gallery rounded corners: Ensure outer corners are clipped cleanly (rounded-l-2xl, rounded-tr-2xl, rounded-br-2xl) without subpixel bleeding.
  2. Sticky booking card: Verify top-28 offset and proper z-index layering above content but below header.
  3. Content spacing rhythm: Verify section padding and divider line alignments.
  4. Discrepancy remediation: Document any adjustments made.
  
  Deliverable: Author docs/VISUAL_QA.md.
  ```
* **Key Artifacts Generated:** `docs/VISUAL_QA.md` and fine-tuned Tailwind classes across gallery and layout components.

---

### Prompt 8: Production Distributed System Architecture
* **Role / Agent:** `ui-architect` / `code-review-agent`
* **Prompt Text:**
  ```text
  Author an enterprise distributed systems architecture document for scaling a vacation rental marketplace to 50M+ MAUs, 10M+ listings, and 100K+ bookings/day:
  Cover:
  1. Global Edge CDN (Cloudflare) with Edge SSR and HTML caching.
  2. Next.js Frontend Fleet with ISR (Incremental Static Regeneration) and RSC.
  3. Global API Gateway / Envoy proxy with OAuth 2.0 / JWT and rate limiting.
  4. Microservices Fleet: User, Listing, Search (OpenSearch geo-polygon), Booking (Redlock state machine), Payment, Review, Notification, Analytics.
  5. Data & Storage: Sharded PostgreSQL (Citus), Redis Cluster, Apache Kafka event streaming, AWS S3 media storage.
  6. Multi-region disaster recovery, observability (Prometheus/Jaeger), and CI/CD.
  
  Deliverable: Save complete specification to docs/ARCHITECTURE.md.
  ```
* **Key Artifact Generated:** `docs/ARCHITECTURE.md` (12,300+ characters).

---

### Prompt 9: Build Validation, AI Configs & Final Verification
* **Role / Agent:** `code-review-agent`
* **Prompt Text:**
  ```text
  Final verification and packaging:
  1. Run npm run lint and npm run build. Verify zero warnings, zero errors, and clean static page generation.
  2. Create AI configuration files required for the repository:
     - AGENTS.md: Document the 6 agent personas, responsibilities, skills, and execution protocol.
     - CLAUDE.md: Project guidelines, styling tokens, coding rules, accessibility standards, and command runbooks.
     - .claude/settings.json and .claude/rules.md: Claude AI configuration.
  3. Generate high-resolution Architecture Diagram image (PNG) and PDF document using Python/Pillow:
     - Save as architecture-diagram.png and architecture-diagram.pdf in root and docs/.
  4. Perform final comprehensive audit and document in docs/FINAL_AUDIT.md.
  ```
* **Key Artifacts Generated:** `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`, `.claude/rules.md`, `architecture-diagram.png`, `architecture-diagram.pdf`, `docs/FINAL_AUDIT.md`.

---

## 3. Key Prompting Insights & Takeaways

1. **Deterministic Constraints Outperform Open-Ended Instructions:**
   Constraining the model with strict rules (e.g. *"zero TypeScript", "no copied code", "use Next.js Image with sizes"*) eliminated rework and ensured total compliance with assignment rules.
2. **Decomposing Features into Micro-Agents Prevents Context Degradation:**
   Separating analysis, architecture, implementation, accessibility, and visual QA into dedicated stages produced significantly deeper quality than attempting a single end-to-end prompt.
3. **Automated Verification Closes the Loop:**
   Pairing implementation prompts with immediate `npm run lint` and `npm run build` execution ensured that any subtle regression was caught and resolved instantly.
