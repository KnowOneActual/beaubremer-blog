---
title: 'Essential Git: Part 1'
description:
  "New to Git? This friendly guide introduces the essential commands you'll use daily to track changes, save your work,
  and collaborate on code projects."
date: 2025-06-12
---

## Your essential Git toolkit: a friendly guide

Git can seem intimidating at first. However, it is just a system to track changes in your files and collaborate with
others. It works like a save button that remembers every change you make.

Here are the commands you will use most often:

### 1. `git status`

- **Why you use it:** Use this command to check the state of your project. It shows which files are modified, which are
  new, and which are ready to be saved. It compares your current files to your last saved version.
- **How you use it:**

  ```bash
  # Check the current status of your Git repository
  git status
  ```

  This command lists your changes.

### 2. `git add .` (or `git add <filename>`)

- **Why you use it:** Git does not track changes automatically. You must tell Git which changes to include in your next
  save (called a commit). Running `git add .` stages all new and modified files in your current directory. To stage a
  single file, run `git add <filename>` instead.
- **How you use it:**

  ```bash
  # To stage all modified and new files in the current directory and subdirectories
  git add .

  # To stage only a specific file
  git add my-new-feature.js
  ```

  You can run `git status` after this to check what you staged.

### 3. `git commit -m "Your descriptive message here"`

- **Why you use it:** A commit saves a snapshot of your project. It is like taking a picture of your files at a specific
  moment. The `-m` flag lets you add a short message describing your changes. Clear messages help you and others
  understand your project history.
- **How you use it:**

  ```bash
  # Create a new commit with a descriptive message
  git commit -m "Add user login functionality and fix button styling"
  ```

  Keep your message clear and brief.

### 4. `git push origin main`

- **Why you use it:** Your commits only exist on your computer at first. Use `git push` to upload them to a remote
  server like GitHub. In the command, `origin` is the online repository, and `main` is your branch.
- **How you use it:**

  ```bash
  # Push your committed changes from your local 'main' branch to the 'origin' remote
  git push origin main
  ```

  If you work on a different branch, replace `main` with its name.

### A few extra tips

- **Branches are useful:** Git lets you create branches for new features or bug fixes. This allows you to write new code
  without affecting the stable main branch. When your changes are ready, you can merge them back.
- **Feel free to experiment:** Git makes it easy to undo changes. If you make a mistake, you can usually fix it. This
  makes it safe to try new things.
- **Practice regularly:** Using these commands often will help them feel natural. Create a small test project to
  practice staging, committing, and pushing.

This guide should help you start using Git. It is a valuable tool for anyone working with code. Happy coding!
