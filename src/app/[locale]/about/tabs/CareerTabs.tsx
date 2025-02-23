import React from "react";
import { CAREER_LIST } from "@/constants";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MotionDiv, MotionSection } from "@/utils/motion-div";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const CareerTabs = () => {
  const t = useTranslations();
  const locale = useLocale();

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
          {t("about.title_career")}
        </h2>

        <h3 className="mx-auto text-base text-center md:text-xl md:w-1/2 text-muted-foreground">
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
              <CardHeader>
                <div className="flex flex-col justify-between gap-3 space-y-0 md:items-center md:flex-row">
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      src={career.logo}
                      alt={career.alt}
                      width={70}
                      height={70}
                      className="object-cover rounded-full"
                    />
                    <div>
                      <div className="text-xl font-semibold">
                        {career.title}
                      </div>
                      <div className="text-muted-foreground">{career.role}</div>
                    </div>
                  </div>

                  <div className="items-start self-start text-muted-foreground">
                    {career.period}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="ml-5 text-sm">
                  {(locale === "en"
                    ? career.job_scope
                    : career.job_scope_zh
                  )?.map((job) => (
                    <li key={job}>{job}</li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-row flex-wrap gap-1">
                {career.skills?.map((skill) => (
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

export default CareerTabs;
