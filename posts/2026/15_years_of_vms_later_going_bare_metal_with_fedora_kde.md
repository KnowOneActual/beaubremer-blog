---
title: '15 Years of VMs Later: Going Bare Metal with Fedora KDE'
description:
  'Why formatting the drive & running Fedora KDE on bare metal beats WSL & local virtual machines for daily development.'
date: 2026-07-03
layout: 'post.njk'
tags:
  - linux
  - fedora
  - kde
  - workstation
---

For 15 years, I ran desktop Linux inside virtual machines. Whether I was on a MacBook Pro or a Windows laptop, Linux
only lived in VMware Fusion, VirtualBox, or WSL. It was a comfortable setup. I only ran bare-metal Linux on headless
CentOS & Debian servers, mostly because my daily work required proprietary office tools that didn't play nice with
open-source desktops.

Recently, I decided to flip things around. I wiped the drive & installed Fedora 44 KDE Plasma Edition directly on the
bare metal of my Dell Latitude. Now, Windows is the one relegated to a local virtual machine, running only when I need
it.

While making the jump to bare metal always brings compatibility worries, this configuration has worked well for me. It
takes some tuning. I've found a combination of utility programs that lets me operate inside a Windows-heavy office
environment without losing access to my developer tools.

---

### The Distro Choice: Why Fedora?

When planning this transition, I narrowed my options down to three server-tested distributions: Debian, openSUSE, &
Fedora. Debian is famously stable, but the frozen packages feel outdated on a daily driver laptop. I wanted newer
software without fighting the operating system.

openSUSE Leap moves too slowly, & their rolling Tumbleweed distribution requires too much daily upkeep for a laptop I
need to boot & use every single morning. I did try Arch Linux for a bit. It broke. To be fair, I caused most of the
breakage by editing configuration files I should have left alone, but that is the point; my computer shouldn't feel like
a second job.

Fedora KDE hits the sweet spot. You get fresh packages & modern security defaults without the fragility of a rolling
release. My Dell Latitude runs Linux kernel 7.0.12-201.fc44.x86_64, & the system hasn't suffered a single crash or
kernel panic in six months of daily use.

I want a stable, security-minded platform with an active user community, because desktop issues are a matter of when,
not if, regardless of the operating system you choose. Accepting that reality makes troubleshooting less annoying. A
distribution is a utility, not an identity. If something else fits my work style better next year, I'll switch without
hesitation.

---

### Desktop Workflow: KDE Plasma 6.7.0 & Kröhnkite

I chose the KDE Plasma spin over default GNOME because I prefer control over my desktop environment. Plasma 6.7.0 lets
me build a keyboard-driven workspace without adding third-party extensions. I deliberately keep my configurations
minimal. If this laptop is ever lost or stolen, I need to stand up a clean installation & get back to work within two
hours. That hard constraint stops me from spending days over-engineering my desktop.

- **Dynamic Tiling**: I use the Kröhnkite tiling extension for KWin6 because floating windows are messy. It took three
  days to build the muscle memory. Now, windows tile & resize themselves automatically, maximizing my 14-inch screen
  real estate.
- **Shortcuts & Navigation**: KRunner handles my application launching, system searches, & quick calculations. Pressing
  `Super + W` maps to the Present Windows effect, which provides an instant overview of all running applications. It's
  the fastest way to get around.
- **Desktop Widgets**: My desktop only runs two widgets: a fuzzy clock & my own Network Status Widget. I wrote the
  network widget while testing Plasma inside a VM, & now it runs natively on my host panel. It's simple.

---

### Aesthetics & Looks

Default icons & mouse pointers look cartoonish to my eye. I replaced them. The system runs the Tela Grey Dark icon theme
by vinceliuice to keep the interface clean without screaming neon colors. Because default KDE cursors felt thick &
clunky, I replaced them with the Apple Cursor Monterey pack to replicate the macOS styling I used for a decade.
JetBrains Mono Nerd Font at 11pt provides clean terminal readability.

---

### Surviving a Windows Office & Toolchain

Office compatibility is the main hurdle when you run bare-metal Linux in a corporate setting. My coworkers live in
Microsoft Word & Excel. To collaborate with them, I rely on a combination of native compatibility layers, light
virtualization, & macOS-aligned package management.

- **Document Compatibility**: OnlyOffice replaces LibreOffice. It parses 95% of incoming DOCX & XLSX files without
  altering the formatting. I don't have to rebuild page margins or text alignment before responding.
- **The Windows 11 VM**: For example, some spreadsheets require native Microsoft Excel macros. For those edge cases, I
  boot a Windows 11 Pro virtual machine configured through KVM & QEMU using the Virt-Manager interface. VirtualBox was
  sluggish, but KVM provides near-native performance. I can boot the VM, run the macro, & shut it down in under 45
  seconds.
- **CLI Package Management**: I install developer tools using Homebrew. Because I run Homebrew on my MacBook, using it
  on Fedora lets me synchronize my CLI utilities across both systems. This avoids waiting for official RPM updates or
  adding custom Copr repositories.
- **App Sandboxing & Updates**: Flatpaks containerize my desktop apps. Permissions are the only regular issue, but I
  resolve them in under a minute using Flatseal. The KDE Discover software store works fine, but I prefer the terminal.
  I use a shell alias that runs `sudo dnf upgrade -y` & `flatpak update -y` in one go. Users online complain that the
  DNF package manager is slow. I don't care. A 10-second delay on a update doesn't matter when you have other tasks to
  complete.

---

### Hardware Experience on the Latitude 5480

Hardware compatibility on my Dell Latitude was complete out of the box. Wi-Fi, Bluetooth, & audio routing worked
immediately upon installation. To keep the laptop running cool & quiet on its Intel processor, I use
`power-profiles-daemon` to scale back performance when unplugged. This gives me roughly five hours of battery life. I
didn't have to install any third-party drivers.

---

### The Verdict

Operating systems are tools, not religions. Wasting weekends troubleshooting a broken rolling release or waiting on a
sluggish VM is a poor use of billable time (that for you, Tim!). Fedora KDE gives me a stable developer environment out
of the box, keeping Windows in a virtual sandbox until I actually need it. If you are tired of WSL quirks, format the
drive. You won't look back.
