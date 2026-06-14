---
title: 'Building a Privacy-First Image Cleaner on a Tor Onion Service'
description:
  'A detailed guide to building a secure image metadata cleaner on a Tor Onion Service using Python, Flask, Nginx, and
  Linux.'
date: 2025-08-28

tags:
  - networking
---

## Building a privacy-first image cleaner

Phone and camera photos contain hidden EXIF data. This data can show your location, device type, and the exact time of
the photo. Sharing these files online can expose your personal details.

To fix this, I built a private web tool. It is a secure image cleaner on a Tor Onion Service. You can try it using a Tor
Browser:
[http://vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion/cleaner.html](http://vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion/cleaner.html).
The project helped me learn about Tor, servers, and web security.

---

### Why host an image cleaner on Tor?

I run a private version of my website on Tor. This setup has no tracking, no JavaScript, and no external links. It is
clean and fast.

Adding an image cleaner fits this goal.

1. **More privacy:** Cleaning photos on an anonymous Tor site adds extra safety.
2. **Skills:** The project uses several tools:
   - **Cloud VMs:** Running Ubuntu on Google Cloud.
   - **Tor:** Running onion services.
   - **Web design:** Building a simple page.
   - **Python:** Writing a Flask backend.
   - **Web servers:** Using Nginx to route traffic.
   - **System management:** Using `systemd` to keep the app running.
3. **Usefulness:** Anyone can use it to share photos safely.

---

### System architecture

The system uses these tools:

- **Tor:** Hides user identities and encrypts traffic.
- **Google Cloud VM:** Hosts the site on a free server.
- **Ubuntu Linux:** The base operating system.
- **Nginx:** Serves web pages and forwards requests.
- **Gunicorn:** Connects Nginx to Python.
- **Flask:** The Python script that runs the cleaner.
- **Pillow:** The Python library that strips photo data.
- **Virtual environments:** Keeps Python packages separate.
- **`systemd`:** Keeps the server running after reboots.

---

### How the service works

1. **User visits the page:** Open the
   **[Image Cleaner](http://vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion/cleaner.html)** in a Tor
   Browser.
2. **Upload:** Send a photo (up to 10 MB). Nginx gets the request.
3. **Proxy:** Nginx passes the request to a local socket.

The Nginx settings below route the traffic and add headers:

```Nginx

location /upload {
    proxy_pass http://unix:/home/userx/image_cleaner_app/image_cleaner.sock;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

```

1. **Flask:** Gunicorn sends the data to `image_cleaner.py`.
2. **Cleaning:** Flask saves the file. It uses Pillow to copy only the pixels. This leaves all metadata behind.
3. **Cleanup:** The app returns the clean file. It deletes all temporary files right away. No user data stays on the
   disk.
4. **Run:** The app runs as a background service. It restarts if it crashes.

---

### Lessons and takeaways

I learned several key lessons:

- **Use virtual environments:** Python `venv` prevents package conflicts. It is better than installing packages
  globally.
- **Use Nginx:** Nginx is a great reverse proxy. Learning location blocks is vital for server setups.
- **Use `systemd`:** A simple service file keeps the app online. It manages restarts automatically.
- **Design for privacy:** Deleting files fast and avoiding scripts keeps users safe.
- **Read the logs:** Debugging is easier when you check Nginx and system logs.

---

### Source code

Find the code in the `onion-version` branch on GitHub.

**[View the project on GitHub](https://github.com/KnowOneActual/BB_Website/tree/onion-version)**

---

### Next steps

I plan to add these features:

- WebP format support.
- A simpler design.
- A way to view data before cleaning.

Open-source tools like Tor, Nginx, and Flask make privacy easy. Try the
**[Image Cleaner](http://vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion/cleaner.html)** in the Tor
Browser.
