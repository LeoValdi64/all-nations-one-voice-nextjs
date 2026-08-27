import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://allnationsonevoice.org"),
  title: "All Nations One Voice | Federal Way nonprofit",
  description:
    "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way, Washington.",
  keywords:
    "All Nations One Voice, FOUND IT Thrift Store, Federal Way, job search help, nonprofit, thrift store",
  openGraph: {
    title: "All Nations One Voice",
    description:
      "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way.",
    type: "website",
    url: "https://allnationsonevoice.org",
    images: [{ url: "/images/logo1.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Nations One Voice",
    description:
      "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="canonical" href="https://allnationsonevoice.org" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
