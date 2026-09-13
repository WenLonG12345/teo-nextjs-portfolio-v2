import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import BackToTop from "@/components/layout/back-to-top";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import ReactQueryProvider from "@/components/layout/react-query-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { METADATA, SITE_CONFIG } from "@/constants";
import { routing } from "@/i18n/routing";
import { cn } from "@/utils/cn";

import "./globals.css";

// const ClickSpark = dynamic(() => import("@/components/click-spark"), {
//   ssr: false,
// });

// brand kit: Hanken Grotesk for everything, 700 headings / 500 labels / 400 body
const hanken = Hanken_Grotesk({
	subsets: ["latin"],
	weight: ["400", "500", "700", "800"],
	variable: "--font-hanken",
});

export const metadata: Metadata = {
	title: {
		default: METADATA.title,
		template: METADATA.titleTemplate,
	},
	description: METADATA.description,
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
	metadataBase: new URL(METADATA.url),
};

const ORIGIN = METADATA.url.replace(/\/+$/, "");

// one graph, two entities: the business here, the founder Person on /about
const BUSINESS_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	"@id": `${ORIGIN}/#business`,
	name: "twlworks",
	url: ORIGIN,
	description: METADATA.description,
	image: `${ORIGIN}/og_image.png`,
	email: SITE_CONFIG.contact.email,
	areaServed: { "@type": "Country", name: "Malaysia" },
	address: {
		"@type": "PostalAddress",
		addressLocality: "Kuala Lumpur",
		addressCountry: "MY",
	},
	founder: { "@id": `${ORIGIN}/about#person` },
	sameAs: SITE_CONFIG.footer.accounts
		.map((a) => a.url)
		.filter((u) => u.startsWith("https://")),
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
			<body className={cn("min-h-screen bg-background", hanken.variable)}>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
				/>
				<NextIntlClientProvider messages={messages}>
					<ReactQueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							{/* <ClickSpark> */}
							{/* warm glow behind the navbar on every page */}
							<div
								aria-hidden
								className="absolute top-2 lg:-top-20 left-1/2 -translate-x-1/2 w-[90%] h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl -z-10 pointer-events-none"
							/>
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
