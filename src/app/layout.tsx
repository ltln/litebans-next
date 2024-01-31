import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme-provider";
import { getLocale } from "./i18n/server";
import { LocaleProvider } from "@/lib/locale-provider";
import Footer from "./components/Footer";
import { config } from "@/lib/config";
import { inter } from "@/lib/fonts";
import QueryProvider from "@/lib/query-provider";

export const metadata: Metadata = {
  title: config.server_name,
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
          <QueryProvider>
          <LocaleProvider value={locale}>
          <Header />
          <div className="container max-w-screen-xl calc-footer">
            {children}
          </div>
          <Footer />
          </LocaleProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
