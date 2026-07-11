import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Blog posts live as Markdown files in `content/blog/*.md`.
// Each file's name (minus `.md`) is its URL slug: `content/blog/hello.md` -> `/blog/hello`.
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO string, e.g. "2026-07-09"
  summary: string;
  draft: boolean;
};

export type Post = PostMeta & {
  content: string; // raw Markdown body
};

function readPostFile(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    draft: Boolean(data.draft ?? false),
    content,
  };
}

// All published posts, newest first. Drafts are hidden in production builds
// but visible when running `npm run dev` so you can preview before publishing.
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const showDrafts = process.env.NODE_ENV !== "production";

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPostFile(file.replace(/\.md$/, "")))
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

// "2026-07-09" -> "July 9, 2026"
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
