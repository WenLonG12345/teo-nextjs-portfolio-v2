/* Hallmark · component: services section · genre: editorial · theme: project palette
 * archetype: F4 step timeline — gradient rail, mono step markers, 01 audit → 02 build (fork) → 03 care
 * home (full=false): title + description per step · /services (full): + price, points, CTA
 */

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SERVICE_LIST, SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";

type ServiceKey = (typeof SERVICE_LIST)[number]["key"];

// every project walks the same path; stage 2 is a fork, not a menu
const STAGES: ServiceKey[][] = [
	["audit"],
	["integration", "platform"],
	["care"],
];
// only fixed-fee items carry a number; builds are scoped from the audit
const PRICED: ServiceKey[] = ["audit", "care"];

const ServicesSection = ({ full = true }: { full?: boolean }) => {
	const t = useTranslations();
	// the /services page renders this section alone, so its heading is the page's h1
	const Heading = full ? "h1" : "h2";

	const Service = ({ serviceKey }: { serviceKey: ServiceKey }) => {
		const service = SERVICE_LIST.find((s) => s.key === serviceKey);
		const points = t.raw(`services.items.${serviceKey}.points`) as string[];
		return (
			<div className="min-w-0">
				<h3 className="text-lg font-semibold">
					{t(`services.items.${serviceKey}.title`)}
				</h3>
				{full && (
					<p className="mt-1 text-sm tabular-nums">
						{PRICED.includes(serviceKey) ? (
							<span className="font-medium">{service?.price}</span>
						) : (
							<span className="text-muted-foreground">
								{t("services.scoped")}
							</span>
						)}
					</p>
				)}
				<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
					{t(`services.items.${serviceKey}.description`)}
				</p>
				{full && (
					<ul className="mt-4 space-y-1.5 text-sm text-muted-foreground list-disc pl-4 marker:text-primary">
						{points.map((point) => (
							<li key={point}>{point}</li>
						))}
					</ul>
				)}
			</div>
		);
	};

	return (
		<section
			id="services"
			className="container grid grid-cols-1 gap-10 py-16 md:py-24 lg:grid-cols-[4fr_8fr] lg:gap-20"
		>
			<div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
				<p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
					{t("services.eyebrow")}
				</p>
				<Heading className="mt-3 text-3xl font-bold tracking-tight md:text-4xl wrap-anywhere">
					{t("services.title")}
				</Heading>
				{full ? (
					<p className="mt-4 leading-relaxed text-muted-foreground">
						{t("services.description")}
					</p>
				) : (
					<Button variant="outline" className="mt-8" asChild>
						<Link href="/services">{t("services.view_pricing")}</Link>
					</Button>
				)}
			</div>

			<div className="min-w-0">
				{/* the rail: solid where you start, fading toward the end of the engagement */}
				<div
					aria-hidden
					className="h-1 rounded-full bg-linear-to-r from-primary via-primary/50 to-primary/10"
				/>
				<ol className="grid grid-cols-1 gap-10 mt-8 lg:grid-cols-[1fr_2fr_1fr] lg:gap-8">
					{STAGES.map((stage, i) => (
						<li key={stage.join("+")} className="min-w-0">
							<span
								className={cn(
									"flex items-center justify-center rounded-full size-10 font-mono text-xs tabular-nums border",
									i === 0
										? "bg-primary text-primary-foreground border-primary ring-4 ring-primary/20"
										: "text-primary border-primary/40",
								)}
							>
								{String(i + 1).padStart(2, "0")}
							</span>
							<div
								className={cn(
									"mt-6",
									stage.length > 1 &&
										"grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-6",
								)}
							>
								{stage.map((key, j) => (
									<div key={key} className="contents">
										{j > 0 && (
											<span
												aria-hidden
												className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground sm:block sm:pt-1.5"
											>
												{t("services.or")}
											</span>
										)}
										<Service serviceKey={key} />
									</div>
								))}
							</div>
						</li>
					))}
				</ol>

				{full && (
					<div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-12">
						<Button className="font-semibold" asChild>
							<a
								href={SITE_CONFIG.contact.booking}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Phone size={16} />
								{t("services.cta")}
							</a>
						</Button>
						<p className="max-w-md text-xs text-muted-foreground">
							{t("services.note")}
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default ServicesSection;
