---
title: "The Git Commands I Actually Use Every Day (And Why)"
description: "A practical look at the small set of Git commands that actually matter in my day-to-day work."
date: 2026-01-10
layout: "post.njk"
tags:
  - posts
  - git
  - tooling
---

### The Git Commands I Actually Use Every Day (And Why)

**TL;DR:** In this post, I walk through the handful of Git commands I actually use daily, how they fit into my workflow, and how they help me keep commits small, reviewable, and recoverable.

There are a lot of Git commands out there, but on a normal day, I only reach for a small handful. These are the ones that keep my work moving: checking what changed, making focused commits, and recovering from the occasional mistake.

This isn't a complete Git guide. It's the set of commands that live in my muscle memory, and what I use them for in real projects.

---

## 1. Seeing what changed

Before I type any commit command, I want to know exactly what I'm about to do.

### `git status`

```bash
git status
```

This is my "what's going on?" button. I run it:

- After pulling new changes, to see if I'm clean or mid-merge.  
- Before committing, to double-check which files are staged vs unstaged.  
- When something feels off, I just want to get my bearings.

If I only used one Git command all day, it would probably be this one.

### `git diff`

```bash
git diff
git diff --staged
```

I use plain `git diff` to see what I've changed but haven't staged yet, and `git diff --staged` to see what's actually going into the next commit.

Typical flow:

1. Edit code.  
2. Run `git diff` to scan through changes.  
3. Stage only the parts that belong together.  
4. Run `git diff --staged` to sanity check the commit before hitting enter.

A small example: I once refactored a component and changed some unrelated logging while I was "in there." When I ran `git diff`, it was obvious that the logging tweak didn't belong in the same commit as the refactor. I used `git add -p` to stage only the refactor hunks and left the logging change for a separate "tidy up logs" commit. That two-minute decision made the review simpler and kept the history cleaner.

---

## 2. Building clean commits

Once I know what changed, I want my commits to be small and focused. That makes it easier to review, debug, and revert later.

### `git add`

```bash
git add file.py
git add path/to/dir
git add -p
```

I rarely run `git add .` unless it's a very small change. Instead, I:

- Add specific files when changes are clearly grouped.  
- Use `git add -p` (patch mode) to split a file into meaningful chunks and only stage the hunks that belong in this commit.

Patch mode is one of those "hidden superpowers" most people skip at first. Once you get used to it, it's hard to go back.

### `git commit`

```bash
git commit -m "Short, clear message."
git commit
```

For simple changes, I'll use `-m`. For anything bigger, I skip the message flag and let Git open my editor so I can:

- Write a short subject line.  
- Add a bullet list or a couple of sentences with context if needed.

I don't obsess over perfectly formatted commit messages, but I do try to answer: "If I saw this 6 months from now, would I know what changed and why?"

---

## 3. Staying in sync with the remote

Most of my work happens on branches, but the pattern is the same whether I'm on `main` or a feature branch.

### `git pull` and `git fetch`

```bash
git pull
git fetch
```

I use:

- `git pull` when I just want "get me up to date," and I know I haven't made local changes that will conflict.  
- `git fetch` when I want to see what changed on the remote without touching my working tree, especially before a rebase or when I'm checking out someone else's branch.

### `git push`

```bash
git push
git push -u origin feature/my-branch
```

I push early and often, especially on feature branches. That gives me:

- A backup if my machine dies.  
- A way to hop devices without copying files.  
- A clear history of work in progress.

On a new branch, I'll use `-u` once so future pushes can just be `git push`.

---

## 4. Working with branches

Branches are how I keep experiments and features from getting tangled.

### `git branch` and `git switch` / `git checkout`

```bash
git branch
git branch feature/my-idea
git switch feature/my-idea
# or
git checkout feature/my-idea
```

My everyday moves are:

- `git branch` to list what exists and see where I am.  
- Create a branch for anything more than a tiny fix.  
- Keep branch names descriptive enough that "future me" and coworkers instantly know what they're for.

I don't worry about clever names; clear and boring wins.

### `git merge`

```bash
git switch main
git pull
git merge feature/my-idea
```

I use merge when I'm bringing a finished feature into `main` or when I want to incorporate the latest `main` changes into my branch without rewriting history.

If a merge conflict appears, I let my editor or diff tool help resolve it, then:

```bash
git add <fixed-files>
git commit
```

---

## 5. Fixing mistakes (without panicking)

Even with the best intentions, I stage the wrong thing or type the wrong message. These are the recovery commands I actually trust myself to use.

### `git restore` (resetting a file)

```bash
git restore path/to/file
# older style:
git checkout -- path/to/file
```

I use this when I realize "I don't actually want any of the changes in this file."

It drops the local modifications and returns the file to the last committed state. I double-check with `git status` before running it, just to make sure I won't lose something important.

I'm careful with `git restore` because it really does throw away local changes. I mostly use it on generated files or quick experiments where I know I don't care about the edits. When I'm unsure, I'll copy the code somewhere else before restoring, or just leave the file alone and clean it up once I'm certain.

### `git reset HEAD` (unstaging)

```bash
git reset HEAD path/to/file
```

This one's for: "I staged too much, but I still want to keep the changes."

It moves the file from staged back to unstaged, so I can restage only what belongs in this commit, often paired with `git add -p`.

My most common mistake is staging a file that doesn't actually belong to the change I'm working on, usually some config file or scratch notes I forgot about. I'll notice it in `git status`, then run `git reset HEAD path/to/file` to unstage it. The changes stay in my working tree, so I don't lose anything; I just keep them out of the commit until I'm ready.

### `git commit-- amend`

```bash
git commit --amend
git commit --amend -m "Better message."
```

I use `--amend` when:

- I just committed and immediately spot a typo in the message.  
- I forgot to include one small file.

I only amend commits that haven't been pushed yet, so I don't rewrite history that other people might already have.

---

## 6. Looking back in time

When something breaks or behaves strangely, I often need to see how we got here.

### `git log`

```bash
git log
git log --oneline --graph --decorate --all
```

I use plain `git log` if I'm just scanning recent commits. For a better overview, I have an alias (or just type the full command) with `--oneline --graph --decorate --all` to see branches and merges as a visual graph.

This helps when:

- I'm trying to find where a bug might have been introduced.  
- I'm picking a commit to revert or cherry-pick.  
- I want to understand the story of a feature branch.

---

## 7. How this looks in a real day

On a typical small feature, my actual sequence looks something like this:

```bash
git switch -c feature/new-link-page
# do some work
git status
git diff
git add -p
git diff --staged
git commit -m "Add basic link-in-bio layout."
git pull   # if needed
git push -u origin feature/new-link-page
```

Then, after review and any fixes:

```bash
git switch main
git pull
git merge feature/new-link-page
git push
```

If I mess up along the way:

- `git reset HEAD file` to unstage something.  
- `git restore file` to throw away a bad change.  
- `git commit --amend` to fix the last commit before pushing.

This is pretty close to how I work on real tasks: pick up a ticket or idea, branch off, make a small set of changes, review with `git diff`, commit, then push. If I realize the change is bigger than I thought, I'll split it into a couple of focused commits instead of one giant "everything" commit. It keeps debugging and code review much calmer.

---

## If you want to go deeper

If you're newer to Git or want a more structured walkthrough, you might like these related posts:

- [Essential Git: Part 1](/posts/essential_git%20part_1/) – a more step-by-step look at the core concepts and commands.  
- [Getting a handle on.gitignore: A Guide to a Cleaner Git Repo](/posts/mastering_gitignore_a_complete_guide_to_a_cleaner_git_repo/) – how I keep junk and secrets out of my repos.

Together with this post, they cover the Git concepts and habits I rely on most days.