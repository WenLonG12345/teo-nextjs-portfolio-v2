"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { projectList } from "@/constants";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ProjectSection = () => {
  return (
    <section id="projects" className="container py-24 sm:py-32">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
          Projects
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          Project that we done previously
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            playOnInit: true,
            stopOnFocusIn: true,
          }),
        ]}
        className="relative w-[100%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {projectList.map((project) => (
            <CarouselItem
              key={project.name}
              className="h-full md:basis-1/2 lg:basis-1/3"
            >
              <Link href={project.url}>
                <Card className="bg-muted/50 dark:bg-card">
                  <CardContent className="p-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                      }}
                    />
                  </CardContent>

                  <CardHeader>
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-col">
                        <CardTitle className="text-lg">
                          {project.name}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex flex-col justify-between h-[150px]">
                            <div>{project.description}</div>

                            <div className="flex flex-wrap gap-1">
                              {project.techStack?.map((stack) => (
                                <Badge key={stack}>{stack}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProjectSection;
