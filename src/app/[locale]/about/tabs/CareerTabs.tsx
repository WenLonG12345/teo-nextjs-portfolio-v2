"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LuCalendar, LuChevronRight } from "react-icons/lu";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CAREER_LIST } from "@/constants";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

const CareerTabs = () => {
	const t = useTranslations();
	const locale = useLocale();

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
					{t("about.title_career")}
				</h2>
				<p className="mx-auto text-base md:w-1/2 text-muted-foreground">
					{t("about.summary_career")}
				</p>
			</MotionSection>

			<div className="relative max-w-3xl mx-auto">
				{/* Vertical timeline line */}
				<div className="absolute left-[27px] top-4 bottom-4 w-px bg-border hidden md:block" />

				{CAREER_LIST.map((career, i) => (
					<MotionDiv
						key={career.title}
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
								<Accordion type="single" collapsible>
									<AccordionItem value={career.title} className="border-none">
										<AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/40 transition-colors [&>svg]:text-muted-foreground [&>svg]:shrink-0">
											<div className="flex flex-col w-full gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
												<div className="flex items-center gap-4">
													<div className="relative overflow-hidden border w-14 h-14 shrink-0 rounded-xl border-border bg-muted">
														<Image
															src={career.logo}
															alt={career.alt}
															fill
															className="object-cover"
														/>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															{career.title}
														</div>
														<div className="mt-1 text-sm font-medium text-primary">
															{career.role}
														</div>
													</div>
												</div>
												<div className="flex items-center gap-1.5 text-sm mr-2 text-muted-foreground shrink-0 self-start sm:self-auto">
													<LuCalendar size={12} />
													<span>{career.period}</span>
												</div>
											</div>
										</AccordionTrigger>

										<AccordionContent>
											<div className="px-6 pt-1 pb-3 border-t border-border/50">
												<ul className="mt-3 space-y-2">
													{(locale === "en"
														? career.job_scope
														: career.job_scope_zh
													)?.map((job) => (
														<li
															key={job}
															className="flex items-start gap-2 text-sm text-muted-foreground"
														>
															<LuChevronRight
																size={14}
																className="text-primary mt-0.5 shrink-0"
															/>
															<span>{job}</span>
														</li>
													))}
												</ul>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								<div className="flex flex-row flex-wrap gap-1.5 px-6 pb-5 pt-2">
									{career.skills?.map((skill) => (
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
					</MotionDiv>
				))}
			</div>
		</>
	);
};

export default CareerTabs;
