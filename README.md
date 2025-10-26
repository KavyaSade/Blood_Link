# Swift Drop — Blood Bank Management System

Swift Drop is a full-stack application for managing blood donation requests and user registrations. This repository and the application are created and maintained by Kavya Sade.

## Prerequisites

- Node.js 18+ and npm
- Git

Note: The project ships with a Prisma schema using a local SQLite database by default (`prisma/dev.db`). If you prefer PostgreSQL or another provider, update `prisma/schema.prisma` and your `DATABASE_URL` in the `.env` file.

## How to edit this code

You can work on this project locally using your preferred editor or IDE.

1. Clone the repository:

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_DIR>
```

2. Install dependencies:

```sh
npm install
```

3. Generate the Prisma client (if you change the schema):

```sh
npx prisma generate
```

4. Start the backend server (default port: 3000):

```sh
node server.js
```

5. Start the frontend development server (Vite):

```sh
npm run dev
```

## Technologies used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Prisma (SQLite by default)

## Deployment

You can deploy this application to any static + Node.js hosting provider (Vercel, Render, Heroku, DigitalOcean App Platform, etc.). Typical steps:

1. Build the frontend and prepare the server for production.
2. Ensure the production `DATABASE_URL` points to a managed database (Postgres, MySQL, or your preferred provider).
3. Configure environment variables in your hosting provider and deploy the Node server.

If you want, I can add deployment examples for Vercel or Render.

## Attribution

This project is authored by Kavya Sade and managed within this repository.

---

If you'd like specific text or a personal website link added (for example a portfolio link or contact email), tell me the exact wording or URL and I'll insert it.
