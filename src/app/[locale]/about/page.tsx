import React from "react";
import AboutClient from "./About";
import { Metadata } from "next";
import { MetadataProps } from "@/constants/types";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("about.badge"),
    description: t("about.summary_career"),
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

const AboutPage = () => {
  return <AboutClient />;
};

export default AboutPage;
