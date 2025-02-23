"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MotionSection } from "@/utils/motion-div";
import { SITE_CONFIG } from "@/constants";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  subject: z.string().min(2).max(255),
  message: z.string(),
});

const ContactClient = () => {
  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "Project Inquiry",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, email, subject, message } = values;
    const mailToLink = `mailto:${SITE_CONFIG.contact.email}?subject=${subject}&body=Hello I am ${firstName} ${lastName}, my Email is ${email}. %0D%0A${message}`;
    window.location.href = mailToLink;
  }

  return (
    <div className="container py-24 sm:py-32">
      <div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <MotionSection
          animationProps={{
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: {
              duration: 0.5,
            },
          }}
        >
          <div className="mb-4">
            <h2 className="mb-2 text-lg tracking-wider text-primary">
              {t("contact.badge")}
            </h2>

            <h2 className="text-3xl font-bold md:text-4xl">
              {t("contact.title")}
            </h2>
          </div>
          <div className="mb-2 text-muted-foreground lg:w-5/6">
            {t("contact.description_1")}
          </div>

          <div className="mb-8 text-muted-foreground lg:w-5/6">
            {t("contact.description_2")}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              {SITE_CONFIG.footer.accounts.map((acc) => (
                <Link key={acc?.name} href={acc?.url}>
                  <Button variant="outline" size="icon" className="border-none">
                    {acc?.icon}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
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
          <Card>
            <CardHeader className="text-2xl text-primary" />
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid w-full gap-4"
                >
                  <div className="flex flex-col md:!flex-row gap-8">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>{t("contact.first_name")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("contact.first_name")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>{t("contact.last_name")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("contact.last_name")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.email")}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("contact.email")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.subject")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Project Inquiry">
                                {t("contact.project_inquiry")}
                              </SelectItem>
                              <SelectItem value="Web Development">
                                {t("contact.web_development")}
                              </SelectItem>
                              <SelectItem value="Mobile Development">
                                {t("contact.mobile_development")}
                              </SelectItem>
                              <SelectItem value="SEO and Website Ranking">
                                {t("contact.seo_and_website_ranking")}
                              </SelectItem>
                              <SelectItem value="API Development">
                                {t("contact.api_development")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.message")}</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder="Your message..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button className="mt-4">{t("contact.send_message")}</Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter />
          </Card>
        </MotionSection>
      </section>
    </div>
  );
};

export default ContactClient;
