# Checklist

## 阶段一：基础设施与"骨架"搭建

- [ ] Astro 项目成功初始化，包含正确的目录结构
- [ ] `package.json` 包含 Astro 依赖
- [ ] `.github/workflows/deploy.yml` 文件存在且语法正确
- [ ] GitHub Actions workflow 配置包含 push 触发器
- [ ] Workflow 包含 Astro 构建步骤
- [ ] Workflow 包含 GitHub Pages 部署步骤

## 阶段二：内容建模与"数据中心"

- [ ] `src/content/config.ts` 文件存在
- [ ] `about` 集合模式正确定义 (name, title, bio, social_links)
- [ ] `projects` 集合模式正确定义 (title, date, cover_image, tags, demo_url, github_url)
- [ ] `resources` 集合模式正确定义 (resource_name, category, download_link, rating)
- [ ] `src/content/about/me.md` 示例文件存在且 frontmatter 正确
- [ ] `src/content/projects/` 目录包含至少一个示例作品
- [ ] `src/content/resources/` 目录包含至少一个示例资源

## 阶段三：前端 UI 开发与"品牌感"

- [ ] Tailwind CSS 已安装并配置
- [ ] `tailwind.config.mjs` 包含项目配置
- [ ] 深色模式配置正确 (darkMode: 'class' 或 media)
- [ ] 主题切换组件正常工作
- [ ] 用户主题偏好被正确存储到 localStorage
- [ ] `src/layouts/BaseLayout.astro` 存在
- [ ] BaseLayout 包含导航栏组件
- [ ] BaseLayout 包含页脚组件
- [ ] BaseLayout 支持 `<slot />` 内容注入
- [ ] 首页使用 Bento Grid 布局
- [ ] 首页展示个人简介
- [ ] 首页展示最新作品
- [ ] 首页展示热门资源
- [ ] 作品集页面 `/projects` 可访问
- [ ] 作品卡片组件正常渲染
- [ ] 作品筛选功能正常工作
- [ ] 资源库页面 `/resources` 可访问
- [ ] 资源清单式布局正常显示
- [ ] 资源搜索功能正常工作

## 阶段四：资源外链与"性能优化"

- [ ] Astro Image 组件配置正确
- [ ] 图片自动转换为 WebP 格式
- [ ] 响应式缩略图生成正常
- [ ] 作品卡片使用 Image 组件
- [ ] 资源外链策略文档存在
- [ ] 示例资源使用外部链接而非本地文件

## 集成验证

- [ ] `npm run build` 成功执行无错误
- [ ] `npm run dev` 开发服务器正常启动
- [ ] 所有页面在开发环境正常访问
- [ ] 深色模式切换无闪烁
- [ ] 响应式布局在移动端正常显示
