"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getGithubRepos } from "@/utils/api";
import { MotionSection } from "@/utils/motion-div";
import { useQuery } from "@tanstack/react-query";
import { FiGithub } from "react-icons/fi";
import { BiStar, BiGitRepoForked } from "react-icons/bi";
import React from "react";
import Link from "next/link";

const ReposClient = () => {
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
          Repository
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          My GitHub Repositories
        </h2>

        <h3 className="mx-auto text-xl text-center md:w-1/2 text-muted-foreground">
          A list of my top featured GitHub repositories. 🔖
        </h3>
        <h3 className="mx-auto mb-8 text-xl text-center md:w-1/2 text-muted-foreground">
          {`Feel free to visit and don't forget to leave a star! ⭐`}
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
              <Card className="h-full hover:bg-muted">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
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
            </Link>
          ))}
        </section>
      </MotionSection>
    </div>
  );
};

export default ReposClient;
