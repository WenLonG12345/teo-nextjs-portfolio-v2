import React from "react";
import { EDUCATION_LIST } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { MotionDiv, MotionSection } from "@/utils/motion-div";
import { useTranslations } from "next-intl";
import Image from "next/image";

const EducationTabs = () => {
  const t = useTranslations();
  return (
    <>
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
          {t("about.title_education")}
        </h2>

        <h3 className="mx-auto text-base md:text-xl text-center md:w-1/2 text-muted-foreground">
          {t("about.summary_education")}
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
        {EDUCATION_LIST.map((education) => (
          <MotionDiv
            whileHover={{ y: -5 }}
            className="h-full mb-3"
            key={education.title}
          >
            <Card className="hover:bg-muted">
              <CardHeader className="flex flex-col justify-between space-y-0 md:items-center md:flex-row gap-3">
                <div className="flex flex-row gap-3 items-center">
                  <div className="relative h-[70px] w-[70px]">
                    <Image
                      src={education.logo}
                      alt={education.alt}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-semibold">
                      {education.title}
                    </div>
                    <div className="text-muted-foreground">
                      {education.role}
                    </div>
                  </div>
                </div>

                <div className="items-start self-start text-muted-foreground">
                  {education.period}
                </div>
              </CardHeader>

              <CardFooter className="flex flex-row gap-1 flex-wrap">
                {education.skills?.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </CardFooter>
            </Card>
          </MotionDiv>
        ))}
      </MotionSection>
    </>
  );
};

export default EducationTabs;
