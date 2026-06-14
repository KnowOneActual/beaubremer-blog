---
title: 'Keep Calm and Troubleshoot On'
description: 'A Guide to Not Panicking When the Sky is Falling'
date: 2025-06-13

tags:
  - tech
---

A phone call shatters your sleep in the middle of the night. A critical system is down, and panic starts to bubble up.
In these moments, you might think you need to type faster or run obscure commands. However, your most powerful tool is a
calm, focused mind.

Staying cool under pressure is a skill you can learn. Let us look at how to handle the heat without getting burned.

#### Why Your Brain Shuts Down When the Server Does

Have you ever struggled to remember a simple command when your boss stands over your shoulder? This difficulty is a
normal biological response. Under stress, your body enters a fight-or-flight state, flooding your system with cortisol
and adrenaline.

While helpful in danger, this reaction is terrible for debugging. Stress hormones sabotage memory and clear thinking.
The pressure meant to speed you up makes you less effective.

#### Your Mental Emergency Brake: The STOP Skill

How do you fight back against this biology? You can start with a tool called the DBT STOP skill. When you feel stressed,
use these four steps:

#### S - Stop

Stop what you are doing. Avoid typing any commands or speaking, and freeze for a moment to break the panic.

#### T - Take a Breath

Take one deep, slow breath. This action signals your nervous system to relax.

#### O - Observe

Look at the situation objectively. Note what you think and feel, and see what is happening in the system.

#### P - Proceed Mindfully

With the panic stopped, you can choose your next move instead of reacting blindly.

#### Don't Just Do Something, Stand There

In a crisis, the pressure to act is great, and every minute of downtime feels like an hour. You might want to take a
quick shortcut, but shortcuts are risky. A single panicked action, like restarting a service or changing a config file
without a clear reason, can create new problems.

Remember the troubleshooting paradox: the fastest way to a fix is often the most deliberate one. Sticking to your plan
might feel slow, but it prevents hasty mistakes that extend downtime. Without a plan, you risk making things worse and
wasting time. Taking a moment to breathe and observe is not a waste of time. It ensures you move toward a fix instead of
creating more chaos.

#### Find the Root Cause with the "5 Whys" Method

Panic thrives on chaos, but structure brings order. One of the best ways to find the source of an issue is the "5 Whys"
technique. You simply ask "Why?" until you move past the symptoms to find the root cause.

Imagine a website is down:

1. **Why is it down?** The web servers are unhealthy.
2. **Why are they unhealthy?** The web server process crashed.
3. **Why did it crash?** The server ran out of memory.
4. **Why did it run out of memory?** A log file filled up the disk space.
5. **Why did the log file grow so large?** A recent code change left debug logs active in production.

Without this process, you might have restarted the server at step two, only for it to crash again. The "5 Whys" method
guides you to the root cause, which was a process failure.

#### Managing the Humans

Technical problems always involve people, and people get anxious. A large part of your job in a crisis is managing their
stress so you can focus.

The key is clear communication. Send regular updates, even if you only say, "We are still investigating." Constant
updates fill the information gap and show you are in control.

When someone demands a deadline, explain your process rather than giving a guarantee you cannot keep. For example, you
can say: "We are analyzing logs to find the source. I will update you in 15 minutes."

Mastering these skills (managing panic, following a method, and communicating clearly) separates the pros from the rest.
These skills help you survive the fire and emerge as a resilient, respected professional.

If you still cannot solve the issue, remember: how many programmers does it take to change a bulb? None, that is a
hardware problem.
