import BaseSection from "@/components/BaseSection";
import FeatureGallery from "@/components/FeatureGallery";
import HeroSection from "@/components/HeroSection";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <main className="container mx-auto">
      <HeroSection />

      <BaseSection imageUrl="/hero.png" title="This is Title 1" overTitle="OVER TITLE 1">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem
          error incidunt a doloremque voluptatem porro inventore voluptate quo
          deleniti animi laboriosam.
        </p>
      </BaseSection>

      <BaseSection
        imageUrl="/hero.png"
        title="This is Title 2"
        overTitle="OVER TITLE 2"
        reversed
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem
          error incidunt a doloremque voluptatem porro inventore voluptate quo
          deleniti animi laboriosam.
        </p>
      </BaseSection>

      <FeatureGallery />
    </main>
  );
}
