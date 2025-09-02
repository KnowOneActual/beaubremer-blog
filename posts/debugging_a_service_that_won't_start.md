---
title: "When a Service Plays Dead: A Sysadmin's Debugging Guide"
description: "A step-by-step guide to troubleshooting a Linux service that won't start, using a real-world example with a stubborn Tor Onion Service."
date: 2025-09-02
layout: "post.njk"
tags:
  - posts
  - linux
  - sysadmin
  - debugging
  - troubleshooting
---

## A Sysadmin's Tale: Debugging a Service That Won't Start

Every so often in server administration, you run into a problem that defies the usual solutions. A service that should be running simply isn't, and the quick fixes don't work. A recent troubleshooting session with a self-hosted Tor Onion Service served as a great reminder of some valuable lessons in persistence and diagnostics.

While the context here is a Tor service, the step-by-step process of elimination is a universal guide to debugging almost any misbehaving service on a Linux server.

-----

### The Problem: A Service Playing Dead

The initial symptom was simple: the onion site was down. After connecting to the server, the first command in any admin's toolkit is `systemctl status`.

```bash
sudo systemctl status tor
````

The output holds the first major clue: **`Active: active (exited)`**. For a service that's supposed to run continuously, this is a red flag. It means the service started, did something, and then immediately shut down without an obvious error. This is far trickier to debug than a simple crash.

-----

### The Diagnostic Journey: Peeling the Onion

When the main status is unhelpful, it's time to dig deeper. Here's a reliable path to follow, moving from the most general to the most specific tests.

#### 1\. Check the System Logs (`journalctl`)

The next logical step is to check the system's journal for the service. The `-e` flag jumps you to the end of the log, which is where the most recent events are.

```bash
sudo journalctl -u tor -e
```

Unfortunately, the logs were as unhelpful as the status. They only confirmed that the service was starting and stopping, without providing any application-specific errors. This tells us the problem likely isn't with `systemd` itself, but with the Tor application.

#### 2\. Check the Application Logs

Most applications write their own, more detailed logs. For Tor, this is usually `/var/log/tor/notices.log`.

```bash
sudo cat /var/log/tor/notices.log
```

The output here provides another huge clue: **`No such file or directory`**. A service that can't create its own log file is a strong sign of a **file permissions problem**. Even after trying to fix ownership with `chown`, the issue persisted, suggesting the problem was somewhere else.

#### 3\. Inspect the Service File

Sometimes the investigation leads to a surprising discovery. After reinstalling the `tor` package didn't help, the next place to look was the `systemd` service file itself.

```bash
cat /lib/systemd/system/tor.service
```

Somehow, the file had been replaced with a generic placeholder. A critical line, `ExecStart=/bin/true`, was telling the service to run a command that does nothing and immediately exits successfully. After replacing the file's contents with the correct, default configuration, a real error message finally appeared.

#### 4\. Verify the Configuration

With the service file fixed, `systemctl restart tor` now failed with a proper error. This allows us to move on to verifying Tor's own configuration.

```bash
sudo -u debian-tor tor --verify-config
```

This command passed, indicating that `/etc/tor/torrc` was syntactically correct. This is a classic troubleshooting moment: the config file is valid, but the service still won't run. The problem isn't the file's syntax, but *what the file is telling the service to do*.

#### 5\. Run the Service Manually (The Breakthrough)

This is often the final and most critical step. Bypassing `systemd` and running the Tor startup command directly, as the correct user, lets you see the live output.

```bash
sudo -u debian-tor /usr/bin/tor --defaults-torrc /usr/share/tor/tor-service-defaults-torrc -f /etc/tor/torrc --RunAsDaemon 0
```

And there it was, in plain text:

> `[warn] Failed to parse/validate config: Problem with User value. See logs for details.`

The `systemd` service was already starting the process as the `debian-tor` user, but a default Tor configuration file was *also* trying to switch to the `debian-tor` user. This redundant user-switching conflict caused the service to crash instantly.

The fix was to edit `/usr/share/tor/tor-service-defaults-torrc` and comment out the `User debian-tor` line. After that, the service started perfectly.

-----

### Lessons Learned

This deep dive highlights a few core principles of system administration:

  * **Trust the Process:** Start broad (`systemctl status`) and get progressively more specific. Don't jump to conclusions.
  * **Permissions Are a Common Culprit:** When in doubt, check file and directory ownership and permissions (`chown`, `chmod`).
  * **Find the Right Logs:** If the main system log is unhelpful, find the application's own log file. If it doesn't exist, that itself is a clue.
  * **Run It Manually:** If a service fails via `systemd`, run its startup command directly in the terminal. The live output is often the most valuable diagnostic information you can get.

While the context was specific to a Tor service, this methodical approach of checking services, logs, permissions, and configurations—and finally running the process manually—is a playbook that can solve almost any "service that won't start" mystery.