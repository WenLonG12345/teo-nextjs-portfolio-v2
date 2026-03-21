import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetadataProps } from "@/constants/types";
import { getGithubRepos } from "@/utils/api";
import getQueryClient from "@/utils/getQueryClient";
import ReposClient from "./Repos";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("repo.badge"),
		description: t("repo.title"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
			type: "website",
			title: t("repo.title"),
			url: "/repos",
			description: t("repo.description_1"),
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("repo.title"),
			site: "/repos",
			description: t("repo.description_1"),
			images: ["/og_image.png"],
		},
	};
}

const ReposPage = async () => {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["repos"],
		queryFn: () => getGithubRepos(process.env.GITHUB_USERNAME || ""),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ReposClient />
		</HydrationBoundary>
	);
};

export default ReposPage;
