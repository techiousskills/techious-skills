# Techious Skills: Computer Appreciation Landing Page

A responsive, multi-page site for Techious Skills' Computer Appreciation
program (Beginner + Advanced tracks). No build tools, no dependencies,
just HTML, CSS and vanilla JS, so it hosts directly on GitHub Pages.

## What's inside

```
├── index.html         # homepage: hero, curriculum overview, pricing
├── beginner.html       # full lesson breakdown: Beginner's Package
├── advanced.html        # full lesson breakdown: Advanced Package
├── bundle.html            # full lesson breakdown: Both Skills Package
├── enroll.html              # enrollment form (name, phone, email, gender, package)
├── css/style.css              # design system + layout + responsive rules
├── js/script.js                 # clock, mobile nav, typed line, reveals, form logic
└── README.md
```

The design is styled like a desktop operating system: a taskbar for
navigation (with a live clock), "windows" for each course track, and a
Start-Menu-style drawer on mobile, a nod to the "operating a computer"
subject matter itself.

## How the buttons/pages connect

- **Enroll Now** (taskbar, hero, mobile menu) → `enroll.html`, the enrollment form.
- **Curriculum cards / "Choose Beginner" / "Choose Advanced" / "Get both"**
  on the homepage → the matching package page (`beginner.html`,
  `advanced.html`, `bundle.html`), which lists every lesson in that
  package.
- On each package page:
  - **"Chat on WhatsApp about this package"** opens WhatsApp with a
    short pre-filled message naming that specific package.
  - **"Proceed to enrollment form"** opens `enroll.html` with that
    package already pre-selected in the form.
- On `enroll.html`, submitting the form opens a pre-filled email
  addressed to **techiousskills26@gmail.com** with all the entered
  details. There's also a "Send your details on WhatsApp instead" link
  as a backup, for visitors without an email app configured.

## Important: how the enrollment form actually "sends" data

This is a static site with no server, so it **cannot silently transmit
form data** to your inbox the way a backend form would. Instead,
submitting the form opens the visitor's own email app with the subject
and message body already filled in and addressed to your email; they
still need to hit send in their email app. This works well on desktop
and most phones, but it does depend on the visitor having an email app
configured, which is why the WhatsApp fallback link sits right below
the form.

If you'd rather have entries land directly in your inbox with no extra
tap from the visitor, you have two options:

1. **Formspree** (or a similar form backend): create a free account at
   formspree.io, get a form endpoint, and point the `<form>` tag in
   `enroll.html` at it (`action="https://formspree.io/f/xxxxx"
   method="POST"`). No JavaScript changes needed.
2. **Google Forms**: create a Google Form with the same fields and
   embed it, or just link to it instead of `enroll.html`.

Happy to wire either of these in for you, just share the endpoint or
form link.

## Editing content

- **Prices / phone number / WhatsApp / email** - search across the
  `.html` files for `2347065595741` (WhatsApp/tel links),
  `techiousskills26@gmail.com`, and `₦50,000` / `₦75,000` (pricing).
- **Lessons** - each package page (`beginner.html`, `advanced.html`,
  `bundle.html`) has one `.lesson-card` block per lesson.
- **Colors / fonts** - all defined as CSS variables at the top of
  `css/style.css` under `:root`.

## Hosting it on GitHub Pages

1. Create a new repository on GitHub (e.g. `techious-skills-landing`).
2. Upload everything in this folder to the root of the repo
   (drag-and-drop on the GitHub web UI works fine, or use git):

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

That's it, no build step required.
