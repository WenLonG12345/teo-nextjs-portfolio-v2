import React from "react";
import { Marquee } from "@devnomic/marquee";
import { useTranslations } from "next-intl";
import { MotionSection } from "@/utils/motion-div";
import "@devnomic/marquee/dist/index.css";
import { SKILL_LIST } from "@/constants";
import Image from "next/image";

const SkillSetSection = () => {
  const t = useTranslations();
  return (
    <section id="skills" className="container pt-24 sm:pt-32">
      <MotionSection
        animationProps={{
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
          },
          className: "mb-8 text-center",
        }}
      >
        <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
          {t("skills.badge")}
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          {t("skills.title")}
        </h2>
      </MotionSection>

      <Marquee fade={true}>
        {SKILL_LIST.slice(0, Math.ceil(SKILL_LIST.length / 2)).map((skill) => (
          <div
            className="flex items-center justify-center p-4 border rounded-lg shadow-md bg-card text-card-foreground border-secondary"
            key={skill.name}
          >
            <Image src={skill.icon} width={30} height={30} alt={skill.name} />
            <span className="ml-2 text-lg font-semibold">{skill.name}</span>
          </div>
        ))}
      </Marquee>

      <div className="mt-5"/>

      <Marquee fade={true} reverse={true}>
        {SKILL_LIST.slice(Math.ceil(SKILL_LIST.length / 2)).map((skill) => (
          <div
            className="flex items-center justify-center p-4 border rounded-lg shadow-md bg-card text-card-foreground border-secondary"
            key={skill.name}
          >
            <Image src={skill.icon} width={30} height={30} alt={skill.name} />
            <span className="ml-2 text-lg font-semibold">{skill.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default SkillSetSection;
