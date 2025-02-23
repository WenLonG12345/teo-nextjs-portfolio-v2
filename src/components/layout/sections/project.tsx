"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_LIST } from "@/constants";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

const ProjectSection = () => {
  const t = useTranslations();

  return (
    <section id="projects" className="container py-24 sm:py-32">
      <MotionSection
        animationProps={{
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
          },
          className: "mb-8 text-center",
        }}
      >
        <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
          {t("project.badge")}
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          {t("project.description_1")}
        </h2>
      </MotionSection>

      <Tabs
        defaultValue={Object.keys(PROJECT_LIST)[0]}
        className="relative w-[100%] lg:max-w-screen-xl mx-auto"
      >
        <div className="flex justify-center">
          <TabsList className="h-full p-2">
            {Object.entries(PROJECT_LIST).map(([category, projects]) => (
              <TabsTrigger key={category} value={category}>{`${t(
                category
              )}`}</TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.entries(PROJECT_LIST).map(([category, projects]) => (
          <TabsContent key={category} value={category} className="mt-5">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.name} href={project.link || ""}>
                  <MotionDiv whileHover={{ y: -5 }}>
                    <Card className="bg-muted/50 dark:bg-card hover:bg-muted">
                      <CardContent className="p-0">
                        <Image
                          src={project.imageUrl}
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
                                <div>{project.summary}</div>

                                <div className="flex flex-wrap gap-1">
                                  {project.tech?.map((stack) => (
                                    <Badge key={stack}>{stack}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </MotionDiv>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default ProjectSection;
