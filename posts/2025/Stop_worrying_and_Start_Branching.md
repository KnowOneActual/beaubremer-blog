---
title: "Stop Worrying and Start Branching: A Guide to Safer Development with Git"
description: "Learn how to use Git branches to test new features without the fear of breaking your live website. A practical, step-by-step guide."
date: 2025-06-14

tags:
  - tech
---

You're deep in concentration, adding a new feature to your website, when you suddenly realize... you've broken everything. The page won't load, styles are a mess, and that familiar panic sets in. I've definitely been there. For too long, I did all my work directly on the `main` branch—the one my live site was built from. Every change was a high-stakes gamble.

Then, I embraced a professional workflow that brought a new level of safety and confidence to my work: **Git branching**.

Think of your `main` branch as the "golden copy" of your project. It's the version that is live, working, and stable. A branch is a parallel copy of your project where you can experiment freely. If your new idea works, you merge it into the golden copy. If it's a disaster, you delete the branch, and `main` remains untouched.

![A diagram showing feature branches splitting off from the main Git branch and merging back in.](/images/blog/git-branching-diagram.svg) 

It brings peace of mind to the development process. Here’s why you should be using it.

## Why Bother with Branches?

It might seem like a few extra steps, but the benefits are enormous.

* **Protect Your Live Site:** Your `main` branch is always protected. You can be confident that it's in a deployable, working state at all times. No more "I just broke the live site!" panic.
* **Experiment Freely:** Want to try a new layout or a wild idea? Create a branch! You can make a mess, try things out, and break whatever you want without any risk to your core project. If it doesn't work out, there's no harm done.
* **Stay Organized:** Create a separate branch for each new feature or bug fix. This keeps your work isolated and easy to track. For example, `feature/new-contact-form` or `fix/mobile-menu-bug`.
* **Easier Collaboration and Code Reviews:** If you work on a team, branches are essential. Even for solo developers, they allow you to use Pull Requests on GitHub to review your work before merging. It's a great way to catch your own mistakes.

## My 5-Step Branching Workflow

To make this concrete, let me walk you through a real-world example. I recently wanted to change the main header link on my blog. On the homepage, it should point to my main portfolio, but on individual posts, it should point back to the blog's index. This was a perfect use case for a feature branch.

Here’s the exact workflow I followed:

1.  **Start from a Clean Slate**

    Before starting anything new, I always make sure my local project is in sync with the latest version on GitHub.

    ```bash
    # First, switch to your main branch
    git checkout main

    # Then, pull the latest changes from GitHub (your remote 'origin')
    git pull origin main
    ```

2.  **Create Your New Branch**

    Next, I created a new branch and immediately switched to it. I gave it a descriptive name so I'd know its purpose. The `-b` flag handles both creating the branch and checking it out in one step.

    ```bash
    # The -b flag creates a new branch and switches to it
    git checkout -b feature/contextual-header-link
    ```

3.  **Do the Work**

    On this new, safe branch, I edited my layout file (`_includes/layouts/base.njk`) to add the logic for the contextual link. I made a few small, focused commits along the way to save my progress.

    ```bash
    # Stage all modified files for the commit
    git add .

    # Commit your changes with a clear, descriptive message
    git commit -m "feat: Make header link contextual"
    ```

4.  **Open a Pull Request**

    Once I was happy with how it worked on my local machine, I pushed the new branch up to my GitHub repository.

    ```bash
    # Push the new branch to your remote repo named 'origin'
    # The -u flag sets the upstream branch for future pushes
    git push -u origin feature/contextual-header-link
    ```
    
    Then, I went to my project on the GitHub website and opened a Pull Request (PR). A PR is a formal way of proposing your changes. It’s a request to pull your new code from the `feature/contextual-header-link` branch into the `main` branch.

5.  **Merge and Clean Up**

    The Pull Request page on GitHub showed me a summary of all my changes, which I could review one last time. Everything looked good, so I clicked the "Merge pull request" button.
   
    
This safely merged my work into `main` and, in my case, automatically triggered a new deployment to Netlify. After merging, I deleted the feature branch to keep my repository tidy and signal that the work on that specific feature was complete. The work is now safely part of the `main` branch.

This whole process might seem like extra work at first, but it'll quickly become a natural part of your routine. It provides a structure for safer, more organized development. Give it a try on your very next task, no matter how small!