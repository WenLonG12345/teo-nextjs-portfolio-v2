"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	FaGithub,
	FaLinkedin,
	FaMedium,
	FaStackOverflow,
} from "react-icons/fa";
import { LuCheckCheck, LuMail, LuSend } from "react-icons/lu";
import { SiGmail } from "react-icons/si";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

const SOCIAL_ICONS: Record<
	string,
	{ icon: React.ReactNode; colorClass: string }
> = {
	Github: { icon: <FaGithub size={15} />, colorClass: "text-foreground" },
	Linkedin: { icon: <FaLinkedin size={15} />, colorClass: "text-[#0e76a8]" },
	StackOverflow: {
		icon: <FaStackOverflow size={15} />,
		colorClass: "text-[#f48024]",
	},
	Medium: { icon: <FaMedium size={15} />, colorClass: "text-foreground" },
	Gmail: { icon: <SiGmail size={15} />, colorClass: "text-[#ea4335]" },
};

const formSchema = z.object({
	firstName: z.string().min(2).max(255),
	lastName: z.string().min(2).max(255),
	email: z.string().email(),
	subject: z.string().min(2).max(255),
	message: z.string(),
});

const ContactClient = () => {
	const t = useTranslations();
	const [isSent, setIsSent] = useState(false);

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
		setIsSent(true);
		form.reset();
	}

	return (
		<div className="container py-16">
			<div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl -z-10" />

			{/* Section header */}
			<MotionSection
				animationProps={{
					initial: { opacity: 0, y: 30 },
					whileInView: { opacity: 1, y: 0 },
					transition: { duration: 0.5 },
					className: "mb-12 text-center",
				}}
			>
				<div className="inline-flex items-center gap-2 mb-3 md:hidden">
					<div className="w-8 h-px bg-primary/40" />
					<span className="text-sm font-medium tracking-widest uppercase text-primary">
						{t("contact.badge")}
					</span>
					<div className="w-8 h-px bg-primary/40" />
				</div>
				<h2 className="text-3xl font-bold md:text-4xl">{t("contact.title")}</h2>
			</MotionSection>

			<div className="grid grid-cols-1 gap-10 mx-auto lg:grid-cols-2 lg:max-w-screen-xl">
				{/* Left: info + socials */}
				<MotionSection
					animationProps={{
						initial: { opacity: 0, x: -30 },
						whileInView: { opacity: 1, x: 0 },
						transition: { duration: 0.5, delay: 0.1 },
						className: "flex flex-col",
					}}
				>
					<div className="space-y-6">
						<p className="leading-relaxed text-muted-foreground">
							{t("contact.description_1")}
						</p>
						<p className="leading-relaxed text-muted-foreground">
							{t("contact.description_2")}
						</p>

						{/* Email info card */}
						<div className="flex items-center gap-4 p-4 border rounded-2xl border-border bg-card">
							<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
								<LuMail size={18} className="text-primary" />
							</div>
							<div>
								<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
									Email
								</p>
								<p className="text-sm font-medium">
									{SITE_CONFIG.contact.email}
								</p>
							</div>
						</div>

						{/* Social links */}
						<div>
							<p className="mb-3 text-xs font-medium tracking-wider uppercase text-muted-foreground">
								Find me on
							</p>
							<div className="flex flex-wrap gap-2">
								{SITE_CONFIG.footer.accounts.map((acc) => {
									const social = SOCIAL_ICONS[acc.name];
									if (!social) return null;
									return (
										<Link
											key={acc.name}
											href={acc.url}
											target="_blank"
											aria-label={acc.name}
										>
											<Button
												variant="outline"
												size="sm"
												className={`gap-2 h-9 px-3 rounded-xl cursor-pointer hover:border-primary/40 transition-colors ${social.colorClass}`}
											>
												{social.icon}
												<span className="text-xs font-medium text-foreground">
													{acc.name}
												</span>
											</Button>
										</Link>
									);
								})}
							</div>
						</div>
					</div>
				</MotionSection>

				{/* Right: form */}
				<MotionSection
					animationProps={{
						initial: { opacity: 0, x: 30 },
						whileInView: { opacity: 1, x: 0 },
						transition: { duration: 0.5, delay: 0.2 },
					}}
				>
					<div className="p-6 border rounded-2xl border-border bg-card sm:p-8">
						{isSent ? (
							<MotionDiv
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4 }}
								className="flex flex-col items-center gap-4 py-12 text-center"
							>
								<div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full dark:bg-green-900/30">
									<LuCheckCheck size={32} className="text-green-500" />
								</div>
								<h3 className="text-xl font-semibold">
									{t("contact.sent_success_title")}
								</h3>
								<p className="max-w-xs text-sm text-muted-foreground">
									{t("contact.sent_success_desc")}
								</p>
								<Button
									variant="outline"
									onClick={() => setIsSent(false)}
									className="mt-2 rounded-xl"
								>
									{t("contact.send_another")}
								</Button>
							</MotionDiv>
						) : (
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="grid gap-4"
								>
									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="firstName"
											render={({ field }) => (
												<FormItem>
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
												<FormItem>
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

									<Button className="gap-2 mt-2">
										<LuSend size={15} />
										{t("contact.send_message")}
									</Button>
								</form>
							</Form>
						)}
					</div>
				</MotionSection>
			</div>
		</div>
	);
};

export default ContactClient;
