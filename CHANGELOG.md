# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog,

and this project adheres to Semantic Versioning.


## [Unreleased]


### Added



* **Code Syntax Highlighting:** Implemented syntax highlighting for code blocks using the @11ty/eleventy-plugin-syntaxhighlight plugin to improve readability of technical posts.
* **Changelog:** Created this CHANGELOG.md to track changes to the blog's codebase.


### Changed



* **Security Policy:** Updated the style-src directive in the Content Security Policy (netlify.toml) to allow stylesheets from https://unpkg.com. This was necessary to load the PrismJS theme for syntax highlighting.


### Removed



* **Dependency Cleanup:** Removed the unused eleventy-plugin-youtube-embed package to simplify dependencies.