import type { Metadata } from "next";
import Link from "next/link";
import OngLayout from "@/components/layout/ong-layout";

export const metadata: Metadata = {
  title: "About Us | All Nation One Voice",
  description:
    "Learn more about All Nation One Voice, our history, mission and team. We are dedicated to empowering lives through education, job training, and essential support services.",
  keywords:
    "about us, NGO, history, mission, team, values, education, job training, support",
};

export default function AboutPage() {
  return (
    <OngLayout>
      {/* Hero */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white"></div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              About Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
              Discover our story, mission, and the people behind All Nation One
              Voice.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Our Story
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                All Nation One Voice began in 2025 with a clear mission to
                empower lives through education and support services. What
                started as a small community initiative has grown with the help
                of dedicated sponsors who believe in creating positive change.
              </p>
              <p className="mt-4 text-lg text-slate-600">
                Today, we continue to build on our commitment to provide
                education, job training, and essential support to those who need
                it most, helping individuals build better lives for themselves
                and their communities.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-xl shadow-lg sm:h-80 md:h-96">
              <img
                src="/images/about.jpg"
                alt="All Nation One Voice"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              The principles that guide our work and define us as an
              organization.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-amber-600">
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
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Empowerment
              </h3>
              <p className="text-slate-600">
                We believe in providing tools and opportunities that enable
                individuals to take control of their own future and achieve
                self-sufficiency.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-green-600">
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
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Accessibility
              </h3>
              <p className="text-slate-600">
                We are committed to making education, training, and support
                services accessible to all, regardless of background or
                circumstances.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-amber-600">
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
                    d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Dignity
              </h3>
              <p className="text-slate-600">
                We respect the inherent worth of every individual and provide
                support in ways that preserve and enhance personal dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Our Team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Meet the dedicated people who make our mission possible.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <img
                  src="/images/img2.webp"
                  alt="Bersabed Ponce"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Bersabed Ponce
              </h3>
              <p className="text-indigo-600 mb-2">President</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <img
                  src="/images/img6.jpeg"
                  alt="Claudia Santana"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Claudia Santana
              </h3>
              <p className="text-indigo-600 mb-2">Vicepresidente/Treasury</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <img
                  src="/images/img5.jpeg"
                  alt="Carlos Santana"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Carlos Santana
              </h3>
              <p className="text-indigo-600 mb-2">Secretary</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <div className="h-full w-full bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-400">Photo</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Julian Santana
              </h3>
              <p className="text-indigo-600 mb-2">Board Member</p>
            </div>
          </div>
        </div>
      </section>
    </OngLayout>
  );
}
