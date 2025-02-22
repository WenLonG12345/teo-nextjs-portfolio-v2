import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { cn } from "@/utils/cn";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/footer";
import { METADATA } from "@/constants";
import ReactQueryProvider from "@/components/layout/react-query-provider";

import "./globals.css";
import ClickSpark from "@/components/click-spark";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: METADATA.title,
    template: METADATA.titleTemplate,
  },
  description: METADATA.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: METADATA.title,
    url: METADATA.url,
    description: METADATA.description,
    images: ["/og_image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: METADATA.title,
    site: METADATA.url,
    description: METADATA.description,
    images: ["/og_image.png"],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", outfit.className)}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ClickSpark>
                <Navbar />
                {children}
                <Footer />
              </ClickSpark>
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
