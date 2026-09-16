# Claude Project Rules

1. **Pure JavaScript**: Do not introduce any TypeScript files or syntax. Keep all components as `.jsx` or `.js`.
2. **Next.js 14 App Router**: Use server components by default; only place `"use client"` where state, hooks, or window events are required.
3. **Tailwind Styling**: Follow custom Airbnb design tokens (`#FF385C`, `#222222`, `#717171`, `#EBEBEB`, `#F7F7F7`).
4. **Accessibility (WCAG 2.1 AA)**: Ensure full keyboard navigability (`Tab`, `Escape`, `ArrowLeft`, `ArrowRight`), focus trapping inside modals, and screen-reader ARIA labeling.
5. **No Regressions**: Always ensure `npm run lint` and `npm run build` pass cleanly without errors or warnings.
