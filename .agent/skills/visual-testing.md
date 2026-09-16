# Visual Testing Skill

## Overview
Procedures and checklists for auditing UI components across screen resolutions and preventing visual regressions.

## Key Principles
1. **Target Viewport Verification:**
   - Audit interfaces at 1440x900, 1536x864, and 1920x1080 resolutions.
   - Verify layout containment, padding, and alignment across all breakpoints.
2. **Scroll & Overflow Checks:**
   - Verify that body scrolling locks smoothly without triggering horizontal scroll jumps.
   - Verify sticky element offsets and z-index stacking layers.
3. **Contrast & Sizing Audits:**
   - Verify color contrast ratios for text and graphical controls.
   - Confirm touch target dimensions meet minimum 44x44px accessible thresholds.
