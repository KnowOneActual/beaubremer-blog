---
title: "My Server Died and I like It :) : A Guide to Backups After a Crisis"
description: "A hard-won lesson in disaster recovery: why a professional backup strategy is easier than you think, and how to build one that actually works."
date: 2025-11-30
layout: "post.njk"
tags:
  - posts
  - development
  - devops
---

There's a unique feeling of dread that washes over you when something you've spent hours building suddenly breaks. That moment when you can't SSH into your server and you realize you might have to start all over. I just went through that entire cycle while setting up my personal website as a Tor Onion Service, and it taught me a valuable lesson: **a project isn't finished until you've figured out how to back it up**.

Having a solid backup strategy isn't the most glamorous part of development, but it's the only thing that stands between a minor inconvenience and a total catastrophe. The good news? A professional-level backup plan is easier and cheaper than you think.

## The Gold Standard: The 3-2-1 Backup Rule

The guiding principle for any backup strategy is the **3-2-1 Rule**. It's simple, battle-tested, and robust:

- **3 Copies:** Keep **three** copies of your important data. One is your live, production version, and two are backups.
- **2 Media:** Store your copies on at least **two** different types of media (e.g., your server's hard drive and an external hard drive, or cloud storage).
- **1 Off-Site:** Keep at least **one** of those copies in a different physical location.

This rule protects you from almost any scenario—from a simple accidental file deletion to your house burning down. It sounds paranoid until the day it saves you.

## Building Your Layers: On-Premises vs. Off-Premises

To follow the 3-2-1 rule, you'll use a mix of on-premises and off-premises backups. Each serves a different purpose.

### On-Premises (The Quick Restore)

These are backups you physically control, like an external hard drive or a home server (NAS).

**Pros:** Fast restore speeds, no internet required, and full control over your data.

**Cons:** Vulnerable to local disasters like fire, flood, or theft.

For developers, your primary on-premises backup is often the copy of your code on your **local computer**. It's right there, ready to go when you need it.

### Off-Premises (The Disaster Recovery)

These are backups stored in a different physical location. For most of us, this means the cloud.

**Pros:** Protects against local disasters and accessible from anywhere with an internet connection.

**Cons:** Slower restore speeds, requires internet, and relies on a third-party company.

Cloud services like Google Drive, Dropbox, or dedicated backup services like Backblaze are excellent for files. For servers, this is where **automated snapshots** from your cloud provider (like Google Cloud, AWS, or DigitalOcean) become invaluable.

## A Practical Example: Backing Up a Tor Server

Let's apply this to a real project: the Tor site I mentioned earlier. Turns out, I'd actually built a multi-layered backup strategy without even realizing it.

### Layer 1: The Code (Off-Premise & On-Premise)

The first and most important backup is **GitHub**. Every time I run `git push`, I'm sending a complete, versioned copy of my code to an off-site location. The copy on my local machine serves as my on-premise backup. This covers the application itself—the logic, the configurations, the content.

### Layer 2: The Server Image (Off-Premise)

The **automated Google Cloud snapshot** I set up is the ultimate safety net. It backs up the *entire server*: the operating system, Nginx, Tor, all the configurations, the Python virtual environment—everything. If the server is ever completely destroyed, I can launch a new, perfectly configured copy from a snapshot in minutes. This covers the *state* of the server.

### Layer 3: The Process (Documentation)

The **Emergency Runbook** I wrote is a different kind of backup—it's a backup of the *process*. If I had to switch cloud providers or start on a completely new machine, that document tells me exactly how to rebuild everything from scratch. Documentation might not feel like a backup, but it's the one that saves you when all your automated systems fail.

## Quality of Life Improvements

Once you have the basics in place, here are a few pro tips to make your backup strategy bulletproof:

**Automate Everything:** The single best thing you can do is automate. Humans forget to run backups. Scripts don't. The Google Cloud snapshot schedule I created is a perfect "set it and forget it" solution. Pick a tool, set a schedule, and let it run.

**Test Your Backups:** A backup is only good if you can restore from it. Once every few months, try to restore a file or—if you're feeling brave—an entire server from your backup to a test environment. It's the only way to be sure it works when you actually need it.

**Version Control is Non-Negotiable:** For any project involving code, `git` is the most important backup tool you have. Commit often, push regularly, and never work directly in production without a safety net.

## The Takeaway

What started as a frustrating weekend of troubleshooting ended up being a masterclass in building a resilient system. You don't need a complex or expensive plan—you just need layers. One backup is good. Two is better. A mix of on-premise and off-premise backups is what will let you sleep at night.

The next time something breaks (and it will), you'll be glad you took the time to plan for it. Trust me on this one.