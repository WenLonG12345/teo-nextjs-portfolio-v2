import type { MetadataRoute } from "next";
import { METADATA } from "@/constants";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/utils/blog";

const BASE_URL = METADATA.url.replace(/\/+$/, "");

type Route = {
	path: string;
	lastModified: Date;
	changeFrequency: NonNullable<
		MetadataRoute.Sitemap[number]["changeFrequency"]
	>;
	priority: number;
};

// localePrefix is "as-needed", so the default locale is served without a prefix
function localizedUrl(locale: string, path: string) {
	const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
	return `${BASE_URL}${prefix}${path}`;
}

function localizedEntries(route: Route): MetadataRoute.Sitemap {
	const languages = Object.fromEntries([
		...routing.locales.map((locale) => [
			locale,
			localizedUrl(locale, route.path),
		]),
		["x-default", localizedUrl(routing.defaultLocale, route.path)],
	]);

	return routing.locales.map((locale) => ({
		url: localizedUrl(locale, route.path),
		lastModified: route.lastModified,
		changeFrequency: route.changeFrequency,
		priority: route.priority,
		alternates: { languages },
	}));
}

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticRoutes: Route[] = [
		{ path: "", lastModified: now, changeFrequency: "monthly", priority: 1 },
		{
			path: "/services",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			path: "/work",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			path: "/about",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			path: "/blog",
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			path: "/contact",
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];

	const postRoutes: Route[] = getAllPosts().map((post) => {
		const date = new Date(post.date);

		return {
			path: `/blog/${post.slug}`,
			lastModified: Number.isNaN(date.getTime()) ? now : date,
			changeFrequency: "monthly",
			priority: 0.6,
		};
	});

	return [...staticRoutes, ...postRoutes].flatMap(localizedEntries);
}
