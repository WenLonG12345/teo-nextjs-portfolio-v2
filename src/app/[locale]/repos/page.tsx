import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import ReposClient from "./Repos";
import { getGithubRepos } from "@/utils/api";

const ReposPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["repos"],
    queryFn: () => getGithubRepos(process.env.GITHUB_USERNAME || ""),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ReposClient />
    </HydrationBoundary>
  );
};

export default ReposPage;
