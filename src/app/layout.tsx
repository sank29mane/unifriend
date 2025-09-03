import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text flex flex-col min-h-screen`}
      >
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="flex items-center space-x-3">
              <img src="/unifriend-logo.png" alt="Unifriend Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-secondary">Unifriend</span>
            </a>
            <div className="space-x-4">
              <a href="/auth/login" className="text-secondary hover:text-primary transition font-medium">
                Login
              </a>
              <a
                href="/auth/register?role=student"
                className="px-4 py-2 rounded bg-secondary text-white hover:bg-secondary/90 transition font-medium"
              >
                Sign up
              </a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-6 py-8 flex-grow">{children}</main>
        <footer className="bg-gray-100 py-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Unifriend. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}