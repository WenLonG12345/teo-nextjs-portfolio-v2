import { getMediumArticles } from "@/utils/api";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import React from "react";
import ArticlesClient from "./Articles";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
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
