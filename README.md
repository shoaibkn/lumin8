This is a Next.js app for Lumin8.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Initialize Convex and generate server bindings:

```bash
npx convex dev
```

3. Create `.env.local` and set:

```bash
CONVEX_URL=...
RESEND_API_KEY=...
ADMIN_EMAIL=...
```

4. Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Backend

Contact form submissions are stored in Convex tables defined in `convex/schema.ts`, with mutations in `convex/contact.ts`.

## Notes

- The app’s server actions are in `app/actions/contact.ts` and now call Convex mutations.
- Run `npx convex deploy` when deploying to production.
