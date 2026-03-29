import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// 根据部署平台设置 base 路径
// GitHub Pages 需要 /wmsBK，Cloudflare/Vercel 不需要
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: 'https://a3e28d94.wmsbk.pages.dev',
  base: isGitHubPages ? '/wmsBK' : '',
  trailingSlash: 'always',
  integrations: [tailwind()],
});
