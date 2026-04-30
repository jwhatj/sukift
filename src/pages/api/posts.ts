import fs from "node:fs";
import path from "node:path";

export const prerender = true;

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

export async function GET() {
  ensureDir();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter: Record<string, unknown> = {};
    if (match) {
      for (const line of match[1].split("\n")) {
        const kv = line.match(/^(\w+):\s*(.*)/);
        if (kv) frontmatter[kv[1]] = kv[2].trim();
      }
    }
    return { file, frontmatter, raw };
  });
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST({ request }: { request: Request }) {
  ensureDir();
  const data = await request.json();
  const { action, file, content } = data;

  if (action === "create") {
    const name = (data.name || "new-post").replace(/[/\\]/g, "-");
    const filePath = path.join(POSTS_DIR, `${name}.md`);
    if (fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "文件已存在" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const defaultContent = `---
title: 新文章
published: ${new Date().toISOString().slice(0, 10)}
description:
tags: []
category:
draft: false
---

开始写作...
`;
    fs.writeFileSync(filePath, content || defaultContent, "utf-8");
    return new Response(JSON.stringify({ success: true, file: `${name}.md` }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (action === "save" && file) {
    const filePath = path.join(POSTS_DIR, file);
    if (!filePath.startsWith(POSTS_DIR)) {
      return new Response(JSON.stringify({ error: "路径不合法" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    fs.writeFileSync(filePath, content, "utf-8");
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (action === "delete" && file) {
    const filePath = path.join(POSTS_DIR, file);
    if (!filePath.startsWith(POSTS_DIR)) {
      return new Response(JSON.stringify({ error: "路径不合法" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    fs.unlinkSync(filePath);
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "无效操作" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
