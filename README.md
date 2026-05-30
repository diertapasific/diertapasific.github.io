# diertapasific.github.io

Personal portfolio site for Dierta Pasific — Jr AI Engineer at Staffinc.

Live at **[diertapasific.github.io](https://diertapasific.github.io)**

---

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS v3**
- **Three.js** + **React Three Fiber** — WebGL point-cloud globe on the hero
- **Groq API** (via Cloudflare Worker proxy) — powers ChatDP, the portfolio chatbot

## Features

- 3D interactive globe hero with pointer parallax
- ChatDP — AI assistant trained on Dierta's profile, powered by `llama-3.1-8b-instant`
- Dark / light mode toggle
- Persistent chat history within the session
- Fully responsive — works on mobile and desktop
- Auto-deploy to GitHub Pages via GitHub Actions

## Project Structure

```
src/
  components/
    Nav.tsx         # Floating glass nav pill (desktop + mobile)
    Scene3D.tsx     # Three.js WebGL globe
  pages/
    Home.tsx        # Hero with 3D scene
    Chat.tsx        # ChatDP interface
    Projects.tsx
    Experiences.tsx
    Blog.tsx
    About.tsx
  hooks/
    useChatbot.ts   # Groq API chat logic
worker/
  index.ts          # Cloudflare Worker — proxies requests to Groq, holds API key
```

## Local Development

```bash
npm install
```

Create a `.env` file in the root:

```
VITE_CHATDP_WORKER_URL=https://chatdp-proxy.diertapasific.workers.dev
```

```bash
npm run dev
```

## Deploy

Pushing to `main` triggers GitHub Actions which builds and deploys to GitHub Pages automatically.

The Cloudflare Worker (`worker/`) is deployed separately via the Cloudflare dashboard. It requires two environment variables:

| Variable | Type | Description |
|---|---|---|
| `GROQ_API_KEY` | Secret | Groq API key |
| `ALLOWED_ORIGIN` | Variable | `*` or your domain |
