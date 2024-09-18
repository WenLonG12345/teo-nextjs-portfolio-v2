import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";
import { cn } from "@/utils/cn";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WannaDev",
  description: "Join the Devolution, Build Better with WannaDev",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "WannaDev",
    url: "https://home.wannadev.link/",
    description: "Join the Devolution, Build Better with WannaDev",
    images: ["/og_image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://home.wannadev.link/",
    title: "WannaDev",
    description: "Join the Devolution, Build Better with WannaDev",
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
      </body>
    </html>
  );
}
