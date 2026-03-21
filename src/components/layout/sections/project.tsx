"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
	LuArrowRight,
	LuBriefcase,
	LuCode,
	LuExternalLink,
	LuGithub,
	LuLock,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_LIST } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

type Project = (typeof PROJECT_LIST)[string][number];

const ProjectCard = ({
	project,
	locale,
	index,
}: {
	project: Project;
	locale: string;
	index: number;
}) => {
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
						<div className="absolute top-3 right-3 flex items-center gap-1 text-xs bg-background/80 text-muted-foreground px-2.5 py-1 rounded-full backdrop-blur-sm border border-border/60">
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

					<p className="flex-1 mb-4 text-sm leading-relaxed text-muted-foreground">
						{locale === "en" ? project.summary : project.summary_zh}
					</p>

					<div className="flex flex-wrap gap-1.5">
						{project.tech?.map((stack) => (
							<Badge
								key={stack}
								variant="secondary"
								className="text-xs font-normal"
							>
								{stack}
							</Badge>
						))}
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

	return (
		<section id="projects" className="container py-16 ">
			<MotionSection
				animationProps={{
					initial: { opacity: 0, y: 30 },
					whileInView: { opacity: 1, y: 0 },
					transition: { duration: 0.5 },
					className: "mb-10 text-center",
				}}
			>
				<div className="inline-flex items-center gap-2 mb-3">
					<div className="w-8 h-px bg-primary/40" />
					<span className="text-sm font-medium tracking-widest uppercase text-primary">
						{t("project.badge")}
					</span>
					<div className="w-8 h-px bg-primary/40" />
				</div>
				<h2 className="text-3xl font-bold md:text-4xl">
					{t("project.description_1")}
				</h2>
			</MotionSection>

			<Tabs
				defaultValue={Object.keys(PROJECT_LIST)[0]}
				className="w-full mx-auto lg:max-w-screen-xl"
			>
				{/* Tab triggers */}
				<div className="flex justify-center mb-8">
					<TabsList className="h-auto gap-1 p-1">
						{Object.entries(PROJECT_LIST).map(([category]) => {
							let icon = <LuBriefcase />;

							switch (category) {
								case "project.work":
									icon = <LuBriefcase />;
									break;
								case "project.freelance":
									icon = <LuCode />;
									break;
								case "project.opensource":
									icon = <LuGithub />;
									break;
								default:
									break;
							}

							return (
								<TabsTrigger
									key={category}
									value={category}
									className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:shadow-sm flex items-center gap-2"
								>
									{icon}
									{t(category)}
								</TabsTrigger>
							);
						})}
					</TabsList>
				</div>

				{/* Tab content */}
				{Object.entries(PROJECT_LIST).map(([category, projects]) => (
					<TabsContent key={category} value={category}>
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{projects.map((project, i) => (
								<ProjectCard
									key={project.name}
									project={project}
									locale={locale}
									index={i}
								/>
							))}
						</div>
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
};

export default ProjectSection;
