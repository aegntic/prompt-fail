# prompt.FaiL — Immersive AI Experience

---

## Overview

prompt.FaiL is a **visually striking, witty, and technically sophisticated immersive AI platform** exploring the contrast between Loveable Language Models (LLMs) and Mutant Misfit Losers (MMLs), centered around Claube, the unLoveable anti-hero. It blends Mondrian-inspired design, playful 3D characters, encrypted cultural layers, and sharp British humor into a seamless, engaging user journey.

---

## Key Features

- **Immersive hero section** with animated witty greetings and 3D mascot
- **Claube persona showcase** with 3D avatar and witty captions
- **Interactive LLM vs. MML comparison** with annotations and animations
- **Failure gallery** highlighting AI missteps with playful commentary
- **Cultural playground** with encrypted references and layered overlays
- **Encrypted cinematic finale** with compelling call-to-action
- **Flawless scroll snapping and immersive routing**
- **Fully responsive, accessible, and performant**

---

## Architecture Overview

- **Frontend:** React + TypeScript SPA
- **Routing:** react-router-dom with scroll sync
- **Animations:** Framer Motion, Lottie, CSS
- **Styling:** CSS Grid, Flexbox, CSS Variables
- **3D Assets:** Optimized voxel models, SVG, GLTF
- **Containerization:** Docker
- **CI/CD:** Automated pipelines
- **Testing:** Jest + React Testing Library
- **Security:** Environment variables, secret scanning
- **Monitoring:** Logging, analytics, performance metrics

See [`PLANNING.md`](./PLANNING.md) and [`DESIGN.md`](./DESIGN.md) for full details.

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/aegntic/prompt-fail.git
cd prompt-fail
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

- Copy `.env.example` to `.env`
- Fill in secrets and API URLs
- **Never commit `.env` to version control**

4. **Run the development server**

```bash
npm run dev
```

5. **Open in browser**

Visit `http://localhost:5173` (or your configured port)

---

## Environment Variables

See `.env.example` for required variables:

- `VITE_API_URL` — Frontend API base URL
- `JWT_SECRET`, `DATABASE_URL` — Backend secrets
- Avoid exposing sensitive secrets with `VITE_` prefix

---

## Docker Usage

Build and run with Docker:

```bash
docker build -t promptfail-app .
docker run -p 3000:3000 --env-file .env promptfail-app
```

Use `docker-compose.yml` for multi-service orchestration.

---

## Contribution Guidelines

- **Branching:** Use Gitflow (`feature/`, `bugfix/`, `release/`)
- **Commits:** Descriptive, atomic, conventional
- **Code Style:** Enforced with ESLint, Prettier
- **Testing:** Write and maintain unit/integration tests
- **Documentation:** Update inline comments and markdown files
- **Security:** Never commit secrets; follow best practices
- **Pull Requests:** Require review, pass all checks before merge

---

## Project Structure

```
prompt-fail/
├── src/                   # React app source
│   ├── components/        # Modular components
│   ├── styles/            # CSS modules and global styles
│   ├── assets/            # Images, 3D models, animations
│   ├── App.tsx            # Main app container
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── .env.example           # Environment variable template
├── PLANNING.md            # Architecture & milestones
├── DESIGN.md              # Branding & design system
├── TASK.md                # Granular task breakdown
├── README.md              # This file
└── Dockerfile             # Containerization
```

---

## License

MIT © 2025 prompt.FaiL

---

## Acknowledgements

- Inspired by AI quirks, failures, and creative chaos
- Built with a love for clever design, wit, and technical excellence
