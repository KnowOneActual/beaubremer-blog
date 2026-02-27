---
title: "The AV Pro's Guide to Bulletproof Video Playback"
description: "A practical guide to video codecs, containers, and ensuring playback stability for live events."
date: 2025-12-24

tags:
  - live-production
---

Picture this: It is 30 minutes before showtime. You are handed a video file that needs to be added to the show immediately. When testing, it plays for eight seconds, then stutters and freezes. You panic.

You are left standing there wondering if it is the codec, the container, or just bad luck.

That was me. Multiple times. In front of the client.

The annoying thing is that the answer exists. It is just scattered across QLab forum threads from 2015, Reddit posts, and blogs that assume you already know what a bitrate is.

I spent too much time learning this the hard way. Here is how you can save yourself from making my mistakes.

## The Part Where I Was Clueless

Here is what I thought I knew about video:

* **MP4 is a video file.** (Nope, it is actually a *container*.)
* **ProRes is always best.** (Nope, it is CPU-hungry and sometimes overkill.)
* **H.264 works everywhere.** (Nope, it plays fine until it absolutely doesn't.)

What I was missing was how three separate things actually work together:

1.  **Codec:** How the video gets compressed.
2.  **Container:** The box that holds the codec.
3.  **Playback Stability:** Whether it will actually work on your machine.

I used to export videos from Adobe Media Encoder as "MP4 with H.264," and it would work well most of the time. However, occasionally, I would experience frame drops scattered throughout, which could be quite frustrating.

The problem was that I thought about this as if it were binary. But it is an ecosystem. When you are doing live playback, stability is everything.

## What You Are Actually Looking At

Here is a way to think about a video file that finally made sense to me. Imagine shipping a package. You have:

* **Container:** The shipping box itself (`.mp4`, `.mov`, `.mkv`).
* **Codec:** What is packed inside (H.264, ProRes, H.265).
* **Metadata:** The label on the box (resolution, frame rate, colors).

The trick is that you can put H.264 inside an `.mp4` box *or* a `.mov` box. It is the same video in a different box. But here is where it gets weird.

* QLab basically expects `.mov` files with ProRes.
* PlaybackPro is cooler now and takes `.mp4` with H.265.
* Old systems might only understand `.mov`.

So your "universal" H.264 file fails, not because the video is bad, but because the box doesn't fit in that player's mail slot. The container matters just as much as the codec.

## Why QLab Loves ProRes 422 Proxy

QLab documentation says to use "ProRes 422 Proxy." When I first read that, I thought "Proxy" sounded like settling. I thought I should use the full quality ProRes.

I tested different options, and I was wrong.

### ProRes 422 Proxy (The QLab Favorite)
* **Bitrate:** 145 Mb/s.
* **Performance:** Your Mac barely notices it is working.
* **Size:** About 26 GB per hour (1080p, 24fps).
* **Use Case:** Live theater, performance, or anything where smooth playback matters more than pixel perfection.

### ProRes 422 Standard
* **Bitrate:** 471 Mb/s.
* **Performance:** Your Mac knows it is doing work.
* **Size:** About 85 GB per hour.
* **Use Case:** Situations where you are not worried about other applications running.

ProRes Proxy is not a compromise. It is what QLab was built around. Apple engineered it so your GPU can decode it easily, leaving CPU room for audio cues and lighting changes. It is the smartest format for the job.

## My Current Mac Setup (That Actually Works)

This is my step-by-step workflow for rock-solid playback.

### Step 1: The Golden Rule (Transcode Everything)
**If you did not encode the file yourself, transcode it.**

This is the most important rule. Clients will hand you files that look fine but have weird variable frame rates or strange audio encodings. Never trust a raw file from a client. Always run it through your process so you know exactly what is inside.

* **From Apple Compressor:** Export ProRes 422 Proxy, `.mov` container.
* **From a GoPro or Phone:** Use Shutter Encoder or Apple Compressor.
* **Already H.264?** Convert it anyway. It is worth the time for the stability.

### Step 2: The ffmpeg One-Liner
When you want it done fast, use `ffmpeg`:

```bash
ffmpeg -i input.mp4 -c:v prores_ks -profile:v 0 -c:a pcm_s16le output.mov

```

* `-profile:v 0` sets it to ProRes Proxy.
* `-c:a pcm_s16le` creates uncompressed audio, which is safest for live events.

### Step 3: Batch Processing

This script saved me hours of work. Save this as `convert_to_qlab.sh`:

```bash
#!/bin/bash

for file in *.mp4; do
  filename="${file%.*}"
  echo "Converting $file..."
  ffmpeg -i "$file" \
    -c:v prores_ks \
    -profile:v 0 \
    -c:a pcm_s16le \
    "${filename}_proxy.mov"
done

echo "All done. Your videos are ready to go."

```

## Where Linux Threw Me a Curveball

I wanted to move to Linux, but ProRes on Linux is complicated. It is not officially supported due to licensing, GPU acceleration is rare, and encoding is slow.

If you are moving to Linux like I am, you are likely moving away from ProRes. After testing, here is what is actually reliable.

### Option 1: H.265/HEVC

* **File size:** Small (1/3 of H.264).
* **Bitrate:** 15-30 Mbps (1080p).
* **Why:** VA-API GPU acceleration on Fedora works well if your drivers are set up.

```bash
ffmpeg -i input.mp4 \
  -vaapi_device /dev/dri/renderD128 \
  -vf 'format=nv12,hwupload' \
  -c:v hevc_vaapi \
  -rc_mode VBR \
  -b:v 20M \
  -c:a aac \
  output.mp4

```

### Option 2: H.264 (The "Just Works" Option)

* **Bitrate:** 15-30 Mbps (1080p).
* **Why:** Maximum compatibility. Most systems support this out of the box.

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset fast \
  -crf 23 \
  -c:a aac \
  output.mp4

```

## The Stuff That Breaks Playback

I spent forever worrying about bitrates, but these two factors are what usually break a show.

### 1. Keyframes

Every couple of seconds, you need a full frame (keyframe). This lets the playback software jump around without decoding the whole file.

```bash
ffmpeg -i input.mp4 -c:v libx264 -g 48 output.mp4

```

`-g 48` places a keyframe every 48 frames (every 2 seconds at 24fps). This makes scrubbing through the video smooth rather than sluggish.

### 2. Frame Rate Consistency

Cameras often shoot at **23.976 fps**. QLab projects are usually set to **24 fps**. After 10 minutes, the audio will drift out of sync.

Check your file:

```bash
ffmpeg -i video.mov

```

If the input is 23.976, 25, or 29.97 fps, convert it to match your QLab project or change the project setting (usually 24 fps):

```bash
ffmpeg -i input.mp4 -r 24 -c:v libx264 -c:a aac output.mp4

```

## The Decision Tree

* **Staying on macOS?**
* Use ProRes 422 Proxy (`.mov`). Done.


* **Moving to Linux?**
* Need stability? Use H.264 @ 20-25 Mbps (`.mp4`).
* Want newer codecs? Use H.265/HEVC @ 15-20 Mbps (`.mp4`) if your GPU allows.



## Tools I Use

* **ffmpeg:** The backbone of this workflow.
* **Shutter Encoder:** A free GUI that is faster and less fussy than Adobe.
* **Apple Compressor:** If I'm not leaving the Mac environment.
* **ffprobe:** Tells you exactly what is inside a video file.
* **QLab / PlaybackPro:** The industry standards for Mac.
* **mpv:** Great for testing playback on Linux without overhead.

## The Real Lesson

I spent forever chasing the "perfect" codec. I thought if I found the right settings, everything would work everywhere. That is not how this works.

What actually matters is understanding why each codec exists and when to use it. ProRes is not objectively better, but it is better for QLab on Mac. H.265 is not a downgrade, it is just optimized for a different platform.

Once I stopped asking "what is the best codec" and started asking "what does this system need," everything got less frustrating.