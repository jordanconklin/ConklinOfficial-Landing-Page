import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

// Importing the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

// Metadata for the application
export const metadata: Metadata = {
  title: "Soccer Brand Landing Page",
  description: "Explore our soccer products and chat with TekkAI",
};

// RootLayout is the layout for the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;  
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-yellow-500 text-white p-2">
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
