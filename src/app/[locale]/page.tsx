// import ServicesSection from "@/components/layout/sections/services";
import HeroSection from "@/components/layout/sections/hero";
import ServiceSection from "@/components/layout/sections/service";
// import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
// import { FeaturesSection } from "@/components/layout/sections/features";

import { PricingSection } from "@/components/layout/sections/pricing";
// import { ServicesSection } from "@/components/layout/sections/__services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import ProjectSection from "@/components/layout/sections/project";
import { CommunitySection } from "@/components/layout/sections/community";
import FeaturesSection from "@/components/layout/sections/features";
import { setRequestLocale } from "next-intl/server";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SponsorsSection /> */}
      <ServiceSection />
      <FeaturesSection />

      {/* <TestimonialSection /> */}
      <ProjectSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
