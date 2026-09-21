# Levan Sarajishvili, portfolio

A personal portfolio drawn as a route across the map of Georgia. The page starts at a pin on
Tbilisi, and a dashed line travels through every project to the contact form. It starts light
orange and thin, and gets thicker and more orangered with every stop.

Built with **React 19, Vite 8 and Tailwind CSS 4**. English and Georgian, Day and Night map styles.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Dev server with hot reload            |
| `npm run build`   | Production build into `dist/`         |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | ESLint (React hooks + refresh rules)  |

## Before you publish

Everything personal lives in `src/data/`. Open the files and fill in the `TODO` lines:

- **CV**: put your PDF at `public/cv/levan-sarajishvili-cv.pdf` (or change `cvUrl` in
  `src/data/profile.js`; set it to `null` to hide the button).
- **LinkedIn**: `linkedin.url` in `src/data/profile.js`. The row appears as soon as the URL is set.
- **Repository links**: `codeUrl` in `src/data/projects.js`. Until then "Read the code" opens your
  GitHub repositories page.
- **Candy Shop demo**: `demoUrl` in `src/data/projects.js`.
- **Screenshots**: `src/assets/projects/*.webp` (about 1240 px wide, shown at 2.2 : 1).
- **Contact form** (optional): copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to a
  form service that accepts JSON, for example a [Formspree](https://formspree.io) form URL.
  Without it the form still works: it opens the visitor's email app with the message filled in.

All text is in `src/i18n/en.js` and `src/i18n/ka.js`.

## How it is built

```
src/
├── assets/maps/          Static base maps (Day / Night) generated from Natural Earth
├── assets/projects/      Project screenshots (WebP)
├── components/
│   ├── layout/           Navbar, MobileMenu, LanguageSwitch, Footer
│   ├── map/              HeroMap, RouteLayer, RouteProfile, Waypoint, MapStyleControl
│   ├── sections/         Hero, Work, Skills, About, Contact (+ their parts)
│   └── ui/               Button, FormField, LegendSymbol, ToastProvider
├── context/              Preferences (language + map style) and toast contexts
├── data/                 profile, projects, skills (language-independent)
├── hooks/                usePreferences, useMediaQuery, useScrolled, useActiveSection, useFocusTrap, useToast
├── i18n/                 en.js, ka.js
├── lib/                  geo, route, profile-path, validation, send-message, utils
└── pages/                Home, NotFound
```

**State.** Only two things are global: the language and the map style. They live in one small
context (`PreferencesProvider`), are saved in `localStorage` and applied before the first paint by
a tiny script in `index.html`, so there is no flash. Everything else is local: the skills filter
is `useState`, the contact form is a `useReducer` state machine, the mobile menu is `useState`
with a focus trap. No Redux or Zustand needed at this size.

**Theming.** Every colour is a CSS variable declared in Tailwind's `@theme` (`src/index.css`).
Night mode only redefines the variables under `[data-theme="night"]`, so components never need
`dark:` variants. The route colour is two variables: `--color-route-start` and `--color-route-end`.

**The route.** `RouteLayer` measures the Tbilisi pin and every `[data-waypoint]`, then draws one
SVG leg per stretch. It re-measures with a `ResizeObserver` (filtering skills, fonts loading,
switching language). The part of the route you have already scrolled past is drawn at full
strength. Desktop only; with reduced motion the full route is shown at once.

**Map.** The terrain, borders and regions are one static SVG per style (cached by the browser).
City names, the Tbilisi pin and the sea and mountain labels are live SVG text on top, so they
follow the language and theme.

**Forms and feedback.** Validation messages are stored as codes and translated at render time,
so switching language translates visible errors too. Invalid submit moves focus to the first
problem. A honeypot field filters simple bots. Results are shown with Radix toasts, which screen
readers announce.

**Accessibility.** Skip link, semantic landmarks and headings, visible focus rings, `aria-pressed`
filters with a live result count, `aria-current` in the navigation, a focus-trapped mobile menu
(Escape closes it), and `prefers-reduced-motion` support.

## Deploy

Vercel: import the repository, framework preset **Vite**, build command `npm run build`,
output `dist`. `vercel.json` already rewrites all routes to `index.html`, so the 404 page works.
Add `VITE_CONTACT_ENDPOINT` under *Environment Variables* if you use a form service.

For link previews, change `og:image` in `index.html` to the absolute URL of your deployed site,
for example `https://your-domain.vercel.app/og-image.png`.

## Credits

Base map data: [Natural Earth](https://www.naturalearthdata.com) (public domain). Terrain contours
are illustrative. Fonts: Archivo and Noto Sans Georgian (SIL Open Font License), via Fontsource.
