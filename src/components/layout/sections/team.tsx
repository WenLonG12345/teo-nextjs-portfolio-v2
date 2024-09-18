import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
  name: string;
  url: string;
}
export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "/koh.jpeg",
      firstName: "Leong Chien",
      lastName: "Koh",
      positions: ["A passionate Golang backend developer. Learning from mistake, is another way to success⁠"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/leong-chien-koh/",
        },
        {
          name: "Github",
          url: "https://github.com/LcKoh0830",
        },
      ],
    },
    {
      imageUrl: "/teo.png",
      firstName: "Wen Long",
      lastName: "Teo",
      positions: [
        "A ReactJS/React Native developer, Android developer, UI / UX designer and tech enthusiast.",
      ],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/teo-wen-long-19960316/",
        },
        {
          name: "Github",
          url: "https://github.com/WenLonG12345",
        },
        {
          name: "Personal",
          url: "https://teowenlong.com/",
        },
      ],
    },
  ];
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
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
          Team
        </h2>

        <h2 className="text-3xl font-bold text-center md:text-4xl">
          The Company Dream Team
        </h2>
      </div>

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
    </section>
  );
};
