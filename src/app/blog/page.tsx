import type { Metadata } from "next";

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
          Nothing published yet — posts are on the way. I’ll be writing on React &amp; React
          Native, building SaaS products, agentic software development, and other things
          meant to be genuinely useful to software developers and SaaS founders.
        </p>
      </header>

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
                borderBottom: i === TOPICS.length - 1 ? "1px solid var(--hairline)" : undefined,
              }}
            >
              {topic}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
