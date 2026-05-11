# Troubleshooting Tailwind CSS v4 Upgrades

If you are upgrading an older Eleventy (or other Static Site Generator) project from Tailwind CSS v3 to v4, you might encounter issues where specific plugins—like `@tailwindcss/typography`—silently fail to load, leaving your Markdown bodies unformatted.

## The Problem
When migrating to v4, it is very common to accidentally leave the legacy `tailwind.config.js` file in the project. Tailwind v4's CLI will largely ignore this v3 configuration file, especially for plugins. This means your core utility classes (like `text-fuchsia-400`) might still work, but complex plugins like Typography will be missing from the final CSS build.

In addition, modern linters (like Biome) might throw errors on the new CSS directives introduced in Tailwind v4.

## The Solution

### 1. Delete Legacy Configuration
Remove the old `tailwind.config.js` completely. It acts as a "ghost" configuration that causes confusion.

```bash
rm tailwind.config.js
```

### 2. Move Configuration into CSS
In Tailwind v4, all configuration (`@theme`, `@plugin`, `@source`) should live natively inside your main CSS entry file (e.g., `src/css/tailwind.css`).

Here is what a proper Tailwind v4 setup with the Typography plugin looks like:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Explicitly define your source files so Tailwind knows where to scan */
@source "../../**/*.{html,js,jsx,ts,tsx,njk,md}";

@theme {
  --font-sans: "Inter", sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  --color-gray-950: #0a0a0c;
}
```

### 3. Update Build Scripts
Ensure your `package.json` scripts are explicitly calling the new CLI package (`@tailwindcss/cli`), not the legacy `tailwindcss` binary.

```json
"scripts": {
  "watch:css": "npx @tailwindcss/cli -i ./src/css/tailwind.css -o ./_site/assets/css/style.css --watch",
  "build": "eleventy && npx @tailwindcss/cli -i ./src/css/tailwind.css -o ./_site/assets/css/style.css"
}
```

### 4. Configure Linters for v4 Syntax
If you are using **Biome** (or Prettier/Stylelint), you need to tell it to accept Tailwind's custom CSS directives (like `@plugin` and `@source`), otherwise your pre-commit hooks will fail.

In `biome.json`, enable `tailwindDirectives` inside the `css.parser` block:

```json
  "css": {
    "parser": {
      "cssModules": true,
      "tailwindDirectives": true
    },
    "formatter": {
      "enabled": true
    },
    "linter": {
      "enabled": true
    }
  }
```

## Summary
When plugins fail in Tailwind v4:
1. Delete `tailwind.config.js`.
2. Move `@plugin` and `@source` directives into your main CSS file.
3. Use `npx @tailwindcss/cli`.
4. Update your linter's CSS parser to recognize `tailwindDirectives`.