'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { teamList } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";

export const TeamSection = () => {
  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <FaLinkedin />;
      case "Github":
        return <FaGithub />;
      case "Personal":
        return <FaLink />;
    }
  };

  return (
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
            Team
          </h2>

          <h2 className="text-3xl font-bold text-center md:text-4xl">
            The Company Dream Team
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {teamList.map(
            (
              { imageUrl, firstName, lastName, positions, socialNetworks },
              index
            ) => (
              <Card
                key={index}
                className="flex flex-col h-full overflow-hidden bg-muted/60 dark:bg-card group/hoverimg"
              >
                <CardHeader className="gap-0 p-0">
                  <div className="h-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt=""
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover transition-all duration-200 ease-linear size-full group-hover/hoverimg:scale-[1.05] cursor-pointer"
                    />
                  </div>
                  <CardTitle className="px-6 py-6 pb-4">
                    {firstName}
                    <span className="ml-2 text-primary">{lastName}</span>
                  </CardTitle>
                </CardHeader>
                {positions.map((position, index) => (
                  <CardContent
                    key={index}
                    className={`pb-0 text-muted-foreground ${
                      index === positions.length - 1 && "pb-6"
                    }`}
                  >
                    {position}
                    {index < positions.length - 1 && <span>,</span>}
                  </CardContent>
                ))}

                <CardFooter className="mt-auto space-x-4">
                  {socialNetworks.map(({ name, url }, index) => (
                    <Link
                      key={index}
                      href={url}
                      target="_blank"
                      className="transition-all cursor-pointer hover:text-primary"
                    >
                      {socialIcon(name)}
                    </Link>
                  ))}
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
};
