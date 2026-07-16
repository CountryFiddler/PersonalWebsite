import type { Metadata } from "next";
import BookInterestForm from "./BookInterestForm";

export const metadata: Metadata = {
  title: "Books — Alexander Gordash",
  description:
    "Books I’m thinking about writing. Register interest and I’ll write the ones enough people want.",
};

type Book = {
  id: string;
  title: string;
  status?: string;
  description: string;
};

const BOOKS: Book[] = [
  {
    id: "agentic-coding-founders",
    title: "Agentic Software Development for Non-Technical Founders",
    status: "Idea",
    description:
      "For founders without a software engineering background who have a niche SaaS idea and want to bootstrap it themselves. This book gives you the guardrails and the working knowledge to use agentic software development to build a real product — one with a clean, maintainable codebase, not AI slop.",
  },
  {
    id: "engineers-guide-marketing",
    title: "The Software Engineer’s Guide to Marketing",
    status: "Idea",
    description:
      "For software developers who are excellent at their craft but have no clue where to start with marketing. If you have a SaaS idea and little marketing skill, this book gives you a strong foundation — so you can market your product without wading through an endless stack of marketing books to get there.",
  },
];

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-label)",
};

export default function BooksPage() {
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
          Books
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.65, color: "var(--text-body)", margin: "20px 0 0" }}>
          Two books I want to write, however, I’m gauging interest before committing to writing any of these. If
          enough people are interested, I’ll write them and let you know when it’s underway.
        </p>
      </header>

      <section style={{ marginTop: 56 }}>
        <div style={{ ...labelStyle, marginBottom: 22 }}>Ideas</div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {BOOKS.map((book, i) => (
            <li
              key={book.id}
              style={{
                padding: "20px 0",
                borderTop: "1px solid var(--hairline)",
                borderBottom: i === BOOKS.length - 1 ? "1px solid var(--hairline)" : undefined,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <div style={{ fontSize: 19, color: "var(--text-primary)" }}>{book.title}</div>
                {book.status && (
                  <span style={{ ...labelStyle, fontSize: 10 }}>{book.status}</span>
                )}
              </div>
              <div
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "var(--text-muted)",
                  marginTop: 6,
                }}
              >
                {book.description}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 56 }}>
        <div style={{ ...labelStyle, marginBottom: 22 }}>Register interest</div>
        <BookInterestForm books={BOOKS.map(({ id, title }) => ({ id, title }))} />
      </section>
    </div>
  );
}
