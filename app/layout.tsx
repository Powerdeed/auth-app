import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/globals";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PTR Auth",
    template: "%s | PTR Auth", // Template for child pages
  },
  description: "Authentication platform for security and accessability.",
  other: {
    "app-version": "1.0.0",
  },
  // You can also define specific Open Graph, WhatsApp, etc. metadata here
  openGraph: {
    title: "PTR Auth",
    description: "Authentication platform for security and accessability.",
    type: "website",
    url: "https://auth.powerdeed.co.ke/",
    siteName: "PTR Auth",
    locale: "en_US",
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
        className={`relative ${plusJakartaSans.variable} ${openSans.variable} antialiased flex flex-col min-h-screen`}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
