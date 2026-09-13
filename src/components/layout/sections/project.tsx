"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowRight, LuExternalLink, LuLock } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { PROJECT_LIST } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { MotionDiv } from "@/utils/motion-div";

type Project = (typeof PROJECT_LIST)[string][number];

export const ProjectCard = ({
	project,
	locale,
	index,
	compact = false,
}: {
	project: Project;
	locale: string;
	index: number;
	// compact: image + name + one line + stack — the home grid; /work gets the full story
	compact?: boolean;
}) => {
	const t = useTranslations();
	const isEn = locale === "en";
	const problem = isEn ? project.problem : project.problem_zh;
	const outcome = isEn ? project.outcome : project.outcome_zh;
	const tagline = isEn
		? (project.tagline ?? project.summary)
		: (project.tagline_zh ?? project.summary_zh);

	const content = (
		<MotionDiv
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.35, delay: index * 0.06 }}
			className="h-full"
		>
			<div
				className={cn(
					"h-full flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300",
					project.link
						? "cursor-pointer hover:border-primary/40 hover:shadow-lg group"
						: "",
				)}
			>
				{/* Image */}
				<div className="relative overflow-hidden aspect-video shrink-0">
					<Image
						src={project.imageUrl}
						alt={project.alt}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover transition-transform duration-500 group-hover:scale-[1.04] bg-gray-400"
					/>

					{/* Hover overlay — link projects */}
					{project.link && (
						<div className="absolute inset-0 bg-primary/85 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<span className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white border rounded-full border-white/30 bg-white/10">
								View Project
								<LuArrowRight size={14} />
							</span>
						</div>
					)}

					{/* Private badge — no-link projects */}
					{!project.link && (
						<div className="absolute top-3 right-3 flex items-center gap-1 text-xs bg-background/80 text-muted-foreground px-2.5 py-1 rounded-full backdrop-blur-xs border border-border/60">
							<LuLock size={10} />
							Private
						</div>
					)}
				</div>

				{/* Card body */}
				<div className="flex flex-col flex-1 p-5">
					<div className="flex items-start justify-between gap-2 mb-2">
						<h3 className="text-base font-semibold leading-tight">
							{project.name}
						</h3>
						{project.link && (
							<LuExternalLink
								size={14}
								className="text-muted-foreground/40 group-hover:text-primary shrink-0 mt-0.5 transition-colors duration-200"
							/>
						)}
					</div>

					<p className="mb-4 text-sm leading-relaxed text-muted-foreground">
						{compact ? tagline : isEn ? project.summary : project.summary_zh}
					</p>

					{!compact && (problem || outcome) && (
						<div className="flex-1 mb-4 space-y-3">
							{problem && (
								<div>
									<p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/70 mb-0.5">
										{t("project.problem")}
									</p>
									<p className="text-sm leading-relaxed text-muted-foreground">
										{problem}
									</p>
								</div>
							)}
							{outcome && (
								<div>
									<p className="text-xs font-semibold tracking-wider uppercase text-primary mb-0.5">
										{t("project.outcome")}
									</p>
									<p className="text-sm leading-relaxed text-foreground/90">
										{outcome}
									</p>
								</div>
							)}
						</div>
					)}

					<div className="mt-auto">
						<p className="text-[11px] leading-relaxed text-muted-foreground/60">
							<span className="font-medium">{t("project.built_with")}</span>{" "}
							{project.tech?.join(" · ")}
						</p>
					</div>
				</div>
			</div>
		</MotionDiv>
	);

	return project.link ? (
		<Link href={project.link} target="_blank" className="block h-full">
			{content}
		</Link>
	) : (
		<div className="h-full">{content}</div>
	);
};

const ProjectSection = () => {
	const t = useTranslations();
	const locale = useLocale();

	// a project earns a home-page slot by having a written problem -> outcome,
	// which is exactly the client work worth selling on
	const featured = PROJECT_LIST["project.freelance"]
		.filter((project) => project.problem && project.outcome)
		.slice(0, 6);

	/* Hallmark · component: projects section · genre: editorial · theme: project palette
	 * archetype: F1 card grid, 3 × 2 — same ProjectCard as /work, compact body
	 */
	return (
		<section id="projects" className="container py-16 md:py-24">
			<div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
				<h2 className="text-3xl font-bold tracking-tight md:text-4xl wrap-anywhere">
					{t("project.description_1")}
				</h2>
				<Button variant="outline" asChild>
					<Link href="/work">
						{t("project.view_all")}
						<LuArrowRight size={14} />
					</Link>
				</Button>
			</div>

			<ul className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
				{featured.map((project, index) => (
					<li key={project.name} className="min-w-0">
						<ProjectCard
							project={project}
							locale={locale}
							index={index}
							compact
						/>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ProjectSection;
