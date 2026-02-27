---
title: Search
layout: base.njk
---

<h1 class="text-5xl font-extrabold text-fuchsia-400 mb-8">Search the Blog</h1>

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>

<div id="search" class="min-h-[400px]"></div>

<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({ 
            element: "#search", 
            showSubResults: true,
            bundlePath: "/pagefind/"
        });
    });
</script>

<style>
    :root {
        --pagefind-ui-primary: #d946ef;
        --pagefind-ui-text: #ffffff;
        --pagefind-ui-background: #111827;
        --pagefind-ui-border: #374151;
        --pagefind-ui-tag: #d946ef;
    }
    .pagefind-ui__result-link {
        color: #d946ef !important;
    }
    .pagefind-ui__result-excerpt {
        color: #d1d5db !important;
    }
</style>
