---
title: Svelte 5 Runes 初体验
published: 2026-04-29
description: Svelte 5 引入了 Runes 响应式系统，本文记录学习笔记与使用心得。
tags: [Svelte, 前端, JavaScript, 响应式]
category: 技术
---

Svelte 5 带来了一套全新的响应式系统——Runes。用了一段时间后，写篇文章记录一下心得。

## 什么是 Runes

Runes 是 Svelte 5 引入的响应式原语，用特殊符号（如 `$state`、`$derived`）替代了 Svelte 4 中隐式的 `let` 声明式响应。好处是响应式行为变得**显式且可预测**。

## `$state` — 状态声明

Svelte 4 中用 `let count = 0` 声明响应式变量，Svelte 5 改为：

```javascript
let count = $state(0);
```

看起来多写了几个字符，但好处是显而易见的：一眼就能看出哪些变量是响应式的。再也不用纠结"这个 let 到底会不会触发更新"了。

## `$derived` — 派生状态

取代了 Svelte 4 中的 `$:` 语法：

```javascript
// Svelte 4
$: doubled = count * 2;

// Svelte 5
let doubled = $derived(count * 2);
```

`$derived` 还有 `by` 变体，支持复杂计算：

```javascript
let items = $state([1, 2, 3]);
let sum = $derived.by(() => items.reduce((a, b) => a + b, 0));
```

## `$effect` — 副作用

替代了 `$:` 中执行副作用的写法：

```javascript
$effect(() => {
  document.title = `Count: ${count}`;
});
```

Svelte 5 会自动追踪依赖，不需要手动声明。

## 和其他框架的对比

- **React hooks**：Runes 不需要遵守"不能在条件语句中调用"的规则，更灵活
- **Vue Composition API**：两者理念相似，但 Runes 语法更简洁，不需要 `ref.value`

## 总结

Runes 让 Svelte 的响应式系统从"魔法"变成了"工程"。虽然丧失了一些 Svelte 4 的简洁感，但换来了更好的可维护性和可预测性。值得一试。
