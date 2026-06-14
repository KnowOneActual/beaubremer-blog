---
title: "Why I Built My Own 'Link in Bio' Page (And You Can Too)"
description: 'How I built a simple, private, fully customizable link in bio page - and how you can, too.'
date: 2026-02-07

tags:
  - tech
---

### Why I Built My Own "Link in Bio" Page (And You Can Too)

If you use social media, you have seen them everywhere. A single profile link opens a page full of other links. Tools
like Linktree are popular because they solve a simple problem. They help when you have one link slot but too many things
to share. I wondered if I could build my own version - and if it was worth the effort.

The answer to both was yes. It became a fun weekend project. Now I have a page that feels personal, private, and more
useful than ready-made options.

---

#### Why build your own?

I started because I was curious. I like to tinker, and a link page is a small, fun project. It is more interesting than
a simple "Hello, World" page. Once I began, I found a few big benefits.

- **True privacy.** With hosted services, every click goes through their servers. They track users and collect data you
  cannot see. When I host my own page, visitors go straight to their destination. There are no tracking pixels, cookies,
  or hidden dashboards.

- **Full control.** I am not locked into a template or a free plan limit. The page matches the rest of my site. It uses
  my own fonts, icons, and text. It feels like a natural part of my site rather than a rented page.

- **Total ownership.** If a service changes its prices or shuts down, I do not need to worry. I do not have to update
  all my social profiles. My page is just static files. As long as I keep my domain, it will not go anywhere.

---

#### The simple tech stack

You do not need a complex framework or a database. A few simple tools are enough.

Here is what I used:

- **HTML:** A single `index.html` file for the structure.
- **CSS:** Tailwind CSS for styling and a few custom rules for button effects.
- **JavaScript:** A short script that loads a JSON file and builds the buttons.
- **Hosting:** A static host like Netlify. Pushing an update is just a git command.

The JSON file makes it easy. Instead of coding links into HTML, I put them in a `social-links.json` file:

- To add a link, I just add one block to the JSON file.
- To reorder links, I just move lines in the file.
- I do not have to edit HTML to change a URL.

Updating the page is quick and simple. This makes it much easier to keep links current.

---

#### A look at the code

Here is an example of the `social-links.json` file:

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

Here is the JavaScript to load those links and build the buttons:

```js
fetch('/social-links.json')
  .then((response) => response.json())
  .then((links) => {
    const container = document.getElementById('links');
    links.forEach((link) => {
      const button = document.createElement('a');
      button.href = link.url;
      button.textContent = link.title;
      button.className = 'link-button'; // Tailwind / custom classes
      container.appendChild(button);
    });
  })
  .catch((error) => {
    console.error('Failed to load social links:', error);
  });
```

You just need a single HTML container for the buttons:

```html
<div id="links" class="flex flex-col gap-3"></div>
```

---

#### Small issues to solve

Every project has its challenges. Adding the page to my main site required a few steps:

- I matched the site styles so the page did not look out of place.
- I adjusted security headers to make sure everything loaded safely.
- I checked the icons and text contrast on mobile screens.

None of these issues were major blockers. They were good reminders that small details matter. Taking time to fix them
makes the page feel polished instead of just basic.

---

#### What the page gives me

Now I have a fast, lightweight link page. It matches my site design and respects user privacy. You can see it live on my
[links page](https://beaubremer.com/links). It gives me one clean spot to direct people from social media.

This project shows that you do not always need a paid subscription to solve a problem. Sometimes, a few files and a free
afternoon are all you need.

---

#### How to build your own

If you want to practice web development, this is a perfect project. It covers HTML, CSS, JavaScript, and hosting, but
you can finish it in a weekend.

Here is how to start:

1. Create a basic `index.html` file with a container for your buttons.
2. Add Tailwind CSS and design a single link button.
3. Save your links in a `social-links.json` file. Write a script to loop through them and generate the buttons.
4. Upload your files to a static host and add the link to your profiles.

You get a useful page for your links, and the satisfaction of building it yourself.
