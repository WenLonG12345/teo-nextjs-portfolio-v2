import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicesSection from "@/components/layout/sections/services";
import type { MetadataProps } from "@/constants/types";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("services.badge"),
		description: t("services.description"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
			type: "website",
			title: t("services.title"),
			url: "/services",
			description: t("services.description"),
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("services.title"),
			site: "/services",
			description: t("services.description"),
			images: ["/og_image.png"],
		},
	};
}

const ServicesPage = () => {
	return <ServicesSection />;
};

export default ServicesPage;
