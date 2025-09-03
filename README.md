# Unifriend

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Unifriend is a modern social‑networking web application built with **Next.js 15** (App Router),
**TypeScript**, and **Tailwind CSS**. It demonstrates a full‑stack approach using
server‑side rendering, API routes and client‑side interactivity.

## Features

- **User authentication** (JWT based) with protected routes.
- **Profile management** – update avatar, bio and social links.
- **Real‑time chat** using WebSockets (Socket.IO).
- **Responsive UI** powered by Tailwind and Geist font.
- **Deployment ready for Vercel** with environment variables support.
- **Enhanced Visual Design:** Modern color palette, improved typography, and consistent alignment across pages.
- **Testimonials Section:** Dynamic quotation marks for user reviews.

## Prerequisites

Node 20.x (or newer) **and** npm 10.x or the `pnpm` package manager.

```bash
nvm install 20 && nvm use 20    # if you use NVM
npm i -g npm                    # update npm to the latest LTS
```

For fast local development we recommend running `npm install` followed by `npm run dev`.

## Getting Started

```bash
# Install dependencies
npm install

# Run locally
npm run dev --turbopack
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```text
unifriend/
├─ src/            # Application source
│  ├─ app/         # Next.js App Router pages & layout
│  ├─ components/  # Reusable UI components
│  ├─ lib/         # API clients, utilities
│  ├─ server/      # Server‑side logic (API routes)
│  └─ app/theme.ts # Design system theme configuration
├─ public/         # Static assets
└─ tests/          # Unit & integration tests
```

## Environment Variables

Create a **`.env.example`** file in the repository root (copy it to `.env.local` on your machine).  All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; keep secrets (e.g. JWT secret) **outside** of any `.env` that you commit.

```dotenv
NEXT_PUBLIC_API_URL=https://api.example.com     # Public API endpoint
JWT_SECRET=your-secret-key                    # Keep this secret; never commit it
```

If you use Docker, the same values can be passed as environment variables to the container.

## Deployment

The project is fully Vercel‑ready. Deploying on Vercel can be done with a single click from the GitHub integration – just ensure that all environment variables defined in `.env.example` are added to your Vercel project settings.

```bash
vercel init            # (if you haven't already)
vercel                 # Deploy the current branch
```

Vercel will automatically detect `next.config.ts` and use the embedded **Turbopack** build. If you want to tweak build settings, edit `vercel.json` accordingly.

## Running Tests

The repo currently contains no automated tests – the section is kept for future expansion. When you add your first test, simply run:

```bash
npm run test
```

Make sure you have a `tsconfig.json` that includes the test files or configure your testing framework accordingly.

## Contribution Guidelines

Please read our **[CONTRIBUTING.md](CONTRIBUTING.md)** before submitting a PR. In short:
1. **Fork** the repo and create a descriptive feature branch (`feature/your-feature`).
2. **Run** `npm run lint && npm run format && npm run test` locally – all checks must pass.
3. **Commit** with a [conventional‑commit](https://www.conventionalcommits.org/) style message.
4. **Push** to your fork and open a PR targeting the `main` branch.

We appreciate clear titles, detailed descriptions, and screenshots if applicable. Happy coding! 🎉

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
