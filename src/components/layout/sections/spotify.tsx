'use client';

import React from 'react';
import { SiSpotify } from "react-icons/si";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyNowPlaying } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SpotifySection = () => {
  const spotifyQuery = useQuery({
    queryKey: ["spotify"],
    queryFn: getSpotifyNowPlaying,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  const song = spotifyQuery?.data;
  return (
    <Card className="flex flex-col items-center mt-5 transition-all delay-75 md:items-start bg-muted/50 dark:bg-card hover:bg-background group/number">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <SiSpotify color="#1ED760" className="rotating" />
        <div>Spotify</div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center gap-5 md:flex-row">
          {song?.isPlaying ? (
            <Image
              src={song?.albumImageUrl}
              alt={song?.album}
              width={70}
              height={70}
            />
          ) : (
            <SiSpotify size={70} color={"#1ED760"} />
          )}

          <div className="flex flex-col items-center gap-2 md:items-start">
            <CardTitle>
              {song?.isPlaying ? song?.title : "Not Listening"}
            </CardTitle>
            <div className="text-muted-foreground">
              {song?.isPlaying ? song?.artist : "Spotify"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SpotifySection