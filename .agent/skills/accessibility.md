# Accessibility Skill

## Overview
Standards and engineering patterns for implementing WCAG 2.1 AA compliant web interfaces.

## Key Principles
1. **Focus Trapping & Restoration:**
   - Always capture the active focused element before launching a modal dialog.
   - Cycle focus within modal bounds on `Tab` / `Shift+Tab`.
   - Restore focus to the initiating element on modal dismiss.
2. **Keyboard Operability:**
   - Bind `Escape` to close all open modals, overlays, and dropdowns.
   - Bind arrow keys for horizontal gallery navigation.
   - Ensure native buttons trigger on both `Enter` and `Space`.
3. **Assistive Labels & Live Regions:**
   - Provide explicit `aria-label`s on icon-only controls.
   - Use `aria-live="polite"` on dynamic counters and announcements.
   - Ensure all images have descriptive `alt` text.
