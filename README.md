# Techious Skills — Computer Appreciation Landing Page

A responsive, single-page site for Techious Skills' Computer Appreciation
program (Beginner + Advanced tracks). No build tools, no dependencies —
just HTML, CSS and vanilla JS, so it hosts directly on GitHub Pages.

## What's inside

```
├── index.html        # all page content/sections
├── css/style.css      # design system + layout + responsive rules
├── js/script.js        # live clock, mobile "start menu" nav, typed hero line, scroll reveals
└── README.md
```

The design is styled like a desktop operating system — a taskbar for
navigation (with a live clock), "windows" for each course track, and a
Start-Menu-style drawer on mobile — a nod to the "operating a computer"
subject matter itself.

## Editing content

- **Prices / phone number / WhatsApp link** — search `index.html` for
  `2347065595741` (WhatsApp/tel links) and `₦50,000` / `₦75,000` (pricing
  cards + bundle banner).
- **Course modules** — inside the two `.folder-window` blocks in the
  `#curriculum` section (Beginner and Advanced).
- **Colors / fonts** — all defined as CSS variables at the top of
  `css/style.css` under `:root`.

## Hosting it on GitHub Pages

1. Create a new repository on GitHub (e.g. `techious-skills-landing`).
2. Upload these three items — `index.html`, the `css` folder, and the
   `js` folder — to the root of the repo (drag-and-drop on the GitHub
   web UI works fine, or use git):

   ```bash
   git init
   git add .
   git commit -m "Techious Skills landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/techious-skills-landing.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a
   branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. GitHub will give you a live URL, usually:
   `https://<your-username>.github.io/techious-skills-landing/`
   (it can take a minute or two to go live the first time).

That's it — no build step required.
