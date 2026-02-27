---
title: "Building a Privacy-First Image Cleaner on a Tor Onion Service"
description: "A deep dive into creating a secure image metadata cleaner hosted on a Tor Onion Service. Follow my journey with Python, Flask, Nginx, and Linux server administration to build a practical, privacy-focused tool."
date: 2025-08-28

tags:
  - networking
---

## Building a Privacy-First Image Cleaner

In today's digital world, privacy is paramount. Every photo we take with our smartphones or digital cameras often contains hidden data—known as EXIF metadata—that can reveal sensitive information, such as our location, the device model, and even the exact time a picture was taken. Sharing these images online without cleaning them can inadvertently expose personal details.

This post details how I built a privacy-focused web service to solve this problem: a **Secure Image Cleaner** hosted entirely on a Tor Onion Service. You can try it out here (requires Tor Browser): [http://wb7kwfl6bygqg4zh2fdk7jk6v2ab3bhmjo63xtdm2nltl33vuwoqlkqd.onion/cleaner.html](http://32fd3d4gq3u4qqpofstaiq3sf3h6tnyrdpqdcgdszbrhovv25yfxzhqd.onion/cleaner.html). This project was a great way to dive deep into Tor, server administration, and secure web development.

---

### Why a Secure Image Cleaner on Tor?

A privacy-focused version of my personal website is also hosted as a Tor Onion Service, primarily as a project to explore privacy-first web development. The goal is to strip away all unnecessary JavaScript, tracking, and external resources for a truly minimalist and secure browsing experience.

Building an image cleaner on this foundation felt like a natural extension of that mission:

1.  **Enhanced Privacy:** For users concerned about their digital footprint, cleaning metadata locally is good, but doing it through a trusted, anonymous Tor service adds another layer of protection.
2.  **Demonstrating Expertise:** This project allowed me to showcase practical skills in several key areas:
    * **Linux Server Administration:** Configuring and managing an Ubuntu VM on Google Cloud.
    * **Networking:** Understanding and implementing Tor hidden services.
    * **Web Development:** Building a minimalist, functional web application.
    * **Backend Engineering:** Developing a Python Flask application.
    * **Web Server Configuration:** Setting up Nginx as a reverse proxy.
    * **System Services:** Managing applications with `systemd`.
3.  **Real-World Utility:** It's not just a demo; it's a genuinely useful tool for anyone looking to share images more privately.

---

### The Architecture: A Full Stack Journey

Creating this service involved a stack chosen specifically for functionality and privacy.

Here's a breakdown of the core components:

* **Tor Onion Service:** The entry point for users, providing anonymity and encryption.
* **Google Cloud Platform (GCP) e2-micro VM:** The hosting environment, leveraging the "Always Free" tier for cost-effectiveness.
* **Ubuntu Server:** A robust and flexible operating system.
* **Nginx:** Acts as the web server for static files and as a **reverse proxy** to forward dynamic requests to the Python application.
* **Gunicorn:** A production-ready Python WSGI HTTP Server that interfaces between Nginx and our Flask application.
* **Flask Application (`image_cleaner.py`):** The Python backend that handles receiving image uploads, stripping metadata, and returning the cleaned image.
* **Pillow Library:** A powerful image processing library for Python, used to manipulate image data and remove EXIF tags.
* **Python Virtual Environments:** Essential for isolating project dependencies and maintaining a clean system.
* **`systemd`:** Manages the Gunicorn service, ensuring it runs reliably in the background and starts automatically on boot.

---

### How It Works: A Step-by-Step Overview

The process for a user is simple, but the backend is a finely tuned orchestration of services:

1.  **User Accesses the Page:** A user visits the **[Image Cleaner page](http://wb7kwfl6bygqg4zh2fdk7jk6v2ab3bhmjo63xtdm2nltl33vuwoqlkqd.onion/cleaner.html)** on the Tor Onion Service using a Tor Browser. The page contains a minimalist HTML form to upload an image.
2.  **Image Upload & Nginx Interception:** When the user selects an image (up to 10MB) and clicks "Clean and Download," the browser sends a POST request to the `/upload` endpoint. Nginx receives this request first.
3.  **Nginx Proxies to Gunicorn:** Based on its configuration, Nginx recognizes the /upload path and proxies the request to the Gunicorn server, which is listening on a local Unix socket (image_cleaner.sock).

This is the exact Nginx location block that handles the magic. It forwards the request to the Gunicorn socket and adds several important headers so our Flask application knows about the original user.

```Nginx

location /upload {
    proxy_pass http://unix:/home/userx/image_cleaner_app/image_cleaner.sock;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

```

4.  **Gunicorn Hands Off to Flask:** Gunicorn receives the request and passes it to our Flask application (`image_cleaner.py`).
5.  **Flask Processes the Image:**
    * The Flask app securely saves the uploaded image to a temporary folder.
    * It uses the Pillow library to open the image.
    * Crucially, it reads only the raw pixel data, leaving all EXIF metadata behind.
    * A new image is created from this clean pixel data and saved temporarily.
6.  **Secure Download & Cleanup:**
    * The Flask app sends the cleaned image back to the user's browser for download.
    * Immediately after the file is sent, **both the original and the cleaned temporary files are deleted.** This ensures no user data persists on the server.
7.  **`systemd` Reliability:** The entire Python application, managed by Gunicorn, runs as a `systemd` service. If the server reboots or the application crashes, `systemd` automatically restarts it.

---

### Key Learnings & Takeaways

This project provided invaluable insights into a few areas:

* **Virtual Environments are Non-Negotiable:** Managing Python dependencies with `venv` is critical for clean, reproducible deployments. It's the best way to avoid using `sudo pip install` on system-managed Python environments (a lesson I learned firsthand!).
* **Nginx as a Powerful Gateway:** Beyond serving static files, Nginx's role as a reverse proxy is fundamental for robust web services. Understanding `location` blocks and `proxy_pass` is key.
* **`systemd` for Production Readiness:** Turning a simple Python script into a reliable, self-starting service with `systemd` is a crucial skill for server administration.
* **Security by Design:** From ephemeral file storage to an intentionally minimalist design (no JavaScript, no tracking), every aspect of this project emphasized privacy and security.
* **Troubleshooting is King:** Reading error messages carefully (like "413 Request Entity Too Large") and knowing how to debug Nginx or `systemd` logs is an essential skill.

---

### See the Code

For those interested in the technical details, the source code for this project is available on GitHub. You can find it in the `onion-version` branch of my website's repository.

**[View the project on GitHub](https://github.com/KnowOneActual/BB_Website/tree/onion-version)**

---

### Looking Ahead

This Secure Image Cleaner is a proof-of-concept, but it could easily be expanded. Future enhancements might include:

* Support for more image formats (e.g., WebP).
* A cleaner user interface.
* An option to simply view metadata before removal.

This was a journey into building a privacy-conscious online tool. It's a testament to the power of open-source technologies, such as Tor, Nginx, and Flask, in creating secure and useful applications. Give the **[Image Cleaner](http://32fd3d4gq3u4qqpofstaiq3sf3h6tnyrdpqdcgdszbrhovv25yfxzhqd.onion/cleaner.html)** (Note: Open in a Tor Browser) a try and let me know what you think!