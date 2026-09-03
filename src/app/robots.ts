import type { MetadataRoute } from "next";
import { METADATA } from "@/constants";

const BASE_URL = METADATA.url.replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}
