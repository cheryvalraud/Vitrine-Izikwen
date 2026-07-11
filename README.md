# Izikwen Vitrine

Multilingual product showcase for Izikwen, built with Next.js. English, French, and Spanish are statically rendered at `/en`, `/fr`, and `/es`; `/` redirects to English.

## Local development

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

Sanitized product screenshots live in `public/app-screens/`.

## Production configuration

- `SITE_URL`: canonical public origin, such as `https://izikwen.com`. The application uses that value for canonical links, Open Graph URLs, `robots.txt`, and `sitemap.xml`; it defaults to `https://izikwen.com`.
- `GOOGLE_SITE_VERIFICATION`: optional Google Search Console verification token. Keep the value in the hosting provider's environment settings rather than committing it.

Configure the production domain in the hosting provider, then submit `${SITE_URL}/sitemap.xml` in Search Console after ownership verification. Search indexing is controlled by search engines and is not immediate.
