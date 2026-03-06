---
"react-bnb-gallery": patch
---

Fix library CSS packaging so `dist/style.css` only ships gallery styles.

Removed the unintended Tailwind import from the library stylesheet and organized rules into explicit cascade layers (`rbg-tokens`, `rbg-components`, `rbg-motion`) without changing gallery behavior.
