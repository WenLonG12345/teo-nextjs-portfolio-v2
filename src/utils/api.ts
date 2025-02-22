import {
  IGitRepo,
  IMediumArticleRes,
  ISpotifySongRes,
} from "@/constants/types";
import dayjs from "dayjs";
import { shortenDescription } from "./shortenDescription";

export const getSpotifyNowPlaying = async (): Promise<ISpotifySongRes> => {
  return fetch("/api/spotify").then((res) => res.json());
};

export const getGithubRepos = async (username: string): Promise<IGitRepo[]> => {
  try {
    const fetchRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`
    );

    const repos = (await fetchRes.json()) as IGitRepo[];

    if (repos?.length === 0 || !repos) return [];

    let result = repos
      ?.sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMediumArticles = async (username: string) => {
  try {
    const fetchRes = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    );

    const res = (await fetchRes.json()) as IMediumArticleRes;

    let { items } = res || {};

    const article = items?.map(
      ({ title, thumbnail, guid, pubDate, description, categories }) => {
        return {
          title: title,
          thumbnail: description
            ?.toString()
            .match(/<img[^>]+src="([^">]+)"/)![1],
          url: guid,
          date: dayjs(pubDate).format("YYYY - MMM DD"),
          description: shortenDescription(description),
          categories: categories,
        };
      }
    );

    return article;
  } catch (err) {
    console.error(err);
    return [];
  }
};
