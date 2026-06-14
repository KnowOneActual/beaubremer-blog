---
title: 'From Joke to Playground: The Story of profitandego.com'
description:
  "A joke domain name becomes a web development playground. This post tells the story of profitandego.com, an 'Ego as a
  Service' site built for laughs and learning."
date: 2025-07-18

tags:
  - tech
---

It all started with a domain name.

Years ago, some friends and I came up with `profitandego.com` on a beach. It captured the strange dance of modern
ambition. I sat on the domain for years, wanting to use it but not knowing how.

### The Spark: Ego as a Service (EaaS)

While reading about SaaS, an idea hit me. I wanted to build an "Ego as a Service" (EaaS) page. The concept was simple: a
button that serves up over-the-top corporate praise.

I built a single-page site using HTML, Tailwind CSS, and JavaScript. I wanted a sleek look to contrast with the absurd
content. Within a day, the first version was live with funny quotes like, "Your strategic vision is so clear, it's
practically a premonition."

### Expanding the Joke

The site was fun, but the joke could go further. I made up funny pricing tiers with three plans: "The Intern," "The
Manager," and "The CEO."

Each plan offered silly services, from a "Like Bot" to a "Rival Roast Report." This mimic of the SaaS world added to the
joke.

### The Logo Saga

Every company needs a logo, even a fake one. Designing it became a tricky task. When early designs did not fit, I made a
new one. An ascending bar chart felt like the perfect gag for "profit."

But getting it to look right on the page was hard. After struggling with padding and alignment, I chose a different
path. I embedded the logo directly into the HTML as an SVG.

I had never done this, but I recalled reading about it. With help from Google, I figured it out. Now, the logo loads
fast, scales well, and avoids broken links. It reminded me that the simplest path is often the best.

### A Dose of Reality: Securing the Site

Once the site was running, I ran a security scan out of curiosity. It failed.

The project offered a chance to learn about security headers. A report from
[securityheaders.com](https://securityheaders.com) showed my site was missing them. Since I host the site on Cloudflare,
I resolved this by creating a `_headers` file.

This file defines security headers like Content-Security-Policy and X-Frame-Options. It keeps configuration near the
code. A new scan confirmed the fix with an "A+" rating.

### An Unexpected Side Effect

A strong Content-Security-Policy (CSP) had a side effect: the "Validate Me" button stopped working. The CSP did its job
by blocking inline JavaScript inside `index.html`.

To fix this, I refactored the code. I moved the JavaScript from `index.html` into a `script.js` file. Once the HTML
pointed to the new script, the button worked again. The site is now secure and better organized.

### Why Bother?

As the site's [README file on GitHub](https://github.com/KnowOneActual/profitandego_website/blob/main/README.md) says,
this project is a playground. It is a low-stakes place to try new ideas, test Cloudflare features, and build things for
fun.

It is a reminder that not every project needs to be serious. Sometimes, the best way to learn is simply by building.
