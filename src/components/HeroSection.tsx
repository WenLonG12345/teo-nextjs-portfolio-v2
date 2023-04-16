import React from "react";
import HeroImage from "@/assets/hero.svg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="flex flex-col pt-16 pb-8 mx-5 md:flex-row md:pt-12 md:pb-24">
      <div className="flex items-center w-full md:w-1/2">
        <div className="max-w-2xl mb-8">
          <h1 className="text-3xl font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
            Join the Devolution
          </h1>
          <h1 className="text-3xl font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
            Build Better with WannaDev
          </h1>
          <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            Unlock your development potential with the expert services and
            powerful tools provided by WannaDev. Our team of experienced
            developers are here to help you achieve your goals and take your
            projects to the next level.
          </p>

          <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
            <button className="px-6 py-4 text-white rounded-md bg-primary_dark">Download for Free</button>
            <button className="px-6 py-4 border rounded-md border-primary_dark">View on Github</button>
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
