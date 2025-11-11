import type React from "react";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Using CSS custom properties for fonts instead of Google Fonts to avoid loading issues
// const _geist = Geist({
//   subsets: ["latin"],
//   fallback: ["system-ui", "arial"],
//   display: "swap"
// });
// const _geistMono = Geist_Mono({
//   subsets: ["latin"],
//   fallback: ["'Courier New'", "monospace"],
//   display: "swap"
// });

export const metadata: Metadata = {
  title: "Pumping Lemma CFL Simulator",
  description:
    "Interactive step-by-step simulator for understanding the Pumping Lemma in context-free languages",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`font-sans antialiased text-slate-900 dark:text-slate-100`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
