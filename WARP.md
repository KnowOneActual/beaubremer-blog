# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal blog built with **Eleventy (11ty)** static site generator, using **Tailwind CSS** for styling and deployed to **Netlify**. The blog emphasizes performance, security, and modern web development practices.

## Architecture & Key Components

### Static Site Generation (Eleventy)
- **Configuration**: `.eleventy.js` - Main configuration with custom shortcodes, filters, and plugins
- **Templates**: `_includes/` directory contains Nunjucks templates for layouts and partials
- **Content**: `posts/` directory contains blog posts written in Markdown
- **Build Output**: `_site/` directory (generated, not version controlled)

### Styling System
- **Tailwind CSS**: Utility-first CSS framework with custom configuration in `tailwind.config.js`
- **CSS Processing**: PostCSS configuration for autoprefixer and other transformations
- **Typography Plugin**: `@tailwindcss/typography` for rich text content styling
- **Build Process**: CSS is compiled from `src/css/tailwind.css` to `_site/css/style.css`

### Content Enhancement Features
- **Image Optimization**: `@11ty/eleventy-img` plugin automatically generates responsive images with WebP format
- **YouTube Embeds**: Custom `{% youtube %}` shortcode using `lite-youtube-embed` for performance
- **RSS Feed**: Generated using `@11ty/eleventy-plugin-rss`
- **Date Formatting**: Luxon library for consistent date display

### Security & Performance
- **Security Headers**: Defined in `netlify.toml` with strict CSP, HSTS, and other security policies
- **Performance**: Static generation eliminates server-side processing, optimized images, and minimal JavaScript

## Development Commands

### Start Development Server
```bash
npm start
```
Runs both Tailwind CSS watching and Eleventy development server in parallel using `npm-run-all`.

### Individual Watch Commands
```bash
# Watch and compile Tailwind CSS only
npm run watch:css

# Start Eleventy development server only
npm run watch:eleventy
```

### Production Build
```bash
npm run build
```
Compiles Tailwind CSS and builds the static site for production deployment.

## File Structure Conventions

### Content Organization
- **Blog Posts**: Place new posts in `posts/` directory with `.md` extension
- **Static Assets**: Images go in `img/` directory, automatically passed through to build
- **Templates**: Page layouts and includes in `_includes/` directory using Nunjucks syntax

### Build Assets
- **Generated Images**: Optimized images are automatically placed in `_site/img/`
- **CSS Output**: Compiled CSS is written to `_site/css/style.css`
- **External Dependencies**: lite-youtube CSS/JS files are copied to `assets/` directories

## Custom Features Usage

### Image Shortcode
```markdown
{% image "img/example.jpg", "Alt text description", "(min-width: 768px) 50vw, 100vw" %}
```
Automatically generates responsive images with WebP format and proper `<picture>` element.

### YouTube Shortcode
```markdown
{% youtube "VIDEO_ID", "Optional play label" %}
```
Creates performant YouTube embeds using lite-youtube-embed.

### Date Formatting
```nunjucks
{{ post.date | readableDate }}
```
Formats dates as "LLLL dd, yyyy" (e.g., "January 15, 2024") using Luxon.

## Deployment Configuration

### Netlify Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `_site`
- **Security Headers**: Configured in `netlify.toml` with comprehensive CSP and security policies
- **Content Types**: Handles static HTML, CSS, JS, and optimized images

### Environment Variables
No environment variables required for basic operation. All external dependencies are handled through CDN links defined in the CSP.

## Development Notes

### Adding New Posts
1. Create new `.md` file in `posts/` directory
2. Include front matter with title, date, and tags
3. Use custom shortcodes for images and YouTube embeds
4. Development server will automatically rebuild and reload

### Modifying Styles
1. Edit Tailwind classes directly in templates or posts
2. For custom styles, modify `src/css/tailwind.css`
3. Tailwind config in `tailwind.config.js` includes all content sources

### Image Handling
- Place original images in `img/` directory
- Use `{% image %}` shortcode in posts for automatic optimization
- Original images are passed through; optimized versions generated separately

### Security Policy Updates
- Modify `netlify.toml` for CSP or security header changes
- Test changes against external resources (fonts, CDNs, embeds)
- Ensure new external resources are whitelisted in CSP directives
