import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme-provider";
import { getLocale } from "./i18n/server";
import { LocaleProvider } from "@/lib/locale-provider";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();

  return (
    <html lang={locale}>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider value={locale}>
          <Header />
          <div className="container max-w-screen-xl calc-footer">
            {children}
          </div>
          <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}