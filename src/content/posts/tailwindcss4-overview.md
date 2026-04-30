---
title: Tailwind CSS 4 新特性速览
published: 2026-04-29
description: Tailwind CSS 4 带来了重大架构变化，本文梳理核心新特性与迁移要点。
tags: [Tailwind, CSS, 前端, 样式]
category: 技术
---

Tailwind CSS 4 发布了，这次是一次**完全重写**。用了一段时间后，整理一下核心变化。

## Oxide 引擎：性能飞升

Tailwind 4 使用 Rust 编写的 Oxide 引擎，编译速度提升了 10 倍以上。在一个中型项目中，构建时间从 3 秒降到了不到 1 秒。日常开发中基本感觉不到 CSS 编译的存在。

## CSS-first 配置：告别 tailwind.config.js

最大的变化是**配置从 JS 迁移到了 CSS**。不再需要 `tailwind.config.js`，直接在 CSS 中使用 `@theme` 指令：

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
  --breakpoint-3xl: 1920px;
}
```

所有主题值都变成了 CSS 自定义变量，可以在运行时动态修改。这意味着**暗色模式、主题切换**等功能可以用纯 CSS 实现。

## @theme 与 CSS 变量集成

`@theme` 定义的变量会自动注册为 Tailwind 的工具类。比如 `--color-primary` 会生成 `text-primary`、`bg-primary` 等类名。还可以用 `--spacing-*` 自定义间距比例。

## 从 v3 迁移

官方提供了 `@tailwindcss/upgrade` 工具：

```bash
npx @tailwindcss/upgrade
```

大部分项目可以自动迁移。需要注意的是：

- `tailwind.config.js` 需要手动迁移到 CSS
- 部分类名有变化（如 `shadow-sm` 改为 `shadow-xs`）
- `@apply` 在组件中的行为有所调整

## Vite 深度集成

Tailwind 4 提供了专用的 Vite 插件 `@tailwindcss/vite`，比 PostCSS 方式更快：

```javascript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

## 总结

Tailwind CSS 4 是一次激进但成功的重写。CSS-first 的配置方式让主题系统更加强大，Oxide 引擎让开发体验更流畅。如果你在用 Tailwind，建议尽早迁移。
