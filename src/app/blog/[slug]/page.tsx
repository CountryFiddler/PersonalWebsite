import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, getPostSlugs, formatDate } from "@/lib/posts";
import SubscribeForm from "../SubscribeForm";

// Pre-render one static HTML page per post at build time (required for `output: export`).
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Alexander Gordash`,
    description: post.summary,
  };
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-label)",
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "110px 32px 120px" }}>
      <Link href="/blog" style={{ ...labelStyle, textDecoration: "none" }}>
        ← Blog
      </Link>

      <header style={{ marginTop: 28 }}>
        <h1
          style={{
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontWeight: 420,
            fontSize: 30,
            lineHeight: 1.25,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </h1>
        <div style={{ ...labelStyle, marginTop: 16 }}>{formatDate(post.date)}</div>
      </header>

      <article className="prose" style={{ marginTop: 40 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>

      <section
        style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: "1px solid var(--hairline)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontWeight: 420,
            fontSize: 22,
            lineHeight: 1.3,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Want to see more articles like this?
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--text-body)",
            margin: "12px 0 24px",
          }}
        >
          Subscribe to get notified via email when a new post drops.
        </p>
        <SubscribeForm />
      </section>
    </div>
  );
}
