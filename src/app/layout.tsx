import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LucideGraduationCap } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unifriend - On-demand helpers for international students",
  description: "Get help with airport pickups, BRP collection, bank setup, groceries and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text flex flex-col min-h-screen`}
      >
        <header className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2 group">
              <img src="/unifriend-logo.png" alt="Unifriend Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold text-secondary tracking-tight">Unifriend</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/auth/login" className="text-secondary/80 hover:text-secondary transition font-medium">
                Login
              </a>
              <a
                href="/auth/register?role=student"
                className="px-5 py-2.5 rounded-full bg-secondary text-white hover:bg-secondary-light transition font-medium shadow-lg shadow-secondary/20 hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
              >
                Get Started
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-grow pt-20">{children}</main>
        <footer className="bg-white border-t border-gray-100 py-12 mt-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <img src="/unifriend-logo.png" alt="Unifriend Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold text-secondary">Unifriend</span>
              </div>
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Unifriend. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}