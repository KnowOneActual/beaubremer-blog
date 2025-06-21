---
title: "Oh No, Vim! Your Emergency Kit for Getting Unstuck"
description: "Accidentally opened Vim from a git commit and can't get out? Here’s a simple, step-by-step guide to safely save and exit."
date: 2025-06-21
layout: "post.njk"
tags: 
 - git
 - vim
 - tutorial 
 - beginners

---

### You’ve been there. You're in your terminal, you proudly type `git commit`,
hit Enter, and… what is this? 

The screen changes, and your cursor is blinking,
but typing text does nothing, and every key you press just beeps or moves
things around in weird ways.

Congratulations, you've accidentally stumbled into Vim, the powerful but
notoriously tricky text editor.

Don't panic! You don't need to learn Vim today. You just need to know how
to get out. Here is your emergency kit.

### The Emergency Kit: How to Exit Vim

Follow these steps exactly. Vim has two main modes: **Command mode** (where
you enter commands) and **Insert mode** (where you type). You start in
Command mode.

#### 1. Enter "Insert Mode" to Type

* **What to do:** Press the `i` key once.
* **What it does:** This puts you into **I**nsert mode. You should see
    `-- INSERT --` at the bottom of the screen. Now you can type or edit your
    commit message like you'd expect.

#### 2. Make Your Edits

* **What to do:** Type your commit message. If you don't need to change
    anything, you can skip this.

#### 3. Exit "Insert Mode"

* **What to do:** Press the `Esc` key.
* **What it does:** This takes you back to **Command mode**. The `-- INSERT --`
    text at the bottom will disappear. This is where you can tell Vim what to
    do next.

#### 4. Save and Quit (The Most Common Exit)

* **What to do:** Type `:wq` and press `Enter`.
* **What it does:** This is actually two commands: `:w` (write, i.e., save the
    file) and `:q` (quit). You've successfully saved your commit message and
    exited Vim.

---

### Emergency Hatch: Quit Without Saving

What if you made a mess and just want to start over?

* **What to do:** After pressing `Esc` to get to Command mode, type `:q!`
    and press `Enter`.
* **What it does:** The `:q!` command means **q**uit without saving (the `!`
    forces the action). Git will abort the commit, and you can run
    `git commit` again.

### What Now? Your Two Paths Forward

Now that you've survived, you have two choices for the next time this happens.

#### Path 1: Tame the Beast

You don't have to become a Vim master, but knowing one more command can be
handy.

* In Command Mode (press `Esc`), type `u` to **u**ndo your last change.

#### Path 2: Avoid the Beast Entirely

If you'd rather use an editor you already know, you can tell Git to use
something else. For example, to set VS Code as your default editor, run
this command in your terminal:

```bash
git config --global core.editor "code --wait"