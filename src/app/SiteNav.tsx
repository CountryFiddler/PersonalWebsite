"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/blog", label: "Blog" },
];

const baseStyle: React.CSSProperties = {
  fontFamily: "var(--font-plex-mono), monospace",
  fontSize: 12,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  textDecoration: "none",
};

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          boxSizing: "border-box",
          padding: "34px 32px 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <nav style={{ display: "flex", gap: 20, pointerEvents: "auto" }}>
          {ITEMS.map((item) => {
            const isCurrent = pathname === item.href;
            return isCurrent ? (
              <span key={item.href} style={{ ...baseStyle, color: "var(--text-label)" }}>
                {item.label}
              </span>
            ) : (
              <Link key={item.href} href={item.href} style={{ ...baseStyle, color: "var(--accent)" }}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
