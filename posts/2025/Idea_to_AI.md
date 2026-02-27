---
title: "From Idea to AI: Building (and Securing) a Conversational Weather Bot"
date: 2025-06-21
description: >
  A case study on building a conversational AI weather bot with the Gemini API and Netlify Serverless Functions. Learn how to secure API keys and debug deployment issues.

tags:
  - tech
---

Every developer gets that itch—the need for a portfolio project that's more than just another to-do list. I wanted to build something that felt real, something that would force me to solve the kind of problems that don't come up in a simple tutorial. That's how I landed on the idea of a conversational weather bot.

My plan wasn't to execute a perfect blueprint. It was to start with a concept and embrace the real-world process of building, debugging, and learning along the way.

### The Toolkit: Choosing the Right Tools

My goal was a modern, intelligent, and secure application. Instead of chasing the newest, flashiest tools, my plan was to pick a tech stack where every component solved a specific problem for *this* project. Here’s a look at the tools I decided on, and my thinking behind each one:

* **Frontend:** Plain HTML, JavaScript, and Tailwind CSS. I kept the frontend lightweight, flexible, and fast, avoiding framework overhead for what was a clean and simple UI.
* **Intelligence:** The [Gemini API](https://ai.google.dev/) from Google. Its strength in natural language processing was perfect for turning a user's informal question into actionable data.
* **Live Data:** The [OpenWeatherMap API](https://openweathermap.org/api). A reliable and straightforward source for real-time, structured weather data.
* **Database:** [Google Firestore](https://firebase.google.com/docs/firestore). I needed a simple way to save conversation history, and Firestore's real-time capabilities and easy setup were ideal.
* **Hosting & Backend:** [Netlify](https://www.netlify.com/). I opted for a **serverless** approach for several key reasons:
    * **Cost-Effective:** You only pay for what you use, avoiding the cost of an always-on server.
    * **Automatic Scaling:** This approach provides automatic scaling. It’s about thinking ahead and building in a way that *could* handle a sudden spike in traffic without any manual work—a crucial feature for any real-world product.
    * **Enhanced Security:** It provides a secure environment for secret API keys without server management overhead.

---

### Part 1: From Zero to a Working Prototype

The first step was a rapid prototype to get a minimum viable product working. I built the chat interface using simple HTML and styled it with Tailwind CSS. The initial logic was straightforward and all lived in a single client-side JavaScript file.

While this was great for proving the concept, it had a critical security flaw that I knew I'd need to address after getting the basic functionality running.

---

### Part 2: The Real-World Hurdles (and 'Aha!' Moments)

Getting the prototype off my local machine and onto a live website is where the real problem-solving began.

#### Debugging Challenge #1: The Silence of a Deployed App

The app worked perfectly on my machine, but when I deployed it, it was stuck on "Connecting..." My first instinct was to hunt for a typo, but the browser console was completely clean. That’s the moment every developer dreads! It led me to my first educated guess: the problem wasn't in the code itself, but in the difference between my local setup and the live production environment. And I was right—I had forgotten to configure the production Firebase project.

#### Debugging Challenge #2: The App Blocked Itself

Getting the database connected felt like a win, but it immediately unlocked a new set of errors. At first, they were confusing—a "**Content Security Policy**" block and an "**auth/admin-restricted-operation**" error. After some digging, I realized what was happening: my app was now so secure, it was blocking *itself* from talking to the database! The solution was to explicitly allow the connection in my Netlify settings and enable anonymous sign-in in Firebase so visitors could have a secure session.

---

### Part 3: The Pro-Level Step: Securing API Keys

The most critical issue remained: my API keys for Gemini and OpenWeatherMap were sitting in my public JavaScript file.

To explain why this is a major security flaw, here's an analogy:

> *Leaving API keys in your client-side code is like leaving the key to your office under the front doormat. It’s convenient, but anyone who knows where to look can get in and cause serious damage.*

The only acceptable solution was to refactor the architecture, introducing a **serverless function** to act as a secure proxy.

[Gemini API (Key Exposed!)] & [OpenWeatherMap API (Key Exposed!)] -->
[Netlify Function] ---> [Gemini API (Key Secure)] & [OpenWeatherMap API (Key Secure)] -->

I created a Netlify Function that is the only part of the system that can access the secret keys.

```javascript

// netlify/functions/weather.js

// Using node-fetch for making API calls in the Node.js environment
const fetch = require('node-fetch');

exports.handler = async function (event) {
  // Best practice: Ensure the function only responds to POST requests.
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { userQuery } = JSON.parse(event.body);

    // API keys are pulled from Netlify's secure environment variables.
    // They are never exposed to the user's browser.
    const { WEATHER_API_KEY, GEMINI_API_KEY } = process.env;

    // ... (Secure logic to call Gemini and OpenWeatherMap APIs) ...

    const botResponse = await getConversationalReply(userQuery);

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botResponse }),
    };

  } catch (error) {
    // It's good practice to log errors for easier debugging.
    console.error("Netlify Function Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: 'An internal server error occurred.' }) };
  }
};
```

This serverless architecture completely mitigates the risk of exposing API keys while maintaining the exact same user experience.

-----

### Final Result and Key Takeaways


Most importantly, this project was a reminder that you don't need to have all the answers before you start. The most valuable skills I used weren't from a perfect plan, but from the process of hitting a wall, making an educated guess, and figuring out the next right step. That's the real work of building things, and I hope this story encourages you to start your own project, even if you don't know exactly how it'll finish.

If you want to dive into the code yourself, you can find the complete project on my GitHub.