<p align="center">
  <img src="img/favicon/favicon.svg" alt="alt text" width="125">
</p>

# Blog & Personal Writing Space

Welcome to the GitHub repository for my personal blog, [blog.beaubremer.com](https://blog.beaubremer.com). This project
is a standalone site built with the static site generator Eleventy.

This blog serves as a space for my writing and a practical playground for exploring web development best practices, from
performance optimization to security hardening.

## Why Eleventy?

I wanted a simple, modern, and maintainable platform for a content-focused blog. I chose **Eleventy (11ty)**
[11ty.dev](https://www.11ty.dev/) for a few key reasons:

- **Simplicity and Flexibility:** Eleventy is an un-opinionated static site generator that doesn't lock you into a heavy
  framework. This was perfect for a straightforward, content-focused blog.
- **JavaScript-Based:** The entire configuration is done in plain JavaScript (`.eleventy.js`), which made it comfortable
  and accessible to work with.
- **Performance & Security by Default:** Eleventy generates pre-built, static HTML files. This means there's no database
  to hack and no complex server-side code running on every page view, resulting in a site that is incredibly fast and
  secure out of the box.

## Key Features & Upgrades

A website is never truly "finished." I've implemented several powerful features to improve performance, streamline my
writing workflow, and enhance the site's overall quality.

- **Custom Date Filters:** To ensure a clean and consistent look for post dates (e.g., "June 21, 2025"), I implemented a
  custom Eleventy filter using the **Luxon** library for reliable date formatting. This keeps my templates clean and
  ensures all dates are styled uniformly.
- **Reusable Shortcodes:** To avoid pasting messy `<iframe>` code every time I want to embed a video, I created a custom
  `{% youtube %}` shortcode. Eleventy sees this tag in my Markdown files and automatically replaces it with the full,
  optimized embed code during the build process.
- **Fast, Static Search:** Integrated **Pagefind** to provide lightning-fast, full-text search across all blog posts
  without requiring a heavy client-side JavaScript bundle or a backend database.
- **Estimated Reading Time:** Automatically calculates and displays the reading time for each article, helping readers
  manage their time.
- **Organized Content Architecture:** Posts are organized into year-based subdirectories (`posts/2025/`, etc.) with a
  flat URL structure maintained via Eleventy permalinks. This keeps the project clean while preserving SEO and existing
  links.
- **Automatic Image Optimization:** I'm using the official **`@11ty/eleventy-img`** plugin to automatically optimize
  images. When I add an image, the plugin creates multiple smaller sizes, converts them to modern formats like **WebP**,
  and generates the `<picture>` element. This ensures browsers only download the most efficient image size, dramatically
  improving page load speed and user experience.
- **Modern Visual Identity & UX:** Implemented a high-contrast dark theme featuring a sticky "glass" header with
  `backdrop-blur`, interactive "lift" effects on post cards, and subtle background glow accents. Integrated **Space
  Grotesk** for display headings and **Inter** for body text to create a professional, readable hierarchy.
- **Reading Progress Indicator:** A dynamic progress bar at the top of the viewport provides visual feedback as readers
  scroll through long-form technical content.

## A Security-First Approach

While static sites are secure by default, I took extra steps to harden the blog against modern web vulnerabilities using
a `netlify.toml` file to define custom HTTP security headers.

- **Content Security Policy (CSP):** I implemented a strong CSP that acts like a bouncer, maintaining a strict guest
  list of allowed resources (scripts, styles, fonts).
- **Privacy-Focused Assets:** Critical assets like PrismJS and Pagefind are hosted locally to reduce third-party
  tracking and improve performance.
- **Other Essential Headers:** For a layered defense, I also added:
  - **Strict-Transport-Security (HSTS):** Ensures browsers only communicate with my site over a secure HTTPS connection.
  - **X-Frame-Options:** Set to `DENY` to prevent clickjacking attacks.
  - **Permissions-Policy:** Locks down browser features the blog doesn't need, like the microphone, camera, or USB
    devices.

The result is a fast, modern blog with an A+ security rating that is completely decoupled from my main portfolio,
allowing me to focus on creating content.

## Feedback & Iteration

Software is a conversation. Following feedback that the initial design was "too plain," I performed a comprehensive
visual refactor (V11.0.0) to move beyond a standard template look. This iteration focused on:

- **Design Intent:** Moving from flat blocks to a layered, high-contrast aesthetic using fuchsia glow accents and
  glassmorphism.
- **UX Polish:** Adding micro-interactions like the "card lift" effect and a reading progress bar to make the site feel
  responsive and premium.
- **Brand Identity:** Establishing a unique typographic hierarchy using Space Grotesk to ensure the blog feels like a
  custom-built product rather than a generic starter kit.

This process reflects my approach to development: ship a functional MVP, gather feedback, and iterate relentlessly to
improve the user experience.

## Security & Linting Stack

To maintain high code quality and security without sacrificing development speed, this project uses a modern,
parallelized linting and formatting stack. We moved away from heavy, serial linters (like MegaLinter) in favor of
specialized, high-performance tools:

- **[Biome](https://biomejs.dev/)**: A Rust-based "all-in-one" tool that handles linting and formatting for JavaScript,
  JSON, and CSS. It provides near-instant feedback (sub-100ms).
- **[Lefthook](https://github.com/evilmartians/lefthook)**: A fast git hook manager that runs our linters in parallel on
  only the files you've changed, ensuring no "broken" code is ever committed.
- **[Secretlint](https://github.com/secretlint/secretlint)**: A proactive security tool that scans every commit for
  accidental leaks of API keys, tokens, or private credentials.
- **[Markdownlint](https://github.com/igorshubovych/markdownlint-cli)**: Enforces consistent style and structure across
  all blog posts to ensure a professional reading experience.
- **[Snyk](https://snyk.io/)**: Automatically monitors dependencies for known vulnerabilities and suggests fixes.
- **[Lighthouse CI](https://github.com/treosh/lighthouse-ci-action)**: Audits every Pull Request for Performance,
  Accessibility, SEO, and Best Practices.
- **[Dependabot](https://github.com/dependabot)**: Keeps the project secure by automatically opening PRs for dependency
  updates.

## Development

### Prerequisites

- Node.js 20+
- npm

### Local Setup

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

Visit `http://localhost:8080` to see your changes live.

### Tech Stack

- **Eleventy (11ty) v3** - Static site generator
- **Tailwind CSS v4** - High-performance utility-first CSS engine
- **Biome** - Fast Rust-based linting/formatting
- **Pagefind** - Static search engine
- **Luxon** - Date formatting
- **eleventy-img** - Automatic image optimization
- **PrismJS** - Syntax highlighting

### Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build for production
- `npm run format` - Format code (Biome + Prettier)
- `npm run lint` - Run all quality checks (Biome + Markdown + Secrets)
- `npm run lint:fix` - Automatically fix common linting issues

## Recent Updates

See [CHANGELOG.md](CHANGELOG.md) for the full history.
