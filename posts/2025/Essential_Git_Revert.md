---
title: 'Essential Git: Part 2: Safely Undoing Changes with git revert'
description:
  'Learn how to use `git revert` to safely undo unwanted changes in your Git history, even after pushing to a remote
  repository, and how to resolve common conflicts.'
date: 2025-06-12
---

### Working with Git is great for managing your code. But sometimes you push changes that you later want to undo.

A feature might introduce a bug, or a setting can cause problems. In these cases, `git revert` helps.

It is an important tool, especially after you push your work.

### What is `git revert`?

Simply put, `git revert` creates new commits that undo previous changes. It is like writing an "undo" commit.

Unlike `git reset`, `git revert` preserves history by adding new commits that cancel out the old. This is safer when:

- You've already pushed your commits to a shared remote repo.
- You're working on a public branch (like `main` or `master`).
- You need to keep a clear, linear history of changes.

### When to Use `git revert`

Think of `git revert` as your go-to for "undoing" when:

- **You've pushed a bad commit:** Reverting safely undoes the changes while keeping the full commit history.
- **You want to undo specific commits:** You can pick and choose which commits to reverse, even if they are older.
- **You need to collaborate:** Because it keeps history intact, `git revert` works well with shared repos.

### Step-by-Step Tutorial: Reverting a Commit

Let's walk through how to use `git revert` to undo a specific commit.

#### Step 1: Identify the Commit to Revert

First, you need to find the commit hash (the unique ID) of the commit you want to undo. This should be the commit that
introduced the changes you want to reverse.

Open your terminal or Git Bash in your project's root directory and run:

````bash
git log


This command shows you your project's commit history, with the most recent commits at the top. Scroll down until you find the commit you want to undo. The commit hash is the long string of characters next to commit (e.g., 71a224ee41eec4599329bb65c893de855d441f62).
Once you've found it, copy its full hash.



```markdown
#### Step 2: Perform the Revert

Now, use the `git revert` command with the commit hash you copied.

```bash
git revert <commit-hash>


Replace <commit-hash> with the actual hash.
What happens next?
Git will try to reverse the changes from that commit.
If the revert is clean, Git will prepare a new commit for you.
Step 3: Handle the Commit Message
When `git revert` prepares a new commit, it opens your default text editor with a pre-filled message. The message starts with "Revert" and notes the commit hash.
You can accept the default message as is.
You can add your own notes to explain why you're reverting.
To save and exit the commit message:
If it's Vim: Press the Esc key, then type :wq and press Enter.
If it's Nano, press Ctrl+X, then Y to confirm saving, and then press Enter.
Once you save and exit, Git will create the new "revert" commit.
Step 4: Push Your Reverted Changes
Finally, push your new revert commit to your remote repo (like GitHub or Vercel).

Bash


git push


This updates your remote branch and triggers a new deployment.
Troubleshooting Common git revert Issues
Sometimes `git revert` hits conflicts. Here are the most common issues and how to fix them:
Issue 1: Merge Conflicts (CONFLICT (content): Merge conflict in <filename>)
This means Git found changes in the commit you are reverting that overlap with newer changes. Git does not know which version to keep, so it asks you to decide.
How to fix it:
Identify the Conflict: Git will tell you which files have conflicts (e.g., script.js). Open these files in your code editor.
Look for Conflict Markers: Inside the conflicted file, you'll see special markers like this:
<<<<<<< HEAD
// Code from your current branch (your latest work)
=======
// Code from the commit you are trying to revert (the older version)
>>>>>>> <commit-hash-of-reverted-commit>





```markdown
    * **Manually Resolve:**
        * Delete the Git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
        * Edit the code within that section. Since you're trying to undo, you'll typically want to delete the code that was introduced by the commit you're reverting (the part between `=======` and `>>>>>>>`) and keep the `HEAD` version, or combine them as needed to achieve the desired state of the file without the problematic changes.
        * Save the file.

    * **Stage the Resolved File:** After fixing the file and saving it, you must tell Git that you've resolved the conflict:

        ```bash
        git add <filename>
        ```
        Example: `git add script.js`

    * **Complete the Revert Commit:** Now that the conflict is staged, you can finalize the revert:

        ```bash
        git commit
        ```
        This will open the commit message editor. Save and exit as in Step 3 of the main tutorial.



Markdown


#### Issue 2: "Nothing to commit" or "empty revert"

This happens if the commit you want to revert has no changes, or if they were already undone by another commit. Git finds nothing to revert.

* **What to do:**
    * If you're sure there were changes, double-check your `git log` to ensure you picked the correct commit hash.
    * If the changes truly vanished or were undone, you might not need to do anything.

#### Issue 3: Reverting a Range of Commits

If you want to undo several commits in a sequence, you can specify a range:

```bash
git revert <FIRST_COMMIT_HASH>..<LAST_COMMIT_HASH>


This reverts each commit one by one. You might need to write commit messages or solve conflicts.

Use `--no-edit` to skip the editor and use the default message:
Bash
git revert --no-edit <FIRST_COMMIT_HASH>..<LAST_COMMIT_HASH>


Or use `--no-commit` to stage all reverts as a single commit:
Bash
git revert --no-commit <FIRST_COMMIT_HASH>..<LAST_COMMIT_HASH>
followed by a single git commit.



```markdown
#### Issue 4: You Need to Go Back to an Exact Past State, Not Just Undo Specific Commits

Sometimes you want to reset your branch to a previous state, discarding everything after it. This is where `git reset --hard` comes in.

**WARNING:** `git reset --hard` rewrites history. If you've pushed these commits, using `git reset --hard` followed by `git push --force` will cause problems for collaborators who have the older history. Only use this if you are absolutely sure you are the sole contributor or can coordinate with your team.

* **How to do it (use with extreme caution):**
    * **Find the desired commit hash:** Use `git log` to find the commit hash of the exact state you want your branch to be in.
    * **Reset locally:**
        ```bash
        git reset --hard <commit-hash>
        ```
    * **Force Push:**
        ```bash
        git push --force
        ```

`git revert` is a safe way to manage your history. Understanding how to use it will save you time.
````

```

```
