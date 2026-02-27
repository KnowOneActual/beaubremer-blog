---
title: "What's in a Name? A Guide to DNS Troubleshooting with nslookup" 
description: "Go beyond ping and learn how to use the nslookup command to diagnose DNS issues, verify domain configurations, and understand how the web finds its way." 
date: 2025-08-17 
 
tags:
  - networking
---

You've run a `ping` to a server, and it fails. Or maybe a website suddenly won't load, even though the rest of your internet seems fine. Is the server down, or is something else going on? Often, the problem isn't with the connection itself but with the internet's address book: the **Domain Name System (DNS)**. 
 
This is where `nslookup` comes in. While `ping` tells you *if* a server is reachable, `nslookup` tells you how your computer finds it in the first place. It's the perfect next step in your troubleshooting toolkit, helping you diagnose a whole new class of network problems. 
 
### What is `nslookup` and Why Use It? 
 
Every time you type a domain like `google.com` into your browser, your computer needs to translate that human-friendly name into a machine-friendly IP address (like `142.250.217.78`). DNS is the global system that handles this translation. 
 
**`nslookup` (short for "name server lookup") is a command-line tool that lets you directly ask the DNS system for information.** 
 
Think of DNS as the internet's phonebook. `nslookup` is the tool you use to look up a person's name to find their phone number. It's essential for: 
 
* **Finding a domain's IP address:** The most basic and common use. 
* **Troubleshooting website access:** See if a domain is pointing to the correct server. 
* **Verifying DNS changes:** Check if your new DNS records have gone live. 
* **Diagnosing email problems:** Find the mail servers responsible for a domain. 
 
### Basic Lookups: The First Step 
 
Let's start with the simplest query: finding the IP address for a domain. This is known as an **A record** lookup. 
 
**How to use it:** 
 
```bash 
nslookup google.com 
```


**What to look for:**

The output gives you two key pieces of information. First, it tells you which DNS server answered your request. Then, it provides the answer itself.

**Example of a successful lookup:**

Server:		192.168.1.1 
Address:	192.168.1.1#53 
 
Non-authoritative answer: 
Name:	google.com 
Address: 142.250.217.78 


The "Non-authoritative answer" just means your local DNS server gave you a cached answer rather than asking Google's official servers directly. The important part is the **Name** and **Address**, which confirms the lookup was successful.


### Advanced Queries: Digging Deeper

Sometimes, you need more than just an IP address. nslookup can ask for different types of DNS records to get more specific information.


#### 1. Finding Mail Servers (MX Records)

If you're having trouble with email, you can check the **Mail Exchanger (MX)** records to see where email for a domain is supposed to be sent.

**How to use it:**

```Bash

# You can also use "set type=mx" in interactive mode 
nslookup -query=mx google.com 

```

**What to look for:**

You'll get a list of servers, each with a priority number. The lower the number, the higher the priority. Mail will always try to be delivered to the highest-priority server first.

google.com	mail exchanger = 10 smtp.google.com. 



#### 2. Finding a Domain's Official Name Servers (NS Records)

The **Name Server (NS)** records tell you which servers are the official source of DNS information for a domain. This is useful for checking if a domain is configured correctly.

**How to use it:**

```Bash

nslookup -query=ns google.com 

```


This will return a list of the authoritative name servers for that domain, like ns1.google.com.


#### 3. Reverse DNS Lookup (Finding the Name for an IP)

What if you have an IP address and want to know what domain name is associated with it? That's a **reverse lookup (PTR record)**.

**How to use it:**

Just give nslookup the IP address.

```Bash

nslookup 8.8.8.8 

```


**What to look for:**

The output will show you the name associated with that IP. In this case, you'll see it resolves to dns.google.

8.8.8.8.in-addr.arpa	name = dns.google. 



#### 4. Using a Specific DNS Server for Your Query

By default, nslookup uses your system's configured DNS server. But what if you want to see if your DNS changes have propagated to a public server like Cloudflare (1.1.1.1) or Google (8.8.8.8)?

You can tell nslookup to ask a specific server by adding it to the end of the command.

**How to use it:**

```Bash

# Ask Cloudflare's server for the IP of google.com 
nslookup google.com 1.1.1.1 

```


This is incredibly useful for confirming that a DNS change is visible to the rest of the world, not just on your own network.


### Putting It All Together

nslookup bridges the gap between a connection working and not working. It shifts your thinking from "Can I reach this server?" to "Does the internet even know how to find this server?"

By learning to ask for different record types, you can diagnose not just web traffic issues but problems with email and other services, too. It’s a simple command that gives you a direct line to the fundamental address book of the internet, making it an indispensable tool for any troubleshooter.