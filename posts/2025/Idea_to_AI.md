---
title: 'From Idea to AI: Building and Securing a Weather Bot'
date: 2025-06-21
description: >
  Learn how to build and secure a weather bot using the Gemini API and Netlify functions.
tags:
  - tech
---

Every developer gets the itch to build a project beyond a simple to-do list. I wanted a real project to solve real
problems. So I decided to build a weather bot.

I began with a simple plan. I wanted to learn by building and debugging.

### The toolkit: choosing the right tools

I wanted to build a smart and secure app. I chose tools that solved specific problems. Here is the list:

- **Frontend:** Plain HTML, JavaScript, and Tailwind CSS. I kept the frontend light and fast to keep the UI clean and
  simple.
- **Intelligence:** The [Gemini API](https://ai.google.dev/) from Google. It turns user questions into useful data.
- **Live Data:** The [OpenWeatherMap API](https://openweathermap.org/api). It provides real-time weather data.
- **Database:** [Google Firestore](https://firebase.google.com/docs/firestore). I used it to save chat logs. It is easy
  to set up and works in real time.
- **Hosting & Backend:** [Netlify](https://www.netlify.com/). I chose a serverless approach for three reasons:
  - **Cost-effective:** You only pay for what you use. Idle servers cost nothing.
  - **Automatic scaling:** The app scales to handle traffic spikes.
  - **Security:** It keeps API keys secure.

---

### Part 1: from zero to a working prototype

First, I built a simple prototype. I made the chat interface with HTML and Tailwind CSS. The code was simple and sat in
one JavaScript file.

It worked, but it had a major security flaw. I had to fix this flaw first.

---

### Part 2: real-world hurdles (and 'aha!' moments)

Deploying the prototype is where the real work began.

#### Debugging challenge #1: the silence of a deployed app

The app worked locally but failed when live. The browser console showed no errors. Every developer dreads this.

I guessed the setup was wrong. I was right. I forgot to configure the Firebase project.

#### Debugging challenge #2: the app blocked itself

Connecting the database brought new errors. The browser blocked requests due to security rules.

The app was so secure it blocked its own database calls. To fix it, I allowed the connection in Netlify and enabled
sign-in in Firebase.

---

### Part 3: the pro-level step: securing API keys

My public JavaScript file still held the API keys.

Exposing keys is risky. It is like leaving a house key under the doormat. Anyone can find it.

To secure them, I used a serverless function as a proxy.

[Gemini API (Key Exposed)] & [OpenWeatherMap API (Key Exposed)] --> [Netlify Function] ---> [Gemini API (Key Secure)] &
[OpenWeatherMap API (Key Secure)]

I created a Netlify Function. Only this function can access the keys.

```javascript
// netlify/functions/weather.js

// Use node-fetch for API calls
const fetch = require('node-fetch');

exports.handler = async function (event) {
  // Only respond to POST requests.
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { userQuery } = JSON.parse(event.body);

    // Load API keys from secure environment variables.
    // The browser cannot see them.
    const { WEATHER_API_KEY, GEMINI_API_KEY } = process.env;

    // ... (Call APIs securely) ...

    const botResponse = await getConversationalReply(userQuery);

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botResponse }),
    };
  } catch (error) {
    // Log errors for debugging.
    console.error('Netlify Function Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'An internal server error occurred.' }) };
  }
};
```

The proxy setup keeps the keys secure and the app the same.

---

### Final result and key takeaways

You do not need all the answers to start a project. The best lessons came from solving problems as they appeared. Active
learning is how we build things. I hope this story encourages you to start your own.

The code is available on my GitHub.
