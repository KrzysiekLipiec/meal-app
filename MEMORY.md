# Project Memory

## Environment
- **Package Manager**: pnpm
- **Framework**: React + Vite
- **Tailwind CSS**: version 4.x
  - Configuration is done in `src/index.css` using the `@theme` block.
  - Custom fonts added in `src/index.css` within the `@theme` block:
    - `--font-sans`: "Plus Jakarta Sans" (Body)
    - `--font-heading`: "Manrope" (Headlines)
    - `--font-jakarta`: Explicitly defined as "Plus Jakarta Sans".
  - Content scanning is handled automatically by the `@tailwindcss/vite` plugin.

## Fix History
- **font-jakarta**: Added to `src/index.css` inside `@theme`. Overrode `--font-sans` to ensure it's used as the default for body.
- **Manrope**: Added as `--font-heading`.
- **Google Fonts**: Updated in `index.html` to include both fonts.
