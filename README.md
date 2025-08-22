# Unifriend

Unifriend is a modern social‑networking web application built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind CSS**.
It demonstrates a full‑stack approach using server‑side rendering, API routes, and client‑side interactivity.

## Features

- **User authentication** (JWT based) with protected routes.
- **Profile management** – update avatar, bio and social links.
- **Real‑time chat** using WebSockets (Socket.IO).
- **Responsive UI** powered by Tailwind and Geist font.
- **Deployment ready for Vercel** with environment variables support.
- **Enhanced Visual Design:** Modern color palette, improved typography, and consistent alignment across pages.
- **Testimonials Section:** Dynamic quotation marks for user reviews.

## Getting Started

```bash
# Install dependencies
npm install

# Run locally
npm run dev --turbopack
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
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

Create a `.env.local` file at the root:

```dotenv
NEXT_PUBLIC_API_URL=https://api.example.com
JWT_SECRET=your-secret-key
```

## Running Tests

```bash
npm run test
```

## Contribution Guidelines

1. Fork the repository and create a new branch (`feature/your-feature`).
2. Ensure tests pass: `npm run test`.
3. Run linting: `npm run lint`.
4. Open a pull request with a clear description of the changes.

All contributions are welcome – just follow the style guide and run tests before submitting.

## License

MIT © 2025 Unifriend