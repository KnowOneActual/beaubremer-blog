---
title: 'I Gave My Blog a Robot Assistant with GitHub Actions'
description:
  'A look at how I used GitHub Actions to automate code quality checks, and why I eventually moved away from MegaLinter
  to a faster, custom setup.'
date: 2025-07-30

tags:
  - tech
---

> **Update (April 2026):** I have since replaced MegaLinter because it became too slow as my blog grew. I now use a
> fast, parallelized stack of **Biome**, **Lefthook**, and **Secretlint** that runs locally on every commit. This gives
> feedback in seconds; you can find details in the [Changelog](/CHANGELOG.md).

---

I build this blog in my spare time, which means minor errors often slip through. These include broken links, CSS typos,
or formatting issues. They are not critical, but they add up. I used to think keeping a site tidy required manual work.

I found a solution in GitHub Actions. This post covers how I configured the tool to check my blog files automatically.

---

## What exactly are GitHub Actions?

GitHub Actions is an automation tool built into GitHub. Think of it as a set of recipes that run when events happen in
your repository. You can run tests, deploy your site, or check for errors on every push.

The workflow system uses a few basic concepts:

- **Workflows**: Workflows are the main recipes, defined in a `.yml` file under `.github/workflows/`.
- **Events**: Events trigger a workflow. For example, a `push` event triggers a run whenever you push code.
- **Actions**: Actions are the individual steps in a recipe. They are pre-built, shareable tools that perform specific
  tasks, like checking out code or running a linter.

The [GitHub Marketplace](https://github.com/marketplace?type=actions) offers free, pre-built actions for almost any
task.

---

## My mission: getting a handle on code quality

I wanted to check my blog files for errors automatically. I needed to find broken links, validate HTML, and check CSS
formatting.

Doing this work manually is tedious. Instead, I used **MegaLinter**, an all-in-one tool that bundles over a hundred
linters. It fit the job perfectly.

Here is the process I followed:

1. **Create the workflow**: I created a file at `.github/workflows/mega-linter.yml` to run the tool on every push to
   `main`.
2. **Review the errors**: The first run reported over 500 errors. Although overwhelming, it helped me find spelling
   mistakes and syntax issues.
3. **Refine the configuration**: The default setup was too noisy. I created a `.mega-linter.yml` file in my repository
   root to customize the checks. I configured it to:
   - Ignore the `_site` folder.
   - Disable noisy spelling checks.
   - Limit checks to changed files to save time.
   - Prevent warnings from failing the build.

After a few adjustments, the output became much more manageable and useful.

---

## What GitHub Actions _aren't_ for

GitHub Actions is versatile, but it is not the solution for every problem. The tool is not designed for:

- **Running a live application**: Actions automate tasks like testing and deploying. They do not host a live, 24/7
  server.
- **Long, intensive tasks**: The free runner VMs are not built for hours of computing or GPU tasks.
- **Complex build chains**: Large projects might require dedicated CI/CD tools like Jenkins. GitHub Actions focuses on
  simplicity, making it ideal for individual sites.

---

## Final thoughts

Setting up GitHub Actions was simple. I quickly went from knowing nothing about the tool to having automated quality
checks. The system acts like a teammate who reviews every change. If you host a project on GitHub, try it out to see
what it can do.
