---
title: "WireShark to the Rescue: Unmasking Unlabeled Network Ports with CDP, LLDP, and More!" 
description: "Tired of guessing which port is which? Learn how Wireshark and network discovery protocols like LLDP can save you time and frustration in the data room." 
date: 2025-06-26 
layout: "post.njk" 
tags:
 - posts
 - troubleshooting
 - wireshark
 - networking

---


### Lost in the Labyrinth of Unlabeled Ports and Ethernet Cables? Wireshark to the Rescue!

Hey everyone! Ever found yourself staring at a rack full of network switches, all blinking enticingly, but with not a single label in sight? You're not alone. We've all been there – needing to track down a specific port, dreading the inevitable 'walk of shame' back to the rack room, eyes glazing over at a sea of identical blinking lights, trying to track down a rogue cable. Imagine if you could just ask the network where you are!

Good news! You actually can. It involves your trusty laptop and the magic of Wireshark. Today, we're going to dive into some network discovery protocols that can be your best friends when you're playing 'find the port' in the data room.

### Meet the Network Detectives: CDP, LLDP, EDP, and FDP

When I need to figure out what port I'm plugged into, I turn to these four unsung heroes of network discovery. Each one acts like a little beacon, broadcasting information about the device it's connected to.


* **CDP (Cisco Discovery Protocol):** If you're working with Cisco gear, CDP is your go-to. It's a proprietary protocol that Cisco devices use to share information about themselves directly with other Cisco devices connected to them.
* **LLDP (Link Layer Discovery Protocol):** This is the open standard version of CDP. It works across various vendors, making it incredibly useful in mixed-vendor environments. LLDP is like the universal translator of network discovery.
* **EDP (Extreme Discovery Protocol):** As the name suggests, this protocol is designed for Extreme Networks equipment. Similar to CDP, it's Extreme's way of sharing information between its devices.
* **FDP (Foundry Discovery Protocol):** If you're dealing with Brocade (formerly Foundry Networks) switches, FDP is what you'll need to look for—another proprietary protocol, but just as helpful in its ecosystem.

My personal favorite, and the one I reach for most often, is **LLDP**. Why LLDP, you ask? Because in today's networks, you're rarely dealing with just one vendor. LLDP gives me the best chance of getting the information I need, no matter whose hardware I'm connected to. It's the most versatile tool in the box!


### How to Use These Filters in Wireshark

Okay, so you've got Wireshark open, you're capturing traffic, but how do you find these little network gems? It's super simple! Wireshark has a powerful display filter bar that lets you narrow down what you're seeing.

Here's how to apply each filter:



* For CDP: Type `cdp` in the display filter bar and hit Enter.
* For LLDP: Type `lldp` in the display filter bar and hit Enter.
* For EDP: Type `edp` in the display filter bar and hit Enter.
* For FDP: Type `fdp` in the display filter bar and hit Enter.
* For all: Type `cdp or lldp or edp or fdp` in the display filter bar and hit Enter.

Once you apply the filter, you'll start seeing packets specifically from that protocol. These protocols are designed to periodically broadcast information, so you might need to wait a few seconds for a packet to appear. In these packets, you'll often find information such as the remote device's hostname, its IP address, and, most importantly, the remote port it's connected to. This is gold when you're trying to figure out which port on that unlabeled switch you're connected to. This might take one minute or so to show, depending on the switch and message frequency.


### Example Output of an LLDP Packet:

Let's take a look at what an LLDP packet might reveal:

```
Frame 1: 242 bytes on wire (1936 bits), 242 bytes captured (1936 bits) on interface en7, id 0

Ethernet II, Src: Ubiquiti\_XX:XX:XX (68:d7:9a:XX:XX:XX), Dst: LLDP\_Multicast (01:80:c2:00:00:0e)

Link Layer Discovery Protocol

Chassis Subtype = Locally assigned, Id: 68:d7:9a:XX:XX:XX

Port Subtype = MAC address, Id: 68:d7:9a:XX:XX:XX

Time To Live = 120 sec

System Name = Switch_room102_0012

System Description = Debian GNU/Linux 11 (bullseye) Linux 4.19.152-ui-alpine \#4.19.152 SMP Fri Jun 7 23:26:35 CST 2024 aarch64

Capabilities

Management Address

Management Address

Port Description = eth0

IEEE 802.3 - Link Aggregation

IEEE 802.3 - MAC/PHY Configuration/Status

End of LLDPDU

```


### Saving Your Favorite Filters

Tired of remembering `lldp` every time? Wireshark lets you save your favorite filters so they're just a click away!



1. **Type your filter** (e.g., `lldp`) into the display filter bar.
2. Click the **plus sign (+)** next to the display filter bar.
3. A small dialog box will pop up. Give your filter a descriptive **label** (such as "LLDP Packets") and, optionally, add a **comment**.
4. Click **OK**.

Now, your saved filter will appear in the drop-down menu next to the display filter bar. No more typing, just quick access to your most used network sleuth tools!

So, the next time you're faced with a wall of unlabeled ports, don't despair! Fire up Wireshark, apply your favorite discovery protocol filter (I'm looking at you, LLDP!), and let the network tell you exactly where you're plugged in. It's a huge time saver and a great way to avoid that awkward "guess and check" dance.

Happy hunting!
