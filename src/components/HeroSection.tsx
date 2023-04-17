import React from "react";
import HeroImage from "@/assets/hero.svg";
import Image from "next/image";
import { HERO_SECTION } from "@/constants";

const HeroSection = () => {
  if (!HERO_SECTION) return <></>;

  return (
    <section className="flex flex-col pt-16 pb-8 mx-5 md:flex-row md:pt-12 md:pb-24">
      <div className="flex items-center w-full md:w-1/2">
        <div className="max-w-2xl mb-8">
          <h1 className="text-3xl font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
            {HERO_SECTION.overTitle}
          </h1>
          <h1 className="text-3xl font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
            {HERO_SECTION.title}
          </h1>
          <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            {HERO_SECTION.description}
          </p>

          <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
            <button className="px-6 py-4 text-white rounded-md bg-primary_dark">
              {HERO_SECTION.ctaButton_1}
            </button>
            <button className="px-6 py-4 border rounded-md border-primary_dark">
              {HERO_SECTION.ctaButton_2}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image src="/hero.png" alt="hero" width="600" height="600" />
      </div>
    </section>
  );
};

export default HeroSection;
