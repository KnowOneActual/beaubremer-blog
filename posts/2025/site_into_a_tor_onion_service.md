---
title: 'Host Your Website as a Tor Onion Service'
description: 'Learn how to set up a free virtual server and share your site on the Tor network.'
date: 2025-08-25

tags:
  - networking
---

Looking for a fun weekend project? You can learn about the web by exploring Tor.

You can host your site as an onion service.

The setup is simple. Hosting an onion service helps you learn about servers and networking. It is a safe way to test new
technology.

### What is an onion service?

An onion service is a website on the Tor network. These sites use addresses ending in `.onion`. The name comes from the
layers of encryption that protect both users and hosts.

Usually, your computer connects directly to a website. With Tor, your traffic hops through several other computers. This
keeps your location and data private.

### Why bother?

I built this project to learn. It is a great way to try new things:

- **Server skills:** You will use a Linux server, Nginx, and Tor.
- **Fun project:** Hosting a site this way is a neat trick.
- **No cost:** Google Cloud has a tier that costs nothing.

### Step-by-step guide

Here is the plan: set up a free virtual server, upload your site, and turn on Tor.

#### Step 1: Set up a free server on Google Cloud

Google Cloud offers a free `e2-micro` virtual machine (VM). This small server can host a basic website.

1. **Sign up for Google Cloud** and start a project.
2. Go to **Compute Engine** and select **VM instances**.
3. Click **Create Instance** and select these free settings:
   - **Region:** Choose `us-west1`, `us-central1`, or `us-east1`.
   - **Machine type:** Select `e2-micro`.
   - **Boot disk:** Choose Ubuntu or Debian (30 GB or less).
   - **Firewall:** Allow HTTP traffic.

#### Step 2: Connect to the server

When the VM starts, use a terminal to connect.

1. [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install) on your machine.
2. Open your terminal and run `gcloud init` to log in.
3. Connect to the VM with this command (use your VM name and zone):

   ```bash
   gcloud compute ssh your-vm-name --zone its-zone
   ```

#### Step 3: Install the software

Install the web server and Tor:

```bash
# Update the server packages
sudo apt update && sudo apt upgrade -y

# Install git, Nginx, and Tor
sudo apt install git nginx tor -y
```

#### Step 4: Add your website files

Clone your code repository and copy the files to the web folder:

```bash
# Clone your repository
git clone https://github.com/your-username/your-repo.git

# Copy files to the web directory
sudo cp -r ~/your-repo/* /var/www/html/
```

#### Step 5: Configure Tor

Add two lines to the Tor config file to direct traffic to Nginx.

```bash
# Add the service configuration to the Tor config file
echo -e "HiddenServiceDir /var/lib/tor/hidden_service/\nHiddenServicePort 80 127.0.0.1:80" | sudo tee -a /etc/tor/torrc

# Restart Nginx and Tor to apply changes
sudo systemctl restart nginx
sudo systemctl restart tor
```

Wait one minute, then check your new address:

```bash
sudo cat /var/lib/tor/hidden_service/hostname
```

Use the Tor Browser to view your site at that address.

### Common challenges

Google Cloud can be tricky. Here is what to watch for:

- **Complex menus:** The interface is built for big companies. It can feel confusing, but do not worry.
- **Card required:** You must add a credit card to use the free tier. Google does this to verify your identity. You will
  not pay anything if you stay within the free limits.
- **Wrong cost estimates:** The setup page will show a charge of about $7 per month. Ignore this. The free discount
  applies at the end of the month, making it cost nothing.
- **Bad web terminal:** Google's web terminal is very slow. Use your local terminal instead.

Setting up an onion service is a fast way to learn about web hosting. It makes a great afternoon project.

This link only works in the Tor Browser:
[vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion](http://vqov6yt6arpfipoo4thbqopysgrv6j6lduz7ropkhj3ulx76stunfkad.onion)
