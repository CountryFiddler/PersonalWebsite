import Image from "next/image";
import Link from "next/link";

type WorkItem = {
  title: string;
  href?: string;
  description: string;
  logo?: { src: string; alt: string };
};

const WORK: WorkItem[] = [
  {
    title: "Civic Leave",
    href: "https://www.civicleave.com",
    logo: { src: "/civic-leave-logo.png", alt: "Civic Leave logo" },
    description:
      "Leave management software to help local governments manage FMLA, state leave, and ADA leave with less risk, less stress, and less complexity.",
  },
  {
    title: "Goat Herd Management Mobile App",
    href: "https://www.bluegrassacresfarm.com/copy-of-kidding-schedule-app-1",
    logo: { src: "/bluegrass-acres-farm-logo.png", alt: "Bluegrass Acres Farm logo" },
    description:
      "Livestock tracking, health records, and daily notes to assist goat owners in managing their herds so that they save time, money, and have goats that are well taken care of.",
  },
  {
    title: "Kidding Schedule Mobile App",
    href: "https://www.bluegrassacresfarm.com/kidding-schedule-app",
    logo: { src: "/bluegrass-acres-farm-logo.png", alt: "Bluegrass Acres Farm logo" },
    description:
      "Due-date tracking and reminders to assist goat owners in tracking when their goats are going to give birth.",
  },
  {
    title: "Sanford Irrigation Mobile App",
    description:
      "Field-service app for irrigation crews to reduce time searching for irrigation system utilities. The app assists in documenting the location of irrigation utilities such as valves, timers, and other critical items of customer's irrigation systems.",
  },
];

const CONTACT = [
  { label: "Email", href: "mailto:alexander@civicleave.com" },
  { label: "GitHub", href: "https://github.com/CountryFiddler" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alexander-gordash" },
];

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-label)",
};

const accentLink: React.CSSProperties = {
  textDecoration: "none",
  color: "var(--accent)",
};

export default function Home() {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "110px 32px 120px" }}>
      {/* Intro */}
      <header>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            aria-hidden
            style={{
              width: 84,
              height: 84,
              flex: "none",
              borderRadius: "50%",
              background: "var(--accent)",
              color: "var(--paper)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-newsreader), Georgia, serif",
              fontSize: 34,
              fontWeight: 420,
            }}
          >
            AG
          </div>
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
            Alexander Gordash
          </h1>
        </div>
        <p style={{ fontSize: 19, lineHeight: 1.65, color: "var(--text-body)", margin: "24px 0 0" }}>
          React &amp; React&nbsp;Native developer and SaaS founder. For
          five years I’ve built cross-platform products for local governments, small farmers, and trades-based businesses, turning real user
          feedback into software people actually adopt.
        </p>
      </header>

      {/* Work */}
      <section style={{ marginTop: 64 }}>
        <div style={{ ...labelStyle, marginBottom: 22 }}>Work</div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {WORK.map((item, i) => (
            <li
              key={item.title}
              style={{
                padding: "18px 0",
                borderTop: "1px solid var(--hairline)",
                borderBottom: i === WORK.length - 1 ? "1px solid var(--hairline)" : undefined,
              }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                {item.logo ? (
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={46}
                    height={46}
                    style={{ width: 46, height: 46, flex: "none", borderRadius: 10, objectFit: "contain" }}
                  />
                ) : (
                  <div style={{ width: 46, height: 46, flex: "none" }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 19 }}>
                    {item.href ? (
                      <a href={item.href} style={accentLink}>
                        {item.title}{" "}
                        <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 13 }}>
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span style={{ color: "var(--text-primary)" }}>{item.title}</span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "var(--text-muted)",
                      marginTop: 4,
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Books */}
      <section style={{ marginTop: 56 }}>
        <div style={{ ...labelStyle, marginBottom: 16 }}>Books</div>
        <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <li style={{ fontSize: 19, color: "var(--text-primary)" }}>
            Agentic Coding for Non-Technical Founders
          </li>
          <li style={{ fontSize: 19, color: "var(--text-primary)" }}>
            The Software Engineer’s Guide to Marketing
          </li>
        </ul>
        <Link href="/books" style={{ ...accentLink, borderBottom: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)", paddingBottom: 2 }}>
          Books
        </Link>
      </section>

      {/* Blog */}
      <section style={{ marginTop: 56 }}>
        <div style={{ ...labelStyle, marginBottom: 16 }}>Blog</div>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-body)", margin: "0 0 16px" }}>
          Posts on React &amp; React&nbsp;Native, building SaaS products, and agentic software
          development — coming soon.
        </p>
        <Link href="/blog" style={{ ...accentLink, borderBottom: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)", paddingBottom: 2 }}>
          Blog
        </Link>
      </section>

      {/* Toolkit */}
      <section style={{ marginTop: 56 }}>
        <div style={{ ...labelStyle, marginBottom: 16 }}>Toolkit</div>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-body)", margin: 0 }}>
          React · React Native · Expo · TypeScript · JavaScript · Claude Code · Agentic Software Development · Python · TanStack Query · Node.js ·
          Jest · Vitest · CI/CD
        </p>
      </section>

      {/* Contact */}
      <section style={{ marginTop: 56 }}>
        <div style={{ ...labelStyle, marginBottom: 16 }}>Contact</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 22, fontSize: 17 }}>
          {CONTACT.map((c) => (
            <a
              key={c.label}
              href={c.href}
              style={{
                ...accentLink,
                borderBottom: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
                paddingBottom: 2,
              }}
            >
              {c.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
