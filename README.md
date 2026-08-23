# Azka Fathan Portfolio Website

A modern, responsive portfolio website for a creative professional working across photography, video, and graphic design.

## Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Responsive design with no build tooling required

## Features

- Sticky header with mobile hamburger navigation
- Smooth scrolling sections
- Filterable portfolio gallery
- Modal lightbox with project detail navigation
- About section with skill highlights
- Contact form interaction
- Accessible semantics and keyboard support
- Mobile-first responsive layout
- Lazy-loaded images for performance

## Local development

From the project root, run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deployment

This is a static site, so it can be deployed to Netlify, Vercel, GitHub Pages, or any static host.

### Netlify

1. Push this project to a Git repository.
2. Import the repository in Netlify.
3. Use the default settings for a static site.
4. Deploy the project.

### Vercel

1. Import the project in Vercel.
2. Keep the default framework settings as they are for static sites.
3. Deploy.

## Project structure

- `index.html` — page structure and content
- `styles.css` — layout, typography, responsiveness, and theme styling
- `script.js` — portfolio filtering, mobile nav, modal behavior, and form interaction
- `projects/photography/index.html` — photography work page
- `projects/motion-picture/index.html` — motion picture work page
- `projects/graphic-design/index.html` — graphic design work page

## Notes

The site uses remote Unsplash images for portfolio previews and the hero collage. Replace them with your own work assets for production use.
