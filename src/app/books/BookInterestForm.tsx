"use client";

import { useState } from "react";

type Book = { id: string; title: string };

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-label)",
  display: "block",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "var(--font-newsreader), Georgia, serif",
  fontSize: 17,
  color: "var(--text-primary)",
  background: "transparent",
  border: "1px solid var(--hairline)",
  borderRadius: 8,
  padding: "11px 13px",
  outline: "none",
};

export default function BookInterestForm({ books }: { books: Book[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("The signup form isn’t configured yet — please email me directly for now.");
      return;
    }

    setStatus("submitting");
    setError("");

    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New book interest signup");
    data.append("from_name", "Books interest form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          border: "1px solid var(--hairline)",
          borderRadius: 12,
          padding: "28px 24px",
          fontSize: 18,
          lineHeight: 1.6,
          color: "var(--text-body)",
        }}
      >
        Thank you — you’re on the list. I’ll be in touch when there’s enough interest to
        start writing. In the meantime, feel free to{" "}
        <a
          href="mailto:agordash@gmail.com"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          reach out directly
        </a>
        .
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px" }}
        aria-hidden
      />

      <div>
        <label htmlFor="email" style={labelStyle}>
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="name" style={labelStyle}>
          Name <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          autoComplete="name"
          style={inputStyle}
        />
      </div>

      <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
        <legend style={{ ...labelStyle, padding: 0 }}>Which books interest you?</legend>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
          {books.map((book) => (
            <label
              key={book.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 11,
                fontSize: 17,
                lineHeight: 1.5,
                color: "var(--text-body)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                name={`Interested — ${book.title}`}
                value="Yes"
                style={{ marginTop: 5, accentColor: "var(--accent)", flex: "none" }}
              />
              <span>{book.title}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" style={labelStyle}>
          Anything you’d want it to cover? <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
        />
      </div>

      {status === "error" && (
        <div style={{ fontSize: 15, lineHeight: 1.5, color: "#a3402f" }}>{error}</div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          alignSelf: "flex-start",
          fontFamily: "var(--font-plex-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--paper)",
          background: "var(--accent)",
          border: "none",
          borderRadius: 8,
          padding: "12px 22px",
          cursor: status === "submitting" ? "default" : "pointer",
          opacity: status === "submitting" ? 0.6 : 1,
        }}
      >
        {status === "submitting" ? "Sending…" : "Register interest"}
      </button>
    </form>
  );
}
