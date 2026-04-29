import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Next-Gen Tax Calculator",
  description: "Accurate UK tax calculations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-background_primary text-text_primary selection:bg-action/10">
        <noscript>
          <div className="bg-alert text-white p-space_4 text-center font-bold">
            JavaScript is required for the interactive calculator. Please enable it in your browser.
          </div>
        </noscript>
        <header className="border-b border-border_default py-space_4 bg-background_primary/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-space_4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-action rounded-md flex items-center justify-center">
                <span className="text-background_primary font-bold">£</span>
              </div>
              <span className="font-bold text-lg tracking-tight">TaxCalc365</span>
            </div>
            <nav className="hidden md:flex items-center gap-space_6 text-sm font-medium text-text_secondary">
              <a href="#" className="hover:text-text_primary transition-colors">Compare</a>
              <a href="#" className="hover:text-text_primary transition-colors">Tax Bands</a>
              <a href="#" className="hover:text-text_primary transition-colors">About</a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-background_surface border-t border-border_default py-space_10 mt-space_20">
          <div className="container mx-auto px-space_4">
            <div className="flex flex-col md:flex-row justify-between gap-space_10">
              <div className="flex flex-col gap-space_4 max-w-xs">
                <div className="font-bold text-lg">TaxCalc365</div>
                <p className="text-sm text-text_secondary">
                  High-performance, open-source UK tax calculation engine. Built for speed and accuracy.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-space_10">
                <div className="flex flex-col gap-space_3">
                  <span className="text-xs font-bold uppercase text-text_primary">Product</span>
                  <a href="#" className="text-sm text-text_secondary hover:text-text_primary">Calculator</a>
                  <a href="#" className="text-sm text-text_secondary hover:text-text_primary">API</a>
                </div>
                <div className="flex flex-col gap-space_3">
                  <span className="text-xs font-bold uppercase text-text_primary">Resources</span>
                  <a href="#" className="text-sm text-text_secondary hover:text-text_primary">HMRC Guides</a>
                  <a href="#" className="text-sm text-text_secondary hover:text-text_primary">Tax Tables</a>
                </div>
                <div className="flex flex-col gap-space_3">
                  <span className="text-xs font-bold uppercase text-text_primary">Legal</span>
                  <a href="#" className="text-sm text-text_secondary hover:text-text_primary">Privacy</a>
                  <a href="#" className="text-sm text-text_secondary hover:text-text_primary">Terms</a>
                </div>
              </div>
            </div>
            <div className="mt-space_10 pt-space_6 border-t border-border_default text-xs text-text_secondary text-center">
              © 2026 TaxCalc365. Not affiliated with HMRC.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
