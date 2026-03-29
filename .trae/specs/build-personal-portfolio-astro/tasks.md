# Tasks

## 阶段一：基础设施与"骨架"搭建

- [x] Task 1: 初始化 Astro 项目
  - [x] 检查 Node.js 环境是否已安装
  - [x] 手动创建 Astro 项目结构（网络限制）
  - [x] 配置 package.json (项目名: wmsBK)
  - [x] 创建 astro.config.mjs
  - [x] 验证项目结构正确

- [x] Task 2: 配置 GitHub Actions 自动化部署
  - [x] 创建 `.github/workflows/deploy.yml` 文件
  - [x] 配置 workflow 触发条件 (on: push)
  - [x] 配置 Astro 构建步骤
  - [x] 配置 GitHub Pages 部署步骤
  - [x] 验证 workflow 语法正确

## 阶段二：内容建模与"数据中心"

- [x] Task 3: 配置内容集合 (Content Collections)
  - [x] 创建 `src/content/config.ts` 定义集合模式
  - [x] 定义 `about` 集合模式 (name, title, bio, social_links)
  - [x] 定义 `projects` 集合模式 (title, date, cover_image, tags, demo_url, github_url)
  - [x] 定义 `resources` 集合模式 (resource_name, category, download_link, rating)

- [x] Task 4: 创建示例内容文件
  - [x] 创建 `src/content/about/me.md` 个人介绍
  - [x] 创建示例作品文件 `src/content/projects/project-1.md`
  - [x] 创建示例作品文件 `src/content/projects/project-2.md`
  - [x] 创建示例资源文件 `src/content/resources/resource-1.md`
  - [x] 创建示例资源文件 `src/content/resources/resource-2.md`

## 阶段三：前端 UI 开发与"品牌感"

- [x] Task 5: 集成 Tailwind CSS
  - [x] 配置 tailwind.config.mjs
  - [x] 创建 src/styles/global.css
  - [x] 配置 astro.config.mjs 支持 Tailwind
  - [x] 定义 bento-card 和 nav-link 组件类

- [x] Task 6: 实现深色模式支持
  - [x] 配置 Tailwind darkMode: 'class' 选项
  - [x] 创建 ThemeToggle.astro 组件
  - [x] 实现本地存储记忆用户偏好
  - [x] 添加系统主题监听

- [x] Task 7: 创建 BaseLayout 布局组件
  - [x] 创建 `src/layouts/BaseLayout.astro`
  - [x] 实现 Navigation.astro 导航栏组件
  - [x] 实现 Footer.astro 页脚组件
  - [x] 支持 `<slot />` 内容注入
  - [x] 添加移动端菜单支持

- [x] Task 8: 实现首页 Bento Grid 布局
  - [x] 创建 `src/pages/index.astro`
  - [x] 实现 Bento Grid CSS 布局
  - [x] 集成个人简介卡片
  - [x] 集成最新作品展示
  - [x] 集成热门资源展示
  - [x] 添加统计卡片和技术栈展示
  - [x] 添加联系 CTA 卡片

- [x] Task 9: 实现作品集页面
  - [x] 创建 `src/pages/projects.astro`
  - [x] 实现作品卡片组件
  - [x] 实现筛选功能 (按技术栈/项目类型)
  - [x] 集成内容集合数据
  - [x] 添加空状态提示

- [x] Task 10: 实现资源库页面
  - [x] 创建 `src/pages/resources.astro`
  - [x] 实现资源清单式布局
  - [x] 实现搜索框功能
  - [x] 实现分类筛选功能
  - [x] 集成内容集合数据
  - [x] 添加空状态提示

## 阶段四：资源外链与"性能优化"

- [x] Task 11: 配置图像优化
  - [x] 创建 OptimizedImage.astro 组件
  - [x] 支持 WebP 格式转换
  - [x] 支持远程图片懒加载
  - [x] 配置响应式图片处理

- [x] Task 12: 文档化资源外链策略
  - [x] 创建 RESOURCE_GUIDE.md 资源上传指南文档
  - [x] 说明 Google Drive / 夸克网盘 / Cloudflare R2 使用方法
  - [x] 提供资源文件格式示例
  - [x] 说明图片资源处理建议

## 额外完成

- [x] 创建 favicon.svg
- [x] 创建 .gitignore 文件
- [x] 初始化 Git 仓库

# Task Dependencies

- Task 2 依赖 Task 1 (需要先有项目结构)
- Task 3 依赖 Task 1
- Task 4 依赖 Task 3
- Task 5 依赖 Task 1
- Task 6 依赖 Task 5
- Task 7 依赖 Task 5
- Task 8 依赖 Task 4 和 Task 7
- Task 9 依赖 Task 4 和 Task 7
- Task 10 依赖 Task 4 和 Task 7
- Task 11 依赖 Task 1
- Task 12 依赖 Task 4
