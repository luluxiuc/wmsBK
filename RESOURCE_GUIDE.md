# 资源外链策略指南

## 概述

为了保持 GitHub 仓库的轻量化和高效性，本网站采用**外链托管**策略来分享大文件资源。

## 为什么使用外链？

- **GitHub 限制**: 仓库建议保持在 1GB 以内
- **性能优化**: 静态网站更适合轻量级内容
- **维护便利**: 资源更新无需重新部署网站

## 推荐的托管平台

### 1. Google Drive
- **适用**: 文档、PDF、小型软件
- **优点**: 稳定可靠，访问速度快
- **使用方法**:
  1. 上传文件到 Google Drive
  2. 右键文件 → 分享 → 获取链接
  3. 将链接权限设置为"任何知道链接的人"
  4. 复制链接到资源 Markdown 文件

### 2. 夸克网盘
- **适用**: 大文件、软件包
- **优点**: 国内访问速度快，大文件友好
- **使用方法**:
  1. 上传文件到夸克网盘
  2. 生成分享链接
  3. 复制链接到资源 Markdown 文件

### 3. Cloudflare R2 (推荐开发者)
- **适用**: 静态资源、图片、下载文件
- **优点**: 
  - 每月 10GB 免费额度
  - 无出站流量费用
  - 全球 CDN 加速
- **使用方法**:
  1. 注册 Cloudflare 账号
  2. 创建 R2 存储桶
  3. 上传文件并获取公开访问链接
  4. 复制链接到资源 Markdown 文件

## 资源文件格式

在 `src/content/resources/` 目录下创建 Markdown 文件：

```markdown
---
resource_name: "资源名称"
category: "工具"  # 可选: 工具/书籍/代码/教程/其他
download_link: "https://你的外链地址"
rating: 5  # 可选: 1-5
description: "资源描述"
---

# 资源名称

更详细的资源介绍...
```

## 图片资源处理

### 推荐做法
1. **使用图床**: 将图片上传到图床（如 SM.MS、Imgur）获取外链
2. **Cloudflare R2**: 适合大量图片存储
3. **Git LFS**: 如果必须放在仓库中，使用 Git LFS 管理大文件

### 图片优化
- 使用 WebP 格式
- 压缩图片大小（推荐 TinyPNG）
- 提供响应式图片尺寸

## 示例

### 示例 1: 工具资源
```markdown
---
resource_name: "VS Code 效率插件合集"
category: "工具"
download_link: "https://drive.google.com/file/d/xxx/view"
rating: 5
description: "精选的 20 个提升开发效率的 VS Code 插件"
---
```

### 示例 2: 教程资源
```markdown
---
resource_name: "Astro 完全指南 PDF"
category: "教程"
download_link: "https://your-bucket.r2.cloudflarestorage.com/astro-guide.pdf"
rating: 4
description: "从入门到精通的 Astro 框架学习指南"
---
```

## 注意事项

1. **链接有效性**: 定期检查外链是否有效
2. **访问权限**: 确保分享链接的权限设置正确
3. **备份重要资源**: 重要文件建议在多个平台备份
4. **遵守版权**: 只分享有权限分享的资源

## 更新资源

只需修改 `src/content/resources/` 下的 Markdown 文件，提交后网站会自动更新。
