import BaseSection from "@/components/BaseSection";
import FeatureGallery from "@/components/FeatureGallery";
import HeroSection from "@/components/HeroSection";
import { BASE_SECTION } from "@/constants";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <main className="container mx-auto">
      <HeroSection />

      {BASE_SECTION && BASE_SECTION[0] && (
        <BaseSection
          imageUrl={BASE_SECTION[0].imageUrl}
          title={BASE_SECTION[0].title}
          overTitle={BASE_SECTION[0].overTitle}
          reversed={BASE_SECTION[0].reversed || false}
        >
          {BASE_SECTION[0].description}
        </BaseSection>
      )}

      {BASE_SECTION && BASE_SECTION[1] && (
        <BaseSection
          imageUrl={BASE_SECTION[1].imageUrl}
          title={BASE_SECTION[1].title}
          overTitle={BASE_SECTION[1].overTitle}
          reversed={BASE_SECTION[1].reversed || false}
        >
          {BASE_SECTION[1].description}
        </BaseSection>
      )}

      <FeatureGallery />
    </main>
  );
}
