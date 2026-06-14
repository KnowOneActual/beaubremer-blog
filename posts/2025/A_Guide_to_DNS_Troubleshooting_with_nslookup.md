---
title: "What's in a Name? A Guide to DNS Troubleshooting with nslookup"
description: 'Learn how to use nslookup to find DNS issues, check domain setups, and see how the web routes traffic.'
date: 2025-08-17

tags:
  - networking
---

A ping to a server fails. Or a site will not load, even though your internet works. Is the server down? Often, the link
is fine, but DNS cannot find the address. DNS is the address book of the internet.

The `nslookup` tool helps you find the root cause. While `ping` shows if a server is up, `nslookup` shows how your PC
finds it. Use it to check for lookup errors.

### What is `nslookup` and why use it?

When you type a name like `google.com` in a browser, your PC must translate it. It changes the name to an IP address,
like `142.250.217.78`. DNS is the system that handles this map.

**The `nslookup` tool lets you ask DNS servers for this info.**

Think of DNS as a phonebook. You use `nslookup` to look up a name and find its IP. This tool is useful to:

- **Find IP addresses:** Get the IP address for any domain name.
- **Troubleshoot web access:** See if a domain points to the right server.
- **Verify DNS changes:** Check if new DNS records are live.
- **Diagnose mail issues:** Find the mail servers for a domain.

### Basic lookups: The first step

Start with the simplest query. Look up the IP address for a domain. This is an **A record** lookup.

**Command:**

```bash
nslookup google.com
```

**Output:**

The tool shows two main facts: the DNS server that answered, and the IP address.

**Example of a lookup:**

```
Server: 192.168.1.1 Address: 192.168.1.1#53

Non-authoritative answer: Name: google.com Address: 142.250.217.78
```

A "Non-authoritative answer" means your local DNS server used cached data. It did not ask Google's main servers. The
**Name** and **Address** show that the lookup worked.

### Advanced queries: Digging deeper

Query other DNS records to get more details.

#### 1. Finding mail servers (MX records)

If you have email issues, check the **Mail Exchanger (MX)** records. These show where mail is sent.

**Command:**

```bash
# Or use "set type=mx" in interactive mode
nslookup -query=mx google.com
```

**Output:**

The tool returns a list of mail servers with priority numbers. Lower numbers mean higher priority. Mail servers try the
highest-priority server first.

```
google.com mail exchanger = 10 smtp.google.com.
```

#### 2. Finding a domain's official name servers (NS records)

**Name Server (NS)** records show the main DNS servers for a domain. Use them to check a domain setup.

**Command:**

```bash
nslookup -query=ns google.com
```

The query lists the domain's main name servers, such as `ns1.google.com`.

#### 3. Reverse DNS lookup (finding the name for an IP)

To find the domain name for an IP address, run a **reverse lookup (PTR record)**.

**Command:**

Give `nslookup` the IP address.

```bash
nslookup 8.8.8.8
```

**Output:**

The output shows the name for that IP. For example, `8.8.8.8` points to `dns.google`.

```
8.8.8.8.in-addr.arpa name = dns.google.
```

#### 4. Using a specific DNS server for your query

By default, `nslookup` queries your local DNS server. You can also query public servers like Cloudflare (`1.1.1.1`) or
Google (`8.8.8.8`) to see if DNS changes have spread.

Add the target DNS server to the end of the command.

**Command:**

```bash
# Query Cloudflare's server for the IP of google.com
nslookup google.com 1.1.1.1
```

Querying a public DNS server confirms if your DNS change is live globally.

### Putting it all together

Use `nslookup` to see if a network issue is due to DNS. It checks if the internet can find the server name.

Checking different record types helps you fix web, mail, and other service issues. This simple command queries the core
directory of the web. It is a key tool for any troubleshooter.
