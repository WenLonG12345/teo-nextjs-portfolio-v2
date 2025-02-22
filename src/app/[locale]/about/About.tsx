"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { CAREER_LIST } from "@/constants";
import { MotionDiv, MotionSection } from "@/utils/motion-div";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const AboutClient = () => {
  const t = useTranslations();
  return (
    <div className="container py-24 sm:py-32">
      <div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />

      <MotionSection
        animationProps={{
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
          },
          className: "mb-5",
        }}
      >
        <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
          {t("about.badge")}
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          {t("about.title_career")}
        </h2>

        <h3 className="mx-auto text-xl text-center md:w-1/2 text-muted-foreground">
          {t("about.summary_career")}
        </h3>
      </MotionSection>

      <MotionSection
        animationProps={{
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
          },
        }}
      >
        {CAREER_LIST.map((career) => (
          <MotionDiv
            whileHover={{ y: -5 }}
            className="h-full mb-3"
            key={career.title}
          >
            <Card className="hover:bg-muted">
              <CardHeader className="flex flex-col justify-between space-y-0 md:items-center md:flex-row">
                <div className="flex flex-row gap-3 items-center">
                  <div className="relative h-[70px] w-[70px]">
                    <Image
                      src={career.logo}
                      alt={career.alt}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-semibold">{career.title}</div>
                    <div className="text-muted-foreground">{career.role}</div>
                  </div>
                </div>

                <div className="items-start self-start">{career.period}</div>
              </CardHeader>

              <CardFooter className="flex flex-row gap-1 flex-wrap">
                {career.skills?.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </CardFooter>
            </Card>
          </MotionDiv>
        ))}
      </MotionSection>
    </div>
  );
};

export default AboutClient;
