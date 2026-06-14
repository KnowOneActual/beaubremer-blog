---
title: 'Building a Better Toolbox: A Simple IP Planner for Live Events'
description: 'An AV tool to plan IP subnets and organize device networks for live events.'
date: 2025-06-22

tags:
  - networking
---

Setting up a show network follows a common routine. You start with a list of gear needing IP addresses. People often
write this list on paper or spreadsheets. The list includes audio consoles, lighting desks, video switchers, RF
scanners, and system processors.

Good planning prevents IP conflicts. It also makes troubleshooting easier.

Most online subnet calculators are too complex or generic for quick checks. They show the network range but do not
assign addresses to specific equipment.

To solve this, I built the **AV IP Subnet Calculator**. This simple tool helps live event techs plan IP addresses
quickly.

#### More than a calculator, it's a planner

The tool helps you build a device plan. It has two main parts:

1. **The Calculator:** Enter a starting IP and a subnet size. The tool displays the network, broadcast, host range, and
   total host count.
2. **The Device Planner:** Below the calculator, you can list your gear. Enter a name, specify how many IPs it needs,
   and click "Add." The tool assigns the next available addresses.

Add your gear to quickly create an ordered list of the network. This digital list is faster and more accurate than
paper. A "Copy List" button formats the plan for easy pasting into show files.

#### The technology behind the planner

Speed is key. The tool must load fast on poor backstage Wi-Fi. I built it as a single HTML file without complex
frameworks.

- **HTML:** The page uses a simple structure.
- **Tailwind CSS:** Tailwind styled the page via CDN. This builds a clean UI directly in HTML, avoiding extra files or
  build steps.
- **Vanilla JavaScript:** Plain JavaScript handles the math in the browser. Using no extra frameworks keeps the tool
  very small.

The tool uses simple math to handle IP addresses. Since JavaScript has no native IP tools, the code converts formats
like 192.168.1.100 into a number. This number makes subnet math much easier.

Here are the functions that convert the formats:

```

const ipToLong = (ip) => { \
  return ip.split('.').reduce((acc, octet) => (acc &lt;< 8) + parseInt(octet, 10), 0) >>> 0; \
}; \
 \
const longToIp = (long) => { \
  return [(long >>> 24), (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.'); \
}; \

```

Once the IPs are numbers, the tool calculates the network and broadcast addresses. The rest of the code listens for
input, runs calculations, and updates the screen.

#### A tool that works

This project focused on quickly solving a small, recurring problem. A tiny amount of code can greatly improve daily
work.

Try the tool at <https://beaubremer.com/ip_subnet_calculator>.
