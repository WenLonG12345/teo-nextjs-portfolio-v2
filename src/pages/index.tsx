import BaseSection from "@/components/BaseSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="container mx-auto">
      <HeroSection />

      <BaseSection imageUrl="/hero.png" title="title1" overTitle="OVER TITLE 1">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem
          error incidunt a doloremque voluptatem porro inventore voluptate quo
          deleniti animi laboriosam.
        </p>
      </BaseSection>

      <BaseSection imageUrl="/hero.png" title="title1" overTitle="OVER TITLE 1" reversed>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem
          error incidunt a doloremque voluptatem porro inventore voluptate quo
          deleniti animi laboriosam.
        </p>
      </BaseSection>
    </main>
  );
}
