<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Standalone Next.js 16 marketing/"vitrine" site — no backend, no env vars. Lint: `npm run lint`; run with `npm run dev`. Standard commands are in `package.json`.

- Its default port is 3000, which clashes with `izikwen-admin`. Run it on another port, e.g. `npm run dev -- -p 3001`.
- The landing page renders a heavy three.js/WebGL scene. On this GPU-less cloud VM the client-side scene crashes the Chrome tab ("Aw, Snap!"), even though the dev server itself returns HTTP 200 for `/`. Verify the server responds via `curl`; do not treat the tab crash as a build/setup failure.

