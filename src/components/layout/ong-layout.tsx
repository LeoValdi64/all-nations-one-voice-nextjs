"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, X } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import NewsletterForm from "@/components/ui/newsletter-form";
import { SponsorsSection } from "@/components/sections/sponsors-section";

const DONATION_URL =
  process.env.NEXT_PUBLIC_STRIPE_DONATION_URL || "#donate";

export default function OngLayout({
  children,
  title,
  metaDescription,
  metaKeywords,
}: {
  children: ReactNode;
  title?: string;
  metaDescription?: string;
  metaKeywords?: string;
}) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (route: string) => pathname === route;

  const navLinks = [
    { href: "/", label: "Home", route: "/" },
    { href: "/about", label: "About Us", route: "/about" },
    { href: "/contact", label: "Contact", route: "/contact" },
  ];

  return (
    <>
      {/* Meta tags handled by Next.js metadata API in layout.tsx and page.tsx */}
      <div className="flex min-h-screen flex-col bg-white text-slate-700">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/images/logo1.webp"
                  alt="All Nation One Voice Logo"
                  className="h-16 w-auto"
                />
                <span className="pl-2 text-xl font-semibold text-slate-800">
                  All Nation One Voice
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex md:items-center md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium hover:text-slate-900 relative ${
                    isActive(link.route)
                      ? "text-slate-900 after:absolute after:left-0 after:bottom-[-8px] after:h-[2px] after:w-full after:bg-slate-900"
                      : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <a
                href={DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-100/5 text-red-400 hover:bg-red-100/15 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 hidden md:inline-flex items-center group cursor-pointer px-4 py-2 rounded-md font-medium text-sm"
              >
                <Heart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-red-500" />
                Donate Now
              </a>
              <button
                type="button"
                className="flex md:hidden text-slate-700 hover:text-slate-900 cursor-pointer"
                aria-label="Toggle menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`${
              isMenuOpen ? "max-h-60" : "max-h-0"
            } overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-200 md:hidden`}
          >
            <nav className="flex flex-col space-y-4 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium hover:text-amber-600 py-2 ${
                    isActive(link.route)
                      ? "text-amber-600 border-l-4 border-amber-600 pl-2"
                      : "text-slate-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 text-white hover:bg-amber-700 w-full flex items-center justify-center py-2 mt-2 cursor-pointer rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="mr-2 h-4 w-4" />
                Donate Now
              </a>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* CTA Banner */}
        <section className="bg-[#5bbc47] py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Join Our Mission!
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Contact us to learn how you can be part of the change or make a
                donation to support our programs.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a
                  href={DONATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-red-500 hover:bg-white/90 cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300 px-8 py-4 rounded-md font-medium"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Donate Now
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center border border-slate-300 bg-white text-black hover:text-amber-600 hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 cursor-pointer px-8 py-4 rounded-md font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <SponsorsSection />

        {/* Footer */}
        <footer className="bg-slate-50 py-12 px-4 text-slate-700 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  All Nation One Voice
                </h3>
                <p className="mt-4 text-slate-600">
                  Building bridges between cultures and nations for a more
                  united future.
                </p>
                <div className="mt-6 flex space-x-4">
                  <a
                    href="#"
                    className="text-slate-500 hover:text-amber-600"
                    aria-label="Facebook"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-amber-600"
                    aria-label="Instagram"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-amber-600"
                    aria-label="Twitter"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
                <div className="mt-6">
                  <a
                    href={DONATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-amber-600 text-white hover:bg-amber-700 px-5 py-2.5 rounded-md font-medium text-sm transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <Heart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-red-200" />
                    Donate Now
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-amber-600"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-600 hover:text-amber-600"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-slate-600 hover:text-amber-600"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800">Contact</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-slate-600">
                      34303 Pacific Hwy S Ste 120, Federal Way, WA 98003
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-slate-600">
                      administration@allnationsonevoice.org
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-slate-600">253-235-5057</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800">Subscribe</h3>
                <p className="mt-4 text-slate-600">
                  Receive our latest news and updates.
                </p>
                <NewsletterForm />
              </div>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-8">
              <p className="text-center text-sm text-slate-600">
                &copy; {currentYear} All Nation One Voice. All rights reserved.
                | By{" "}
                <a
                  href="https://leovaldi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700"
                >
                  LeoValdi
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
