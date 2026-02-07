# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog,

and this project adheres to Semantic Versioning.


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

- **Security:** Resolved CVE-2026-25547 vulnerability in brace-expansion dependency by updating to version 5.0.1 (Feb 7, 2026)
- **Build:** Fixed Tailwind CSS CLI compatibility issue by pinning to v3.x to resolve "command not found" error (Feb 7, 2026)
- **Dependencies:** Updated glob and js-yaml packages (Dec 10, 2025)
- **Content:** Fixed typo in "Your Best Skill Isn't Knowing Everything" post (Nov 21, 2025)
- **Content:** Fixed broken link in "A Guide to Bash Aliases" post (Sep 28, 2025)
- **Content:** Fixed typos in "Guide to Zsh Aliases" (Sep 28, 2025)

### Removed

- **Dependency Cleanup:** Removed the unused eleventy-plugin-youtube-embed package to simplify dependencies.



## [Unreleased]


### Added



* **Code Syntax Highlighting:** Implemented syntax highlighting for code blocks using the @11ty/eleventy-plugin-syntaxhighlight plugin to improve readability of technical posts.
* **Changelog:** Created this CHANGELOG.md to track changes to the blog's codebase.


### Changed



* **Security Policy:** Updated the style-src directive in the Content Security Policy (netlify.toml) to allow stylesheets from https://unpkg.com. This was necessary to load the PrismJS theme for syntax highlighting.


### Removed



* **Dependency Cleanup:** Removed the unused eleventy-plugin-youtube-embed package to simplify dependencies.