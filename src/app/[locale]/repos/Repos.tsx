"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getGithubRepos } from "@/utils/api";
import { MotionDiv, MotionSection } from "@/utils/motion-div";
import { useQuery } from "@tanstack/react-query";
import { FiGithub } from "react-icons/fi";
import { BiStar, BiGitRepoForked } from "react-icons/bi";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ReposClient = () => {
  const t = useTranslations();
  const reposQuery = useQuery({
    queryKey: ["repos"],
    queryFn: () => getGithubRepos(process.env.GITHUB_USERNAME || ""),
  });

  const repos = reposQuery.data;

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
          {t("repo.badge")}
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          {t("repo.title")}
        </h2>

        <h3 className="mx-auto text-xl text-center md:w-1/2 text-muted-foreground">
          {t("repo.description_1")}
        </h3>
        <h3 className="mx-auto mb-8 text-xl text-center md:w-1/2 text-muted-foreground">
          {t("repo.description_2")}
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
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {repos?.map((repo) => (
            <Link key={repo.name} href={repo.clone_url} target="_blank">
              <MotionDiv whileHover={{ y: -5 }} className="h-full">
                <Card className="h-full hover:bg-muted">
                  <CardHeader className="flex flex-col justify-between space-y-0 md:items-center md:flex-row">
                    <div className="flex flex-row items-center gap-2">
                      <FiGithub />
                      {repo.name}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-row items-center gap-1">
                        <BiStar />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <BiGitRepoForked />
                        {repo.forks_count}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground">{repo.description}</p>
                  </CardContent>

                  <CardFooter>
                    {repo.language && <Badge>{repo.language}</Badge>}
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

export default ReposClient;
