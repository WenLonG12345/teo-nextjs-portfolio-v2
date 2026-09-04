"use client";

import { useLocale, useTranslations } from "next-intl";
import { LuBriefcase, LuCode, LuGithub } from "react-icons/lu";
import { ProjectCard } from "@/components/layout/sections/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_LIST } from "@/constants";
import { MotionSection } from "@/utils/motion-div";

const CATEGORY_ICON: Record<string, React.ReactNode> = {
	"project.works": <LuBriefcase />,
	"project.freelance": <LuCode />,
	"project.opensource": <LuGithub />,
};

const Work = () => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<section className="container py-16">
			<MotionSection
				animationProps={{
					initial: { opacity: 0, y: 30 },
					animate: { opacity: 1, y: 0 },
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
				<h1 className="text-3xl font-bold md:text-4xl">{t("project.title")}</h1>
				<p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-muted-foreground">
					{t("project.page_description")}
				</p>
			</MotionSection>

			<Tabs
				defaultValue={Object.keys(PROJECT_LIST)[0]}
				className="w-full mx-auto lg:max-w-(--breakpoint-xl)"
			>
				<div className="flex justify-center mb-8">
					<TabsList className="h-auto gap-1 p-1">
						{Object.keys(PROJECT_LIST).map((category) => (
							<TabsTrigger
								key={category}
								value={category}
								className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:shadow-xs flex items-center gap-2"
							>
								{CATEGORY_ICON[category] ?? <LuBriefcase />}
								{t(category)}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

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

export default Work;
