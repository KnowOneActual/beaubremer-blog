---
title: "Blog"
description: "A collection of articles and thoughts."
layout: "base.njk"
pagination:
  data: collections.posts
  size: 10
  reverse: true
  alias: posts
---
<h1 class="text-5xl font-extrabold text-fuchsia-400 mb-8">{{ title }}</h1>

<div class="space-y-8">
  {%- for post in posts -%}
  <div class="p-6 bg-gray-900 rounded-lg">
    <div class="flex justify-between items-start">
      <p class="text-sm text-gray-400">{{ post.date | readableDate }}</p>
      <p class="text-sm text-gray-500">{{ post.content | readingTime }}</p>
    </div>
    <h2 class="text-3xl font-bold mt-2">
      <a href="{{ post.url }}" class="text-fuchsia-400 hover:underline">{{ post.data.title }}</a>
    </h2>
    <p class="mt-4 text-gray-300">{{ post.data.description }}</p>
    <a href="{{ post.url }}" class="inline-block mt-4 text-white font-bold hover:text-fuchsia-400">Read more →</a>
  </div>
{%- endfor -%}
</div>

<nav class="flex justify-between items-center mt-12 py-4 border-t border-gray-800">
  <div>
    {% if pagination.href.previous %}
      <a href="{{ pagination.href.previous }}" class="text-fuchsia-400 hover:underline">← Newer Posts</a>
    {% endif %}
  </div>
  <div class="text-gray-500 text-sm">
    Page {{ pagination.pageNumber + 1 }} of {{ pagination.pages.length }}
  </div>
  <div>
    {% if pagination.href.next %}
      <a href="{{ pagination.href.next }}" class="text-fuchsia-400 hover:underline">Older Posts →</a>
    {% endif %}
  </div>
</nav>