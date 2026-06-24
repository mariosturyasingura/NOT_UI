import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ScrollThemeProvider } from "@/components/ScrollThemeProvider";
import { siteUrl } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.png",
  },
  title: "New Origin Tech Ltd — Software for Ugandan Industries",
  description:
    "New Origin Tech Ltd builds practical software solutions for property management, agriculture, hospitality, and more. Based in Uganda.",
  keywords: [
    "New Origin Tech",
    "Uganda software",
    "SmartLandlords",
    "onTheFarmToday",
    "Transit Haven",
    "property management",
    "farm management",
    "hotel management",
  ],
  openGraph: {
    title: "New Origin Tech Ltd",
    description:
      "Software that moves industries forward. Building practical solutions for Ugandan businesses.",
    type: "website",
    locale: "en_UG",
    siteName: "New Origin Tech Ltd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollThemeProvider>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </ScrollThemeProvider>
      </body>
    </html>
  );
}
