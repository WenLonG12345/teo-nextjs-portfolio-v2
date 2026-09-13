import { MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/layout/sections/hero";
import ProjectSection from "@/components/layout/sections/project";
import ServicesSection from "@/components/layout/sections/services";
import { Button } from "@/components/ui/button";
import { METADATA, SITE_CONFIG } from "@/constants";
import type { MetadataProps } from "@/constants/types";
import { localeAlternates } from "@/utils/seo";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: { absolute: METADATA.title },
		alternates: localeAlternates(locale, ""),
	};
}

export default async function Home({ params }: MetadataProps) {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return (
		<>
			<HeroSection />
			<ServicesSection full={false} />
			<ProjectSection />

			{/* closing diptych: question left, the audit answer right */}
			<section className="container grid grid-cols-1 gap-8 py-16 md:py-24 lg:grid-cols-[5fr_7fr] lg:gap-20">
				<h2 className="text-3xl font-bold tracking-tight md:text-4xl wrap-anywhere">
					{t("home.cta_title")}
				</h2>
				<div className="min-w-0">
					<p className="leading-relaxed text-muted-foreground">
						{t("home.cta_body")}
					</p>
					<div className="flex flex-wrap items-center gap-3 mt-8">
						<Button size="lg" className="text-base font-semibold" asChild>
							<a
								href={SITE_CONFIG.contact.booking}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Phone size={16} />
								{t("home.book_call")}
							</a>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<a
								href={SITE_CONFIG.contact.whatsapp}
								target="_blank"
								rel="noopener noreferrer"
							>
								<MessageCircle size={16} />
								{t("home.whatsapp")}
							</a>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
