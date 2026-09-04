import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import BackToTop from "@/components/layout/back-to-top";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import ReactQueryProvider from "@/components/layout/react-query-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { METADATA } from "@/constants";
import { routing } from "@/i18n/routing";
import { cn } from "@/utils/cn";

import "./globals.css";

// const ClickSpark = dynamic(() => import("@/components/click-spark"), {
//   ssr: false,
// });

const display = Bricolage_Grotesque({
	subsets: ["latin"],
	variable: "--font-bricolage",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

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
	},
	twitter: {
		card: "summary_large_image",
		title: METADATA.title,
		site: METADATA.url,
		description: METADATA.description,
	},
	metadataBase: new URL(METADATA.url),
	alternates: {
		canonical: "/",
		languages: {
			en: "/",
			zh: "/zh",
		},
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as "en" | "zh")) {
		notFound();
	}

	setRequestLocale(locale);

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background",
					display.variable,
					body.variable,
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<ReactQueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							{/* <ClickSpark> */}
							<Navbar />
							{children}
							<Footer />
							<BackToTop />
							<WhatsAppButton />
							{/* </ClickSpark> */}
						</ThemeProvider>
						<Analytics />
						<SpeedInsights />
					</ReactQueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
