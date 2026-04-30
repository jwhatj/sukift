---
title: 使用 Astro 6 搭建个人博客
published: 2026-04-29
description: 记录使用 Astro 6 + Svelte 5 + Tailwind CSS 4 搭建个人博客的全过程。
tags: [Astro, 博客, 前端, 静态站点]
category: 技术
pinned: true
---

一直想搭建一个属于自己的博客，对比了 Next.js、Hugo、Hexo 等方案后，最终选择了 Astro。这篇文章记录整个搭建过程。

## 为什么选择 Astro

Astro 最吸引我的特性是**零 JS 默认**——页面在客户端不发送任何 JavaScript，除非你显式需要交互组件。这对于内容型网站来说非常友好：加载速度快、SEO 友好、维护简单。

其他加分项：

- **岛屿架构**：可以按需嵌入 Svelte、React 等框架的组件
- **内容集合**：原生支持 Markdown/MDX，带有类型安全的 frontmatter 校验
- **Vite 驱动**：开发体验极快

## 项目初始化

```bash
pnpm create astro@latest my-blog
cd my-blog
pnpm astro add svelte tailwind
```

Astro 的 CLI 非常友好，会引导你选择模板、TypeScript 配置等。集成 Svelte 和 Tailwind 也只需一行命令。

## 内容集合

Astro 6 的内容集合（Content Collections）是我最喜欢的特性之一。在 `src/content.config.ts` 中定义 schema，就能获得完整的类型提示和构建时校验：

```typescript
const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});
```

写 Markdown 时不用担心拼错字段名，构建时会直接报错。

## 部署到 GitHub Pages

Astro 内置了对 GitHub Pages 的支持。关键配置是在 `astro.config.mjs` 中设置 `base` 路径：

```javascript
export default defineConfig({
  base: "/my-blog/",
});
```

配合 GitHub Actions，push 到 main 分支即可自动构建和部署。整个过程非常丝滑。

## 总结

Astro 是目前搭建内容型网站的最佳选择之一。如果你也想搭建个人博客，强烈推荐试试。
