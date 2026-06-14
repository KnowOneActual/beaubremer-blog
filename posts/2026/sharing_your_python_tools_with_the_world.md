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

It is fun to turn a Python script into a tool. Anyone can install it with one command. You can share it with friends,
reuse it, or publish it.

PyPI makes this easy. People can run pip install instead of cloning a repository.

---

#### Why publish?

Many Python tools start small. You might build a CLI tool to save time. Or you might write a helper library or a side
project. Publishing has several benefits:

- **Easy sharing:** Users do not need to clone a repository or set paths manually.
- **Good structure:** Packaging forces you to organize your code logically.
- **Simple updates:** Installing a new version is just a quick upgrade command.

It is a great milestone. Your script becomes a tool that is ready to ship.

---

#### Preparing your project

Your project needs a clean structure before you upload it. The key file is `pyproject.toml`. This file tells the tools
how to build the package.

Here is a simple example:

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

You only need these basic settings to start. If your package has a command-line tool, the `[project.scripts]` section
creates the terminal command during installation.

---

#### The first upload

The first release requires a manual step. Since the project is new to PyPI, you must upload it once by hand.

Use a PyPI API token for the first upload. Create a token in PyPI. Add it as a secret on GitHub. Do not put tokens in
your code.

On GitHub, name the secret:

```text
PYPI_API_TOKEN
```

Your workflow can now publish securely using this secret.

---

#### Using Trusted Publishing

Next, set up Trusted Publishing. This is the best long-term method. GitHub and PyPI use OIDC to verify your workflow
without saved tokens.

Link your PyPI project to your GitHub repository. Then give your workflow the right permissions. The setup looks like
this:

```yaml
permissions:
  id-token: write
  contents: read
```

OIDC enables the handshake. Now publishing is part of your normal release flow.

---

#### Releasing a new version

Releasing a new version is simple. Update the version number. Tag the release and push it:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions does the work. It builds and publishes the package. You can watch the progress in the Actions tab.

A small setup makes future releases effortless.

---

#### Keeping your credentials secure

Once Trusted Publishing is active, delete the old API token. Old tokens are security risks. Deleting them is an easy
win.

Follow these rules:

- Delete the first API token once automation works.
- Revoke any token if you suspect it was leaked.
- Use the most secure, tokenless access method available.

These habits keep your project secure.

---

#### Why packaging is worth learning

Publishing can seem hard at first. You must handle code structures, workflows, and security. But the process is easy
once you try it.

It is a satisfying moment. Your local project is now a tool ready for the world.
