# Next.js Development Skill

## Overview
Guidelines and best practices for developing high-performance web applications using the Next.js App Router with JavaScript and Tailwind CSS.

## Key Principles
1. **Server Components by Default:**
   - Keep data fetching and static markup in Server Components.
   - Restrict `"use client"` solely to interactive subtrees (hooks, event handlers, client state).
2. **Optimized Asset Loading:**
   - Utilize Next.js `<Image />` component with descriptive `alt` tags and proper `sizes` queries.
   - Enable `priority` for above-the-fold hero images to optimize Largest Contentful Paint (LCP).
3. **Clean Code & Modularity:**
   - Maintain strict separation of concerns between layout, domain components, and reusable UI primitives.
   - Organize centralized business logic into reusable custom hooks.
