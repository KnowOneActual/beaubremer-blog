---
title: "My Weekend Project: Turning My Personal Site into a Tor Onion Service"
description: "A step-by-step guide to making your website accessible on the Tor network using a free Google Cloud server. It's easier than you think!"
date: 2025-08-25
layout: "post.njk"
tags:
  - posts
  - tor
  - privacy
  - sysadmin
  - Nginx

---

Have you ever looked at your personal site and thought, "This is cool, but what could be *cooler*"? Maybe you're looking for a weekend project that's a little different, something that teaches you about the hidden corners of the internet.

If so, I've got the perfect project for you: creating a Tor onion service for your existing website.

It may sound complex and mysterious, but it's actually surprisingly straightforward. At its core, it's a fantastic exercise in basic server administration and networking. We're not doing anything shady; we're just experimenting with technology to see how it works.


### First, What Is an Onion Service?

An onion service (you've probably seen their long, nonsensical addresses ending in `.onion`) is a website that's only accessible through the Tor network. The "onion" name comes from the layers of encryption that protect both the person visiting the site and the server hosting it.

When you visit a normal website, your computer connects directly to its server. With an onion service, your connection is bounced through several random computers (called relays) in the Tor network before it reaches the server. The server's location is also hidden. This provides a powerful layer of privacy and anonymity that you just don't get on the regular internet.


### Why Bother?

For me, this wasn't about hiding from anyone. It was about curiosity and learning. Here's why I think it's a great project:

* **It's a fantastic learning experience.** You'll get hands-on with a Linux server, a web server like Nginx, and the Tor software itself.
* **It's a great story.** Let's be honest, it's a neat trick. Being able to say you have your site running as an onion service just to see if you could is a fun talking point.
* **It's basically free.** We can do this entire project using the "Always Free" tier from a cloud provider like Google Cloud.


### The How-To: A Step-by-Step Guide

My goal is simple: get a small, free virtual server online, put our website files on it, and then install and configure Tor to act as the gateway.


#### Step 1: Get a Free Server on Google Cloud

We'll use Google Cloud's "Always Free" tier, which gives you one tiny `e2-micro` virtual machine (VM) forever, at no cost. This is more than enough for a simple static website.

1.  **Sign up for Google Cloud** and create a new project.
2.  Navigate to **Compute Engine** -> **VM instances**.
3.  Click **"Create Instance"** and use these exact settings to stay in the free tier:
    * **Region:** `us-west1`, `us-central1`, or `us-east1`.
    * **Machine type:** `e2-micro`.
    * **Boot disk:** Ubuntu or Debian, 30 GB or less.
    * **Firewall:** Check the box to "Allow HTTP traffic."


#### Step 2: Connect to Your Server

Once the VM is running, connect to it using a command-line terminal. The easiest way is with Google's own command-line tool.

1.  [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install) on your local computer.
2.  Open your terminal and run `gcloud init` to log in and select your project.
3.  Connect to your VM with this command (replace with your VM's name and zone):
    ```bash
    gcloud compute ssh your-vm-name --zone its-zone
    ```


#### Step 3: Install the Software

Once you're connected, run these commands to install everything you need.

```bash
# Update the server and install Nginx (web server), Tor, and Git
sudo apt update && sudo apt upgrade -y
sudo apt install git nginx tor -y
````

#### Step 4: Add Your Website Files

Now, pull your website's code from its repository and place it where Nginx can find it.

```bash
# Clone your site (use your own repo URL)
git clone [https://github.com/your-username/your-repo.git](https://github.com/your-username/your-repo.git)

# Move the files to the web server's public directory
sudo cp -r ~/your-repo/* /var/www/html/
```

#### Step 5: Configure Tor and Get Your Address!

This is the magic step. You just need to add two lines to Tor's configuration file.

```bash
# This command adds the necessary lines to the end of the config file
echo -e "HiddenServiceDir /var/lib/tor/hidden_service/\nHiddenServicePort 80 127.0.0.1:80" | sudo tee -a /etc/tor/torrc

# Restart the services to apply the changes
sudo systemctl restart nginx
sudo systemctl restart tor
```

Wait about a minute, then run this command to see your new address:

```bash
sudo cat /var/lib/tor/hidden_service/hostname
```

Copy that long `.onion` address, paste it into the [Tor Browser](https://www.torproject.org/download/), and you should see your site!

### The Pitfalls: A Warning for the Weary

Now, let's be honest. The process above looks simple, but getting there was a journey. Here's what I learned the hard way:

  * **The Onboarding is Confusing.** Getting started with a Google cloud as an individual can be a bit of a maze. The menus are built for giant corporations, not for someone doing a weekend project. Be prepared to feel like you're doing everything wrong. You're not—the design is the problem.
  * **"Free" Requires a Billing Account.** You will have to link a credit card to a billing account, even for the "Always Free" tier. This is for verification, and you won't be charged as long as you stay within the free limits.
  * **The Cost Estimate is Misleading.** When you create your free `e2-micro` VM, the console will show you a monthly cost estimate (around $7). **Ignore it.** This is the list price. The "Always Free" discount is applied at the end of the month, making your bill zero. It's confusing, but you just have to trust the process.
  * **The In-Browser SSH is Terrible.** Don't even bother with it. It's laggy and unresponsive. Take the five minutes to install the `gcloud` CLI and connect with your local terminal. It will save you a world of frustration.

In the end, I got it working, and you can too. This project is a perfect example of something that is technically simple but is wrapped in layers of corporate administrative nonsense. Pushing through that is a victory in itself.

So go ahead, give it a try. It's a fun challenge, a great story to tell, and a fantastic way to prove that you can figure things out, no matter how poorly they're designed.

You can access the live site using the [Tor Browser via this link](http://32fd3d4gq3u4qqpofstaiq3sf3h6tnyrdpqdcgdszbrhovv25yfxzhqd.onion). Please note that this link will only resolve if you are using the [Tor Browser](https://www.torproject.org/download/). (32fd3d4gq3u4qqpofstaiq3sf3h6tnyrdpqdcgdszbrhovv25yfxzhqd.onion)
