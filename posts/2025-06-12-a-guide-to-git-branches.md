---
title: "Why I Learned to Stop Worrying and Love Git Branches"
description: "A friendly guide to using Git branches to test new features without breaking your live website."
date: 2025-06-12
layout: "layout.njk"
---

## Have you ever been deep in concentration, adding a new feature to your website, and you suddenly realize... you've broken everything? The page won't load, styles are a mess, and panic sets in. I've certainly been there. For a long time, I did all my work directly on my main branch—the one that my live site was built from. Every change was a high-stakes gamble.

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

**Step 1: Start Clean**

Before starting anything new, I made sure my local project was in sync with the live version on GitHub.

bash

# Switch to the main branch
git checkout main

# Pull the latest changes from GitHub
git pull origin main


Step 2: Create the New Branch

I created a new branch from main and immediately switched to it. I gave it a descriptive name.
Bash

# The -b flag creates a new branch and checks it out in one step
git checkout -b feature/contextual-header-link

Step 3: Do the Work

On my new branch, I safely edited my layout file (_includes/layouts/base.njk), adding the logic to change the link based on the page URL. I made a few commits along the way to save my progress.
Bash

# After making some edits...
git add .
git commit -m "feat: Make header link contextual"

Step 4: Propose the Changes (The Pull Request)

Once I was happy with how it worked locally, I pushed my new branch to GitHub.
Bash

git push -u origin feature/contextual-header-link

Then, on the GitHub website, I opened a Pull Request (PR). A PR is a formal way of saying, "Hey main branch, I have these new changes on my feature/contextual-header-link branch. Please review them and pull them in."

Step 5: Merge and Clean Up

On the Pull Request page, I could see all my changes one last time. Everything looked good, so I clicked the "Merge pull request" button. This took my work and safely merged it into the main branch, which automatically triggered a new deployment on Netlify.

After merging, I deleted the feature branch to keep my repository tidy.

This workflow might seem like a lot at first, but it quickly becomes second nature. It brings a level of safety and organization to a project that is absolutely essential for professional development. Give it a try on your next feature!