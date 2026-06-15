---
title: 'Why Yazi is the Terminal File Manager You Need'
description:
  'Older file managers can feel sluggish when handling large folders. Yazi uses Rust and async operations to keep your
  terminal fast and responsive.'
date: 2026-06-14
layout: 'post.njk'
tags:
  - posts
  - tech
  - terminal
---

{% image "./img/site_content/why_yazi_is_the_terminal_file_manager_you_need/yazi_blueprint_banner.jpg", "A technical blueprint drawing showing Blot standing on a gear, tightening a bolt on a pipeline to release file data nodes representing Yazi terminal file manager sync." %}

You can browse files in the terminal with standard commands. Or you can use tools like Ranger or nnn.

I used Ranger for years. But it felt slow when loading large folders or image previews. Then I tried Yazi. Its speed was
clear right away.

Here is what Yazi is, why it works, and how to start.

#### **What is Yazi?**

Yazi is a terminal file manager written in Rust. It runs tasks in the background so it does not freeze.

Older tools often lock up when you open big folders or load large files. Yazi avoids this. Its interface stays fast and
ready for your next command. It is a great tool to speed up your workflow.

#### **Why it is worth using**

A few key features make Yazi stand out.

- **Speed:** Yazi feels instant because it runs tasks in the background. You can move around and view files with no lag.
- **Easy Previews:** You do not need to set up custom scripts. Yazi shows previews for text, code, PDFs, images, and
  video. It even shows images directly in the terminal.
- **Multi-tasking:** If you copy a huge folder, Yazi will not freeze. A small panel shows the progress while you keep
  browsing.

#### **How to get started**

Installing Yazi is easy.

**Fedora Workstation** For Fedora, enable the COPR repo and install it:

```bash
sudo dnf copr enable lihaohong/yazi
sudo dnf install yazi
```

**Arch Linux** Install it from the official repo:

```bash
sudo pacman -S yazi ffmpeg 7zip jq poppler fd ripgrep fzf zoxide imagemagick
```

**Ubuntu** You can also install it via snap:

```bash
sudo snap install yazi --classic
```

**macOS** Use Homebrew for macOS:

```bash
brew install yazi ffmpeg sevenzip jq poppler fd ripgrep fzf zoxide
```

You can also download build files directly from the project's GitHub page.

#### **Basic controls**

Yazi uses Vim keys by default. It will feel familiar if you know those keys.

- **Move:** Use `h`, `j`, `k`, and `l` to move around.
- **Select:** Press `Space` to select files.
- **Actions:** Use `y` to copy, `x` to cut, `p` to paste, and `d` to delete.
- **Dotfiles:** Press `.` to show or hide hidden files.
- **Search:** Press `f` to search your files.

#### **Changing settings**

To change how Yazi works, create a config folder first:

```bash
mkdir -p ~/.config/yazi
```

Then create `yazi.toml` for settings and `theme.toml` for colors. You can find templates on their
[GitHub page](github.com/sxyazi/yazi) to help you start.

Give it a try and see how much smoother your terminal workflow can be.
