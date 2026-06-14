---
title: 'Wireshark to the rescue: Unmasking unlabeled network ports with CDP, LLDP, and more'
description:
  'Tired of guessing which port is which? Learn how Wireshark and network discovery protocols like LLDP can save you
  time and frustration in the data room.'
date: 2025-06-26

tags:
  - networking
---

### Lost in the maze of unlabeled ports? Wireshark can help

Do you have a rack of network switches with no labels? Finding a port or a cable in a sea of lights is hard.
Fortunately, you can ask the network to identify your connection.

You only need a laptop and Wireshark. This tool lets you find your port in a few seconds. We will look at the tools that
make this work.

### Meet the network tools: CDP, LLDP, EDP, and FDP

When you need to find your port, use network protocols. These systems send data about the connected device.

- **CDP (Cisco Discovery Protocol):** Cisco's own protocol. Cisco devices use it to share data with other Cisco devices
  nearby.
- **LLDP (Link Layer Discovery Protocol):** The standard protocol. It works on many brands, making it great for mixed
  networks.
- **EDP (Extreme Discovery Protocol):** A protocol designed for Extreme Networks gear.
- **FDP (Foundry Discovery Protocol):** A protocol for Brocade and Foundry switches.

LLDP is the best choice. Since most networks use different brands, LLDP has the best chance to get the port details you
need.

### How to use filters in Wireshark

To filter packets in Wireshark, type one of these terms in the filter bar:

- CDP: `cdp`
- LLDP: `lldp`
- EDP: `edp`
- FDP: `fdp`
- All: `cdp or lldp or edp or fdp`

This filter displays packets from that protocol. Switches send this data every few seconds. You may need to wait up to a
minute for a packet to show.

These packets contain useful data. You will see the switch name, its IP address, and the port number you are plugged
into.

### Example output of an LLDP packet

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

Port Description = eth21

IEEE 802.3 - Link Aggregation

IEEE 802.3 - MAC/PHY Configuration/Status

End of LLDPDU

```

### Saving your favorite filters

You can save filters in Wireshark for quick use.

1. Type your filter (like `lldp`) in the filter bar.
2. Click the **plus sign (+)** next to the bar.
3. In the box, type a label (such as "LLDP Packets").
4. Click **OK**.

The saved filter will show as a button next to the search bar. Clicking the button applies the filter.

The next time you see a wall of unlabeled ports, use Wireshark and apply a discovery protocol filter. LLDP can quickly
show where you are connected, saving you time and effort.

#### Capture smarter, not harder
