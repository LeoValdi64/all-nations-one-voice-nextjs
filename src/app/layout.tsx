import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "All Nation One Voice | Uniting cultures, building peace",
  description:
    "We are a global community working for unity and understanding among all cultures and nations.",
  keywords:
    "NGO, global community, unity, peace, cultures, nations, education, job training, support",
  openGraph: {
    title: "All Nation One Voice",
    description:
      "We are a global community working for unity and understanding among all cultures and nations.",
    type: "website",
    url: "https://allnationsonevoice.org",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Nation One Voice",
    description:
      "We are a global community working for unity and understanding among all cultures and nations.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://allnationsonevoice.org" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-700 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
