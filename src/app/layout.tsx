import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TaxCalculator365 | UK Income Tax Calculator",
  description: "Accurate UK tax calculations and professional filing services. Calculate your take-home pay given income tax rates, national insurance, pensions and more.",
  openGraph: {
    title: "TaxCalculator365 | UK Income Tax Calculator",
    description: "Find out exactly how much you'll take home after tax and NI.",
    url: "https://taxcalculator365.com",
    siteName: "TaxCalculator365",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxCalculator365 | UK Income Tax Calculator",
    description: "The UK's most loved tax calculator.",
  },
  robots: "index, follow",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { NoticeBar } from "@/components/layout/NoticeBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-background_primary text-text_primary selection:bg-action/10">
        <noscript>
          <div className="bg-alert text-white p-space_4 text-center font-bold">
            JavaScript is required for the interactive calculator. Please enable it in your browser.
          </div>
        </noscript>
        
        <Navbar />
        <NoticeBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
