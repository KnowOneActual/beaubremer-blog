---
title: "Building a Better Toolbox: A Simple IP Planner for Live Events"
description: "An AV-focused utility that not only calculates IP subnets but also includes a device planner. Assign specific gear to IP addresses and generate an organized network list, perfect for complex show environments."
date: 2025-06-22
layout: "post.njk"
tags:
 - project
 - live-production
 - utility
 
---


Anyone who has set up a network for a show knows the routine. You start with a list—maybe on a notepad, maybe in a spreadsheet—of all the gear that needs an IP address. The audio console, the lighting desk, the stage rack, the video switcher, the RF scanner, the system processor... the list goes on. It’s not just about avoiding conflicts; it's about creating a logical, easy-to-troubleshoot system.

While there are plenty of powerful subnet calculators online, I've always found they're either too complex for a quick on-site check or too generic. They'll give you the network range and broadcast address, but they won't help you map that ULX-D Rack to .101 and the DiGiCo SD12 to .50.

That gap is what led to my latest little project: the **AV IP Subnet Calculator**. It was a quick build, but it solves a particular problem: it’s a simple utility for live event technicians to plan out IP addresses for their gear quickly.


#### More Than a Calculator, It's a Planner

The goal wasn't just to crunch the numbers on a CIDR range. The goal was to create a usable plan. The tool has two main parts:



1. **The Calculator:** You plug in a starting IP address and a subnet size (using a slider or a number input), and it immediately displays the key information: network address, broadcast address, usable host range, and the total number of available hosts. No fluff, just the facts.
2. **The Device Planner:** This is where it becomes an *AV* tool. Below the calculator, you can list out your equipment. Name a device (e.g., "Soundcraft Vi1000"), say how many IP addresses it needs, and click "Add." The tool instantly assigns it the next available IP address from the range you defined.

You can continue this for all your gear, and in seconds, you have a clean, ordered list of your entire show network. It's the digital version of that piece of paper you were going to use anyway, but it's faster and less prone to typos. When you're done, a "Copy List" button formats the whole plan so you can paste it into your show documentation.


#### The Tech Behind It: Keeping It Simple

For a tool like this, speed and simplicity are key. It needs to load instantly on a phone or a laptop with spotty backstage Wi-Fi. That's why I built it as a single, self-contained HTML file with no complex frameworks.



* **HTML:** The foundation is a straightforward HTML structure.
* **Tailwind CSS:** For styling, I pulled in Tailwind via its CDN. This allows you to build a clean, modern UI with utility classes directly in the HTML, which is ideal for small projects where you don't want a separate stylesheet or a build step.
* **Vanilla JavaScript:** All the logic is handled by plain JavaScript, running right in the browser. No dependencies, no frameworks. This keeps the app incredibly lightweight.

The core of the calculator involves a bit of bitwise manipulation to handle the IP addresses. JavaScript doesn't have native IP address functions, so you can convert the familiar 192.168.1.100 format into a 32-bit integer. This makes all the subnet math much easier.

Here’s a peek at the helper functions that do the conversion:

```

const ipToLong = (ip) => { \
  return ip.split('.').reduce((acc, octet) => (acc &lt;< 8) + parseInt(octet, 10), 0) >>> 0; \
}; \
 \
const longToIp = (long) => { \
  return [(long >>> 24), (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.'); \
}; \

```


Once the IPs are numbers, calculating the network and broadcast addresses is straightforward. The rest of the code listens for user input, runs the calculations, and updates the display in real-time.


###3 A Tool That Works

This wasn't a project that required weeks of development, and that's the point. It was about identifying a small, recurring friction point in a workflow and building a sharp, simple tool to solve it. It's a perfect example of how a little bit of code can go a long way in our industry.

You can check out the [AV IP Subnet Calculator here](http://docs.google.com/link-to-your-app). I hope you find it as helpful as I do.
