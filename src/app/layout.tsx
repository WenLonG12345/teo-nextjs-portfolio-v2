import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";
import { cn } from "@/utils/cn";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/footer";
import { METADATA } from "@/constants";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactQueryProvider from "@/components/layout/react-query-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", outfit.className)}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
