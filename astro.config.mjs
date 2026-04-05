// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import indexnow from 'astro-indexnow';

// https://astro.build/config
export default defineConfig({
  site: 'https://rtmify.io',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap(),
    indexnow({ key: process.env.INDEXNOW_KEY ?? '3a6a8a6554a141abaa4277ad5762f814' }),
  ]
});
