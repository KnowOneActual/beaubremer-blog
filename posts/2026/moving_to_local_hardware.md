---
title: 'Moving to Local Hardware'
description: 'How a Tor onion service that started on Google Cloud ended up on a Raspberry Pi sitting on my desk — and why that move was worth it.'
date: 2026-04-15

tags:
  - tech
  - homelab
  - linux
  - tor
  - privacy
---

### Moving to Local Hardware

This post is a follow-up to [Setting Up a Site as a Tor Onion Service](/posts/site-into-a-tor-onion-service/), where I
walked through hosting a Flask app as a `.onion` address on a Google Cloud Platform instance. That setup worked well.
This one is about why I moved it off the cloud entirely — and what that actually took.

---

#### Why local at all?

The GCP e2-micro instance wasn't the problem. It was reliable, cheap, and easy to manage. But the more I worked on
the project, the more I wanted to take it further. Hosting a privacy-focused service on someone else's infrastructure
has a certain irony to it. Tor handles the network layer, sure — but the data itself was still sitting on a server I
didn't physically own.

Moving to local hardware felt like the logical conclusion. Not because the cloud failed, but because the project
deserved to live somewhere where I had complete control.

---

#### Full hardware control

There is a different quality to knowing that the code is running on a physical board on my desk. No shared tenancy.
No hypervisor underneath. No data center policies I didn't agree to.

For a project built around privacy, that matters. Tor gives you a strong anonymity layer at the network level. But
pairing it with hardware you actually own closes the loop. The threat model gets simpler when fewer parties are
involved.

---

#### The hardening that came with it

Migrating to local hardware wasn't just a copy-paste job. It was an excuse to fix things I had been putting off.

- **SSH key-based authentication:** Password logins are disabled entirely. The only way in is a specific
  cryptographic key on my physical machine. Brute-force attempts go nowhere.
- **Dedicated admin user:** I stopped using a root login and created a restricted administrative account with only
  the permissions it actually needs.
- **Absolute paths everywhere:** Local hardware running services via `systemd` will not respect `~/` shortcuts when
  tasks run as different users. Learned that the hard way. Everything now uses full absolute paths in deployment
  scripts.
- **Environment stability:** ARM architecture on a Raspberry Pi means setting up architecture-specific Python
  virtual environments. Sorting out `locales-all` and getting the `venv` running cleanly took some troubleshooting,
  but it was the same class of problem as any new deployment target.

---

#### Keeping the same .onion address

This was the part I was most worried about. A `.onion` address is generated from a cryptographic key pair that Tor
creates when the service first starts. If those keys are lost, the address is gone permanently.

Fortunately, backing up and migrating those identity keys is straightforward once you know where they live. The
private key for the hidden service lives in the `HiddenServiceDir` you configured in `torrc`. Copy the entire
directory, restore it on the new host, restart Tor — same address, different machine.

The **[Secure Image Cleaner](http://vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion/cleaner.html)**
*(Tor required)* kept its address through the whole migration without interruption.

---

#### What this project has actually been

What started as a curiosity about Tor and Flask has turned into a running education in Linux administration,
server hardening, and network security. Each phase of the project — [initial setup on GCP](/posts/site-into-a-tor-onion-service/),
then migration to local hardware — added a layer of real-world understanding that a tutorial alone wouldn't have
given.

Homelab projects work that way. The friction is part of it.

---

#### A few things worth noting if you follow along

- Back up your Tor hidden service keys *before* you decommission the old server. `HiddenServiceDir` is what you want.
- If you're running Python apps via `systemd`, test with absolute paths from the start. Debugging path issues in
  service units is not a fun afternoon.
- The Raspberry Pi's ARM architecture requires using a virtual environment built on that machine — don't just copy
  a `venv` from an x86 host.

---

*This is part of an ongoing series. The original post on setting up the Tor onion service is
[here](/posts/site-into-a-tor-onion-service/).*
