import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { all } from "lowlight";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import type { BlogPost, BlogPostMeta } from "@/constants/types";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPostMeta[] {
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(postsDirectory);

	const posts = fileNames
		.filter((name) => name.endsWith(".md"))
		.map((fileName) => {
			const slug = fileName.replace(/\.md$/, "");
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			const { data } = matter(fileContents);

			return {
				slug,
				title: data.title as string,
				date: data.date as string,
				description: data.description as string,
				tags: (data.tags as string[]) || [],
				coverImage: (data.coverImage as string) || "",
			};
		});

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.md`);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		const processedContent = await remark()
			.use(remarkGfm)
			.use(remarkRehype)
			.use(rehypeSlug)
			.use(rehypeHighlight, {
				languages: { ...all },
				aliases: { protobuf: ["proto"] },
			})
			.use(rehypeStringify)
			.process(content);

		const contentHtml = processedContent.toString();

		return {
			slug,
			title: data.title as string,
			date: data.date as string,
			description: data.description as string,
			tags: (data.tags as string[]) || [],
			coverImage: (data.coverImage as string) || "",
			content: contentHtml,
		};
	} catch {
		return null;
	}
}
