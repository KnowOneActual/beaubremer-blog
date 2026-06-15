---
title: 'Building a Network Monitor: What I Learned When My Initial Plans Failed'
description:
  'An account of building a web-based network monitor, the challenges I faced, and the lessons learned through iterative
  troubleshooting.'
date: 2025-07-02
tags:
  - networking
---

Have you ever wondered what happens when you visit a website? I built a network monitor to find out. This post covers
the design and the changes I made to the code.

I recently built a tool to track network latency. You can check it out under
[My Projects](https://beaubremer.com/#my_projects).

The project started with a simple idea. However, I had to fix many
unexpected bugs. I learned a lot about networks and browser performance.

### The spark: a speed test

My first plan was to build a network speed test. I wanted to show how browser scripts interact with networks. The first
version used progress bars and parallel connections. You can see the speed test here:
[Network Speed Test](https://beaubremer.com/speed_test).

The test showed a download speed of 4 Mbps. A commercial site showed 400 Mbps. My script was not accurate.

### Why the speed test was not usable

I soon found a major problem. Measuring speed from a browser is hard. Professional tests use many fast, global servers.
They also use complex code. My script used public test sites like httpbin.org. It could not get correct speed data.

A speed test is useless if it is wrong. Useless tools do not belong on the home page.

### A pivot from speed to stability: the Network Latency Monitor

I decided to build a latency monitor instead. This tool does not measure bandwidth. It only tracks response times and
server status.

Latency is the time data takes to travel. It shows how fast a network responds. Building this tool helped me learn about
network health.

### Working through new code and deployment issues

Building the monitor brought new challenges. Fixing bugs is a normal part of coding.

1. **The Silent Startup:** The first draft did not load sites automatically. The console showed a script error.
   Rearranging the code fixed it.
   - _What I Learned:_ The browser console helps catch errors fast. Always check it first.
2. **Content Security Policy (CSP) Restrictions:** The sites appeared offline at first. The browser blocked my requests.
   My Netlify settings were too strict. Allowing all secure links fixed the issue.
   - _What I Learned:_ Security rules can block external sites. You must configure them carefully.
3. **Protocol Differences:** The monitor runs on secure HTTPS. It blocks insecure HTTP links. During local tests, HTTP
   worked but HTTPS failed. To prevent this, the monitor now uses HTTPS only.
   - _What I Learned:_ Local code can behave differently from live sites. Pay attention to URL protocols.
4. **State Persistence:** Deleted sites came back after a refresh. The script kept reloading the default list. I added
   localStorage to save changes.
   - _What I Learned:_ You can use localStorage to save user choices in the browser.

### Embracing the process

This project taught me a few main lessons:

- **Ideas change.** First plans are rarely final. Adjusting your goal is normal.
- **Errors help.** Every bug gives you clues. They guide you to the right solution.
- **Use tools.** The browser console and network tab show you why code fails.
- **Accept limits.** Working with hosting limits helped me build a better tool.

Try the [Network Latency Monitor](https://beaubremer.com/network_latency_monitor) on my site. You can add your own URLs
to test them. Every bug is a puzzle to solve. I plan to build more tools to test web speed.
