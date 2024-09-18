import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Web and Mobile Development",
    description:
      "Our team builds robust web and mobile applications, leveraging the latest technologies to ensure functionality, speed, and security.",
  },
  {
    icon: "BadgeCheck",
    title: "E-commerce Solutions",
    description:
      "From product listing management to payment gateway integration, we ensure your e-commerce business is set for seamless online shopping experiences.",
  },
  {
    icon: "Goal",
    title: "Content Management Systems (CMS)",
    description:
      "We create user-friendly systems that allow you to update, manage, and organize your digital content without needing technical expertise.",
  },
  {
    icon: "PictureInPicture",
    title: "API Development & Integration",
    description:
      "Our API development services ensure smooth communication between your applications and external services.",
  },
  {
    icon: "MousePointerClick",
    title: "DevOps & Continuous Integration",
    description:
      "We implement continuous integration, automated testing, and streamlined workflows to ensure quick, reliable releases of your software products.",
  },
  {
    icon: "Newspaper",
    title: "Maintenance & Support",
    description:
      "We provide ongoing support and maintenance services to ensure your website or app stays up to date, secure, and performing optimally.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full border-0 shadow-none bg-background">
              <CardHeader className="flex items-center justify-center">
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
    </section>
  );
};
