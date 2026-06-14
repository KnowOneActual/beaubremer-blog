---
title: 'Moving to Local Hardware'
description:
  'How a Tor onion service that started on Google Cloud ended up on a Raspberry Pi sitting on my desk - and why that
  move was worth it.'
date: 2026-04-15

tags:
  - tech
  - homelab
  - linux
  - tor
  - privacy
---

### Moving to Local Hardware

This post is a follow-up to [Setting Up a Site as a Tor Onion Service](/posts/site-into-a-tor-onion-service/). There, I
showed how to host a Flask app as a `.onion` site on a Google Cloud Platform instance. That setup worked well. This post
is about why I moved it to my own hardware - and what that move required.

---

#### Why build a local server?

The GCP e2-micro instance worked well. It was reliable, cheap, and easy to manage. But the more I worked on the project,
the more I wanted to expand it. Hosting a privacy service on someone else's servers felt wrong. Tor secures the network,
but the data sat on a server I did not own.

Moving to local hardware was the next step. I wanted complete control over the machine.

---

#### Full hardware control

Knowing that the code runs on a physical board on my desk changes things. I do not have to share the machine. There is
no hypervisor or server farm policy.

For a privacy project, this is key. Tor secures the network layer. But pairing it with your own hardware completes the
setup. The security model is simpler with fewer parties involved.

---

#### The hardening steps

Migrating to local hardware required real work. It gave me a chance to fix things I had been putting off.

- **SSH key authentication:** Password logins are disabled. You need a cryptographic key on my machine to log in. This
  stops brute-force attacks.
- **Dedicated admin user:** I disabled root login. I created a restricted admin account with limited permissions.
- **Absolute paths:** Local services run by `systemd` do not respect `~/` shortcuts. I learned this the hard way.
  Everything now uses full absolute paths in deployment scripts.
- **ARM settings:** The Raspberry Pi uses ARM. I had to build Python virtual environments on the Pi. Setting up locales
  and Python took some work, but it was a standard setup task.

---

#### Keeping the same .onion address

Migrating the address was my main concern. A `.onion` address comes from a cryptographic key pair that Tor creates. If
you lose those keys, the address is gone.

Moving these keys is easy once you know where they live. The private key lives in the `HiddenServiceDir` in your `torrc`
file. Copy that directory, restore it on the new host, and restart Tor. You get the same address on the new machine.

The **[Secure Image Cleaner](http://vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion/cleaner.html)** _(Tor
required)_ kept its address through the whole move.

---

#### What this project taught me

What started as a test of Tor and Flask became a great lesson in Linux administration, server hardening, and network
security. Each phase of the project taught me new skills. First was the
[initial setup on GCP](/posts/site-into-a-tor-onion-service/). Then came the move to local hardware. The hands-on work
taught me much more than a simple tutorial.

Homelab projects work that way. The challenges are part of the learning process.

---

#### A few tips if you try this

- Back up your Tor hidden service keys before you stop the old server. You need the `HiddenServiceDir`.
- If you run Python apps via `systemd`, use absolute paths from the start. Debugging path issues in service files is not
  fun.
- The Raspberry Pi uses ARM. Build your virtual environment on that machine. Do not copy a `venv` from an x86 host.

---

_This is part of an ongoing series. The original post on setting up the Tor onion service is
[here](/posts/site-into-a-tor-onion-service/)._
