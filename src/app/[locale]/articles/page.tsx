import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetadataProps } from "@/constants/types";
import { getMediumArticles } from "@/utils/api";
import getQueryClient from "@/utils/getQueryClient";
import ArticlesClient from "./Articles";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("article.badge"),
		description: t("article.title"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
			type: "website",
			title: t("article.title"),
			url: "/articles",
			description: t("article.description_1"),
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("article.title"),
			site: "/articles",
			description: t("article.description_1"),
			images: ["/og_image.png"],
		},
	};
}

const ArticlesPage = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["articles"],
		queryFn: () => getMediumArticles(process.env.MEDIUM_USERNAME || ""),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ArticlesClient />
		</HydrationBoundary>
	);
};

export default ArticlesPage;
