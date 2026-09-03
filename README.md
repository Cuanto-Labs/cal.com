# MeetSynq

MeetSynq is Cuanto Labs' scheduling platform — book meetings, manage availability, and run your calendar workflows from one place.

## About

MeetSynq is a full-featured scheduling platform built for individuals and teams. Set your availability, share your booking links, connect your calendars and video tools, and let people book time with you without the back-and-forth.

### Built With

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma.io](https://prisma.io/)

## Project Structure

MeetSynq is a Yarn/Turbo monorepo:

```
apps/web/                    # Main Next.js application
apps/api/v2/                 # API v2 service
packages/prisma/             # Database schema (schema.prisma) and migrations
packages/trpc/               # tRPC API layer
packages/ui/                 # Shared UI components
packages/features/           # Feature-specific code, organized as vertical slices
packages/app-store/          # Third-party integrations
packages/lib/                # Shared utilities
```

## Getting Started

### Prerequisites

- Node.js (Version: >=18.x)
- PostgreSQL (Version: >=13.x)
- Yarn _(recommended)_

### Setup

1. Install packages with yarn

   ```sh
   yarn
   ```

2. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.
   - Use `openssl rand -base64 24` to generate a key and add it under `CALENDSO_ENCRYPTION_KEY` in the `.env` file.
   - Set `DATABASE_URL` and `DATABASE_DIRECT_URL` to your PostgreSQL connection string.

3. Set up the database

   ```sh
   yarn workspace @calcom/prisma db-migrate
   ```

4. Run the app in development mode

   ```sh
   yarn dev
   ```

5. Open a browser to [http://localhost:3000](http://localhost:3000).

## Development

- Type check: `yarn type-check:ci --force`
- Lint and format: `yarn biome check --write .`
- Unit tests: `TZ=UTC yarn test`
- E2E tests: `PLAYWRIGHT_HEADLESS=1 yarn e2e`

## Deployment

MeetSynq deploys on [Vercel](https://vercel.com/). Configure the required environment variables (`DATABASE_URL`, `NEXT_PUBLIC_WEBAPP_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `CALENDSO_ENCRYPTION_KEY`) in your Vercel project before deploying.

## License

Licensed under the [MIT License](./LICENSE).
