# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website repository hosting support and privacy policy pages for multiple apps, primarily **KotoKata** (an AI-powered Indonesian dictionary app). The site is deployed via GitHub Pages at `support.socialartwaen.com`.

## Key Applications

- **KotoKata**: AI-powered Indonesian-Japanese dictionary app with quiz features
- **Coffee Calculator**: Coffee brewing calculator app (legacy)

## Repository Structure

- `KotoKata_support.html` - Main landing page for KotoKata (Japanese/English/Indonesian)
- `KotoKata_support.css` - Styles with gradient animations and multilingual support
- `KotoKata_privacy.html` - Privacy policy for KotoKata
- `google-api-guide.html` - Guide for obtaining Google API keys (required for KotoKata)
- `js/kotokata.js` - Interactive features: language toggle, carousel, scroll reveal
- `images/` - App screenshots, icons, demo video
- `support.html`, `privacy.html` - Legacy pages for Coffee Calculator

## Development Commands

### Preview HTML Files Locally

```bash
# Open in default browser
open KotoKata_support.html

# Open with specific browser
open -a "Google Chrome" KotoKata_support.html

# Run local server (recommended for testing)
python3 -m http.server 8000
# Then visit: http://localhost:8000/KotoKata_support.html
```

### Git Operations

This repository is deployed to GitHub Pages. The main branch serves the live site.

```bash
# Check status
git status

# Stage and commit
git add .
git commit -m "Update KotoKata support page"

# Deploy to live site
git push origin main
```

## Technical Architecture

### Multilingual System

The site uses a client-side language toggle system controlled by `js/kotokata.js`:

- Languages: Japanese (ja), English (en), Indonesian (id)
- State stored in `localStorage` as `kk_support_lang`
- DOM attribute `data-lang` on `<html>` controls visibility
- CSS shows/hides elements based on `.lang-ja`, `.lang-en`, `.lang-id` classes

### Interactive Features

1. **Language Toggle** - Persistent user preference with localStorage
2. **Image Carousel** - Touch-enabled mockup showcase with 3D positioning
3. **Scroll Reveal** - IntersectionObserver-based animations for progressive disclosure
4. **Accordion Sections** - Native `<details>`/`<summary>` elements

### Styling Patterns

- Gradient backgrounds with animated shifting (`bg-shift` keyframes)
- Glassmorphism effects (backdrop-filter blur on navigation)
- Responsive design with mobile-first approach
- Custom properties (`--i`) for staggered subcard animations
- Float-in animations with cubic-bezier easing

## Key URLs and Resources

- Live site: https://support.socialartwaen.com
- Google API key creation: https://aistudio.google.com/api-keys
- App Store link for KotoKata: `/appStoreLink/white.svg`

## Important Notes

- **No build process**: Direct HTML/CSS/JS - edit and commit
- **CNAME file**: Required for custom domain (support.socialartwaen.com)
- **Asset paths**: Images use relative paths from repository root
- **API keys**: KotoKata requires users to provide their own Gemini API key
- **Privacy policy**: App does not collect user data; everything stays on device

## Common Modifications

When updating KotoKata content:
1. Edit all three language sections (`.lang-ja`, `.lang-en`, `.lang-id`)
2. Test language toggle functionality
3. Verify responsive behavior on mobile
4. Commit and push to deploy changes
