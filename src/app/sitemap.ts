import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/blog";

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPosts();

	const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `https://teowenlong.com/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	return [
		{
			url: "https://teowenlong.com",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://teowenlong.com/about",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://teowenlong.com/repos",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://teowenlong.com/articles",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://teowenlong.com/blog",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://teowenlong.com/contact",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		...blogPostEntries,
	];
}
