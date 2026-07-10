import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteNav from "./SiteNav";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexander Gordash",
  description:
    "React & React Native developer and SaaS founder. Five years building fast, reliable apps for web and mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full">
        {/* Google Analytics (gtag.js) — loaded once here, applies to every route */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HYRQSXNKD2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HYRQSXNKD2');
          `}
        </Script>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
