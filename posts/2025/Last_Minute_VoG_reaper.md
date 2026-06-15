---
title: "Recording a Last-Minute 'Voice of God' in Reaper"
description:
  "An audio emergency? Here's how to quickly record a clean, professional 'Voice of God' announcement on-site with an
  SM58, a laptop, and Reaper."
date: 2025-07-12

tags:
  - live-production
---

It's a scenario every event audio tech knows well: the show is about to start, and a last-minute "Voice of God" (VOG)
announcement needs to be recorded. All eyes are on you. It's time to work some magic with the tools you have on hand.

Here is a guide to recording a clean VOG. You just need a USB interface, a laptop with REAPER, and a Shure SM58.

### First, Find Your "Vocal Booth"

First, find the best place to record. In a busy event space, this can be hard. But it is vital to avoid background noise
and echo.

Your goal is to find a space that is as "dead" as possible, meaning it absorbs sound instead of letting it bounce
around. Look for a small, quiet room away from the main action. A storage closet, an empty office, or a quiet corner can
work well.

Next, build a temporary vocal booth. Grab soft materials like coats, blankets, or drapes. Drape them over mic stands or
chairs to build a small enclosure. This absorbs sound reflections and blocks ambient noise.

### Gear and Mic Technique

With your impromptu studio ready, it's time to get your gear set up for a great take.

#### Using the SM58

The Shure SM58 is a classic microphone. Its pickup pattern is perfect for noisy spaces. It captures sound from the front
and rejects noise from the sides and back.

For a clear voiceover, place the microphone four to six inches from the speaker's mouth. This gives a full, present
sound. If you get too close, the voice will sound boomy. Make sure they talk directly into the top of the mic.

#### The All-Important Pop Filter

A pop filter stops harsh "p" and "b" sounds. If you do not have one, you can make it from common event items:

- **The Sock Method:** A clean, thin sock pulled over the microphone grille works well.
- **The Coat Hanger & Pantyhose:** Bend a wire coat hanger into a circle. Stretch a pair of pantyhose over the frame and
  use gaffer tape to attach it to the mic stand.

### Setting Up Your Reaper Session

1. **Create a New Track:** In your Reaper project, go to the `Track` menu and select `Insert new track` (or use the
   shortcut `Ctrl+T`).
2. **Arm the Track & Select Your Input:** Click the red `Arm for recording` button on the new track. Next, click the
   input box (which usually says `Input 1`) and choose the correct input from your USB audio interface.
3. **Check Your Levels:** Have the person read a line from the announcement at the volume they'll be using. Watch the
   track's meter. You want the level to average around **-12dBFS**, with the loudest peaks hitting about **-6dBFS**. As
   long as the meter stays in the green and yellow, you're good. If it hits red, the signal is clipping (distorting),
   and you'll need to turn down the gain on your audio interface.

### A Quick and Effective FX Chain

After recording, use Reaper's built-in plugins to polish the track. Click the FX button on your track to open the
effects window.

Here's a simple chain that works wonders for VOG recordings:

- **ReaEQ:** Start with an EQ to clean up the signal. Add a `High Pass` filter and set the `Frequency` to around
  **80-100Hz**. This removes low-end rumble from things like HVAC systems. You can also use ReaEQ to tame any harsh "s"
  sounds (sibilance). Find the frequency where the "s" is most piercing (usually 5-8kHz) and use a narrow `Band` to cut
  it by a few decibels.
- **ReaComp:** Next, add a compressor to even out the volume. Think of it as an automatic volume fader. A `Ratio` of
  **3:1** or **4:1** is a great starting point. Lower the `Threshold` until you see the meter showing about **3-6dB** of
  gain reduction on the loudest words. This will make the entire announcement sound more consistent and easier to
  understand.
- **JS: Master Limiter:** Add this JS plugin at the end of your chain to make the final recording loud and clear without
  clipping. It raises the overall volume and sets a hard ceiling that the audio can't go past. Simply adjust the
  `Threshold` to get a strong final level.

Once you're happy with the sound, it's time to render the file. Go to `File > Render` and choose your output format (WAV
is best for quality).

And that's it! With a little resourcefulness and these quick tips, you can turn a last-minute request into a polished,
professional recording that's ready for the show.
