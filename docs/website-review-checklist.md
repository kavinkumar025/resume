# Website review and acceptance checklist

This portfolio has one route (`/`) with nine section views. Review each section at 375, 768, and 1440 CSS pixels and with keyboard navigation.

| View | Review checklist |
| --- | --- |
| Introduction | [ ] Heading and portrait fit without horizontal scroll; primary actions work; parallax remains subtle and disabled with reduced motion. |
| About | [ ] Cards and biography remain readable; links and expandable content work with keyboard and touch. |
| Experience | [ ] Timeline order and dates are clear at all widths; details can be opened by keyboard. |
| Projects | [ ] Cards reflow to one column on narrow screens; images retain aspect ratio; external links work. |
| Skills | [ ] Tags wrap without clipping; categories are easy to scan. |
| Education | [ ] Education cards stack cleanly; no information is clipped. |
| Certifications | [ ] Certificate details and links remain readable and operable. |
| Achievements | [ ] Cards retain reading order and comfortable spacing. |
| Contact | [ ] Contact methods work; form labels target unique inputs; validation and submission feedback are visible. |
| Shared navigation and footer | [ ] Every section link reaches its heading; mobile drawer opens, scrolls internally, closes by link, close button, backdrop, and Escape; keyboard focus stays in the open drawer and returns to toggle when dismissed; body scrolling resumes. |

## Measurable success criteria

1. `npm run build` exits successfully, with no production budget errors.
2. At 375, 768, and 1440 CSS pixels, `document.documentElement.scrollWidth <= window.innerWidth` on the full route.
3. Every visible navigation target exists exactly once, and every form label resolves to one unique input ID.
4. At widths up to 1100 CSS pixels, drawer actions succeed with mouse, touch, and keyboard. At wider widths, desktop navigation is available and the drawer closes after resizing.
5. The drawer does not close from incidental window scroll; it closes after selecting a section, Escape, backdrop click, or close button. The selected section is visible below the fixed header.
6. All interactive controls show a visible keyboard focus indicator and have a minimum 44 by 44 CSS pixel touch target where practical.
7. With `prefers-reduced-motion: reduce`, reveal, parallax, and drawer animations do not move content; all content remains visible.
8. No new blocking resource or image is added to the initial page load. Initial transfer size stays below 200 kB in the Angular production build report.
9. Contact form behavior, PDF download, external profiles, and existing section anchors still work.

## Validation record

- Production Angular build: passed on 2026-11-05; initial estimated transfer 164.71 kB after the portrait layout fix.
- ChromeHeadless unit suite: 16 passing tests on 2026-11-05.
- Visual and interactive checks at the three widths above: pending a browser run.
