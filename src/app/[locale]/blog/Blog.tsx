"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlogPostMeta } from "@/constants/types";
import { Link } from "@/i18n/routing";
import { getMediumArticles } from "@/utils/api";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

interface BlogClientProps {
	posts: BlogPostMeta[];
}

const BlogClient = ({ posts }: BlogClientProps) => {
	const t = useTranslations();

	const articlesQuery = useQuery({
		queryKey: ["articles"],
		queryFn: () =>
			getMediumArticles(process.env.NEXT_PUBLIC_MEDIUM_USERNAME || ""),
	});
	const articles = articlesQuery.data ?? [];

	return (
		<div className="container py-16">
			<div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />

			{/* ── Page Header ── */}
			<MotionSection
				animationProps={{
					initial: { opacity: 0, y: 50 },
					whileInView: { opacity: 1, y: 0 },
					transition: { duration: 0.5 },
				}}
			>
				<h2 className="block mb-2 text-lg tracking-wider text-center text-primary md:hidden">
					{t("blog.badge")}
				</h2>
				<h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
					{t("blog.title")}
				</h2>
				<p className="mx-auto mb-10 text-xl text-center md:w-1/2 text-muted-foreground">
					{t("blog.description_1")}
				</p>
			</MotionSection>

			{/* ── Tabs ── */}
			<MotionSection
				animationProps={{
					initial: { opacity: 0, y: 30 },
					whileInView: { opacity: 1, y: 0 },
					transition: { duration: 0.5, delay: 0.1 },
				}}
			>
				<Tabs defaultValue="blog" className="w-full">
					{/* Tab triggers */}
					<div className="flex justify-center mb-8">
						<TabsList className="h-auto gap-1 p-1">
							<TabsTrigger
								value="blog"
								className="flex flex-col items-center gap-0.5 px-6 py-2.5 data-[state=active]:text-primary"
							>
								<div className="flex items-center gap-1.5 font-semibold">
									{posts.length > 0 && (
										<span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none rounded-full bg-primary text-primary-foreground">
											{posts.length}
										</span>
									)}
									{t("blog.tab_label")}
								</div>
							</TabsTrigger>

							<TabsTrigger
								value="articles"
								className="flex flex-col items-center gap-0.5 px-6 py-2.5 data-[state=active]:text-primary"
							>
								<div className="flex items-center gap-1.5 font-semibold">
									{articles.length > 0 && (
										<span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none rounded-full bg-primary text-primary-foreground">
											{articles.length}
										</span>
									)}
									{t("article.tab_label")}
								</div>
							</TabsTrigger>
						</TabsList>
					</div>

					{/* ── Blog Posts Tab ── */}
					<TabsContent value="blog">
						{posts.length === 0 ? (
							<p className="py-16 text-center text-muted-foreground">
								{t("blog.empty")}
							</p>
						) : (
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{posts.map((post, index) => (
									<Link key={post.slug} href={`/blog/${post.slug}`}>
										<MotionDiv
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											whileHover={{ y: -5 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="h-full"
										>
											<Card className="h-full transition-colors hover:bg-muted">
												<CardHeader className="flex flex-col p-0 space-y-0">
													<div className="relative w-full h-[200px]">
														{post.coverImage ? (
															<Image
																src={post.coverImage}
																alt={post.title}
																fill
																className="object-cover rounded-t-lg"
															/>
														) : (
															<div className="flex items-center justify-center w-full h-full rounded-t-lg bg-primary/10">
																<span className="text-4xl font-bold select-none text-primary/30">
																	{post.title.charAt(0)}
																</span>
															</div>
														)}
													</div>
													<div className="flex flex-col gap-1 px-6 py-3">
														<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
															<CalendarIcon className="w-3 h-3 shrink-0" />
															<span>
																{dayjs(post.date).format("MMM D, YYYY")}
															</span>
														</div>
														<h3 className="font-semibold leading-snug line-clamp-2">
															{post.title}
														</h3>
													</div>
												</CardHeader>
												<CardContent>
													<p className="text-sm break-words text-clip text-muted-foreground line-clamp-3">
														{post.description}
													</p>
												</CardContent>
												<CardFooter>
													<div className="flex flex-row flex-wrap gap-x-1 gap-y-2">
														{post.tags.map((tag) => (
															<Badge key={tag} className="whitespace-nowrap">
																{tag}
															</Badge>
														))}
													</div>
												</CardFooter>
											</Card>
										</MotionDiv>
									</Link>
								))}
							</div>
						)}
					</TabsContent>

					{/* ── Medium Articles Tab ── */}
					<TabsContent value="articles">
						{articlesQuery.isLoading ? (
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={String(i)}
										className="rounded-lg bg-muted animate-pulse h-[380px]"
									/>
								))}
							</div>
						) : (
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{articles.map((article, index) => (
									<Link key={article.url} href={article.url} target="_blank">
										<MotionDiv
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											whileHover={{ y: -5 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="h-full"
										>
											<Card className="h-full transition-colors hover:bg-muted">
												<CardHeader className="flex flex-col p-0 space-y-0">
													<div className="relative w-full h-[200px]">
														<Image
															src={article.thumbnail ?? "/og_image.png"}
															alt={article.title}
															fill
															className="object-cover rounded-t-lg"
														/>
													</div>
													<div className="flex flex-row items-center gap-2 px-6 py-3 font-semibold">
														{article.title}
													</div>
												</CardHeader>
												<CardContent>
													<p className="break-words text-clip text-muted-foreground">
														{article.description}
													</p>
												</CardContent>
												<CardFooter>
													<div className="flex flex-row flex-wrap gap-x-1 gap-y-2">
														{article.categories.map((category) => (
															<Badge
																key={category}
																className="whitespace-nowrap"
															>
																{category}
															</Badge>
														))}
													</div>
												</CardFooter>
											</Card>
										</MotionDiv>
									</Link>
								))}
							</div>
						)}
					</TabsContent>
				</Tabs>
			</MotionSection>
		</div>
	);
};

export default BlogClient;
