import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f8f5ef",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://allnationsonevoice.org"),
  title: {
    default: "All Nations One Voice | Federal Way nonprofit",
    template: "%s | All Nations One Voice",
  },
  description:
    "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way, Washington.",
  keywords: [
    "All Nations One Voice",
    "FOUND IT Thrift Store",
    "Federal Way",
    "job search help",
    "nonprofit",
    "thrift store",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "All Nations One Voice",
    description:
      "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way, Washington.",
    type: "website",
    locale: "en_US",
    siteName: "All Nations One Voice",
    url: "https://allnationsonevoice.org",
    images: [
      {
        url: "/images/store/anv-2026-18-storefront.jpg",
        alt: "Neighbors outside FOUND IT! Thrift Store in Federal Way",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Nations One Voice",
    description:
      "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way, Washington.",
    images: ["/images/store/anv-2026-18-storefront.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo1.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(manrope.className, manrope.variable, fraunces.variable)}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
