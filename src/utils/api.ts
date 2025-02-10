import { ISpotifySongRes } from "@/constants/types";

export const getSpotifyNowPlaying = async (): Promise<ISpotifySongRes> => {
  return fetch("/api/spotify").then((res) => res.json());
};
