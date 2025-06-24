---
title: "From Idea to AI: Building (and Securing) a Conversational Weather Bot" 
date: 2025-06-21
description: > 
  A deep dive into how I built a full-stack, conversational weather bot 
  using JavaScript, the Gemini API, and Netlify Serverless Functions, 
  including the security and deployment challenges I solved along the way. 
layout: "post.njk" 
tags:  
 - project 
 - javascript 
 - apis  
 - serverless 
 - security 
 - case-study 
---
 
I wanted a portfolio project that went beyond a simple static site—something 
that demonstrated a complete development cycle, from concept to a secure, 
deployed application. The idea? A conversational weather bot. Instead of just 
typing "Chicago," a user could ask, "What's the weather like in Chicago this 
afternoon?" and get a natural-language answer. 
 
This project became a practical exercise in modern web development, integrating 
multiple APIs and a serverless backend. More importantly, it was a journey 
through the real-world process of debugging and refinement—the skills that turn 
code into a reliable product. 
 
### The Toolkit: Choosing the Right Tools 
 
The goal was a modern, intelligent, and secure application. I chose a tech stack 
where each component served a specific purpose, demonstrating a strategic 
approach to development. 
 
* **Frontend:** Plain HTML, JavaScript, and Tailwind CSS. I chose this to keep 
    the frontend lightweight and fast, avoiding framework overhead for what was 
    primarily a simple, clean UI. 
* **Intelligence:** The [Gemini API](https://ai.google.dev/) from Google. Its 
    strength in natural language processing was perfect for the core task: 
    turning a user's informal question into actionable data. 
* **Live Data:** The [OpenWeatherMap API](https://openweathermap.org/api). 
    A reliable and straightforward source for real-time, structured weather 
    data. 
* **Database:** [Google Firestore](https://firebase.google.com/docs/firestore). 
    I needed a simple way to save conversation history, and Firestore's 
    real-time capabilities and easy setup were ideal for this. 
* **Hosting & Backend:** [Netlify](https://www.netlify.com/). I opted for a 
    serverless approach because it's cost-effective, scales automatically, 
    and provides a secure environment for my secret API keys without needing 
    to manage a dedicated server. 
 
### Part 1: The Blueprint - A Rapid Prototype 
 
The first step was getting a minimum viable product working. I built the chat 
interface using simple HTML and styled it with Tailwind CSS for a clean look. 
 
The initial UI structure was straightforward: a container for messages and a 
form for input. 
 
```html 
&lt;div id="chat-window" class="flex-1 p-6 overflow-y-auto"> 
  &lt;/div> 
 
&lt;form id="chat-form" class="flex items-center"> 
  &lt;input type="text" id="chat-input" placeholder="Ask about the weather..." autocomplete="off"> 
  &lt;button type="submit">Send&lt;/button> 
&lt;/form> 


Initially, all the logic lived in a client-side JavaScript file. The logic

followed three steps: identify the city using the Gemini API, fetch weather

data from OpenWeatherMap, and then feed both back into Gemini to generate a

human-friendly response. While this was great for quick prototyping, it had a

critical security flaw that I planned to address after proving the concept.


### Part 2

From Localhost to Live - The Inevitable Hurdles

Getting the prototype to run on a live website is where the real

problem-solving begins. Deploying to Netlify revealed a series of issues that

required systematic debugging.


#### Challenge 1: The Bot Was Stuck on "Connecting..."

Investigation: The app worked locally but not when deployed. The browser console

was clean, which suggested the issue wasn't a simple code error. I realized my

local setup used a development server, but the live site had no database

connection configured.

Solution: I created a production Firebase project and wired it up by adding the

firebaseConfig object to my project. This was a classic "dev vs. production"

environment mismatch, and it reinforced the need for explicit configuration for

deployed services.


#### Challenge 2: Authentication and Security Policy Errors

Investigation: With the database configured, new errors appeared: a Content

Security Policy (CSP) block against gstatic.com (a Google domain for Firebase)

and an auth/admin-restricted-operation error from Firebase itself.

Solution: I solved this in two steps. First, I updated the netlify.toml file to

explicitly allow scripts from gstatic.com in my CSP. Second, I diagnosed the

auth error to mean that while my app was talking to Firebase, no users were

authorized to perform actions. I enabled "Anonymous sign-in" in the Firebase

console, creating a secure session for any visitor without requiring them to

create an account.


#### Part 3: The Pro-Level Step - Securing API Keys

The most critical issue was that my API keys for Gemini and OpenWeatherMap were

sitting in my public JavaScript file. Exposing API keys on the frontend is a

critical security flaw. A malicious actor could steal them and run up enormous

costs on my billing account or have them disabled for abuse. This is

unacceptable for any real-world application.

The solution was to refactor the architecture, introducing a serverless function

to act as a secure proxy.

The New, Secure Architecture:

Instead of the user's browser calling the APIs directly, it now makes a single,

secure request to a backend function on my own site. This function then calls

the external APIs using the keys, which are stored safely as environment

variables on Netlify.

I created a Netlify Function in netlify/functions/weather.js. This function is

the only part of the system that can access the secret keys.

```
JavaScript

// netlify/functions/weather.js 
 
// Using node-fetch for making API calls in the Node.js environment 
const fetch = require('node-fetch'); 
 
exports.handler = async function (event) { 
  // Only allow POST requests for security 
  if (event.httpMethod !== 'POST') { 
    return { statusCode: 405, body: 'Method Not Allowed' }; 
  } 
 
  try { 
    const { userQuery } = JSON.parse(event.body); 
     
    // Get API keys from secure environment variables, never exposed to the client 
    const { WEATHER_API_KEY, GEMINI_API_KEY } = process.env; 
 
    // ... (Secure logic to call Gemini and OpenWeatherMap APIs) ... 
     
    // The function securely gets the data and formats a response 
    const botResponse = await getConversationalReply(userQuery); 
 
    return { 
      statusCode: 200, 
      body: JSON.stringify({ reply: botResponse }), 
    }; 
 
  } catch (error) { 
    console.error("Netlify Function Error:", error); 
    return { statusCode: 500, body: JSON.stringify({ error: 'An internal server error occurred.' }) }; 
  } 
}; 

```

This serverless architecture completely mitigates the risk of exposing API keys

while maintaining the same user experience.


### Final Result and Key Takeaways

This project was a valuable exercise in building a full-stack application from

the ground up. It demonstrates a practical approach to integrating third-party

services, securing sensitive data, and—most importantly—systematically

debugging the issues that arise when moving from a local machine to a live

production environment.
