"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

const DONATION_URL =
  process.env.NEXT_PUBLIC_STRIPE_DONATION_URL || "https://donate.stripe.com/dR615Z1P6eHrg6c000";

function GradientButton({
  children,
  className,
  primary = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
  [key: string]: unknown;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "relative overflow-hidden rounded-full px-8 py-4 font-medium shadow-xl transition-all duration-300 border-2",
        primary
          ? "border-amber-600 bg-amber-500 text-white"
          : "border-green-500 bg-white text-green-700",
        "hover:shadow-2xl",
        className ?? "",
      ].join(" ")}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function HeroSection() {
  const [scrolled] = useState(false);

  const scrollToMission = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("Mision");
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.9)",
          }}
        />
        <div className="absolute inset-0 bg-[#f8f5ef]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(227,140,0,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(134,239,172,0.15),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-green-100/30 blur-3xl" />
        <div className="absolute top-3/4 right-1/3 h-36 w-36 rounded-full bg-amber-50/30 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center px-4 py-20 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="animate-fade-in mb-2 text-5xl font-bold tracking-tight text-amber-600 md:text-7xl">
            <span className="block md:inline">All Nations</span>
            <span className="block md:inline"> One Voice</span>
          </h1>
          <h2 className="mb-4 text-2xl font-light text-amber-500 md:text-3xl">
            a nonprofit organization
          </h2>

          <p className="mb-6 mx-auto max-w-2xl text-lg text-gray-700 md:text-xl">
            Empowering lives through education, job training, and essential
            support services to create more inclusive, dignified, and
            self-sufficient communities.
          </p>

          <div className="mt-4 space-y-2 md:space-y-0 md:space-x-4 lg:mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
            <Link href="/contact">
              <GradientButton
                primary
                className="transform shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 hover:bg-amber-600 cursor-pointer active:scale-95"
              >
                Cooperate with us
              </GradientButton>
            </Link>
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-green-500 bg-white px-8 py-4 text-gray-800 font-medium shadow-xl hover:bg-green-50 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20 hover:text-green-800 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-125 group-hover:text-red-400" />
              Donate Now
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 lg:mt-0 flex items-center justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-amber-100/30 blur-xl"></div>
            <img
              src="/images/logo1.webp"
              alt="All Nations One Voice Logo"
              className="max-w-xs md:max-w-sm lg:max-w-md w-full h-auto relative z-10 drop-shadow-xl"
              style={{ filter: "brightness(1.1) contrast(1.05)" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#Mision"
          onClick={scrollToMission}
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <span className="mb-2 text-sm font-light text-gray-700">
            Discover more
          </span>
          <div className="h-8 w-5 rounded-full border border-green-500 p-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
