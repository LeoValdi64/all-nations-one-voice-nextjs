import React from "react";
import Link from "next/link";

export function AboutUsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="order-1 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-amber-600 sm:text-4xl">
              Who We Are
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              All Nations One Voice is dedicated to creating pathways to success
              through education, job training, and essential support services
              that empower individuals and build stronger communities.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  Founded in 2025 with a vision to transform lives through
                  education and support
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  Dedicated to collecting and distributing donated items to
                  those most in need
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  Committed to providing educational opportunities and job
                  training for community members
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  Focused on supporting seniors and people with disabilities
                  with essential resources
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center rounded-md bg-amber-500 px-6 py-3 text-white hover:bg-amber-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer font-medium"
              >
                Learn more about us
              </Link>
            </div>
          </div>
          <div className="order-2 md:order-2 relative">
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-amber-50 via-[#f8f5ef] to-green-50 p-6 border border-amber-100">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full bg-green-50 opacity-60"></div>
              <h3 className="text-xl font-bold text-green-700 mb-4">
                Our Donation Center
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2 text-green-600">•</span>
                  Collection of essential items for community members in need
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-600">•</span>
                  Educational materials and resources for learners of all ages
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-600">•</span>
                  Medical equipment and assistive devices for those who need
                  them
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-600">•</span>
                  Community space for support, connection, and learning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
