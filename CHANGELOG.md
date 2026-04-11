---
title: Changelog
layout: base.njk
---
# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog,
and this project adheres to Semantic Versioning.

## V11.0.1 (April 10, 2026)

### Fixed
- **Eleventy Build:** Corrected an `Invalid EleventyConfig.addPlugin` error by updating the RSS feed plugin to use the recommended `feedPlugin` virtual template configuration.
- **CI/CD Pipeline:** Resolved a security vulnerability (CVE-2026-33750) in the `brace-expansion` dependency by adding an override to `package.json`.
- **Redundancy:** Removed the old `feed/feed.njk` template, as its functionality is now handled by the `feedPlugin`.




## V11.0.0 (March 1, 2026)

### Added
- **Visual Refresh:** Replaced the "Plain Jane" aesthetic with a modern, high-contrast design.
- **Glass Header:** Implemented a sticky header with `backdrop-blur` and subtle borders.
- **Background Accents:** Added fuchsia glow gradients in the background to create depth.
- **Interactive Cards:** Added a hover "lift" effect and subtle glow to post cards on the index page.
- **Reading Progress Bar:** Added a dynamic progress indicator at the top of the viewport.
- **Typography Overhaul:** Integrated **Space Grotesk** for headings and **Inter** for body text for better visual hierarchy.
- **Pill Tags:** Redesigned category tags as interactive pills with hover states.

### Changed
- **Tailwind Config:** Updated to include custom font families and brand color refinements.
- **Layout:** Standardized selection colors and typography scales across all posts.


## V10.1.0 (Feb 27, 2026)

### Added
- **Static Search:** Integrated Pagefind for lightning-fast, full-text search.
- **Category Navigation:** Added high-level categories (Tech, Networking, Live Production, Mindset) for better content discoverability.
- **Estimated Reading Time:** Added a reading time indicator to blog listings and posts.
- **Post Navigation:** Added Next/Previous article links at the bottom of blog posts.
- **SEO Enhancements:** Added Open Graph and Twitter Card metadata for better social sharing.
- **Pagination:** Implemented pagination on the home page (10 posts per page).

### Changed
- **Architecture:** Organized posts into year-based subdirectories (`posts/YYYY/`).
- **Metadata Management:** Moved directory-level configuration (layout, common tags) to `posts/posts.json` and cleaned up individual markdown front matter.
- **Performance:** Localized PrismJS CSS to reduce external dependencies.
- **Build Process:** Unified build script to include Tailwind, Eleventy, and Pagefind indexing.

### Fixed
- **Content URLs:** Used permalinks to ensure a flat URL structure is maintained despite new folder organization.
- **Front Matter:** Repaired and standardized YAML metadata across all blog posts.


## V10.0.2

### Added

- **Blog Post:** "The Git Commands I Actually Use Every Day (and Why)" (Feb 7, 2026)
- **Blog Post:** "Build a Link in Bio Page" (Feb 7, 2026)
- **Blog Post:** "The AV Pro Guide to Bulletproof Video Playback" (Dec 24, 2025)
- **Blog Post:** "Security Is a Process, Not a Product" (Dec 17, 2025)
- **Blog Post:** "My Server Died and I Like It" (Nov 30, 2025)
- **Blog Post:** "Your Best Skill Isn't Knowing Everything" (Nov 9, 2025)
- **Blog Post:** "How to Bulk Delete Thousands of Old Emails in Gmail" (Oct 31, 2025)
- **Blog Post:** "Mastering .gitignore: A Complete Guide to a Cleaner Git Repo" (Oct 7, 2025)
- **Code Syntax Highlighting:** Implemented syntax highlighting for code blocks using the @11ty/eleventy-plugin-syntaxhighlight plugin to improve readability of technical posts.
- **Changelog:** Created this CHANGELOG.md to track changes to the blog's codebase.

### Changed

- Clean up the changelog. 
- **Security Policy:** Updated the style-src directive in the Content Security Policy (netlify.toml) to allow stylesheets from https://unpkg.com. This was necessary to load the PrismJS theme for syntax highlighting.
- **Prettier Configuration:** Updated .prettierrc settings (Oct 1, 2025)

### Fixed

- **Prettier Configuration:** Configured Prettier to handle .njk (Nunjucks) template files as HTML (Feb 7, 2026)
- **Security:** Resolved CVE-2026-25547 vulnerability in brace-expansion dependency by updating to version 5.0.1 (Feb 7, 2026)
- **Build:** Fixed Tailwind CSS CLI compatibility issue by pinning to v3.x to resolve "command not found" error (Feb 7, 2026)
- **Dependencies:** Updated glob and js-yaml packages (Dec 10, 2025)
- **Content:** Fixed typo in "Your Best Skill Isn't Knowing Everything" post (Nov 21, 2025)
- **Content:** Fixed broken link in "A Guide to Bash Aliases" post (Sep 28, 2025)
- **Content:** Fixed typos in "Guide to Zsh Aliases" (Sep 28, 2025)

### Removed

- **Dependency Cleanup:** Removed the unused eleventy-plugin-youtube-embed package to simplify dependencies.
- **Repository Cleanup:** Removed empty artifact files (beaubremer-blog-tailwind@1.0.0, eleventy, tailwindcss) from repository (Feb 7, 2026)




## [Unreleased]


### Added



* **Code Syntax Highlighting:** Implemented syntax highlighting for code blocks using the @11ty/eleventy-plugin-syntaxhighlight plugin to improve readability of technical posts.
* **Changelog:** Created this CHANGELOG.md to track changes to the blog's codebase.


### Changed



* **Security Policy:** Updated the style-src directive in the Content Security Policy (netlify.toml) to allow stylesheets from https://unpkg.com. This was necessary to load the PrismJS theme for syntax highlighting.


### Removed



* **Dependency Cleanup:** Removed the unused eleventy-plugin-youtube-embed package to simplify dependencies.