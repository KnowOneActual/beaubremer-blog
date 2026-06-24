<!-- textlint-disable slopless/flesch-kincaid, slopless/gunning-fog, slopless/coleman-liau -->
<p align="center">
  <img src="img/favicon/favicon.svg" alt="alt text" width="125">
</p>

# Blog and personal writing space

This is the source code for my blog at blog.beaubremer.com, built using Eleventy.

It serves as a writing space and a playground for web development practices like performance and security.

## Why Eleventy?

I chose Eleventy (11ty) for these reasons:

- **Simplicity:** It is a minimal static site generator without heavy framework lock-in.
- **Javascript configuration:** Configure the site using plain JavaScript (`.eleventy.js`).
- **Speed and security:** It outputs static HTML. There is no database or runtime code, keeping the site fast and
  secure.

## Key features and upgrades

- **Custom date filters:** Uses **Luxon** for uniform post dates.
- **Shortcodes:** Embeds videos cleanly with a custom `{% youtube %}` tag.
- **Static search:** Uses **Pagefind** for client-side search without a backend.
- **Reading time:** Shows reading time estimates for each post.
- **Clean architecture:** Organizes posts in year-based folders while keeping URLs flat.
- **Image optimization:** Uses `@11ty/eleventy-img` to resize and convert images to WebP format.
- **Dark theme:** Glassmorphism header, card hover effects, and fuchsia glow accents.
- **Progress bar:** Reading progress indicator at the top of the viewport.

## A security-first approach

The site uses custom HTTP headers in `netlify.toml` for defense:

- **Content Security Policy:** Restricts allowed scripts, styles, and fonts.
- **Local assets:** Hosts PrismJS and Pagefind locally to reduce tracking.
- **HSTS:** Forces secure HTTPS connections.
- **Frame options:** Prevents clickjacking using `DENY`.
- **Permissions policy:** Disables unneeded browser features like camera and microphone.

## Feedback and iteration

Following feedback, a visual refactor (V11.0.0) replaced the generic starter style. Key changes included:

- **Aesthetic:** Added fuchsia glow accents and glassmorphism.
- **Interactions:** Added card lift effects and a reading progress bar.
- **Typography:** Set **Space Grotesk** for headings and **Inter** for body text.

## Security and linting stack

We use a fast, parallelized quality stack:

- **[Biome](https://biomejs.dev/):** Rust-based linter and formatter.
- **[Lefthook](https://github.com/evilmartians/lefthook):** Runs pre-commit hooks in parallel.
- **[Secretlint](https://github.com/secretlint/secretlint):** Scans for leaked keys or tokens.
- **[Markdownlint](https://github.com/igorshubovych/markdownlint-cli):** Checks markdown styling.
- **[Snyk](https://snyk.io/) / [Dependabot](https://github.com/dependabot):** Monitors and updates dependencies.
- **[Lighthouse CI](https://github.com/treosh/lighthouse-ci-action):** Audits performance, accessibility, and SEO.

## Development

### Prerequisites

- Node.js 20+
- npm

### Local setup

```bash
# Clone the repository
git clone https://github.com/KnowOneActual/beaubremer-blog.git
cd beaubremer-blog

# Install dependencies
npm install

# Setup local git hooks
npm run lefthook:install

# Start development server
npm start
```

Open `http://localhost:8080` to view the local site.

### Tech stack

- **Eleventy (11ty) v3** (static generator)
- **Tailwind CSS v4** (styling)
- **Biome** (formatting and linting)
- **Pagefind** (search)
- **Luxon** (date formatting)
- **eleventy-img** (image resizing)
- **PrismJS** (code highlighting)

### Scripts

- `npm start`: Starts development server with live reload.
- `npm run build`: Builds site for production.
- `npm run format`: Formats code (Biome + Prettier).
- `npm run lint`: Runs Biome, markdownlint, and Secretlint.
- `npm run lint:fix`: Fixes format and lint issues.

## Recent updates

See [CHANGELOG.md](CHANGELOG.md) for the history.

## 📝 Recent blog posts

<!-- BLOG-POST-LIST:START -->

- [Why Yazi is the Terminal File Manager You Need](https://blog.beaubremer.com/posts/why-yazi-is-the-terminal-file-manager-you-need/)
- [A Cross-Platform Guide to Syncing Obsidian with GitHub](https://blog.beaubremer.com/posts/obsidian-sync-with-github/)
- [Sharing Your Python Tools with the World](https://blog.beaubremer.com/posts/sharing-your-python-tools-with-the-world/)
- [Staying Flexible Without Letting Your Process Get Bulldozed](https://blog.beaubremer.com/posts/staying-flexible-without-letting-your-process-get-bulldozed/)
- [Moving to Local Hardware](https://blog.beaubremer.com/posts/moving-to-local-hardware/)
<!-- BLOG-POST-LIST:END -->
