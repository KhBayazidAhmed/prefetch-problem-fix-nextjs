import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DemoNav from "./components/DemoNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartLink Prefetch Demo - Intelligent Link Prefetching for Next.js",
  description: "Explore intelligent link prefetching strategies with network-aware, priority-based, and configurable prefetching in Next.js. Features automatic retry logic, visual status indicators, and comprehensive TypeScript support.",
  keywords: ["nextjs", "prefetch", "performance", "react", "optimization", "network-aware", "typescript"],
  authors: [{ name: "SmartLink Demo Team" }],
  creator: "SmartLink Demo",
  openGraph: {
    title: "SmartLink Prefetch Demo",
    description: "Intelligent link prefetching strategies for Next.js applications",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartLink Prefetch Demo",
    description: "Intelligent link prefetching strategies for Next.js applications",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <div className="min-h-screen">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SL</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">SmartLink Demo</h1>
                    <p className="text-xs text-gray-500">Intelligent Prefetching</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  Next.js • TypeScript • Performance
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DemoNav />
            {children}
          </main>

          <footer className="mt-16 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  SmartLink Demo - Showcasing intelligent prefetching strategies for modern web applications
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Built with Next.js, React, and TypeScript
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
