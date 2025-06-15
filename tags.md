---
title: "All Tags"
layout: "base.njk"
permalink: /tags/
eleventyExcludeFromCollections: true
---
# {{ title }}

<div class="flex flex-wrap gap-2 mt-8">
  {% for tag in collections.tagList %}
    {% if tag != "posts" %}
      <a href="/tags/{{ tag | slugify }}/" class="block bg-gray-800 text-fuchsia-300 rounded-full px-4 py-2 text-lg font-semibold hover:bg-gray-700 transition-colors">#{{ tag }}</a>
    {% endif %}
  {% endfor %}
</div>