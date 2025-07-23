<p align="center">
  <img src="img/favicon/favicon.svg" alt="alt text" width="200">
</p>

# Blog & Personal Writing Space

Welcome to the GitHub repository for my personal blog, [blog.beaubremer.com](https://blog.beaubremer.com). This project is a standalone site built with the static site generator Eleventy.

This blog serves as a space for my writing and a practical playground for exploring web development best practices, from performance optimization to security hardening.

## Why Eleventy?

After setting up my main portfolio, I wanted a simple, modern, and maintainable platform for a content-focused blog. I chose **Eleventy (11ty)** [11ty.dev](https://www.11ty.dev/) for a few key reasons:

  * **Simplicity and Flexibility:** Eleventy is an un-opinionated static site generator that doesn't lock you into a heavy framework. This was perfect for a straightforward, content-focused blog.
  * **JavaScript-Based:** The entire configuration is done in plain JavaScript (`.eleventy.js`), which made it comfortable and accessible to work with.
  * **Performance & Security by Default:** Eleventy generates pre-built, static HTML files. This means there's no database to hack and no complex server-side code running on every page view, resulting in a site that is incredibly fast and secure out of the box.

## Key Features & Upgrades

A website is never truly "finished." I've implemented several powerful features to improve performance, streamline my writing workflow, and enhance the site's overall quality.

  * **Custom Date Filters:** To ensure a clean and consistent look for post dates (e.g., "June 21, 2025"), I implemented a custom Eleventy filter using the **Luxon** library for reliable date formatting. This keeps my templates clean and ensures all dates are styled uniformly.
  * **Reusable Shortcodes:** To avoid pasting messy `<iframe>` code every time I want to embed a video, I created a custom `{% youtube %}` shortcode. Eleventy sees this tag in my Markdown files and automatically replaces it with the full, optimized embed code during the build process.
  * **Automatic Image Optimization:** I'm using the official **`@11ty/eleventy-img`** plugin to automatically optimize images. When I add an image, the plugin creates multiple smaller sizes, converts them to modern formats like **WebP**, and generates the `<picture>` element. This ensures browsers only download the most efficient image size, dramatically improving page load speed and user experience.

## A Security-First Approach

While static sites are secure by default, I took extra steps to harden the blog against modern web vulnerabilities using a `netlify.toml` file to define custom HTTP security headers.

  * **Content Security Policy (CSP):** I implemented a strong CSP that acts like a bouncer, maintaining a strict guest list of allowed resources (scripts, styles, fonts). It explicitly whitelists trusted sources like the Tailwind CSS CDN and Google Fonts, while blocking insecure plugins like Flash entirely.
  * **Other Essential Headers:** For a layered defense, I also added:
      * **Strict-Transport-Security (HSTS):** Ensures browsers only communicate with my site over a secure HTTPS connection.
      * **X-Frame-Options:** Set to `DENY` to prevent clickjacking attacks.
      * **Permissions-Policy:** Locks down browser features the blog doesn't need, like the microphone, camera, or USB devices.

The result is a fast, modern blog with an A+ security rating that is completely decoupled from my main portfolio, allowing me to focus on creating content.
