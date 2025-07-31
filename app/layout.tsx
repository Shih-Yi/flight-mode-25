import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Mode: On Board with God | Worship Camp 2025",
  description: "Praise & Worship Camp 2025 - Join us for an extraordinary journey of faith, music, and worship. October 25-27, 2025 at Wainui Park Camp.",
  authors: [{ name: "Flight Mode25" }],
  creator: "Flight Mode25",
  publisher: "Flight Mode25",
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://flight-mode-2025.vercel.app",
    title: "Flight Mode: On Board with God | Worship Camp 2025",
    description: "Join us for an extraordinary journey of faith, music, and worship. Praise & Worship Camp 2025, October 25-27 at Wainui Park Camp.",
    siteName: "Flight Mode 2025",
    images: [
      {
        url: "https://flight-mode-2025.vercel.app/flight-mode25.png",
        width: 1200,
        height: 630,
        alt: "Flight Mode: On Board with God - Worship Camp 2025",
        type: "image/png",
      },
      {
        url: "https://flight-mode-2025.vercel.app/flight-mode25.png",
        width: 512,
        height: 512,
        alt: "Flight Mode Logo",
        type: "image/png",
      }
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@flightmode2025",
    creator: "@flightmode2025",
    title: "Flight Mode: On Board with God | Worship Camp 2025",
    description: "Join us for an extraordinary journey of faith, music, and worship. October 25-27, 2025 at Wainui Park Camp.",
    images: ["https://flight-mode-2025.vercel.app/flight-mode25.png"],
  },
  
  // Additional metadata
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
  
  // Verification and other meta tags
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code when available
  },
  
  // Favicon and app icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/flight-mode-logo.png",
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
