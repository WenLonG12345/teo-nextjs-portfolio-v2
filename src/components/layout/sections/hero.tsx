"use client";

import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { MotionSection } from "@/utils/motion-div";
import { Link } from "@/i18n/routing";
import { SITE_CONFIG } from "@/constants";
import { FaArrowDown } from "react-icons/fa";

const HeroSection = () => {
  const t = useTranslations();

  return (
    <section className="container w-full">
      <div className="grid gap-8 py-32 mx-auto place-items-center lg:max-w-screen-xl md:py-64">
        <div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />
        <div className="space-y-6 text-center">
          <MotionSection
            animationProps={{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              transition: {
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 10,
              },
            }}
          >
            <div className="max-w-screen-lg mx-auto text-4xl font-bold text-center md:text-6xl">
              <h1>
                {t("home.hero_1")}{" "}
                <span className="text-transparent px-2 bg-gradient-to-r from-[#6089CF] to-primary bg-clip-text">
                  Teo
                </span>
              </h1>
            </div>
          </MotionSection>

          <MotionSection
            animationProps={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: {
                delay: 0.2,
                duration: 1,
              },
            }}
          >
            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {t("home.hero_2")}
            </p>

            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {t("home.hero_3")}
            </p>

            <div className="mt-4 space-y-4 md:space-x-4">
              <Link href={SITE_CONFIG.resume.url} target="_blank">
                <Button className="w-5/6 h-full text-lg font-semibold md:w-1/4 group/arrow">
                  <i className="mr-2">{SITE_CONFIG.resume.icon}</i>
                  {t(`${SITE_CONFIG.resume.name}`)}
                  <FaArrowRightLong className="ml-2 transition-transform size-5 group-hover/arrow:translate-x-1" />
                </Button>
              </Link>

              <Link href={SITE_CONFIG.contact.url}>
                <Button
                  variant="secondary"
                  className="w-5/6 h-full mt-3 text-lg font-semibold md:mt-0 md:w-1/4"
                >
                  <i className="mr-2">{SITE_CONFIG.contact.icon}</i>
                  {t(`${SITE_CONFIG.contact.name}`)}
                </Button>
              </Link>

              <Link href={"#skills"} target="_self" className="hidden md:inline">
                <Button className="">
                  <FaArrowDown size={20} className="animate-bounce" />
                </Button>
              </Link>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
