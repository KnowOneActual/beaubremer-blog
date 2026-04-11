---
title: 'Blog'
description: 'A collection of articles and thoughts.'
layout: 'base.njk'
pagination:
  data: collections.posts
  size: 10
  reverse: true
  alias: posts
---

<h1 class="text-6xl font-black font-display text-white mb-12 tracking-tighter italic">
  {{ title }}<span class="text-fuchsia-500">.</span>
</h1>

<div class="space-y-10">
  {%- for post in posts -%}
  <article class="group relative p-8 bg-gray-900/40 rounded-2xl border border-white/5 hover:border-fuchsia-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/5">
    <div class="flex justify-between items-start mb-4">
      <time class="text-xs uppercase tracking-widest text-gray-500 font-semibold" datetime="{{ post.date | readableDate }}">
        {{ post.date | readableDate }}
      </time>
      <span class="text-xs text-gray-600 italic">{{ post.content | readingTime }}</span>
    </div>
    
    <h2 class="text-3xl font-bold font-display leading-tight mb-4">
      <a href="{{ post.url }}" class="text-white group-hover:text-fuchsia-400 transition-colors">
        {{ post.data.title }}
      </a>
    </h2>
    
    <p class="text-gray-400 leading-relaxed mb-6 line-clamp-2">
      {{ post.data.description }}
    </p>
    
    <a href="{{ post.url }}" class="inline-flex items-center text-sm font-bold text-fuchsia-500 hover:text-fuchsia-400 transition-colors">
      Read Article
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  </article>
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
