import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CAREER_LIST, METADATA, SITE_CONFIG } from "@/constants";
import type { MetadataProps } from "@/constants/types";
import { localeAlternates } from "@/utils/seo";
import AboutClient from "./About";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: { absolute: t("about.seo_title") },
		description: t("about.summary_career"),
		alternates: localeAlternates(locale, "/about"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
			type: "website",
			title: t("about.badge"),
			description: t("about.summary_career"),
			url: "/about",
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("about.badge"),
			description: t("about.summary_career"),
			site: "/about",
			images: ["/og_image.png"],
		},
	};
}

const ORIGIN = METADATA.url.replace(/\/+$/, "");
const SOCIALS = SITE_CONFIG.footer.accounts
	.map((a) => a.url)
	.filter((u) => u.startsWith("https://"));
const [current] = CAREER_LIST;

const PERSON_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "Person",
	"@id": `${ORIGIN}/about#person`,
	name: "Teo Wen Long",
	url: `${ORIGIN}/about`,
	image: `${ORIGIN}/images/profile_picture.png`,
	jobTitle: current.role,
	worksFor: { "@type": "Organization", name: current.title, url: current.url },
	email: SITE_CONFIG.contact.email,
	address: {
		"@type": "PostalAddress",
		addressLocality: "Kuala Lumpur",
		addressCountry: "MY",
	},
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "Universiti Teknologi Malaysia",
	},
	knowsAbout: ["React", "Next.js", "TypeScript", "Golang", "AWS"],
	sameAs: SOCIALS,
};

const AboutPage = () => {
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
			/>
			{/* React hoists <link> into <head>; rel=me ties the profiles to this Person */}
			{SOCIALS.map((href) => (
				<link key={href} rel="me" href={href} />
			))}
			<AboutClient />
		</>
	);
};

export default AboutPage;
