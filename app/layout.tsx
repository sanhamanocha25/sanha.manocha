import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import { meta } from "@/content/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: {
    default: meta.title,
    template: `%s · ${meta.name}`,
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    siteName: meta.name,
  },
  twitter: {
    card: "summary",
    title: meta.title,
    description: meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f1f2ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrains.variable}`}>
      <body className="paper-grid min-h-dvh">
        <a
          href="#main"
          className="mono focus-marker sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
