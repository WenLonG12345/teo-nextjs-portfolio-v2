import HeroSection from "@/components/layout/sections/hero";
import ProjectSection from "@/components/layout/sections/project";
import ServicesSection from "@/components/layout/sections/services";
import SkillSetSection from "@/components/layout/sections/skill";

export default function Home() {
	return (
		<>
			<HeroSection />
			<ServicesSection showPricing={false} />
			<ProjectSection />
			<SkillSetSection />
		</>
	);
}
