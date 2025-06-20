---
title: "Blog"
description: "A collection of articles and thoughts."
layout: "base.njk"
---
<h1 class="text-5xl font-extrabold text-fuchsia-400 mb-8">{{ title }}</h1>

<div class="space-y-8">
  {%- for post in collections.posts | reverse -%}
    <div class="p-6 bg-gray-900 rounded-lg">
      <p class="text-sm text-gray-400">{{ post.date | readableDate }}</p>
      <h2 class="text-3xl font-bold mt-2">
        <a href="{{ post.url }}" class="text-fuchsia-400 hover:underline">{{ post.data.title }}</a>
      </h2>
      <p class="mt-4 text-gray-300">{{ post.data.description }}</p>
    </div>
  {%- endfor -%}
</div>