"use client";

import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import React from "react";
import CareerTabs from "./tabs/CareerTabs";
import EducationTabs from "./tabs/EducationTabs";

const AboutClient = () => {
  const t = useTranslations();
  return (
    <div className="container py-24 sm:py-32">
      <div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />

      <Tabs defaultValue="career">
        <div className="flex items-center justify-center mb-3">
          <TabsList>
            <TabsTrigger value="career">{t("about.title_career")}</TabsTrigger>
            <TabsTrigger value="education">
              {t("about.title_education")}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="career">
          <CareerTabs />
        </TabsContent>

        <TabsContent value="education">
          <EducationTabs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutClient;
