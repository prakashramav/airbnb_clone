# Reference Analysis: Airbnb Listing Page Clone

## 1. Executive Summary & Specification Overview
This document serves as the comprehensive visual and behavioral specification for an original, production-quality desktop Airbnb listing page clone. It details every design token, layout grid, typography hierarchy, component interaction, state transition, keyboard navigation pattern, and accessibility requirement based on the canonical modern Airbnb listing page architecture.

---

## 2. Page Structure & Layout Grid

### Container & Viewport Specifications
- **Target Desktop Viewports:**
  - 1440 × 900 px (Primary desktop target)
  - 1536 × 864 px (Common 1080p laptop scaled target)
  - 1920 × 1080 px (Standard widescreen desktop)
- **Max Content Width:** `1120px` (or `max-w-7xl` with `px-10` / `px-20` gutters matching `1120px - 1280px` centered container)
- **Gutter Padding:** `px-6` (24px) on compact desktop, `px-12` (48px) to `px-20` (80px) on wide desktop screens
- **Vertical Spacing Rhythm:**
  - Section dividers: `border-b border-[#EBEBEB] my-8 py-8`
  - Heading to content: `mb-6` (24px)
  - Paragraph line spacing: `leading-[1.625]` (26px for 16px text)

---

## 3. Structural Decomposition

### 3.1 Global Header
- **Layout:** Sticky top container (`sticky top-0 z-30 bg-white border-b border-[#EBEBEB]`)
- **Height:** 80px (`h-20`)
- **Left:** Airbnb brand logomark in `#FF385C` (Rausch) with text wordmark
- **Center:** Compact pill search widget:
  - "Anywhere" | "Any week" | "Add guests"
  - Search trigger icon in circular `#FF385C` background with white magnifying glass icon (16px)
  - Box shadow: `shadow-sm hover:shadow-md transition-shadow border border-[#DDDDDD] rounded-full px-4 py-2`
- **Right Action Bar:**
  - "Airbnb your home" button (`hover:bg-[#F7F7F7] rounded-full px-4 py-2.5 text-sm font-semibold`)
  - Globe language / currency selector (`hover:bg-[#F7F7F7] p-2.5 rounded-full`)
  - User profile menu pill:
    - Hamburger icon (`Menu` 18px) + User avatar / placeholder circle (`User` 18px)
    - Border `border-[#DDDDDD] rounded-full px-3 py-1.5 hover:shadow-md transition`

### 3.2 Property Heading & Metadata
- **H1 Listing Title:**
  - Font: Inter / System sans-serif, 26px (`text-[26px] font-semibold text-[#222222] tracking-tight leading-8`)
- **Sub-header Row (Flex between):**
  - **Left Metadata:**
    - Guest Favorite badge (pill with laurel/star iconography) or Superhost badge
    - Rating: Star icon (`#222222` or `#FF385C`, 14px) + score (`4.98`)
    - Review count link: `· 124 reviews` (underlined on hover, semibold)
    - Location link: `Aspen, Colorado, United States` (underlined on hover, semibold)
  - **Right Action Buttons:**
    - Share button: `Upload` / `Share` icon (16px) + "Share" (`hover:bg-[#F7F7F7] rounded-lg px-3 py-2 text-sm font-semibold underline`)
    - Save button: Heart icon (16px, toggles between outlined and filled `#FF385C`) + "Save" (`hover:bg-[#F7F7F7] rounded-lg px-3 py-2 text-sm font-semibold underline`)

### 3.3 Hero Gallery Grid (5-Image Layout)
- **Grid Layout:** 2-column layout with 8px (`gap-2`) grid spacing and `rounded-2xl` (16px) outer perimeter:
  - **Column 1 (Left, 50% width):** 1 Large Hero photo spanning full height (`aspect-[4/3]` or `h-[460px]`), rounded `rounded-l-2xl`
  - **Column 2 (Right, 50% width):** 2 × 2 grid of 4 supporting images (`aspect-[4/3]` each, `h-[226px]` each)
    - Top-right image: `rounded-tr-2xl`
    - Bottom-right image: `rounded-br-2xl`
- **Hover Micro-interaction:**
  - When hovering any individual image, all other images dim slightly (`opacity-90` or `brightness-95` on hover for the active image, `transition-all duration-300`)
- **"Show all photos" Button:**
  - Position: Floating bottom-right of hero gallery (`absolute bottom-4 right-4 z-10`)
  - Appearance: White background (`bg-white/95 backdrop-blur-sm`), `border border-[#222222]`, `rounded-lg px-3.5 py-1.5`, `shadow-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all`
  - Icon: 9-dot grid icon (`Grid` or custom dots, 16px) + "Show all 24 photos" (`text-sm font-semibold text-[#222222]`)
  - Accessibility: Accessible button with `aria-label="Show all 24 photos"`

### 3.4 Main Content Area (Two-Column Desktop Split)
- **Grid Breakdown:** `grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8`
- **Left Column:** `lg:col-span-7 xl:col-span-8 space-y-8`
- **Right Column:** `lg:col-span-5 xl:col-span-4 relative` (contains sticky booking widget)

#### Left Column Details
1. **Host Summary & Capacity:**
   - Title: "Entire villa hosted by Sarah & David" (`text-[22px] font-semibold text-[#222222]`)
   - Capacity pills: `8 guests · 4 bedrooms · 5 beds · 4.5 baths` (`text-[#717171] text-base`)
   - Host Avatar: 56px (`w-14 h-14 rounded-full object-cover border border-[#EBEBEB]`) with Superhost badge overlay
2. **Guest Favorite Banner / Key Highlights:**
   - Framed badge or icon list:
     - **Dedicated workspace:** Desk with ergonomic chair and fast Wi-Fi (250 Mbps)
     - **Self check-in:** Check yourself in with the smart keypad
     - **Free cancellation:** Before check-in date
3. **Property Description:**
   - Rich editorial description detailing architectural style, scenic views, natural light, and modern amenities
   - "Show more" expander button (`font-semibold underline flex items-center gap-1 mt-3 hover:text-black`)
4. **Where You'll Sleep (Bedrooms Carousel/Cards):**
   - 4-card horizontal row or grid:
     - Bedroom 1: King bed (`BedDouble` icon, 24px)
     - Bedroom 2: Queen bed (`Bed` icon)
     - Bedroom 3: 2 Single beds
     - Bedroom 4: King bed + ensuite bath
   - Card styling: `border border-[#DDDDDD] rounded-xl p-6 bg-white shadow-xs`
5. **Amenities Section:**
   - Top 10 amenities displayed with clear iconography:
     - Mountain / Valley view (`Mountain` icon)
     - Private hot tub (`Waves` / `Sparkles` icon)
     - Dedicated workspace (`Laptop` icon)
     - Fast Wi-Fi (`Wifi` icon)
     - Free parking on premises (`Car` icon)
     - Indoor fireplace (`Flame` icon)
     - Fully equipped chef's kitchen (`Utensils` icon)
     - Washer & Dryer (`Shirt` icon)
     - Security cameras on property (`ShieldCheck` icon)
     - Central air conditioning & heating (`Thermometer` icon)
   - "Show all 45 amenities" button (`border border-[#222222] rounded-lg px-6 py-3 font-semibold text-sm hover:bg-[#F7F7F7] transition`)
6. **Sleeping & Location Preview:**
   - Interactive calendar / date picker preview
   - Location map preview with pin and neighborhood summary

#### Right Column: Sticky Booking Widget
- **Positioning:** `sticky top-28 z-20`
- **Card Dimensions:** `w-full max-w-[400px] ml-auto bg-white border border-[#DDDDDD] rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]`
- **Price Header:**
  - `$685` (`text-[22px] font-semibold text-[#222222]`) + ` / night` (`text-[#717171] text-base`)
  - Review summary: Star icon + `4.98` · `124 reviews`
- **Booking Inputs Box:**
  - Two-row bordered container (`border border-[#B0B0B0] rounded-xl overflow-hidden`):
    - Top row: Split 50/50:
      - Left: "CHECK-IN" (`text-[10px] font-extrabold uppercase tracking-wider text-[#222222]`) + selected date
      - Right: "CHECKOUT" (`text-[10px] font-extrabold uppercase tracking-wider text-[#222222]`) + selected date
    - Bottom row: "GUESTS" (`text-[10px] font-extrabold uppercase tracking-wider text-[#222222]`) + guest count selector dropdown
- **Reserve CTA Button:**
  - Gradient background: `bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466]`
  - Text: "Reserve" (`text-white font-semibold text-base py-3.5 rounded-xl w-full hover:opacity-95 active:scale-[0.99] transition-all shadow-sm`)
  - Subtext: "You won't be charged yet" (`text-center text-xs text-[#717171] mt-3`)
- **Price Breakdown:**
  - `$685 × 5 nights` : `$3,425`
  - `Cleaning fee` : `$250`
  - `Airbnb service fee` : `$412`
  - `Taxes` : `$325`
  - Divider (`border-t border-[#EBEBEB] my-4 pt-4`)
  - **Total before taxes / final total:** `$4,412` (`font-bold text-[#222222] flex justify-between`)

---

## 4. Photo Tour View (`/photo-tour` & Modal)
- **Entry Points:**
  1. Clicking the "Show all photos" floating button on the hero gallery
  2. Clicking the primary hero photo or any supporting photo
- **Layout & Structure:**
  - Full-screen view with fixed header:
    - Left: Back arrow button (`ChevronLeft` / `ArrowLeft`, `p-2 rounded-full hover:bg-[#F7F7F7]`) to return to listing
    - Right: Share and Save buttons
  - Sub-navigation tabs:
    - "All photos", "Living room", "Bedrooms", "Kitchen", "Bathrooms", "Exterior & Views"
  - Categorized image layout:
    - Sections labeled with category titles (e.g., "Living room · 5 photos", "Bedrooms · 6 photos")
    - 2-column or 3-column masonry/grid layouts
    - Each image card is an interactive button with smooth hover scale and click trigger to open the Lightbox at that specific image index.
- **Scroll Behavior:** Smooth scrolling with anchored section links and scroll-to-top support.

---

## 5. Lightbox Modal Component
- **Entry Points:**
  - Clicking any image in the Photo Tour or Listing Hero Gallery
- **Backdrop:**
  - `fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between`
- **Controls & Header:**
  - Top bar:
    - Close button (`X` icon 20px, `p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition`)
    - Image counter: `text-white text-sm font-medium tracking-wide` (e.g. `5 / 24`)
    - Share / Save action buttons if applicable
- **Navigation Controls:**
  - Previous Button (`ChevronLeft` 28px):
    - Circular button (`w-12 h-12 rounded-full border border-white/30 bg-black/40 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition flex items-center justify-center`)
    - Positioned at left edge (`left-6 top-1/2 -translate-y-1/2 absolute`)
  - Next Button (`ChevronRight` 28px):
    - Circular button at right edge (`right-6 top-1/2 -translate-y-1/2 absolute`)
- **Center Stage:**
  - Max height `h-[80vh]`, max width `w-[88vw]`, aspect-ratio preserved (`object-contain`)
  - Smooth slide or crossfade transition between images
  - Caption text below image showing category and description
- **Keyboard Navigation:**
  - `Escape`: Closes Lightbox
  - `ArrowLeft`: Navigates to previous image (wraps around or stops at 1)
  - `ArrowRight`: Navigates to next image
  - `Tab` / `Shift+Tab`: Traps focus strictly within [Close, Previous, Next] controls

---

## 6. Typography, Colors & Design Tokens

### Color Palette
- Brand Accent: `#FF385C` (Airbnb Coral / Rausch)
- Brand Accent Hover: `#E00B41`
- Primary Text: `#222222` (Charcoal Black)
- Secondary / Muted Text: `#717171` (Cool Gray)
- Light Neutral: `#F7F7F7` (Card / Pill hover background)
- Border Light: `#EBEBEB` (Section separators)
- Border Medium: `#DDDDDD` (Inputs, cards, pills)
- Border Dark: `#B0B0B0` (Focused inputs)
- Overlay Backdrop: `rgba(0, 0, 0, 0.75)` (Modals) and `rgba(0, 0, 0, 0.95)` (Lightbox)

### Typography Scale
- H1 Listing Title: `26px`, font-weight `600`, line-height `32px`
- Section Title: `22px`, font-weight `600`, line-height `26px`
- Sub-headings: `18px`, font-weight `600`, line-height `24px`
- Base Body: `16px`, font-weight `400`, line-height `24px`
- Small Labels: `14px`, font-weight `500` / `600`
- Captions / Microtext: `12px`, font-weight `400` / `600`
- Uppercase Tag Labels: `10px`, font-weight `800`, letter-spacing `0.05em`

---

## 7. Accessibility & Focus Trap Architecture
1. **Modal Semantics:**
   - Lightbox and Photo Tour modals carry `role="dialog"`, `aria-modal="true"`, and `aria-label="Photo gallery lightbox"`.
2. **Focus Management:**
   - When Lightbox opens: Active focused element is stored in a ref (`lastFocusedElementRef.current = document.activeElement`).
   - Focus is immediately shifted to the Close button or Next button.
   - Keydown listener catches `Tab` events and cycles focus strictly between interactive elements inside the modal.
   - When Lightbox closes: Focus is restored back to `lastFocusedElementRef.current`.
3. **Screen Readers:**
   - All interactive controls have meaningful `aria-label`s (e.g. `aria-label="Previous photo"`, `aria-label="Next photo"`, `aria-label="Close photo viewer"`).
   - Images contain descriptive `alt` tags depicting specific rooms and vantage points.
4. **Motion Preferences:**
   - Respects `prefers-reduced-motion` to disable or instantaneous-switch transitions for sensitive users.
