---
title: "Essential Git: Revert part 2"
description: "Git Revert: How to Undo Changes Safely (and Get Unstuck!)"
date: 2025-06-12
layout: "layout.njk"
---


# Working with Git is fantastic for managing your code, but sometimes, you push changes you later realize aren't quite right. 

Maybe a feature introduced a bug, or a configuration change is causing problems. When this happens, git revert comes to the rescue!

It's a super important tool, especially when you've already shared your work (like pushing to a remote repository or deploying to a service like Vercel). What is git revert?

Simply put, git revert creates new commits that undo the changes from previous commits. It's like writing an "undo" commit.

The key difference from other Git commands like git reset is that git revert does not rewrite your project's history. Instead, it adds new history that cancels out the old. This makes it a much safer option when:

You've already pushed your commits to a shared remote repository.
You're working on a public branch (like main or master).
You need to maintain a clear, linear history of changes.

- When to Use git revert

Think of git revert as your go-to for "undoing" when:

You've pushed a bad commit: This is exactly what we just experienced. If you have a commit causing issues on your live Vercel site, reverting it safely brings you back without erasing the fact that the commit ever existed.
You want to undo specific commits in your history: You can pick and choose which commits to undo, even if they're not the very last ones.
You need to collaborate: Since it doesn't rewrite history, git revert is polite to your teammates' repositories.

- Step-by-Step Tutorial: Reverting a Commit

Let's walk through how to use git revert to undo a specific commit. Step 1: Identify the Commit to Revert

First, you need to find the commit hash (the unique ID) of the commit you want to undo. This should be the commit that introduced the changes you want to reverse.

Open your terminal or Git Bash in your project's root directory and run:

Bash command

'git log'

This command shows you your project's commit history, with the most recent commits at the top. Scroll down until you find the commit you want to undo. The commit hash is the long string of characters next to commit (e.g., 71a224ee41eec4599329bb65c893de855d441f62).

Once you've found it, copy its full hash. Step 2: Perform the Revert

Now, use the git revert command with the commit hash you copied.

Bash command

'git revert'

Replace with the actual hash.

- What happens next?

Git will attempt to reverse the changes introduced by that commit.
If the revert is straightforward (no conflicts), Git will automatically prepare a new commit for you.

- Step 3: Handle the Commit Message

When git revert prepares a new commit, it will automatically open your default Git editor (like Vim or Nano in the terminal, or potentially VS Code if configured) with a pre-filled commit message. This message typically starts with "Revert" and includes information about the commit you're undoing.

You can accept the default message as is.
You can add your own notes to explain why you're reverting.

To save and exit the commit message:

If it's Vim: Press the Esc key, then type :wq and press Enter.
If it's Nano, press Ctrl+X, then Y to confirm saving, and then press Enter.

Once you save and exit, Git will create the new "revert" commit. Step 4: Push Your Reverted Changes

Finally, push your new revert commit to your remote repository (e.g., GitHub, GitLab, or Vercel).

Bash command

'git push'

This will update your remote branch, and if you're using Vercel, it will trigger a new deployment with the reverted code. Troubleshooting Common git revert Issues

Sometimes, git revert isn't a smooth ride. Here are the most common bumps you might hit and how to fix them: Issue 1: Merge Conflicts (CONFLICT (content): Merge conflict in )

This is what we faced! It means Git found changes in the commit you're reverting that overlap with other changes made since that commit. Git doesn't know which version to keep, so it asks you to decide.

- How to fix it:

Identify the Conflict: Git will tell you which files have conflicts (e.g., script.js). Open these files in your code editor.

Look for Conflict Markers: Inside the conflicted file, you'll see special markers like this:
HTML

<<<<<<< HEAD // Code from your current branch (your latest work)

// Code from the commit you are trying to revert (the older version)

Manually Resolve:

Delete the Git conflict markers (<<<<<<<, =======, >>>>>>>).
Edit the code within that section. Since you're trying to undo, you'll typically want to delete the code that was introduced by the commit you're reverting (the part between ======= and >>>>>>>) and keep the HEAD version, or combine them as needed to achieve the desired state of the file without the problematic changes.
Save the file.

Stage the Resolved File: After fixing the file and saving it, you must tell Git that you've resolved the conflict:

Bash command

'git add'

Example: git add script.js

Complete the Revert Commit: Now that the conflict is staged, you can finalize the revert:

Bash command

'git commit'

This will open the commit message editor. Save and exit as in Step 3 of the main tutorial.

Issue 2: "Nothing to commit" or "empty revert"

This message appears if the commit you're trying to revert doesn't actually introduce any new changes, or if those changes have already been undone by a subsequent commit. Git determines there's nothing to revert.

What to do:

If you're sure there were changes, double-check your git log to ensure you picked the correct commit hash.
If the changes truly vanished or were undone, you might not need to do anything.

Issue 3: Reverting a Range of Commits

If you want to undo several commits in a sequence, you can specify a range:

Bash command

'git revert ..'

This will revert each commit one by one. You might be prompted for a commit message for each revert, or you might hit merge conflicts for each.
You can add --no-edit to use the default message for each revert without opening the editor: git revert --no-edit <FIRST>..<LAST>
Or --no-commit to stage all reverts as one single new commit, which is often cleaner: git revert --no-commit <FIRST>..<LAST> followed by a single git commit.

- Issue 4: You Need to Go Back to an Exact Past State, Not Just Undo Specific Commits

Sometimes, you don't just want to undo specific commits, but instead completely reset your branch to how it looked at a previous point in history, discarding everything that came after. This is where git reset --hard comes in.

WARNING: git reset --hard rewrites history. If you've pushed these commits, using git reset --hard followed by git push --force will cause problems for collaborators who have the older history. Only use this if you are absolutely sure you are the sole contributor or can coordinate with your team.

 **How to do it (use with extreme caution): **

Find the desired commit hash: Use git log to find the commit hash of the exact state you want your branch to be in.
Reset locally:

Bash command

'git reset --hard'

Force Push:

Bash command

'Git push --force'

Git revert is a powerful and safe way to manage your project's history. Understanding how to use it, especially for handling conflicts, will save you a lot of headaches in your development journey!
