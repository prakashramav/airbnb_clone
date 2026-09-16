# AGENTS.md

## System Multi-Agent Architecture

This repository utilizes a specialized multi-agent engineering workflow designed to build, audit, verify, and document the Airbnb listing clone to production-grade fidelity and WCAG 2.1 AA accessibility standards.

---

### Agent Roster & Responsibilities

| Agent | Specification File | Primary Mandate | Key Skills & Tools |
| :--- | :--- | :--- | :--- |
| **Reference Analyzer** | `.agent/agents/reference-analyzer.md` | Deconstruct target listing page structure, design tokens, typography scale, spacing, and micro-interactions | `ui-fidelity`, DOM inspection, CSS token extraction |
| **UI Architect** | `.agent/agents/ui-architect.md` | Formulate component hierarchy, Next.js Server vs Client component boundaries, and state flow | `nextjs-development`, React Server Components, responsive design |
| **Implementation Agent** | `.agent/agents/implementation-agent.md` | Write idiomatic JavaScript (ES6+) and Tailwind CSS components from scratch with zero boilerplate bloat | Pure JavaScript, Next.js App Router, Tailwind CSS |
| **Accessibility Reviewer** | `.agent/agents/accessibility-reviewer.md` | Enforce WCAG 2.1 AA compliance, keyboard trapping, focus restoration, ARIA dialog semantics, and live regions | `accessibility`, WCAG 2.1 AA standards, focus management |
| **Visual QA Agent** | `.agent/agents/visual-qa-agent.md` | Validate desktop viewports (1440x900, 1536x864, 1920x1080), scrollbar shifts, and visual alignment | `visual-testing`, layout containment, contrast verification |
| **Code Review Agent** | `.agent/agents/code-review-agent.md` | Inspect code for anti-patterns, ensure zero TypeScript usage, eliminate console logs, verify build & lint | ESLint, Next.js build validation, clean architecture |

---

### Core Skills & Guidelines

The agents leverage domain skill modules located in `.agent/skills/`:
- **`nextjs-development.md`**: Next.js 14 App Router patterns, static export compatibility, Image optimization.
- **`ui-fidelity.md`**: Strict adherence to Airbnb design language (Rausch `#FF385C`, Charcoal `#222222`, Light Neutral `#F7F7F7`).
- **`accessibility.md`**: Keyboard trap implementations, screen reader polite announcements, focus restoration.
- **`visual-testing.md`**: Viewport consistency, body scroll lock without horizontal layout shift.

---

### Execution Protocol

1. **Analysis Phase**: `reference-analyzer` extracts behavioral specs, layout rules, and token definitions.
2. **Architecture Phase**: `ui-architect` defines component boundaries and state lifecycles (`ListingPageClient`, `Lightbox`, `BookingCard`).
3. **Construction Phase**: `implementation-agent` codes components in pure JavaScript and Tailwind CSS.
4. **Accessibility Audit**: `accessibility-reviewer` verifies keyboard operability (`Tab`, `Escape`, `Arrows`), focus trap, and ARIA attributes.
5. **Visual QA Pass**: `visual-qa-agent` tests responsiveness and fixes subtle visual discrepancies.
6. **Code Review & Final Audit**: `code-review-agent` runs `npm run lint` and `npm run build`, validating zero warnings and total compliance.
