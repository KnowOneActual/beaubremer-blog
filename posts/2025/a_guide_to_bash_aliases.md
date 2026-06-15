---
title: 'Terminal Tips: A Guide to Bash Aliases'
description: 'Learn how to use Bash aliases to speed up your workflow, save keystrokes, and customize your shell.'
date: 2025-09-28

tags:
  - tech
---

## Terminal tips: a guide to Bash aliases ✍️

If you use Bash, you can use **aliases**. These are simple shortcuts for your most-used commands.

An alias is a shortcut for a long command. It saves time and is easy to remember. This improves your workflow.

_(Psst... using Zsh instead? Check out our [Guide to Zsh Aliases](/posts/a_guide_to_zsh_aliases/))_

---

### How to Create an Alias

To create an alias, add it to your configuration file. Bash has two main files: `~/.bash_profile` and `~/.bashrc`.

- `~/.bash_profile`: This runs when you log in (like connecting to a remote server).
- `~/.bashrc`: This runs when you open a new terminal window.

To keep your aliases available, **add them to `~/.bashrc`**. Then configure your `~/.bash_profile` to load it.

#### 1. Set Up Your Config Files

First, open your `~/.bash_profile` with `nano`:

```bash
nano ~/.bash_profile
```

Add these lines to check if `~/.bashrc` exists and load it.

```bash
if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi
```

Now your settings in `.bashrc` will load in every terminal session.

#### 2\. Add Your Alias to `.bashrc`

Next, open your `~/.bashrc` file:

```bash
nano ~/.bashrc
```

Add aliases at the end of the file using this syntax:

```bash
alias shortcut="your_full_command"
```

Wrap the command in double quotes (`"`) to handle spaces or special characters.

#### 3\. Save and Reload

Save the file. Restart your terminal or run this command to apply changes:

```bash
source ~/.bashrc
```

Your new alias is now ready to use.

---

### Managing Your Aliases

Over time, you may want to review or remove your aliases.

- **To list aliases**: Type `alias` and press Enter.
- **To remove temporarily**: Use the `unalias` command (like `unalias ll`).
- **To remove permanently**: Delete its line from your `~/.bashrc` file.

---

### Practical Examples

Here are some useful aliases to help you get started.

#### Navigation Shortcuts 🗺️

```bash
alias ..="cd .."           # Go up one directory
alias ...="cd ../.."         # Go up two directories
alias ....="cd ../../.."     # Go up three directories
alias home="cd ~"          # Go to your home directory
alias dev="cd ~/Developer" # A shortcut to your development folder
alias dl="cd ~/Downloads"  # A shortcut to your downloads folder
```

#### Git Aliases 📦

```bash
alias gs="git status"           # Check Git status
alias ga="git add ."            # Add all changes
alias gc="git commit -m"        # Commit with a message (e.g., gc "Initial commit")
alias gp="git push"             # Push to origin
alias pull="git pull"           # Pull from origin
alias gl="git log --oneline --decorate --all --graph" # A decorated Git log
```

#### System & Utility Aliases ⚙️

```bash
alias ls="ls -F"                  # Show file types
alias ll="ls -lh"                 # List with human-readable sizes
alias la="ls -la"                 # List all files
alias update="sudo apt update && sudo apt upgrade -y" # Update and upgrade system
alias sb="source ~/.bashrc"       # Reload Bash config
alias myip="curl ipinfo.io/ip"    # Get external IP
```

---

### Make Your Terminal Your Own

Aliases are a simple but powerful feature of Bash. Creating shortcuts for your workflow makes your time on the command
line more productive and fun.
