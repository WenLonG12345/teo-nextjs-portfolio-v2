"use client";

import { useTranslations } from "next-intl";

import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CareerTabs from "./tabs/CareerTabs";
import EducationTabs from "./tabs/EducationTabs";

const AboutClient = () => {
	const t = useTranslations();

	return (
		<div className="container py-16">
			<div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl -z-10" />

			<Tabs defaultValue="career">
				<div className="flex items-center justify-center mb-10">
					<TabsList className="h-auto gap-1 p-1">
						<TabsTrigger
							value="career"
							className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg data-[state=active]:shadow-sm"
						>
							<LuBriefcase size={15} />
							{t("about.title_career")}
						</TabsTrigger>
						<TabsTrigger
							value="education"
							className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg data-[state=active]:shadow-sm"
						>
							<LuGraduationCap size={15} />
							{t("about.title_education")}
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="career">
					<CareerTabs />
				</TabsContent>

				<TabsContent value="education">
					<EducationTabs />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AboutClient;
