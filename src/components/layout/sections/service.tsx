"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { serviceList } from "@/constants";
import { icons } from "lucide-react";
import { motion } from "motion/react";
import { MotionSection } from "@/utils/motion-div";

const ServiceSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
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
          Services
        </h2>

        <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
          What Makes Us Different
        </h2>

        <h3 className="mx-auto mb-8 text-xl text-center md:w-1/2 text-muted-foreground">
          At WannaDev, we deliver tailored, innovative solutions with a
          client-first approach, global expertise, and a commitment to quality,
          offering end-to-end support for your success.
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceList.map(({ icon, title, description }) => (
            <div key={title}>
              <Card className="h-full border-0 shadow-none bg-background">
                <CardHeader className="flex items-center justify-center text-center">
                  <div className="p-2 mb-4 rounded-full bg-primary/20 ring-8 ring-primary/10">
                    <Icon
                      name={icon as keyof typeof icons}
                      size={24}
                      color="hsl(var(--primary))"
                      className="text-primary"
                    />
                  </div>

                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="text-center text-muted-foreground">
                  {description}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </MotionSection>
    </section>
  );
};

export default ServiceSection;
