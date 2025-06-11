---
title: "Blog"
description: "A collection of articles and thoughts."
layout: "layout.njk"
---
# {{ title }}

<div class="space-y-8">
  {%- for post in collections.posts | reverse -%}
    <div class="p-6 bg-gray-900 rounded-lg">
      <p class="text-sm text-gray-400">{{ post.date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) }}</p>
      <h2 class="text-3xl font-bold mt-2">
        <a href="{{ post.url }}" class="text-fuchsia-400 hover:underline">{{ post.data.title }}</a>
      </h2>
      <p class="mt-4 text-gray-300">{{ post.data.description }}</p>
      <a href="{{ post.url }}" class="inline-block mt-4 text-white font-bold hover:text-fuchsia-400">Read more →</a>
    </div>
  {%- endfor -%}
</div>