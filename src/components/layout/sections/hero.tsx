"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <section className="container w-full">
      <div className="grid gap-8 py-32 mx-auto place-items-center lg:max-w-screen-xl md:py-56">
        <div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />
        <div className="space-y-6 text-center">
          <motion.div
            className="max-w-screen-lg mx-auto text-4xl font-bold text-center md:text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <h1>Join the Devolution</h1>
            <h1>
              Build better with
              <span className="text-transparent px-2 bg-gradient-to-r from-[#6089CF] to-primary bg-clip-text">
                WannaDev
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 1,
            }}
          >
            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {`Unlock your development potential with the expert services and powerful tools provided by WannaDev.`}
            </p>

            <div className="mt-4 space-y-4 md:space-x-4">
              <Button className="w-5/6 h-full text-lg font-bold md:w-1/4 group/arrow">
                Get Started
                <ArrowRight className="ml-2 transition-transform size-5 group-hover/arrow:translate-x-1" />
              </Button>

              <Button
                variant="secondary"
                className="w-5/6 h-full text-lg font-bold md:w-1/4"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>

        {/* <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={
              theme === "light"
                ? "/hero-image-light.jpeg"
                : "/hero-image-dark.jpeg"
            }
            alt="dashboard"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 rounded-lg md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
