---
title: 'Terminal Tips: Finding Hidden Text with `strings`'
description:
  'Learn to use the simple `strings` command to peek inside binary files, find hidden clues, and rescue text from broken
  files.'
date: 2025-09-13

tags:
  - tech
---

## Finding hidden text with `strings`

If you find an unknown file, you might not know how to open it. Before turning to complex tools, try the `strings`
command for quick clues.

The `strings` command scans files for plain text and prints it. It is like reading the labels on a complex engine. While
you might not understand the entire system, the labels can tell you the maker, model, or other key facts.

---

### How it works

At its core, `strings` looks for groups of plain text. By default, it searches for text at least four letters long. This
helps you peek inside **binary files**, like programs, to see what they contain.

To use it, provide a file name. For example, let's peek inside the `ls` command in your `/bin/` folder:

```bash
strings /bin/ls
```

You will see a long list of text. The output includes error messages, help text, and other words used inside the file.
This shows the raw parts of the program.

---

### A note for Windows users

Although the `strings` command is not built into Windows Command Prompt or PowerShell, you can install it quickly. Here
are three options:

- **Microsoft Sysinternals:** Download the tool from Microsoft's free Sysinternals suite.
- **Git for Windows:** If you have Git, the **Git Bash** shell has `strings` built in.
- **Windows Subsystem for Linux (WSL):** Turn on WSL and install a Linux system (like Ubuntu) from the Microsoft Store.
  This gives you a Linux shell with its commands.

---

### Making strings more powerful

A few options make the command even more useful.

#### Change the minimum string length

The default length of four letters often creates extra noise. Use the `-n` flag to filter for longer, clear text. For
example, to show only strings of 10 or more letters, run:

```Bash
strings -n 10 /bin/ls
```

This filter removes short matches, helping you focus on sentences or file paths.

#### Find out **_where_** the text is

Knowing the place, or **offset**, of a string within a file helps with advanced work. The `-t` flag prints this offset
before each line. You can choose the format: `d` for decimal, `o` for octal, and `x` for hex.

```Bash
# Show the location of each string in hexadecimal format
strings -t x /bin/ls
```

Now the output will look something like this, with the file location on the left:

```text
 2d98 /lib64/ld-linux-x86-64.so.2
 301b GLIBC_2.2.5
 30c8 __cxa_finalize
 ...
```

#### Combine with other tools

Terminal commands are most powerful when combined. Since the output of `strings` can be long, you can pipe it to `grep`
to search for what you need. The pipe symbol (`|`) sends the output of one command to the next.

For example, to search for "GLIBC" inside the `ls` binary, run:

```Bash
strings /bin/ls | grep GLIBC
```

This search is faster than reading through hundreds of lines by hand.

---

### A real-world scenario

Imagine you have a damaged document or presentation. When you try to open it, the program fails, and you might worry
that the content is lost forever.

In these cases, `strings` can save your data. While it cannot fix the file, it often bypasses damaged parts to pull out
plain text.

To try saving text from a file named `important_notes.docx` that will not open, run:

```Bash
strings important_notes.docx > recovered_text.txt
```

Here is how the command works:

- `strings important_notes.docx` finds all plain text inside the damaged file.
- The `>` symbol sends the output to a new file instead of showing it on the screen.
- `recovered_text.txt` is the name of the new file.

Although you lose formatting, images, and special symbols, you will likely get your words back. This method offers a
quick way to rescue text from damaged files.

---

### Why it's a great first step

The `strings` command is a fast starting point. It helps you find what a program does, the libraries it uses, or the
data hidden inside without complex reversing tools.

In the next post, we will explore `grep` to filter output and find exact matches.
