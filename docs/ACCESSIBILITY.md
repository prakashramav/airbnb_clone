# Accessibility Audit & Compliance Report (WCAG 2.1 AA)

## 1. Overview & Compliance Target
This project is engineered to strictly satisfy the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** standards. All desktop user interactions—including primary page navigation, photo gallery exploration, photo tour browsing, and full-screen lightbox viewing—are 100% operable via keyboard alone and screen-reader accessible.

---

## 2. Comprehensive Compliance Checklist

| Accessibility Requirement | Standard | Implementation Strategy | Status |
| :--- | :--- | :--- | :---: |
| **TAB Navigation** | WCAG 2.1.1 | Natural DOM order across header, gallery, content, and footer | Passed |
| **SHIFT + TAB Navigation** | WCAG 2.1.1 | Reverse sequential focus with no trapping in main page | Passed |
| **ENTER & SPACE Activation** | WCAG 2.1.1 | Native `<button>` elements respond to Enter and Space keys | Passed |
| **ESC Key Dismissal** | WCAG 2.1.2 | Dismisses Lightbox, Photo Tour, Amenities modal, and Popovers | Passed |
| **ArrowLeft & ArrowRight** | WCAG 2.1.1 | Cycles through previous/next photos in Lightbox viewer | Passed |
| **Focus Trapping** | WCAG 2.4.3 | Focus is constrained inside active Lightbox & Amenities dialogs | Passed |
| **Focus Restoration** | WCAG 2.4.3 | Returns focus to trigger button upon modal dismissal | Passed |
| **Modal Semantics** | WCAG 4.1.2 | `role="dialog"`, `aria-modal="true"`, and `aria-label` applied | Passed |
| **Image Alt Attributes** | WCAG 1.1.1 | Every listing photo has unique, descriptive, non-redundant alt text | Passed |
| **Accessible Button Labels** | WCAG 4.1.2 | Icon-only buttons have descriptive `aria-label` attributes | Passed |
| **Visible Focus Rings** | WCAG 2.4.7 | Distinctive 2px solid charcoal focus outlines on `:focus-visible` | Passed |
| **Reduced Motion Support** | WCAG 2.3.3 | `@media (prefers-reduced-motion: reduce)` disables non-essential animations | Passed |
| **No Keyboard Traps** | WCAG 2.1.2 | User can exit any modal, dropdown, or overlay via standard keys | Passed |
| **Color Contrast** | WCAG 1.4.3 | All primary text `#222222` on white achieves 16.0:1 contrast ratio | Passed |
| **Heading Hierarchy** | WCAG 1.3.1 | Single `<h1>` for property title followed by logical `<h2>` and `<h3>` tags | Passed |

---

## 3. Deep-Dive Implementation Details

### 3.1 Focus Management & Trapping (`hooks/useKeyboardNavigation.js` & `Lightbox.jsx`)
- **Initial Focus:** When the Lightbox opens, the reference of the previously focused element is captured in `previousActiveElement.current = document.activeElement`. Focus is automatically shifted to the primary close button.
- **Focus Trap:** When the `Tab` or `Shift+Tab` keys are pressed inside the modal, a query selector gathers all eligible interactive elements (`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`). If focus reaches the last element, `Tab` wraps to the first element; if at the first element, `Shift+Tab` wraps to the last element.
- **Restoration:** When the modal closes (via ESC, click outside, or Close button), `previousActiveElement.current.focus()` executes immediately, returning the user to the exact photo thumbnail they were inspecting.

### 3.2 Live Region Announcements (`ImageCounter.jsx`)
- The photo counter incorporates `aria-live="polite"` and `aria-atomic="true"`.
- When the user presses `ArrowRight` to transition to the next image, screen readers seamlessly announce the new position (e.g., *"Photo 4 of 12"*) without interrupting ongoing narration.

### 3.3 Semantic Headings Architecture
- `<h1>`: The Glass Pavilion at Red Mountain · Alpine Luxury Villa
  - `<h2>`: Entire villa hosted by Sarah & David
  - `<h2>`: About this space
  - `<h2>`: Where you'll sleep
  - `<h2>`: What this place offers
  - `<h2>`: 4.98 · 128 reviews
  - `<h2>`: Hosted by Sarah & David
  - `<h2>`: Where you'll be
  - `<h3>`: Amenities category groupings
  - `<h3>`: Footer navigation groupings

### 3.4 Motion Sensitivity
In `app/globals.css`, the application incorporates CSS rules honoring user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Zoom effects, hover scales, and crossfade transitions are suppressed when reduced motion is requested by the operating system.
