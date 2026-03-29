# 个人作品集网站 Spec

## Why
建立一个现代化、自动化的个人作品集网站，用于展示个人介绍、作品项目和资源分享。通过 GitHub Actions 实现自动化部署，使用 Astro 内容集合功能实现 Markdown 驱动的内容管理，让未来的内容更新只需编写 Markdown 文件即可。

## What Changes
- **新增**: Astro 项目骨架与基础配置
- **新增**: GitHub Actions 自动化部署工作流
- **新增**: 内容集合数据结构（个人介绍、作品展示、资源分享）
- **新增**: BaseLayout 布局组件（含导航栏和页脚）
- **新增**: 首页 Bento Grid 布局
- **新增**: 作品集页面（含过滤功能）
- **新增**: 资源库页面（含搜索功能）
- **新增**: Tailwind CSS 样式系统
- **新增**: 深色模式支持

## Impact
- 受影响系统: 前端构建系统、内容管理系统、自动化部署管道
- 关键文件: `astro.config.mjs`, `.github/workflows/deploy.yml`, `src/content/**`, `src/layouts/**`, `src/pages/**`

## ADDED Requirements

### Requirement: 环境初始化
系统 SHALL 建立完整的 Astro 开发环境

#### Scenario: 项目创建
- **GIVEN** 本地已安装 Node.js
- **WHEN** 执行 `npm create astro@latest`
- **THEN** 创建 Empty project 模板，包含示例文件

### Requirement: GitHub 自动化部署
系统 SHALL 配置 GitHub Actions 实现 push 即部署

#### Scenario: 工作流配置
- **GIVEN** 仓库名为 `yourname.github.io`
- **WHEN** 在 Settings -> Pages 中设置 Source 为 "GitHub Actions"
- **AND** 创建 `.github/workflows/deploy.yml`
- **THEN** 每次 `git push` 自动触发 Astro 编译并部署 `/dist` 到 GitHub Pages

### Requirement: 内容集合数据结构
系统 SHALL 使用 Astro Content Collections 定义三大板块数据结构

#### Scenario: 个人介绍集合
- **GIVEN** 存储路径 `/src/content/about/me.md`
- **THEN** 包含字段: `name`, `title`, `bio`, `social_links`

#### Scenario: 作品展示集合
- **GIVEN** 存储路径 `/src/content/projects/*.md`
- **THEN** 包含字段: `title`, `date`, `cover_image`, `tags`, `demo_url`, `github_url`

#### Scenario: 资源分享集合
- **GIVEN** 存储路径 `/src/content/resources/*.md`
- **THEN** 包含字段: `resource_name`, `category`, `download_link`, `rating`

### Requirement: 布局组件化
系统 SHALL 实现可复用的布局组件

#### Scenario: BaseLayout 组件
- **GIVEN** 文件 `src/layouts/BaseLayout.astro`
- **THEN** 包含全局导航栏（Nav）和页脚（Footer）
- **AND** 支持插槽内容注入

### Requirement: 首页 Bento Grid 布局
系统 SHALL 实现视觉冲击力的首页布局

#### Scenario: 首页展示
- **GIVEN** 访问首页 `/`
- **THEN** 以 Bento Grid (便当盒) 布局展示个人简介、最新作品、热门资源

### Requirement: 作品集页面
系统 SHALL 实现可筛选的作品展示页面

#### Scenario: 作品列表
- **GIVEN** 访问 `/projects`
- **THEN** 展示所有作品卡片
- **AND** 支持按技术栈或项目类型筛选

### Requirement: 资源库页面
系统 SHALL 实现可搜索的资源列表页面

#### Scenario: 资源列表
- **GIVEN** 访问 `/resources`
- **THEN** 以清单式布局展示资源
- **AND** 提供搜索框快速定位资源

### Requirement: 样式系统
系统 SHALL 实现现代化的样式系统

#### Scenario: Tailwind CSS 集成
- **GIVEN** 项目配置
- **THEN** 集成 Tailwind CSS 提高开发效率

#### Scenario: 深色模式
- **GIVEN** 用户系统偏好或手动切换
- **THEN** 支持 Dark Mode 深色模式

### Requirement: 资源外链策略
系统 SHALL 处理大文件存储限制

#### Scenario: 外部资源托管
- **GIVEN** 资源文件较大（PDF、软件等）
- **THEN** 禁止直接上传 GitHub
- **AND** 使用外部链接（Google Drive、夸克网盘、Cloudflare R2）

### Requirement: 图像优化
系统 SHALL 优化图片加载性能

#### Scenario: 图片处理
- **GIVEN** 作品截图等图片资源
- **THEN** 使用 Astro `<Image />` 组件
- **AND** 自动转换为 WebP 格式
- **AND** 生成响应式缩略图
