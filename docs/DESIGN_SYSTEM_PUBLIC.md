# Public Design System

NEXORA uses a dark evidence-console visual language without sacrificing public readability.

- Typography: system sans for prose, monospace for status/provenance; responsive `clamp()` sizing.
- Color: cyan/blue accents for navigation, green for verified/available, amber for caveats, red only for failure; text meaning never relies on color alone.
- Status words: Public Data, Normalized, Derived, Composite, Demo, Simulated, AI Interpretation, Unavailable, Degraded, Stale, Not Configured.
- Interaction: native links/buttons, visible hover/focus, keyboard-operable controls, explicit selected/expanded state, and reduced-motion support.
- Layout: 1440/1280/1024/768/430/390/375/320 px acceptance widths; dense grids collapse before horizontal overflow.
- Language: English and Simplified Chinese share the same information hierarchy. The chosen language persists locally and updates the document `lang` attribute.
- Charts/maps/networks: include text labels, structured alternatives, formulas or source panels; decorative visuals are identified as Demo.
