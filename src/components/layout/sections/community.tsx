import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CommunitySection = () => {
  return (
    <section id="community" className="py-12 ">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="flex flex-col items-center justify-center text-center border-none shadow-none bg-background">
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-4xl font-bold md:text-5xl">
                {/* <DiscordIcon /> */}
                <div>
                  Ready to join this
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    Community?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              Join our vibrant Discord community! Connect, share, and grow with
              like-minded enthusiasts. Click to dive in! 🚀
            </CardContent>

            <CardFooter>
              <Button asChild>
                <a href="https://discord.com/" target="_blank">
                  Join Discord
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
