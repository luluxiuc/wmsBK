# wmsBK 网站 UI 重构计划

## 项目目标

将网站重构为具有宇宙主题风格的现代单页面应用，包含：
- 左侧垂直导航栏
- 动态宇宙星空背景（繁星+星河粒子效果）
- 毛玻璃（Glassmorphism）设计语言
- 集成 AI 聊天对话框组件
- 保持简洁、无冗余的设计原则

---

## 第一阶段：调研与设计系统

### 1.1 设计调研成果

**参考技术方案：**

1. **宇宙星空背景实现**
   - 技术方案：Canvas + 原生 JavaScript（性能优化，无需 Three.js 依赖）
   - 星星数量：800+ 粒子
   - 效果：自然亮度分布 + 微妙闪烁
   - 银河：螺旋粒子分布 + 动态流动
   - 性能：requestAnimationFrame 优化

2. **垂直侧边导航栏**
   - 固定左侧布局
   - 支持收缩/展开（图标模式）
   - 深色毛玻璃效果
   - 响应式：移动端自动收起
   - 无障碍支持：ARIA 属性

3. **毛玻璃设计系统**
   - 核心属性：
     ```css
     background: rgba(255, 255, 255, 0.1);
     backdrop-filter: blur(10-12px);
     border: 1px solid rgba(255, 255, 255, 0.2);
     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
     border-radius: 16px;
     ```
   - 深色主题适配
   - 浏览器兼容：@supports 回退方案

4. **AI 聊天对话框**
   - 毛玻璃卡片设计
   - 消息气泡样式
   - Markdown 渲染支持
   - 流式响应动画
   - 打字机效果

### 1.2 色彩系统重构

保留宇宙蓝主题，优化配色：

```css
:root {
  /* 宇宙深色背景 */
  --cosmos-900: #0B0F19;
  --cosmos-800: #0F172A;
  --cosmos-700: #1E293B;

  /* 天空蓝强调色 */
  --sky-500: #3B82F6;
  --sky-400: #60A5FA;
  --sky-300: #93C5FD;

  /* 星光文字色 */
  --star-100: #F8FAFC;
  --star-200: #CBD5E1;
  --star-300: #94A3B8;

  /* 星云紫 */
  --nebula-400: #7C3AED;
  --nebula-300: #8B5CF6;

  /* 毛玻璃变量 */
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-blur: 12px;
}
```

### 1.3 字体系统

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;

--font-hero: 900 64px/1.1;
--font-h1: 800 48px/1.2;
--font-h2: 700 36px/1.3;
--font-h3: 600 24px/1.4;
--font-body: 400 16px/1.6;
--font-small: 400 14px/1.5;
```

---

## 第二阶段：核心组件开发

### 2.1 动态宇宙背景组件

**文件：** `src/components/CosmicBackground.astro`

**功能：**
- Canvas 全屏背景
- 800+ 动态星星粒子
- 星星闪烁效果（随机亮度）
- 银河螺旋粒子群
- 鼠标交互效果（可选）
- 性能优化：60fps

**实现要点：**
```javascript
class StarParticle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 0.5;
    this.brightness = Math.random() * 0.5 + 0.5;
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.brightness += this.twinkleSpeed;
    if (this.brightness > 1 || this.brightness < 0.5) {
      this.twinkleSpeed *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
    ctx.fill();
  }
}
```

### 2.2 垂直侧边导航栏

**文件：** `src/components/Sidebar.astro`

**功能：**
- 固定左侧 80px 宽度（展开 240px）
- 毛玻璃背景
- 图标 + 文字导航项
- 主题切换按钮
- 收缩/展开动画
- 移动端自动隐藏

**结构：**
```html
<aside class="sidebar">
  <div class="sidebar-header">
    <div class="logo">W</div>
    <button class="toggle-btn">☰</button>
  </div>

  <nav class="nav-list">
    <a href="/" class="nav-item active">
      <span class="icon">🏠</span>
      <span class="label">首页</span>
    </a>
    <a href="/blog/" class="nav-item">
      <span class="icon">📝</span>
      <span class="label">博客</span>
    </a>
    <a href="/projects/" class="nav-item">
      <span class="icon">🚀</span>
      <span class="label">作品</span>
    </a>
    <a href="/resources/" class="nav-item">
      <span class="icon">📦</span>
      <span class="label">资源</span>
    </a>
  </nav>

  <div class="sidebar-footer">
    <button class="theme-toggle">🌓</button>
  </div>
</aside>
```

**样式要点：**
```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 80px;
  height: 100vh;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border-right: 1px solid var(--glass-border);
  transition: width 0.3s ease;
  z-index: 100;
}

.sidebar.expanded {
  width: 240px;
}
```

### 2.3 AI 聊天对话框组件

**文件：** `src/components/AIChat.astro`

**功能：**
- 毛玻璃卡片容器
- 消息历史显示区
- 输入框 + 发送按钮
- 流式响应动画
- Markdown 渲染
- 打字机效果

**UI 布局：**
```
┌─────────────────────────┐
│ 🤖 AI Assistant    [_]  │  <- Header
├─────────────────────────┤
│                         │
│   User message          │
│                         │
│   AI response with      │
│   typing animation...   │
│                         │
├─────────────────────────┤
│ [Type a message...] [→] │  <- Input
└─────────────────────────┘
```

---

## 第三阶段：页面重构

### 3.1 首页重构（单页面布局）

**文件：** `src/pages/index.astro`

**布局结构：**
```
┌────────┬──────────────────────────────────┐
│        │                                  │
│        │     ┌──────────────────┐        │
│  Side  │     │                  │        │
│  bar   │     │   AI Chat Box    │        │
│        │     │                  │        │
│  80px  │     └──────────────────┘        │
│        │                                  │
│        │     其他内容卡片...              │
│        │                                  │
└────────┴──────────────────────────────────┘
```

**主要区块：**
1. **Hero Section**
   - 简洁标语
   - 毛玻璃卡片容器
   - AI 聊天对话框（核心交互）

2. **快速导航**
   - 博客/作品/资源快捷入口
   - Bento 网格布局

3. **CTA Section**
   - 联系方式
   - 社交链接

### 3.2 全局布局更新

**文件：** `src/layouts/BaseLayout.astro`

**更新内容：**
- 移除顶部导航栏
- 引入左侧 Sidebar
- 引入 CosmicBackground 组件
- 主内容区左移 80px
- 响应式边距调整

**新结构：**
```html
<body>
  <CosmicBackground />
  <Sidebar />

  <main class="main-content">
    <slot />
  </main>
</body>
```

---

## 第四阶段：样式系统优化

### 4.1 全局样式文件

**文件：** `src/styles/global.css`

**更新内容：**

1. **毛玻璃基础类**
```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}
```

2. **按钮样式**
```css
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--sky-400), var(--nebula-400));
  color: white;
}

.btn-ghost {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--star-100);
}
```

3. **卡片组件**
```css
.card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.25);
}
```

4. **响应式断点**
```css
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0 !important;
  }
}
```

---

## 第五阶段：性能优化与测试

### 5.1 性能优化

1. **Canvas 优化**
   - 粒子数量根据设备性能动态调整
   - 使用 `requestAnimationFrame`
   - 页面不可见时暂停动画

2. **CSS 优化**
   - 使用 CSS 变量减少重复
   - `will-change` 属性优化动画性能
   - 减少重绘重排

3. **字体优化**
   - 预加载关键字体
   - 使用 `font-display: swap`

### 5.2 测试清单

- [ ] 宇宙背景动画流畅度（60fps）
- [ ] 侧边栏收缩/展开动画
- [ ] AI 聊天对话框交互
- [ ] 响应式布局（移动端）
- [ ] 深色/浅色模式切换
- [ ] 页面加载性能
- [ ] 无障碍访问（ARIA）
- [ ] 浏览器兼容性（Chrome, Firefox, Safari, Edge）

---

## 第六阶段：部署

### 6.1 构建

```bash
npm run build
```

### 6.2 部署方式

**选项 1：GitHub Actions（已有配置）**
```bash
git add .
git commit -m "重构UI设计：宇宙主题 + 侧边导航 + AI聊天"
git push origin main
```

**选项 2：Cloudflare Pages**
- 连接 GitHub 仓库
- 自动部署

### 6.3 验证清单

- [ ] 构建成功
- [ ] 所有页面加载正常
- [ ] 动画效果正常
- [ ] 移动端适配良好
- [ ] 服务器更新完成

---

## 实施顺序

1. **Phase 1**: 创建宇宙背景组件 ✅
2. **Phase 2**: 设计侧边导航栏
3. **Phase 3**: 开发 AI 聊天组件
4. **Phase 4**: 更新 BaseLayout
5. **Phase 5**: 重构首页
6. **Phase 6**: 优化全局样式
7. **Phase 7**: 测试与调试
8. **Phase 8**: 部署上线

---

## 预计工作量

- **组件开发**: 4-6 小时
- **样式优化**: 2-3 小时
- **测试调试**: 2-3 小时
- **部署上线**: 0.5-1 小时

**总计**: 约 8-13 小时

---

## 设计原则

1. **简洁**：避免冗余元素，保持界面干净
2. **一致**：统一的毛玻璃设计语言
3. **性能**：优化动画，确保流畅体验
4. **可访问**：遵循无障碍标准
5. **响应式**：移动端优先设计
