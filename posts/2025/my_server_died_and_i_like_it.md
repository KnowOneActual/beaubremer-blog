---
title: 'My Server Died and I like It :) : A Guide to Backups After a Crisis'
description:
  'A hard-won lesson in disaster recovery: why a professional backup strategy is easier than you think, and how to build
  one that works.'
date: 2025-11-30

tags:
  - tech
---

It is stressful when something you spent hours building suddenly breaks. You cannot SSH into your server, and you
realize you might have to start over. I went through this while setting up my website as a Tor Onion Service. It taught
me a lesson: **a project is not finished until you can back it up**.

Backups are not exciting, but they prevent a minor issue from becoming a disaster. Fortunately, a good backup plan is
easy and cheap.

## The gold standard: the 3-2-1 backup rule

The guiding principle for backups is the **3-2-1 rule**. It is simple, battle-tested, and effective:

- **3 Copies:** Keep **three** copies of your data. This includes your live version and two backups.
- **2 Media:** Store copies on **two** different types of media. For example, use your server's hard drive and an
  external drive.
- **1 Off-site:** Keep at least **one** copy in a different physical location.

The 3-2-1 rule protects you from deleting a file by mistake, or even losing your physical hardware. A backup plan sounds
excessive until it saves you.

## Building your layers: on-premises vs. off-premises

To follow the 3-2-1 rule, use a mix of local and off-site backups. Each serves a different purpose.

### On-premises (the quick restore)

Local backups are ones you control, like an external drive or a home server.

**Pros:** Fast restore speeds, no internet needed, and full control over your data.

**Cons:** Vulnerable to local disasters like fire or theft.

For developers, your main local backup is the copy of your code on your local computer. It is ready for use when needed.

### Off-premises (the disaster recovery)

Off-site backups are stored in a different physical location. For most people, this means the cloud.

**Pros:** Protects against local disasters and stays accessible from anywhere.

**Cons:** Slower restore speeds, requires internet, and relies on an outside company.

Cloud services like Google Drive, Dropbox, or Backblaze work well for files. For servers, automated cloud snapshots are
helpful.

## A practical example: backing up a Tor server

Let's apply this to a real project: the Tor site. I had built a multi-layered backup strategy without even realizing it.

### Layer 1: the code (off-premises & on-premises)

The first backup is **GitHub**. Every time I push code, I send a copy to an off-site server. My local machine holds the
local copy. GitHub covers the code, settings, and content.

### Layer 2: the server image (off-premises)

Cloud snapshots serve as a safety net. They back up the entire server, including settings and environments.

If the server is destroyed, a snapshot launches a new copy in minutes. The snapshot covers the server's state.

### Layer 3: the process (documentation)

My Emergency Runbook is a backup of the process. It explains how to rebuild everything on a new machine. Documentation
saves you when automation fails.

## Quality of life improvements

Here are a few tips to improve your backup strategy:

**Automate your backups:** Humans forget to run backups, but scripts do not. A snapshot schedule is a simple "set it and
forget it" solution. Choose a tool, set a schedule, and let it run.

**Test your backups:** A backup is only useful if you can restore it. Every few months, restore a file or a whole server
to a test environment. This ensures it works during a crisis.

**Use version control:** For code, Git is your most important tool. Commit often, push regularly, and avoid working
directly in production.

## The takeaway

A frustrating weekend of troubleshooting taught me how to build a resilient system. A backup plan does not need to be
complex. It just needs layers. One backup is good; two is better. Mixing local and cloud backups provides peace of mind.

When something breaks, you will be glad you prepared. It is worth the effort.
