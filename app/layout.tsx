import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StarfieldBackground from "@/components/StarField";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "Farhan Khan | Full-Stack Developer",
    template: "%s | Farhan Khan",
  },
  description: "Third-year CS student, Full-Stack Developer, and Machine Learning Engineer building high-performance web applications and AI-driven solutions.",
  keywords: ["Full-Stack Developer", "Machine Learning", "React", "Next.js", "Portfolio", "Web Development"],
  authors: [{ name: "Farhan Khan" }],
  creator: "Farhan Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://farhankhan.vercel.app",
    title: "Farhan Khan | Full-Stack Developer",
    description: "Third-year CS student, Full-Stack Developer, and Machine Learning Engineer building high-performance web applications and AI-driven solutions.",
    siteName: "Farhan Khan Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Farhan Khan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan Khan | Full-Stack Developer",
    description: "Third-year CS student, Full-Stack Developer, and Machine Learning Engineer building high-performance web applications and AI-driven solutions.",
    creator: "@Farhankhan_twt",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={GeistMono.className}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
          >
            Skip to content
          </a>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <StarfieldBackground />
            <div id="main-content">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
