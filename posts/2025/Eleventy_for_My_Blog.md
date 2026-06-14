---
title: 'Why I Chose Eleventy for My Blog (And How I Secured It)'
description: 'Eleventy awesome framework for My Blog)'
date: 2025-06-11

tags:
  - tech
---

#### How and why I built a secure blog

My core requirements were simple. The blog had to be modern and easy to maintain. It must not break my main site during
development.

So I built a separate blog. This post explains my choice of tools and security.

#### Why I chose Eleventy

I wanted a simple blog. I did not want a complex JavaScript framework. I chose Eleventy (11ty), a static site generator
(SSG).

Three main reasons:

- **Flexibility**: Eleventy does not lock you into React or Vue. You work with simple templates and data. This fits a
  basic blog.
- **JavaScript**: The setup uses plain JavaScript (`.eleventy.js`). You do not need to learn a new language.
- **Speed and safety**: Eleventy builds static HTML files. There is no database to hack. The site is fast and secure.

#### Safe by default

Static sites are safe by default. Still, I wanted to protect mine from web threats. I added a `netlify.toml` file at the
root to set custom HTTP headers.

I set up three main layers:

#### 1. Content Security Policy (CSP)

A Content Security Policy (CSP) was the most important header. A CSP acts like a bouncer. It lists allowed scripts,
styles, and fonts. The browser blocks other files.

It lists trusted sources for each type:

- **`script-src`**: Allows scripts from my domain and the Tailwind CDN.
- **`style-src`**: Allows styles from my domain and Google Fonts.
- **`font-src`**: Allows fonts from Google Fonts.
- **`object-src 'none'`**: Blocks older plugins like Flash.

**The inline styles caveat**: I allowed `unsafe-inline` for styles. The Tailwind script needs this to load styles. The
risk remains low since other rules block untrusted scripts.

#### 2. Other headers

Other headers add more safety:

- **Strict-Transport-Security (HSTS)**: Forces the browser to use HTTPS.
- **X-Frame-Options**: Set to `DENY` to block iframe embedding. This prevents clickjacking.
- **Permissions Policy**: Turns off browser features the blog does not use. This includes the camera and microphone.

#### The result

The result is a fast, safe blog. It is separate from my main site.

The workflow is simple. I write a post in Markdown. Then I push it to GitHub. Netlify builds and hosts the site. This
clean setup lets me focus on writing.
