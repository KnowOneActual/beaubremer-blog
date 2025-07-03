---
title: "From Bright Idea to Browser: My Journey Building a Network Monitor (and What I Learned When Things Went Sideways)"
description: "A candid look at building a web-based network monitor, the challenges I faced, and the invaluable lessons learned through trial and error."
date: 2025-07-02
layout: "post.njk"
tags:
  - posts
  - troubleshooting
  - network
  
---

Ever wondered what goes on behind the scenes when you interact with a website? Let's dive into a common challenge in web development and my journey to build a useful tool, even when my initial plans hit a few snags.

Hey everyone! Beau here, your friendly neighborhood tech enthusiast, sharing a peek behind the curtain of my latest web development adventure. If you've poked around my site lately, you might have noticed a shiny new "Network Latency Monitor" in my [My Projects](https://beaubremer.com/#my_projects). It’s not just a cool tool; it’s a story about a great idea, a few head-scratching problems, and the beautiful mess of trial and error that makes development so rewarding (and occasionally, frustrating!).

### The Spark: A Speed Test with "Wow Factor"

Initially, I had this neat idea: a network speed test. I thought, "How cool would it be to have a built-in speed checker right on my site?" It felt like a fantastic way to showcase my developing web development skills, my understanding of network principles, and just add a little bit of that interactive "wow factor." I drafted up a client-side version using JavaScript, complete with progress bars and even parallel connections for downloads and uploads. If you'd like to check it out [Network Speed Test](https://beaubremer.com/speed_test)

The initial results? Well, they were... interesting. My script would report a download speed of around 4 Mbps, while a commercial service like Speedtest.net would confidently tell me I was cruising at 400 Mbps! Clearly, something was off.

### Hitting the Wall: Why My Speed Test Wasn't Usable

After some troubleshooting, I realized the core limitation: building a truly accurate speed test with purely client-side JavaScript is incredibly difficult. Commercial speed tests utilize dedicated, high-performance servers distributed globally and employ complex techniques to thoroughly test your connection's capabilities. My simple script, hitting generic public endpoints like `httpbin.org`, just couldn't give me the results I was looking for.

It became clear: for all its "wow factor," if the numbers weren't accurate, the tool wasn't truly "usable." And if a tool isn't usable, it probably shouldn't be on the front page of your site!

### A Pivot! From Speed to Stability: The Network Latency Monitor

So, I had to make a decision. Scrap the idea entirely? Or pivot? I chose to pivot. Instead of chasing elusive bandwidth numbers, I decided to build a tool that *could* be accurate and useful within my constraints: a **Network Latency Monitor**.

The idea was simple: instead of measuring *how fast* data flows, let’s measure *how quickly* it responds and if it’s available. This highlights different, but equally important, networking skills – those related to troubleshooting, availability, and responsiveness. Latency, the time it takes for a signal to travel from one point to another, is a crucial indicator of network responsiveness and a great way to assess connectivity.

### The Journey Continues: New Code, New Headaches (Totally Normal!)

Building the latency monitor wasn’t a straight line from idea to completion, either. This is where the "trial and error" comes in – and why it's so vital in development!

1.  **The Silent Startup:** My initial draft of the monitor wouldn't even start checking the default sites automatically. A quick dive into the console revealed a simple JavaScript error: `this.startMonitoringAll is not a function`. A quick rearrangement of code, and it was alive!
    * *What I Learned:* The browser console is your first and best friend for catching those tricky JavaScript errors right when your page loads. Always check it!
2.  **The Invisible Wall (CSP):** Once it was running, the default `https://` sites were showing as "Down." The console, my best friend during these times, screamed "Content Security Policy (CSP) blocking!" My `netlify.toml` file had a `connect-src` directive that was too strict, preventing my own site from connecting to external domains like Google or Cloudflare. This required a small but crucial tweak to my Netlify configuration, expanding the `connect-src` to allow all `https:` connections.
    * *What I Learned:* Content Security Policy is a powerful browser security feature. While essential for protection, it's also a common reason for external resource loading issues and requires careful configuration.
3.  **The Mixed-Up Protocols:** Next, I hit a snag with `http://` versus `https://` endpoints. My monitor, running on a secure `https://` site, was correctly blocking insecure `http://` requests (thank you, browser security!). But I also realized that if I tried to add `http://` URLs while testing locally (where my local server was `http://`), those `http://` URLs worked, but `https://` ones sometimes failed. This was a confusing dance between local environment behavior and deployed site behavior. The solution: stick firmly to `https://` for external monitoring and be very clear with users about this limitation.
    * *What I Learned:* Always be mindful of protocol differences (`http` vs. `https`) and how they behave in both local development and deployed environments. Browser security models are designed to keep users safe, even if they occasionally make development a little trickier!
4.  **The Reappearing Act:** Even after successfully deleting endpoints, they'd pop back up on refresh. It turns out that the monitor was loading a hardcoded list of defaults every time the page loaded, overriding my changes. Implementing `localStorage` resolved this issue, allowing the monitor to remember user-added or removed endpoints.
    * *What I Learned:* For persistent user preferences or data that should survive a page refresh, `localStorage` is a super handy browser API to remember things between sessions.

### My Big Takeaway: Embrace the Process!

This entire experience, from the ambitious (and slightly flawed) speed test to the fully functional latency monitor, reinforced some core beliefs about development:

* **You don't have to be perfect from the start.** Ideas evolve, and initial approaches might not be the final ones. It's all part of the learning curve.
* **Trial and error is not a sign of failure; it's the path to success.** Every error message, every unexpected behavior, is a clue leading you closer to a robust solution.
* **Debugging tools are your superpower.** The browser console, network tab, and HAR files were invaluable in understanding exactly *why* things weren't working.
* **Understanding constraints is key.** Knowing the limitations of free hosting and browser security wasn't a blocker; it shaped the project into something even better.

So, go ahead, check out the [Network Latency Monitor](https://beaubremer.com/network_latency_monitor) on my site! Add a few of your favorite sites, and see how it performs. And remember, every "bug" is just a puzzle waiting to be solved. I'm always keen to dive into new challenges and expand my understanding of web performance!

