---
title: "Why I Learned to Stop Worrying and Love Git Branches"
description: "A friendly guide to using Git branches to test new features without breaking your live website."
date: 2025-06-12
layout: "post.njk"
---

Have you ever been deep in concentration, adding a new feature to your website, and you suddenly realize... you've broken everything? The page won't load, styles are a mess, and panic sets in. I've certainly been there. For a long time, I did all my work directly on my `main` branch—the one that my live site was built from. Every change was a high-stakes gamble.

Then, I embraced a professional workflow that completely changed the game: **Git branching**.

Think of your `main` branch as the "golden copy" of your project. It's the version that is live, working, and stable. A branch is like making a safe, parallel copy of your project where you can experiment freely. If your new idea works, you merge it into the main copy. If it's a disaster, you simply delete the branch, and the golden copy remains untouched.

It brings peace of mind to the development process, and here’s why you should be using it.

### Why Bother with Branches?

It might seem like a few extra steps, but the benefits are huge:

* **Safety:** Your `main` branch is always protected. You can be confident that it's in a deployable, working state at all times. No more "I broke the live site!" panic.

* **Freedom to Experiment:** Want to try a completely new layout or a wild idea? Create a branch! You can make a mess, try things out, and break whatever you want. If it doesn't work out, there's no harm done. Just delete the branch.

* **Organization:** You can create a specific branch for every new feature or bug fix. This keeps your work isolated and easy to track. For example, `feature/new-contact-form` or `fix/mobile-menu-bug`.

* **Collaboration & Review:** If you work on a team, branches are essential. But even for solo developers, they allow you to use Pull Requests on GitHub to review your own work before merging it, which is a great way to catch mistakes.

### My Simple 5-Step Branching Workflow

Recently, I wanted to improve the navigation on my blog. On my homepage, I wanted the header link to point back to my main portfolio, but on individual posts, I wanted it to point back to the blog's homepage. This was a perfect use case for a feature branch.

Here’s the exact workflow I followed:

#### Step 1: Start Clean

Before starting anything new, I made sure my local project was in sync with the live version on GitHub.

```bash
# Switch to the main branch
git checkout main