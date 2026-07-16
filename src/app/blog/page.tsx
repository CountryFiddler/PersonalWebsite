import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import SubscribeForm from "./SubscribeForm";

export const metadata: Metadata = {
  title: "Blog — Alexander Gordash",
  description:
    "Writing on React & React Native, building SaaS products, and agentic software development — for developers and SaaS founders.",
};

const TOPICS = [
  "React & React Native",
  "Building SaaS products",
  "Agentic software development",
];

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-label)",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "110px 32px 120px" }}>
      <header>
        <h1
          style={{
            fontFamily: "var(--font-newsreader), Georgia, serif",
            fontWeight: 420,
            fontSize: 27,
            lineHeight: 1.3,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Blog
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.65, color: "var(--text-body)", margin: "20px 0 0" }}>
          Writing on React &amp; React Native, building SaaS products, agentic software
          development, and other things meant to be genuinely useful to software developers
          and SaaS founders.
        </p>
      </header>

      {posts.length > 0 ? (
        <section style={{ marginTop: 56 }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                style={{
                  padding: "22px 0",
                  borderTop: "1px solid var(--hairline)",
                  borderBottom:
                    i === posts.length - 1 ? "1px solid var(--hairline)" : undefined,
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontSize: 19, color: "var(--text-primary)" }}>
                      {post.title}
                    </span>
                    {post.draft && <span style={{ ...labelStyle, fontSize: 10 }}>Draft</span>}
                  </div>
                  <div style={{ ...labelStyle, marginTop: 8 }}>{formatDate(post.date)}</div>
                  {post.summary && (
                    <div
                      style={{
                        fontSize: 16,
                        lineHeight: 1.55,
                        color: "var(--text-muted)",
                        marginTop: 8,
                      }}
                    >
                      {post.summary}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section style={{ marginTop: 56 }}>
          <div style={{ ...labelStyle, marginBottom: 22 }}>Topics I’ll cover</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {TOPICS.map((topic, i) => (
              <li
                key={topic}
                style={{
                  fontSize: 19,
                  color: "var(--text-primary)",
                  padding: "16px 0",
                  borderTop: "1px solid var(--hairline)",
                  borderBottom:
                    i === TOPICS.length - 1 ? "1px solid var(--hairline)" : undefined,
                }}
              >
                {topic}
              </li>
            ))}
          </ul>
        </section>
      )}

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
          Subscribe
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--text-body)",
            margin: "12px 0 24px",
          }}
        >
          Get notified via email when a new post drops.
        </p>
        <SubscribeForm />
      </section>
    </div>
  );
}
