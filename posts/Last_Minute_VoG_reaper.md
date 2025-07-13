---
title: "Recording a Last-Minute 'Voice of God' in Reaper"
description: "An audio emergency? Here's how to quickly record a clean, professional 'Voice of God' announcement on-site with an SM58, a laptop, and Reaper."
date: 2025-07-12
layout: "post.njk"
tags:
  - audio
  - live events
  - vog
  - reaper
  - recording
---

It’s a scenario every event audio tech knows well: the show is about to start, and a last-minute "Voice of God" (VOG) announcement needs to be recorded. All eyes are on you. It's time to work some magic with the tools you have on hand.

Here’s a straightforward guide to capturing a clean, professional-sounding VOG using a simple USB interface, a laptop with [REAPER](https://www.reaper.fm/), and the trusty Shure SM58.

### First, Find Your "Vocal Booth"

Before you plug anything in, your top priority is finding the best possible place to record. In a bustling event space, this can be tricky, but it's essential for avoiding background noise and ugly room echo in your recording.

Your goal is to find a space that is as "dead" as possible, meaning it absorbs sound instead of letting it bounce around. Look for a small, quiet room away from the main action. A storage closet, an empty office, or even a quiet corner can work in a pinch.

Once you’ve found your spot, build a makeshift vocal booth. Grab any soft materials you can find—coats, blankets, or event draping are perfect. Drape them over mic stands or chairs to build a small enclosure. This will help absorb vocal reflections and block out some of that distracting ambient noise.

### Gear and Mic Technique

With your impromptu studio ready, it's time to get your gear set up for a great take.

#### Using the SM58

The Shure SM58 is a legend for a reason. Its cardioid pickup pattern is a lifesaver in noisy environments because it’s designed to pick up sound from the front and reject sound from the sides and rear.

For a clear voiceover, have the speaker hold the microphone about 4-6 inches from their mouth. This gives you a full, present sound. If you get too close, the "proximity effect" will kick in and make the voice sound boomy and muffled. Make sure the speaker is talking directly into the top of the mic, not across it.

#### The All-Important Pop Filter

A pop filter is crucial for stopping plosives—those harsh "p" and "b" sounds that can ruin a take. If you don’t have a real one, no problem. You can make an effective one with items found at almost any event:

* **The Sock Method:** A clean, thin dress sock pulled over the microphone's grille works surprisingly well.
* **The Coat Hanger & Pantyhose:** Bend a wire coat hanger into a circle. Stretch a pair of pantyhose over the frame and use gaffer tape to attach it to the mic stand.

### Setting Up Your Reaper Session

1.  **Create a New Track:** In your Reaper project, go to the `Track` menu and select `Insert new track` (or use the shortcut `Ctrl+T`).
2.  **Arm the Track & Select Your Input:** Click the red `Arm for recording` button on the new track. Next, click the input box (which usually says `Input 1`) and choose the correct input from your USB audio interface.
3.  **Check Your Levels:** Have the person read a line from the announcement at the volume they'll be using. Watch the track's meter. You want the level to average around **-12dBFS**, with the loudest peaks hitting about **-6dBFS**. As long as the meter stays in the green and yellow, you're good. If it hits red, the signal is clipping (distorting), and you'll need to turn down the gain on your audio interface.

### A Quick and Effective FX Chain

Once you have a good take, you can use a few of Reaper's excellent built-in plugins (ReaPlugs) to add a professional polish. Click the `FX` button on your track to open the effects window.

Here’s a simple chain that works wonders for VOG recordings:

* **ReaEQ:** Start with an EQ to clean up the signal. Add a `High Pass` filter and set the `Frequency` to around **80-100Hz**. This removes low-end rumble from things like HVAC systems. You can also use ReaEQ to tame any harsh "s" sounds (sibilance). Find the frequency where the "s" is most piercing (usually 5-8kHz) and use a narrow `Band` to cut it by a few decibels.
* **ReaComp:** Next, add a compressor to even out the volume. Think of it as an automatic volume fader. A `Ratio` of **3:1** or **4:1** is a great starting point. Lower the `Threshold` until you see the meter showing about **3-6dB** of gain reduction on the loudest words. This will make the entire announcement sound more consistent and easier to understand.
* **JS: Master Limiter:** Add this JS plugin at the end of your chain to make the final recording loud and clear without clipping. It raises the overall volume and sets a hard ceiling that the audio can't go past. Simply adjust the `Threshold` to get a strong final level.

Once you’re happy with the sound, it's time to render the file. Go to `File > Render` and choose your output format (WAV is best for quality).

And that's it! With a little resourcefulness and these quick tips, you can turn a last-minute request into a polished, professional recording that's ready for the show.