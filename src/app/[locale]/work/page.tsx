import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetadataProps } from "@/constants/types";
import { localeAlternates } from "@/utils/seo";
import Work from "./Work";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("project.title"),
		description: t("project.page_description"),
		alternates: localeAlternates(locale, "/work"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
			type: "website",
			title: t("project.title"),
			url: "/work",
			description: t("project.page_description"),
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("project.title"),
			site: "/work",
			description: t("project.page_description"),
			images: ["/og_image.png"],
		},
	};
}

const WorkPage = () => {
	return <Work />;
};

export default WorkPage;
