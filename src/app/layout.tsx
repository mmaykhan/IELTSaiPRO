import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "IELTS AI Pro - Target Band Roadmap",
  description: "Your personalized path to success.",
};

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-screen flex flex-col pt-24">
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm shadow-indigo-500/5 font-manrope antialiased">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 h-16">
            <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
              IELTS AI Pro
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors" href="/about">About</Link>
              <Link className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors" href="/pricing">Pricing</Link>
              <Link className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors" href="/success-stories">Success Stories</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 px-4 py-2 font-medium active:scale-95 ease-in-out">
                Login
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 ease-in-out shadow-sm shadow-indigo-500/20">
                Get Started
              </button>
            </div>
          </div>
        </header>

        {children}

        <footer className="w-full py-8 bg-transparent border-t border-slate-200 dark:border-slate-800 font-manrope text-sm mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center text-center">
            <p className="text-slate-500 dark:text-slate-400">
              © 2024 IELTS AI Pro. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
