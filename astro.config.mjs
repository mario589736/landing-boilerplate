// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Set this to your canonical production URL. Enables canonical tags + the sitemap,
  // which the IndexNow ping (scripts/indexnow.mjs) reads on every production deploy.
  // site: 'https://www.yourdomain.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
