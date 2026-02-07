---
title: "Why I Built My Own 'Link in Bio' Page (And You Can Too)"
description: "How I built a simple, private, fully customizable link in bio page—and how you can, too."
date: 2026-02-07
layout: "post.njk"
tags:
  - posts
  - webdev
  - projects
---

### Why I Built My Own “Link in Bio” Page (And You Can Too)

If you’ve spent any time on social media, you’ve seen them everywhere: that one lonely link in a profile that opens a page full of other links. Services like Linktree are super popular because they solve a simple problem: “I have one link slot but too many things to share.” At some point, I started wondering: could I build my own version—and more importantly, should I bother?

Turns out the answer to both was yes. It became a fun weekend project, and I ended up with something that feels more personal, more private, and honestly more useful than the prefab options.

---

#### Why bother rolling your own?

My first motivation was curiosity. I like to tinker, and a link‑in‑bio page felt like the right-sized project: not a full app, but more interesting than another “Hello, World.” Once I got into it, a few real advantages popped up.

- **Privacy that feels honest.** With third‑party services, every click passes through someone else’s servers, and they can track behavior, build profiles, and run analytics you never see. When I host my own page, the only thing happening is a visitor clicking a button and going straight to where they wanted to go—no tracking pixels, no surprise cookies, no mystery dashboards.

- **Real control, not just themes.** I’m not locked into a template, a brand color, or whatever features fit into a free plan. The page looks like the rest of my site, using my typography, icons, and microcopy, so it feels like a natural extension of my online home rather than a rented corner of the internet.

- **One place I fully own.** If a hosted service changes pricing, shuts down, or decides my links are “against policy,” I’m not scrambling to update every profile. My page is just static files; as long as I keep my domain and hosting, it’s not going anywhere.

---

#### The simple stack behind it

The best part is how little tech you actually need. You don’t need a fancy framework or a database, just a few familiar pieces.

Here’s what I used:

- **HTML:** A single `index.html` file for the structure of the page.  
- **CSS:** TailwindCSS for quick, modern styling plus a small custom stylesheet for the background gradient and button animations.  
- **JavaScript:** A tiny script that fetches a `social-links.json` file and turns each entry into a button.  
- **Hosting:** Deployed on a static host (I used Netlify), so pushing a new version is basically “git push and done.”

The JSON file is where the magic happens. Instead of hard‑coding links into the HTML, I keep them in `social-links.json`, which means:

- Adding a new link is just adding one object to the JSON.  
- Reordering links is as simple as moving items around in the file.  
- I never have to dig through HTML just to change a URL or label.

It feels less like “editing a page” and more like “updating a configuration,” which is the kind of small quality‑of‑life improvement that makes you actually keep your links up to date.

---

#### A quick look at the data

Here’s an example of what the `social-links.json` file might look like:

```json
[
  {
    "title": "Website",
    "url": "https://example.com",
    "icon": "globe"
  },
  {
    "title": "GitHub",
    "url": "https://github.com/your-username",
    "icon": "github"
  },
  {
    "title": "Bluesky",
    "url": "https://bsky.app/profile/your-handle",
    "icon": "bsky"
  }
]
```

I use icons from [Font Awesome](https://fontawesome.com/).

And a tiny JavaScript snippet to load those links and render buttons:

```js
fetch("/social-links.json")
  .then((response) => response.json())
  .then((links) => {
    const container = document.getElementById("links");
    links.forEach((link) => {
      const button = document.createElement("a");
      button.href = link.url;
      button.textContent = link.title;
      button.className = "link-button"; // Tailwind / custom classes
      container.appendChild(button);
    });
  })
  .catch((error) => {
    console.error("Failed to load social links:", error);
  });
```

On the HTML side, you just need a container for those buttons:

```html
<div id="links" class="flex flex-col gap-3"></div>
```
---

#### Little gotchas (and why they’re worth it)

No project is complete without some small annoyances. Integrating the new page into my existing site meant dealing with:

- Matching global styles so the page didn’t look like it came from another planet.  
- Tweaking security settings and headers so everything behaved correctly on my host.  
- Getting icons to render crisply on different screen sizes and making sure text stayed readable on top of my custom background.

Each of those issues was a small puzzle instead of a major blocker. They were good reminders that even simple projects reward a bit of attention to detail in exchange, you end up with something that feels polished instead of “just fine.”

---

#### What the finished page gives me

After all that, I’ve created a quick, lightweight, and totally customized link-in-bio page that really feels personal. Check it out here! [Links](https://beaubremer.com/links) It reflects the rest of my site, respects visitors’ privacy, and gives me one central place to point people from Instagram, Bluesky, or anywhere else I happen to be posting.

It’s also a small but satisfying reminder that you don’t always need another service account or subscription to solve a problem. Sometimes, a few static files and an afternoon of tinkering are enough.

---

#### Want to build your own?

If you've been looking for a manageable project to sharpen your web dev skills, this is a great one: it touches HTML, CSS, JavaScript, JSON, and deployment, without turning into a month‑long side quest.

A simple path to get started:

1. Create a bare‑bones `index.html` with a placeholder container for your buttons.  
2. Add TailwindCSS (via CDN or your build pipeline) and style a single “link button” the way you like.  
3. Move your links into a `social-links.json` file and write a tiny script that loops through them and injects buttons into the page.  
4. Deploy to whatever static host you like and swap it into your social profiles.

You end up with a useful tool for your own links, and the quiet satisfaction of knowing it’s something you built from the ground up.