"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionSection } from "@/utils/motion-div";
import Link from "next/link";
import { SITE_CONFIG } from "@/constants";
import { SiSpotify } from "react-icons/si";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyNowPlaying } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HeroSection = () => {
  const t = useTranslations();
  const spotifyQuery = useQuery({
    queryKey: ["spotify"],
    queryFn: getSpotifyNowPlaying,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  const song = spotifyQuery?.data;

  return (
    <section className="container w-full">
      <div className="grid gap-8 py-32 mx-auto place-items-center lg:max-w-screen-xl md:py-56">
        <div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />
        <div className="space-y-6 text-center">
          <MotionSection
            animationProps={{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              transition: {
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 10,
              },
            }}
          >
            <div className="max-w-screen-lg mx-auto text-4xl font-bold text-center md:text-6xl">
              <h1>
                {t("home.hero_1")}{" "}
                <span className="text-transparent px-2 bg-gradient-to-r from-[#6089CF] to-primary bg-clip-text">
                  Teo
                </span>
              </h1>
            </div>
          </MotionSection>

          <MotionSection
            animationProps={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: {
                delay: 0.2,
                duration: 1,
              },
            }}
          >
            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              Frontend Engineer from Malaysia 🇲🇾
            </p>

            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              Focused on Web & Mobile Development (Android & iOS). Passionate
              about beautiful UI/UX and a Tech Writer on Medium. 🔥
            </p>

            <div className="mt-4 space-y-4 md:space-x-4">
              <Link href={SITE_CONFIG.resume.url} target="_blank">
                <Button className="w-5/6 h-full text-lg font-semibold md:w-1/4 group/arrow">
                  <i className="mr-2">{SITE_CONFIG.resume.icon}</i>
                  {SITE_CONFIG.resume.name}
                  <ArrowRight className="ml-2 transition-transform size-5 group-hover/arrow:translate-x-1" />
                </Button>
              </Link>

              <Link href={SITE_CONFIG.contact.url}>
                <Button
                  variant="secondary"
                  className="w-5/6 h-full mt-3 text-lg font-semibold md:mt-0 md:w-1/4"
                >
                  <i className="mr-2">{SITE_CONFIG.contact.icon}</i>
                  {SITE_CONFIG.contact.name}
                </Button>
              </Link>
            </div>

            {/* <Card className="flex flex-col items-center mt-5 transition-all delay-75 md:items-start bg-muted/50 dark:bg-card hover:bg-background group/number">
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
            </Card> */}
          </MotionSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
