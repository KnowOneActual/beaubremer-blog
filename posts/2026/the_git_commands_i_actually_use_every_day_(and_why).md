---
title: 'The Git Commands I Use Every Day (And Why)'
description: 'A practical look at the small set of Git commands that matter in my day-to-day work.'
date: 2026-01-10

tags:
  - tech
---

### The Git Commands I Use Every Day (And Why)

**TL;DR:** In this post, I show the Git commands I use daily. I explain how they fit into my workflow to keep commits
small and easy to review.

There are many Git commands, but I only use a few. These commands keep my work moving. They help me check what changed,
make focused commits, and fix mistakes.

This guide focuses on the commands I use in real projects.

---

## 1. Seeing what changed

Before I commit, I want to know exactly what I am about to do.

### `git status`

```bash
git status
```

I use this command to check the state of the repository. I run it:

- After pulling changes, to check my branch status.
- Before committing, to check which files are staged.
- Whenever I need to verify my current state.

I run status more than any other command.

### `git diff`

```bash
git diff
git diff --staged
```

I use `git diff` to see unstaged changes. I use `git diff --staged` to see what is ready for the next commit.

Here is my typical flow:

1. Edit the code.
2. Run `git diff` to review the changes.
3. Stage only the parts that belong together.
4. Run `git diff --staged` to check the commit.

For example, I once refactored a component and also changed some logging. Running `git diff` made it clear that the
logging change did not belong with the refactor. I used `git add -p` to stage only the refactor. I committed the logging
change separately. This kept the commit history clean.

---

## 2. Building clean commits

Once I know what changed, I want my commits to be small. This makes it easier to review and revert them later.

### `git add`

```bash
git add file.py
git add path/to/dir
git add -p
```

I rarely stage everything at once. Instead, I:

- Add specific files when changes are grouped.
- Use `git add -p` to stage specific parts of a file.

Patch mode is a powerful tool that makes it easy to split up large changes.

### `git commit`

```bash
git commit -m "Short, clear message."
git commit
```

For simple changes, I use the `-m` flag. For larger updates, I let Git open my editor so I can:

- Write a short subject line.
- Add a few bullet points with extra context.

I try to write messages that will make sense to me six months from now.

---

## 3. Staying in sync

Most of my work happens on branches. Branch syncing follows the same pattern everywhere.

### `git pull` and `git fetch`

```bash
git pull
git fetch
```

- I use `git pull` to update my local branch when there are no conflicts.
- I use `git fetch` to see remote changes without updating my files. This is useful before a rebase.

### `git push`

```bash
git push
git push -u origin feature/my-branch
```

I push my work to the remote server often. This gives me:

- A backup of my code.
- A way to work from different devices.
- A clear history of my progress.

On a new branch, I use the `-u` flag once. After that, I can just run `git push`.

---

## 4. Working with branches

Branches keep my changes isolated.

### `git branch` and `git switch` / `git checkout`

```bash
git branch
git branch feature/my-idea
git switch feature/my-idea
```

My daily routine:

- Run `git branch` to see where I am.
- Create a new branch for any new feature.
- Use clear and simple branch names.

Simple names are always best.

### `git merge`

```bash
git switch main
git pull
git merge feature/my-idea
```

I use merge to bring finished features into `main`. I also use it to get the latest `main` changes into my feature
branch.

If there is a conflict, I resolve it in my editor and then:

```bash
git add <fixed-files>
git commit
```

---

## 5. Fixing mistakes

When I stage the wrong file or write a bad message, I use these recovery commands.

### `git restore` (resetting a file)

```bash
git restore path/to/file
```

I use this when I want to discard all changes in a file. It returns the file to the last committed state. I check
`git status` first to make sure I do not lose good work.

I am careful with `git restore` because it deletes local changes permanently. If I am unsure, I back up the file first.

### `git reset HEAD` (unstaging)

```bash
git reset HEAD path/to/file
```

Use this when you stage a file but want to keep the edits. It moves the file back to unstaged.

I often stage files by mistake, like config files or scratch notes. I see them in `git status` and run `git reset HEAD`
to unstage them. The edits remain in my working files.

### `git commit --amend`

```bash
git commit --amend
git commit --amend -m "Better message."
```

I use `--amend` when:

- I spot a typo in my last commit message.
- I forgot to include a file in the commit.

I only amend commits that I have not pushed yet.

---

## 6. Looking back

When something breaks, I check the history.

### `git log`

```bash
git log
git log --oneline --graph --decorate --all
```

I use `git log` to see recent commits. For a better view, I use `--oneline --graph --decorate --all` to show a visual
history tree.

This helps me:

- Find where a bug started.
- Choose a commit to revert.
- Understand the branch history.

---

## 7. A typical day

Here is a common sequence for a new feature:

```bash
git switch -c feature/new-link-page
# edit some files
git status
git diff
git add -p
git diff --staged
git commit -m "Add basic link-in-bio layout."
git pull
git push -u origin feature/new-link-page
```

After review, I merge the branch:

```bash
git switch main
git pull
git merge feature/new-link-page
git push
```

If I make a mistake:

- Use `git reset HEAD file` to unstage.
- Use `git restore file` to discard changes.
- Use `git commit --amend` to fix the last commit.

This simple flow keeps my work organized and easy to review.

---

## If you want to go deeper

To learn more about Git, you might like these posts:

- [Essential Git: Part 1](/posts/essential_git%20part_1/) - A guide to core Git concepts.
- [Getting a handle on .gitignore: A Guide to a Cleaner Git Repo](/posts/mastering_gitignore_a_complete_guide_to_a_cleaner_git_repo/) -
  How to keep junk files out of your repositories.

These guides cover the core Git habits I rely on every day.
