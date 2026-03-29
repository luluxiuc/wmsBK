import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://luluxiuc.github.io',
  base: '/wmsBK',
  integrations: [tailwind()],
});
