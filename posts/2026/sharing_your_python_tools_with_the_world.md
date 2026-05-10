---
title: 'Sharing Your Python Tools with the World'
description:
  'A friendly guide to packaging a Python project and publishing it on PyPI with GitHub and Trusted Publishing.'
date: 2026-05-10

tags:
  - python
  - packaging
  - tech
---

### Sharing Your Python Tools with the World

There's something satisfying about turning a little Python project on your laptop into something anyone can install with
a single command. A script becomes a real tool. A personal utility becomes something you can share with a friend, reuse
on another machine, or publish for anyone who finds it useful.

That's where PyPI comes in. If you want people to be able to run `pip install your-project` instead of cloning a repo
and fiddling with paths, publishing your package is the move.

---

#### Why publish at all?

A lot of Python projects start small. Maybe it's a CLI that saves you a few minutes every day, a helper library for a
weird workflow, or just a side project you built because you were curious. Even if it started as "just for me,"
publishing it has some real upsides.

- **It makes sharing easier.** Nobody has to clone a repo or manually wire things up.
- **It makes the project feel more complete.** Packaging forces a little structure, which is usually a good thing.
- **It makes updates painless.** Once it's published, installing a new version is as simple as upgrading the package.

It's also just a nice milestone. There's a difference between "I made a script" and "I shipped a tool."

---

#### Getting your project ready

Before PyPI can accept your package, your project needs a little structure. The key file here is `pyproject.toml`, which
tells build tools and package indexes what your project is, what it needs, and how it should be installed.

A minimal example looks like this:

```toml
[project]
name = "your-cool-tool"
version = "1.0.0"
description = "A short sentence about what this does."
readme = "README.md"
license = "MIT"
requires-python = ">=3.8"
dependencies = [
  "requests>=2.31.0",
]

[project.scripts]
your-command = "your_package.main:app"
```

You don't need anything fancy to get started, just the basics filled in clearly. If your package exposes a command-line
tool, the `[project.scripts]` section is what gives people a real terminal command after install.

---

#### The first upload

The slightly awkward part is the very first release. If the project doesn't exist on PyPI yet, you usually need to do an
initial upload before you can fully switch over to the nicer automated flow.

That's where an API token can help. You create a token in your PyPI account, store it as a GitHub Actions secret, and
let your workflow use it for that first publish. The important part is not to paste tokens directly into code or config
files that live in your repository.

On GitHub, the usual secret name is:

```text
PYPI_API_TOKEN
```

Once that secret is in place, your workflow can publish without exposing anything sensitive in public.

---

#### The better long-term setup

After that first release, Trusted Publishing is the cleaner way to go. Instead of keeping a long-lived token around,
GitHub and PyPI use OIDC to verify that your workflow is allowed to publish your package.

In practice, that means connecting your PyPI project to your GitHub repository and giving your workflow the right
permissions. The important bit looks like this:

```yaml
permissions:
  id-token: write
  contents: read
```

This is the part that lets GitHub do the secure "handshake" with PyPI. Once it's set up, publishing feels a lot less
like credential management and a lot more like a normal release process.

---

#### Releasing a new version

Once everything is wired up, publishing gets pleasantly boring. You update your version, tag the release, and push the
tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions takes it from there. It builds the package, publishes it, and you can watch the whole thing happen in the
Actions tab without babysitting the process too much.

That's really the sweet spot: a small amount of setup up front, then a release flow that feels almost effortless.

---

#### A small security habit worth keeping

If you used a manual API token to get started, it's worth cleaning that up once Trusted Publishing is working. Old
credentials have a way of hanging around longer than they need to, and deleting them is an easy win.

A good rule of thumb:

- Delete the original token once your first upload succeeds and Trusted Publishing is active.
- Remove any token immediately if you think it might have been exposed.
- Keep your release process using the least amount of long-term secret access possible.

It's not the most exciting part of publishing, but it's one of those small habits that make everything feel more solid.

---

#### Why this part is worth learning

Publishing to PyPI can look a little intimidating the first time through, mostly because packaging, workflows, and
credentials all show up at once. But once you do it, the process starts to feel pretty reasonable.

And honestly, it's a nice moment. Your project stops being a folder you happen to have lying around and becomes a tool
that's actually ready to live out in the world.
