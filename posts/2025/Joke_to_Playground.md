---
title: "From Joke to Playground: The Story of profitandego.com"
description: "What starts with a joke domain name turns into a hands-on web development playground. This is the story of profitandego.com, an 'Ego as a Service' site built for laughs and learning."
date: 2025-07-18

tags:
  - tech
---

It all started with a domain name.

A couple of friends and I came up with `profitandego.com` years ago on a Lake Michigan beach. It perfectly captured the strange, satirical dance of modern ambition. I'd been sitting on this domain for years, and while I wanted to do something with it, I just didn't know what.

### The Spark: Ego as a Service (EaaS)

While reading an article about SaaS, it hit me out of nowhere. The idea stuck out for its simplicity and humor: an "Ego as a Service" (EaaS) page. The concept was simple: a single button that, when clicked, serves up a dose of over-the-top corporate praise.

I put together a single-page site using HTML, Tailwind CSS for styling, and vanilla JavaScript. The goal was to make it look sleek and modern, a fun contrast to the absurdity of the content. Within a day, the first version was live, complete with affirmations like, "Your strategic vision is so clear, it's practically a premonition."

### Expanding the Joke

The site was fun, but it felt like the joke could go further. That's when I came up with the idea for satirical pricing tiers. I fleshed out three plans: "The Intern," "The Manager," and "The CEO," each offering increasingly ridiculous services, from a "Like Bot" to a "Rival Roast Report." This added a new layer to the satire, mimicking the SaaS world we've become so familiar with.

### The Logo Saga

Every good (or in this case, fake) company needs a logo, and this turned into a surprisingly tricky part of the project. After a few initial designs didn't quite fit the site's aesthetic, I decided to create something new. The "Ascending Bar Chart" felt like the perfect visual gag for "profit."

However, getting it to look right on the page was a challenge. After struggling with image padding and alignment, I landed on a much better solution: embedding the logo directly into the HTML as an SVG. I'd never done this before, but I remembered read about it a couple of months back. With a little help from Google, I figured it out. This meant it would load instantly, scale perfectly, and I'd never have to worry about broken image links. It was a great reminder that sometimes the most robust solution is also the simplest.

### A Dose of Reality: Securing the Site

With the site up and running, I decided to run it through a security scanner out of curiosity. The result? A failing grade.

While the site is just for fun, it was a perfect learning opportunity. The report from [securityheaders.com](https://securityheaders.com) showed I was missing key instructions that tell browsers how to handle my site's content securely. Since the site is hosted with Cloudflare, the fix was elegant and simple: I created a `_headers` file.

This single file allowed me to define all the necessary security headers, like Content-Security-Policy and X-Frame-Options, keeping the configuration right alongside my code. After pushing the file, a new scan confirmed the fix: an "A+" rating!

### An Unexpected Side Effect

Implementing a strong Content-Security-Policy (CSP) had one immediate side effect: the "Validate Me" button stopped working. This wasn't a bug, but rather the CSP doing its job perfectly. It blocked the "inline" JavaScript I had originally written directly in my `index.html` file.

The solution was to refactor the code. I moved the JavaScript from the `index.html` file into its own `script.js` file. After updating the HTML to reference the new external script, the button was back in business, and the site was more secure and better organized for it.

### Why Bother?

As the site's [README file on GitHub](https://github.com/KnowOneActual/profitandego_website/blob/main/README.md) says, this project is a playground. It's a low-stakes environment where I can try out new ideas, test Cloudflare features, and just have fun building something. It's a reminder that not every project needs to be a serious venture. Sometimes, the best way to learn is by building something for the joy of it.