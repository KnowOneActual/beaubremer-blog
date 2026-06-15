---
title: 'Stop Worrying and Start Branching: A Guide to Safer Development with Git'
description:
  'Learn how to use Git branches to test new features without the fear of breaking your live website. A practical,
  step-by-step guide.'
date: 2025-06-14

tags:
  - tech
---

You're deep in concentration, adding a new feature to your website, when you suddenly realize you've broken everything.
The page won't load, styles are a mess, and that familiar panic sets in. I've definitely been there.

For too long, I did all my work directly on the `main` branch — the one my live site was built from. Every change was a
high-stakes gamble.

Then, I started using **Git branching**, which made my development workflow much safer.

Think of your `main` branch as the stable, live copy of your project.

A branch is a parallel copy where you can experiment freely. If your new idea works, you merge it into the main branch.
If it fails, you delete the branch, and `main` remains safe.

![A diagram showing feature branches splitting off from the main Git branch and merging back in.](/images/blog/git-branching-diagram.svg)

It brings peace of mind to the development process. Here's why you should be using it.

## Why Bother with Branches?

It might seem like a few extra steps, but the benefits are enormous.

- **Protect Your Live Site:** Your `main` branch is always safe and in a working state. You will never have to worry
  about breaking the live site.
- **Experiment Freely:** Want to try a new layout or a wild idea? Create a branch. You can experiment and break things
  without risk to your main project. If the idea fails, simply delete the branch.
- **Stay Organized:** Create a separate branch for each new feature or bug fix to keep your work isolated. For example,
  `feature/new-contact-form` or `fix/mobile-menu-bug`.
- **Easier Collaboration:** Branches are essential for team projects. Even for solo work, they let you use Pull Requests
  on GitHub to review changes before merging. This is a great way to catch your own mistakes.

## My 5-Step Branching Workflow

Let's look at a real-world example. I recently wanted to change the main header link on my blog so that the homepage
header links to my main portfolio, while the header on posts links to the blog index. This was a perfect use case for a
feature branch. Here is the exact workflow I followed:

1. **Start from an Up-to-Date Codebase**

   Before starting, I always sync my local project with the latest version on GitHub.

   ```bash
   # First, switch to your main branch
   git checkout main

   # Then, pull the latest changes from GitHub (your remote 'origin')
   git pull origin main
   ```

2. **Create Your New Branch**

   Next, I created a new branch and switched to it. I gave it a clear, descriptive name. The `-b` flag handles both
   creating and switching in one step.

   ```bash
   # The -b flag creates a new branch and switches to it
   git checkout -b feature/contextual-header-link
   ```

3. **Do the Work**

   On this safe branch, I edited my layout file (`_includes/layouts/base.njk`) to add the new link logic. I made a few
   small commits along the way to save my progress.

   ```bash
   # Stage all modified files for the commit
   git add .

   # Commit your changes with a clear, descriptive message
   git commit -m "feat: Make header link contextual"
   ```

4. **Open a Pull Request**

   Once the changes worked locally, I pushed the new branch to my GitHub repository.

   ```bash
   # Push the new branch to your remote repo named 'origin'
   # The -u flag sets the upstream branch for future pushes
   git push -u origin feature/contextual-header-link
   ```

   Then, I opened a Pull Request (PR) on GitHub. A PR is a way to propose your changes. It asks to pull your new code
   into the `main` branch.

5. **Merge and Clean Up**

   The Pull Request page showed a summary of my changes for one last review. Everything looked good, so I merged the
   request.

This merged my work into `main` and triggered a new deployment. After merging, I deleted the feature branch to keep the
repository clean. The changes are now live.

This process might seem like extra work, but it quickly becomes a habit. It makes development safer and more organized.
Try it on your next task, no matter how small!
