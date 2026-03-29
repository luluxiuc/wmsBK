import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://luluxiuc.github.io',
  base: process.env.NODE_ENV === 'production' ? '/wmsBK' : '',
  integrations: [tailwind()],
});
