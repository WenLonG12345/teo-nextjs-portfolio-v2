import dayjs from "dayjs";
import { ArrowLeftIcon, CalendarIcon, TagIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getAllPosts, getPostBySlug } from "@/utils/blog";
import ShareButtons from "./ShareButtons";

interface BlogPostPageProps {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const post = await getPostBySlug(slug);
	const t = await getTranslations({ locale });

	if (!post) {
		return { title: t("notFound.description") };
	}

	return {
		title: post.title,
		description: post.description,
		icons: { icon: "/favicon.ico" },
		openGraph: {
			type: "article",
			title: post.title,
			url: `/blog/${slug}`,
			description: post.description,
			images: post.coverImage ? [post.coverImage] : ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: post.coverImage ? [post.coverImage] : ["/og_image.png"],
		},
	};
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="container py-24 sm:py-32">
			<div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl" />

			<div className="max-w-3xl mx-auto">
				<Link href="/blog">
					<Button
						variant="ghost"
						className="gap-2 mb-8 -ml-2 text-muted-foreground hover:text-foreground"
						aria-label="Back to blog"
					>
						<ArrowLeftIcon className="w-4 h-4" />
						Back to Blog
					</Button>
				</Link>

				<header className="mb-10">
					<div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
						<CalendarIcon className="w-4 h-4 shrink-0" />
						<span>{dayjs(post.date).format("MMMM D, YYYY")}</span>
					</div>

					<h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
						{post.title}
					</h1>

					<p className="mb-6 text-lg text-muted-foreground">
						{post.description}
					</p>

					<div className="flex flex-wrap gap-2 mb-4">
						{post.tags.map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className="flex items-center gap-1"
							>
								<TagIcon className="w-3 h-3" />
								{tag}
							</Badge>
						))}
					</div>

					<ShareButtons title={post.title} slug={post.slug} />

					<div className="mt-8 border-b border-border" />
				</header>

				{post.coverImage && (
					<div className="relative w-full h-[280px] md:h-[380px] mb-10 rounded-lg overflow-hidden">
						<Image
							src={post.coverImage}
							alt={post.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				)}

				<article
					className="prose"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted local markdown content
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>

				<div className="mt-12 pt-8 border-t border-border">
					<ShareButtons title={post.title} slug={post.slug} />
				</div>
			</div>
		</div>
	);
};

export default BlogPostPage;
