"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getMediumArticles } from "@/utils/api";
import { MotionDiv, MotionSection } from "@/utils/motion-div";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const ArticlesClient = () => {
  const t = useTranslations();
  const articlesQuery = useQuery({
    queryKey: ["articles"],
    queryFn: () => getMediumArticles(process.env.MEDIUM_USERNAME || ""),
  });

  const articles = articlesQuery.data;

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
        }}
      >
        <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
          {t("article.badge")}
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          {t("article.title")}
        </h2>

        <h3 className="mx-auto text-xl text-center md:w-1/2 text-muted-foreground">
          {t("article.description_1")}
        </h3>
        <h3 className="mx-auto mb-8 text-xl text-center md:w-1/2 text-muted-foreground">
          {t("article.description_2")}
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
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles?.map((article) => (
            <Link key={article.title} href={article.url} target="_blank">
              <MotionDiv whileHover={{ y: -5 }} className="h-full">
                <Card className="h-full hover:bg-muted">
                  <CardHeader className="flex flex-col p-0 space-y-0">
                    <div className="relative w-full h-[250px]">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>

                    <div className="flex flex-row items-center gap-2 px-6 py-3 font-semibold">
                      {article.title}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="break-words text-clip text-muted-foreground">
                      {article.description}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <div className="flex flex-row flex-wrap gap-x-1 gap-y-2">
                      {article.categories.map((category) => (
                        <Badge key={category} className="whitespace-nowrap">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </MotionDiv>
            </Link>
          ))}
        </section>
      </MotionSection>
    </div>
  );
};

export default ArticlesClient;
