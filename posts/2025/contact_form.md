---
title: 'Debugging a stubborn contact form'
description:
  'How I debugged a contact form using Netlify Functions, Cloudflare Turnstile, and Content Security Policies.'
date: 2025-06-11
tags:
  - tech
---

### Debugging a stubborn contact form

Have you ever struggled to get a simple contact form to work? I recently spent time debugging the contact form on my
website. It took many steps, but I finally solved the problem.

If your form, CAPTCHA, or emails are broken, this guide might help you. Here is how I found and fixed the issues.

**The initial setup**

My goal was simple. I wanted a clean contact form on my website. It needed a CAPTCHA to block bots and a system to email
me. I chose Netlify for hosting, Cloudflare Turnstile for the CAPTCHA, and Resend for emails.

The setup required a few parts:

- An HTML form.
- A Netlify serverless function in JavaScript to check the CAPTCHA and send emails.
- Client-side JavaScript to validate and submit the form.
- Netlify environment variables to store API keys.

This seemed simple, but it did not work.

**The first signs of trouble**

The site looked great with Tailwind CSS and a Three.js background animation. But the contact form did not work. The
CAPTCHA widget did not load, and no emails arrived.

This problem started my debugging process. I checked several areas to find the cause:

- **Browser Developer Tools**: I checked the console for errors and monitored network requests.
- **Netlify Deployment Logs**: I checked the build logs to ensure the function deployed.
- **Cloudflare Turnstile Dashboard**: I checked the site keys and settings.
- **Resend Logs**: I checked if the function sent requests to Resend.
- **HTTP Headers**: I edited `netlify.toml`. A strict security policy can block scripts.
- **Environment Variables**: I checked that the function could access the API keys.
- **Git Branches**: I made sure I deployed the correct branch.

**What I learned**

During this process, I learned several key lessons:

- **Script Order**: The order of scripts in `index.html` affected loading. Loading Three.js before the main script fixed
  the page.
- **Security Policies**: Security policies can block needed resources like Turnstile and analytics.
- **Serverless Functions**: Cloud functions are hard to debug. Netlify function logs helped find the errors.
- **Deployment Flow**: Sometimes local changes did not reach the live site. Good Git practices helped.
- **Console Errors**: Even small console errors provide clues. Reading them saves time.

**The sweet taste of success**

After testing many changes and checking logs, the form worked. The issues included a missing script tag, a strict
security policy, and deployment errors.

Seeing the CAPTCHA work and getting the first email was great.

**Tips for your own debugging adventures**

If you are debugging a contact form or a web feature, these tips can help:

- **Work systematically**: Check logs, change one variable, and make small updates.
- **Use developer tools**: Learn to use the Console and Network tabs. They show helpful details.
- **Read guides**: The docs for Netlify, Turnstile, and Resend show the correct steps.
- **Ask for help**: Online forums are helpful. State your problem and what you tried.
- **Celebrate progress**: Acknowledge small wins to stay motivated.

**Learning continues**

Web development changes quickly. New challenges will bring new chances to learn.
