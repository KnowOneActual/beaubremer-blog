---
title: "Essential Git Part 1"
description: "Your Essential Git Toolkit: A Friendly Guide"
date: 2025-06-12
layout: "layout.njk"
---

Your Essential Git Toolkit: A Friendly Guide

Git can seem a bit intimidating at first, but it's just a system to help you keep track of changes in your code (or any files, for that matter) and collaborate smoothly. Think of it as a super-powered save button with a memory of every single change you've ever made.

Let's dive into the commands you'll use most often:

1. git status

This one is like your personal project assistant.

    Why you use it: Before you do anything else, you'll want to know what's going on. Git status tells you which files you've changed, which ones are new, and whether anything is ready to be saved. It's your quick check-in to see the current state of your working directory compared to your last saved version.
    How you use it: Just type git status in your terminal when you're in your project folder. It'll give you a clear rundown.

2. git add . (or git add `filename`)

This is where you tell Git, "Hey, I want to save these changes!"

    Why you use it: When you make changes to your files, Git doesn't automatically track them for your next save. You need to explicitly tell Git which changes you want to include in your next "snapshot" (called a commit). Using git add . is a common shortcut to add all modified and new files in your current directory and its subdirectories to the "staging area." If you only want to add a specific file, you'd use git add <filename>.
    How you use it: After you've made some changes, run git add . to stage everything, or git add my-new-feature.js if you're just adding one file. You'll often run git status right after this to confirm what you've staged.

3. git commit -m "Your descriptive message here"

This is your actual "save" button.

    Why you use it: A commit is a snapshot of your project at a specific point in time. It's like taking a picture of your entire project's state. The -m flag lets you add a short, descriptive message about what changes you made in that commit. Good commit messages are essential – they help you (and others) understand the history of your project.
    How you use it: Once you've staged your changes with git add, you'll type something like git commit -m "Added user login functionality and fixed button styling." Make sure your message is clear and concise!

4. git push origin main

Time to share your work with the world (or your team)!

    Why you use it: After you've committed your changes locally, they're only on your computer. To share them with others or to back them up on a remote server (like GitHub, GitLab, or Bitbucket), you use git push. origin typically refers to the default remote repository where your project lives online, and main is the name of the branch you're pushing to (it used to be called master, but main is the new standard).
    How you use it: After you've committed, just run git push origin main. If you're working on a different branch, you'd replace main with your branch name.

A Few Extra Tips!

    Branches are your friends: While we focused on main branch, Git is fantastic because you can create "branches" for new features or bug fixes. This lets you work on something new without messing up the main, stable version of your project. Once your work is ready, you can merge it back into the main branch.
    Don't be afraid to experiment: Git is designed to be undo-friendly. If you make a mistake, there's usually a way to fix it. That's why it's so great!
    Practice makes perfect: The more you use these commands, the more natural they'll feel. Try creating a small test project and just playing around with making changes, adding, committing, and pushing.

I hope this helps you feel more comfortable jumping into the world of Git! It's an incredibly valuable tool for anyone working with code. Happy coding!
