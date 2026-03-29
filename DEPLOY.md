# 部署指南

## 自动部署

本项目已配置 GitHub Actions 自动部署，每次推送到 `main` 或 `master` 分支时会自动构建并部署到 GitHub Pages。

### 部署流程

1. 推送代码到 GitHub
```bash
git add .
git commit -m "更新内容"
git push origin main
```

2. GitHub Actions 会自动执行：
   - 安装依赖
   - 构建项目
   - 部署到 GitHub Pages

3. 等待约 1-2 分钟后，访问 `https://luluxiuc.github.io/wmsBK` 查看更新

### 手动触发部署

在 GitHub 仓库页面：
1. 点击 "Actions" 标签
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮

## 博客系统使用说明

### 创建新文章

1. 在 `src/content/posts/` 目录下创建新的 `.md` 文件
2. 使用以下 frontmatter 格式：

```yaml
---
title: "文章标题"
description: "文章简介"
pubDate: 2024-03-28
category: "分类名称"
tags: ["标签1", "标签2"]
draft: false
---

# 文章内容

正文支持 Markdown 语法...
```

### 文章字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 文章标题（必填） |
| description | string | 文章简介（必填） |
| pubDate | date | 发布日期（必填） |
| category | string | 分类（必填） |
| tags | array | 标签数组（必填） |
| draft | boolean | 草稿状态，true 为不发布 |
| updatedDate | date | 更新日期（可选） |
| cover_image | string | 封面图片（可选） |

### 分类和标签

- **分类**：用于文章归类，如"技术"、"随笔"、"思考"等
- **标签**：更细粒度的关键词，如"Astro"、"AI"、"学习笔记"等

### 评论系统

评论使用 Giscus（基于 GitHub Discussions）：
- 读者需要 GitHub 账号才能评论
- 评论数据存储在仓库的 Discussions 中
- 已配置在每篇文章底部自动显示

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
src/
├── components/      # 组件
│   ├── Navigation.astro
│   ├── Footer.astro
│   └── ThemeToggle.astro
├── content/         # 内容集合
│   ├── about/       # 关于我
│   ├── posts/       # 博客文章
│   ├── projects/    # 项目作品
│   └── resources/   # 资源分享
├── layouts/         # 布局
│   └── BaseLayout.astro
├── pages/           # 页面
│   ├── index.astro      # 首页
│   ├── blog/            # 博客
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── projects.astro   # 作品
│   └── resources.astro  # 资源
└── styles/          # 样式
    └── global.css
```

## 技术栈

- **框架**: Astro 5.x
- **样式**: Tailwind CSS + 自定义宇宙蓝主题
- **部署**: GitHub Pages + GitHub Actions
- **评论**: Giscus

## 注意事项

1. 确保仓库已启用 GitHub Pages（Settings → Pages → Source: GitHub Actions）
2. 确保已安装 Giscus App 并授权给本仓库
3. 文章文件名建议使用英文或拼音，避免特殊字符
4. 图片资源放在 `public/` 目录下

## 故障排查

### 构建失败

检查 GitHub Actions 日志，常见问题：
- 依赖安装失败：检查 `package.json` 是否正确
- 构建错误：本地运行 `npm run build` 查看详细错误

### 页面 404

- 确认 GitHub Pages 已启用
- 确认仓库是公开的（Private 仓库需要付费才能使用 Pages）
- 检查 `astro.config.mjs` 中的 `base` 配置是否正确

### 评论不显示

- 确认已安装 Giscus App
- 确认仓库 Discussions 功能已开启
- 检查网络连接（Giscus 需要访问 GitHub API）
