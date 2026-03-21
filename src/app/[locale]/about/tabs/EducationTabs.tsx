"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LuCalendar, LuExternalLink } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { EDUCATION_LIST } from "@/constants";
import { Link } from "@/i18n/routing";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

const EducationTabs = () => {
	const t = useTranslations();

	return (
		<>
			<MotionSection
				animationProps={{
					initial: { opacity: 0, y: 30 },
					whileInView: { opacity: 1, y: 0 },
					transition: { duration: 0.5 },
					className: "mb-10 text-center",
				}}
			>
				<h2 className="mb-3 text-3xl font-bold md:text-4xl">
					{t("about.title_education")}
				</h2>
				<p className="mx-auto text-base md:w-1/2 text-muted-foreground">
					{t("about.summary_education")}
				</p>
			</MotionSection>

			<div className="relative max-w-3xl mx-auto">
				{/* Vertical timeline line */}
				<div className="absolute left-[27px] top-4 bottom-4 w-px bg-border hidden md:block" />

				{EDUCATION_LIST.map((education, i) => (
					<MotionDiv
						key={education.title}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: i * 0.1 }}
						className="relative mb-5"
					>
						{/* Timeline dot */}
						<div className="absolute left-[21px] top-7 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background z-10 hidden md:block" />

						<div className="md:ml-16">
							<div className="overflow-hidden transition-all duration-300 border rounded-2xl border-border bg-card hover:border-primary/30 hover:shadow-md">
								<div className="px-6 py-5">
									<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
										<div className="flex items-center gap-4">
											<div className="relative overflow-hidden border w-14 h-14 shrink-0 rounded-xl border-border bg-muted">
												<Image
													src={education.logo}
													alt={education.alt}
													fill
													className="object-cover"
												/>
											</div>
											<div>
												<Link
													href={education.url}
													target="_blank"
													className="inline-flex items-center gap-1 text-base font-semibold leading-tight transition-colors group hover:text-primary"
												>
													{education.title}
													<LuExternalLink
														size={12}
														className="transition-opacity opacity-0 group-hover:opacity-100"
													/>
												</Link>
												<div className="mt-1 text-sm font-medium text-primary">
													{education.role}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 self-start sm:self-auto">
											<LuCalendar size={12} />
											<span>{education.period}</span>
										</div>
									</div>

									<div className="flex flex-row flex-wrap gap-1.5 mt-5 pt-4 border-t border-border/50">
										{education.skills?.map((skill) => (
											<Badge
												key={skill}
												variant="secondary"
												className="text-xs font-normal"
											>
												{skill}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</div>
					</MotionDiv>
				))}
			</div>
		</>
	);
};

export default EducationTabs;
