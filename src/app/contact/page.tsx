import type { Metadata } from "next";
import OngLayout from "@/components/layout/ong-layout";

export const metadata: Metadata = {
  title: "Contact | All Nation One Voice",
  description:
    "Get in touch with All Nation One Voice. We're here to answer your questions and hear your ideas about how we can collaborate together.",
  keywords:
    "contact, form, address, phone, email, message, inquiry, NGO",
};

export default function ContactPage() {
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
              Contact Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
              We&apos;re here to answer your questions and hear your ideas about
              how we can collaborate together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12">
            {/* Contact Form */}
            <div className="mx-auto w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Send us a message
              </h2>
              <p className="mt-2 text-slate-600">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
              <form className="mt-6 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-slate-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      className="mt-1 block w-full rounded-md border-slate-300 py-3 px-4 shadow-sm focus:border-amber-500 focus:ring-amber-500 border"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      className="mt-1 block w-full rounded-md border-slate-300 py-3 px-4 shadow-sm focus:border-amber-500 focus:ring-amber-500 border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-slate-300 py-3 px-4 shadow-sm focus:border-amber-500 focus:ring-amber-500 border"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full rounded-md border-slate-300 py-3 px-4 shadow-sm focus:border-amber-500 focus:ring-amber-500 border"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="mt-1 block w-full rounded-md border-slate-300 py-3 px-4 shadow-sm focus:border-amber-500 focus:ring-amber-500 border"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-1 block w-full rounded-md border-slate-300 py-3 px-4 shadow-sm focus:border-amber-500 focus:ring-amber-500 border"
                    required
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    id="privacy-policy"
                    name="privacy-policy"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 mt-1"
                    required
                  />
                  <label
                    htmlFor="privacy-policy"
                    className="ml-2 block text-sm text-slate-600"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-amber-600 hover:text-amber-500"
                    >
                      privacy policy
                    </a>{" "}
                    and the processing of my personal data.
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-amber-600 text-white hover:bg-amber-700 cursor-pointer px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-10">
                Contact Information
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Address */}
                <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 mb-4 text-amber-600">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">
                    Address
                  </h3>
                  <p className="text-slate-600">
                    34303 Pacific Hwy S Ste 120
                    <br />
                    Federal Way, WA 98003
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 mb-4 text-amber-600">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">
                    Email
                  </h3>
                  <p className="text-slate-600">
                    administration@allnationsonevoice.org
                  </p>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 mb-4 text-amber-600">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM19 12H21C21 7 17 3 12 3V5C15.9 5 19 8.1 19 12ZM15 12H17C17 9.2 14.8 7 12 7V9C13.7 9 15 10.3 15 12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">
                    Phone
                  </h3>
                  <p className="text-slate-600">253-235-5057</p>
                </div>

                {/* Office Hours */}
                <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 mb-4 text-amber-600">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">
                    Office Hours
                  </h3>
                  <p className="text-slate-600">
                    Monday-Friday
                    <br />
                    10am-4pm by appointment only
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Follow Us on Social Media
                </h3>
                <div className="flex justify-center space-x-8">
                  <a
                    href="#"
                    className="text-amber-500 hover:text-amber-600 transition-colors duration-300 cursor-pointer"
                    aria-label="Facebook"
                  >
                    <svg
                      className="h-10 w-10"
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
                    className="text-amber-500 hover:text-amber-600 transition-colors duration-300 cursor-pointer"
                    aria-label="Instagram"
                  >
                    <svg
                      className="h-10 w-10"
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
                    className="text-amber-500 hover:text-amber-600 transition-colors duration-300 cursor-pointer"
                    aria-label="Twitter"
                  >
                    <svg
                      className="h-10 w-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-amber-500 hover:text-amber-600 transition-colors duration-300 cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="h-10 w-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Answers to the most common questions about our organization and
              how to contact us.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-900">
                How can I become part of All Nation One Voice?
              </h3>
              <p className="mt-2 text-slate-600">
                You can join as a volunteer, donor, or collaborator. Fill out
                our contact form and a team member will get in touch with you to
                discuss the different options.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-900">
                How long does it take to respond to inquiries?
              </h3>
              <p className="mt-2 text-slate-600">
                We strive to respond to all inquiries within 48 hours of receipt
                on business days.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-900">
                Can I visit your offices?
              </h3>
              <p className="mt-2 text-slate-600">
                Yes, our offices are open to the public during business hours.
                We recommend scheduling an appointment in advance to ensure
                someone can assist you properly.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-900">
                How can I make a donation?
              </h3>
              <p className="mt-2 text-slate-600">
                You can make donations through our website, by bank transfer, or
                by check. For more information on the different ways to donate,
                please contact our development department.
              </p>
            </div>
          </div>
        </div>
      </section>
    </OngLayout>
  );
}
