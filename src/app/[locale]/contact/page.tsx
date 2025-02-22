import { MetadataProps } from "@/constants/types";
import ContactClient from "./Contact";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("contact.badge"),
    description: t("contact.title"),
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      title: t("contact.title"),
      url: "/contact",
      description: t("contact.description_1"),
      images: ["/og_image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("contact.title"),
      site: "/contact",
      description: t("contact.description_1"),
      images: ["/og_image.png"],
    },
  };
}

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
