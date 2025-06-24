---
title: "Why I Chose Eleventy for My Blog (And How I Secured It)"
description: "Eleventy awesome framework for My Blog)"
date: 2025-06-11
layout: "post.njk"
tags:
  - posts
  - eleventy
  - security
  
---

#### After getting my main portfolio site into a stable, secure state, I decided it was time to add a blog. 

My core requirements were simple but non-negotiable: it had to be modern, straightforward to maintain, and—most importantly—built in a way that couldn't possibly break my main portfolio site during development.

This led me down the path of creating a completely separate, standalone blog site. Here’s a look at the "why" behind the tools I chose and the security precautions we took along the way. Why Eleventy? The "Keep It Simple" Philosophy

In today's landscape of complex JavaScript frameworks, I was looking for something simpler. After some research, I landed on Eleventy (11ty), a modern Static Site Generator (SSG).

It was the perfect choice for a few key reasons:

Simplicity and Flexibility: Eleventy doesn't lock you into a heavy framework like React or Vue. It's incredibly flexible and un-opinionated, letting you work with simple templates and data. This felt perfect for a straightforward, content-focused blog. JavaScript-Based: The entire configuration is done in plain JavaScript (.eleventy.js), which felt comfortable and accessible. There was no need to learn a new programming language just to build a blog. Peak Performance & Security: By default, Eleventy generates pre-built, static HTML files. This means there's no database to hack and no complex server-side code running on every page view. The result is a site that is incredibly fast and secure right out of the box.

#### A Security-First Approach

A static site is secure by default, but I wanted to take it a step further and ensure it was hardened against modern web vulnerabilities. The main tool for this was Netlify.toml file placed at the root of the project, which allowed me to define custom HTTP security headers.

Here are the key security layers we implemented:

#### 1. Content Security Policy (CSP): The Digital Bouncer

The most important header we added was a strong Content Security Policy. Think of a CSP as a bouncer for your website—it maintains a strict guest list of all the resources (scripts, styles, fonts, etc.) that are allowed to load on the page. Anything not on the list gets blocked.

My policy explicitly whitelists trusted sources for each type of content:

script-src: Only allows scripts from my domain and the trusted Tailwind CSS CDN.
style-src: Only allows stylesheets from my domain and Google Fonts. 
font-src: Only allows fonts to be downloaded from Google's font servers (fonts.gstatic.com). 
object-src 'none': Completely blocks older, insecure plugins like Flash from ever running.

The 'unsafe-inline' Caveat: The one necessary compromise was allowing 'unsafe-inline' for styles. This was required for the Tailwind CSS CDN script to work, as it dynamically injects styles into the page. However, the risk is heavily mitigated because the rest of the policy still locks down the overall source of any scripts.

#### 2. Other Essential Headers:

Beyond the CSP, we added several other headers for a layered defense:

Strict-Transport-Security (HSTS): Ensures that browsers only ever communicate with my site over a secure HTTPS connection. X-Frame-Options: Set to DENY, this completely prevents my site from being embedded in an iframe on another website, which is the primary defense against "clickjacking" attacks. Permissions Policy: This is a modern header that allows me to lock down browser features that my blog has no reason to use, such as the microphone, camera, USB devices, and payment APIs.

#### The Result:

The outcome is exactly what I was hoping for: a fast, modern blog with an A+ security rating that is completely decoupled from my main portfolio. The workflow is simple—I write a post in a Markdown file, push it to GitHub, and Netlify handles the rest. It’s a setup I can trust while I focus on writing content and my job search.