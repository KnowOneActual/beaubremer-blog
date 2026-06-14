---
title: 'A Cross-Platform Guide to Syncing Obsidian with GitHub'
description:
  'Learn how to set up a free, private, and powerful sync for your Obsidian vault using Git and GitHub, including
  security tips and mobile workarounds.'
date: 2026-06-03
layout: 'post.njk'
tags:
  - posts
  - obsidian
  - git
  - sync
  - notes
---

## Syncing Obsidian notes with GitHub: my cross-platform method

I recently started using Obsidian across Windows, Linux, and macOS. I am new to the app, so I needed a sync method.
Obsidian has a paid sync service. But I did not want to pay until I was sure I would keep using it. I use Git every day.
A private GitHub repository felt like a great option.

This post shows how to sync your notes with GitHub. I'll cover the setup, cross-platform use, and security.

### Why use GitHub for Obsidian?

GitHub is for coding, but it also tracks file changes well. For Obsidian notes, it offers several benefits:

- **Version history:** Every change is saved. You can undo mistakes easily.
- **Reliable backup:** Your entire vault is safely backed up on GitHub.
- **Cross-platform sync:** It works smoothly across Windows, Linux, and macOS.
- **Free and private:** Private folders are free on GitHub. This keeps your notes private.

### Step-by-step setup

This guide is for a fresh setup. If you tried Git before, delete old `.git` folders. Start clean on GitHub to avoid
errors.

#### Phase 1: Create your private repository on GitHub

1. Go to [GitHub.com](https://github.com/) and log in.
2. Click **+** in the top-right and select **New repository**.
3. **Repository name:** Choose a name like `obsidian-vault`.
4. Select **Private**. This keeps your notes safe.
5. **Leave other options unchecked:** Do not add a README or `.gitignore`.
6. Click **Create repository**. Keep the page open to copy the URL later.

#### Phase 2: Initialize your local vault and Git

Let's set up your folder and configure Git.

1. **Create a new, empty folder** (like `~/Documents/ObsidianVault`).
2. Open **Obsidian**. Click **Open folder as vault** and choose that folder.
3. **Open a terminal** inside that folder.
4. Run these commands (replace the URL with yours):

```bash
# Initialize Git in your vault folder
git init

# Disable GPG signing to prevent errors if you use GPG elsewhere.
git config --local commit.gpgsign false

# Link your local folder to GitHub
git remote add origin https://github.com/YourUsername/obsidian-vault.git

# Set the default branch name to main
git branch -M main
```

#### Phase 3: Your first commit and push

Now, we will upload your vault for the first time.

1. **Generate a Personal Access Token (PAT) on GitHub:**
   - Go to **GitHub Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
   - Click **Generate new token**.
   - **Note:** Name it `obsidian-sync-token`.
   - **Expiration:** Choose "No expiration" or set a limit.
   - **Select scopes:** Check the **`repo`** box. This is all you need.
   - Click **Generate token**. **Copy the token.** Keep it safe, like a password.

2. **Create a test note:** In Obsidian, make a note named `First Note.md`.

3. **Run these commands in your terminal:**

```bash
# Stage all files
git add .

# Create the first snapshot
git commit -m "Initial vault setup"

# Upload files to GitHub
git push -u origin main
```

1. **Authenticate:**
   - For **Username**, enter your GitHub name.
   - For **Password**, paste your PAT. (No text will show as you paste.)

   Refresh GitHub. Your `First Note.md` should be there!

#### Phase 4: Configure the Obsidian Git plugin

Now, let's automate the sync.

1. In Obsidian, go to **Settings** > **Community plugins** > **Browse**.
2. Search for and install **Obsidian Git**.
3. Enable the plugin.
4. In the plugin settings, set these options:
   - **Auto Commit Interval:** Set to `5` to auto-save.
   - **Auto Push on Commit:** Turn this on to push after commits.
   - **Auto Pull On Boot:** Turn this on to pull on startup.

### Syncing across multiple machines

This makes it easy to sync notes across other computers.

1. **On your second computer:**
   - Install **Git** and **Obsidian**.
   - Open a terminal and go to your vault folder.
   - **Clone your repository** (use your URL):

   ```bash
   git clone https://github.com/YourUsername/obsidian-vault.git
   ```

   - **Go into the folder and disable GPG signing:**

   ```bash
   cd obsidian-vault
   git config --local commit.gpgsign false
   ```

   - Open Obsidian, click **Open folder as vault**, and select the folder.
   - Install and enable **Obsidian Git**. It will find your setup.

### The iPhone caveat

Obsidian Git does not run on iOS. Mobile systems block background tools like Git. I do not edit notes on my phone, so I
do not need workarounds.

To read notes on the go, I use the **GitHub app** on my phone. I can browse my files and read them easily.

### Other sync alternatives

1. **Obsidian Sync (Paid)**
   - **Pros:** Built for the app, secure, and works on all devices.
   - **Cons:** Costs $8 a month.

2. **Syncthing (Free, DIY)**
   - **Pros:** Open source and private (direct sync).
   - **Cons:** Hard to set up. Needs a third-party app on iOS.

3. **Cloud Storage (Dropbox, Google Drive, etc.)**
   - **Pros:** Very common.
   - **Cons:** They do not handle rapid, small file changes well. This leads to conflicts or lost data. They also lack
     Git's version history.

### Security concerns with the GitHub method

- **Private repositories:** Your notes are stored as plain text on GitHub. There is no end-to-end encryption.
- **Account security:** Turn on **Two-Factor Authentication (2FA)** to protect your account.
- **Personal Access Token (PAT):** Keep your PAT secret. Delete it if it is exposed.
- **Device security:** Your files are unencrypted on your disk. Use strong passwords and disk encryption.

---

This method balances cost and control for my desktop setup. While my phone is read-only, I am happy with this tradeoff.
It is a free and reliable system.
