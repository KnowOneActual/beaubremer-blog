---
title: "When a Service Plays Dead: A Sysadmin's Debugging Guide"
description:
  "A step-by-step guide to troubleshooting a Linux service that won't start, using a real-world example with a stubborn
  Tor Onion Service."
date: 2025-09-02

tags:
  - tech
---

## A sysadmin's tale: debugging a service that won't start

Sometimes server problems defy the usual solutions. A service fails to start, and quick fixes do not work. Debugging a
self-hosted Tor onion service recently reminded me of useful debugging steps.

Although this guide uses a Tor service as an example, these steps apply to almost any Linux service.

---

### The problem: a service playing dead

The onion site was down. After connecting to the server, I ran `systemctl status`.

```bash
sudo systemctl status tor
```

The command output showed a clue: **`Active: active (exited)`**. For a continuous service, this means it started and
then immediately shut down. Debugging this is harder than fixing a simple crash.

---

### Finding the cause: peeling the onion

If the status is unhelpful, look for clues step by step. Check general logs first, then run specific tests.

#### 1\. Check the system logs (`journalctl`)

Check the system journal next. Use the `-e` flag to jump to the end of the log and see the latest events.

```bash
sudo journalctl -u tor -e
```

The logs only showed the service starting and stopping. They lacked error messages. This suggested the issue lay with
Tor, not with `systemd`.

#### 2\. Check the application logs

Many applications keep detailed logs. For Tor, check `/var/log/tor/notices.log`.

```bash
sudo cat /var/log/tor/notices.log
```

The log file did not exist. If a service cannot write its own logs, permissions may be wrong. I ran `chown` to fix
ownership, but the error remained. The cause was elsewhere.

#### 3\. Inspect the service file

Reinstalling the app did not help. I then checked the `systemd` service file.

```bash
cat /lib/systemd/system/tor.service
```

The file was a basic placeholder. The startup command was set to `/bin/true`, which does nothing. I restored the default
config. A real error then appeared.

#### 4\. Verify the config

With the service file fixed, `systemctl restart tor` failed with a clear error. I could now verify the config.

```bash
sudo -u debian-tor tor --verify-config
```

The check passed, meaning `/etc/tor/torrc` had no syntax errors. The config was valid, yet the service still failed. The
issue was not the syntax, but what the file told the service to do.

#### 5\. Run the service manually (the breakthrough)

To see live output, bypass `systemd`. Run the startup command directly as the correct user.

```bash
sudo -u debian-tor /usr/bin/tor --defaults-torrc /usr/share/tor/tor-service-defaults-torrc -f /etc/tor/torrc --RunAsDaemon 0
```

The console printed this warning:

> `[warn] Failed to parse/validate config: Problem with User value. See logs for details.`

`systemd` started the process as the `debian-tor` user. However, a config file also tried to switch to that user. This
conflict caused the service to crash.

I commented out the `User debian-tor` line in `/usr/share/tor/tor-service-defaults-torrc`. The service then started
correctly.

---

### Lessons learned

This process highlights several tips for system admins:

- **Troubleshoot step by step:** Start broad (`systemctl status`) and work toward specific details. Avoid assuming the
  cause too quickly.
- **Check permissions:** Verify file and directory ownership using `chown` and `chmod`.
- **Locate specific logs:** Check the application logs if the system logs lack detail. A missing log file is also a
  clue.
- **Run the command manually:** If a service fails under `systemd`, run its startup command in the terminal. The live
  output often reveals the cause.

Although this example used Tor, this approach helps solve most service startup issues. Check the status, read the logs,
verify permissions, and test the command manually.
