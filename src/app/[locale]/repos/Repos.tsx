"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { LuExternalLink, LuGitFork, LuGithub, LuStar } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import type { IGitRepo } from "@/constants/types";
import { Link } from "@/i18n/routing";
import { getGithubRepos } from "@/utils/api";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

const LANGUAGE_COLORS: Record<string, string> = {
	TypeScript: "#3178c6",
	JavaScript: "#f1e05a",
	Python: "#3572A5",
	Kotlin: "#A97BFF",
	Java: "#b07219",
	Swift: "#F05138",
	Dart: "#00B4AB",
	Go: "#00ADD8",
	Rust: "#dea584",
	CSS: "#563d7c",
	HTML: "#e34c26",
	Shell: "#89e051",
	Ruby: "#701516",
	"C++": "#f34b7d",
	C: "#555555",
	"C#": "#178600",
	Vue: "#41b883",
};

const RepoCard = ({ repo, index }: { repo: IGitRepo; index: number }) => {
	const langColor = LANGUAGE_COLORS[repo.language] ?? "#8b949e";

	return (
		<MotionDiv
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.35, delay: index * 0.05 }}
		>
			<Link
				href={repo.clone_url}
				target="_blank"
				className="block h-full group"
			>
				<div className="flex flex-col h-full p-6 transition-all duration-300 border cursor-pointer rounded-2xl border-border bg-card hover:border-primary/40 hover:shadow-md">
					{/* Header */}
					<div className="flex items-start justify-between gap-3 mb-3">
						<div className="flex items-center gap-2.5 min-w-0">
							<LuGithub size={16} className="text-muted-foreground shrink-0" />
							<span className="text-base font-semibold truncate transition-colors group-hover:text-primary">
								{repo.name}
							</span>
						</div>
						<LuExternalLink
							size={14}
							className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
						/>
					</div>

					{/* Description */}
					<p className="flex-1 mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
						{repo.description || (
							<span className="italic opacity-50">No description</span>
						)}
					</p>

					{/* Footer */}
					<div className="flex items-center justify-between">
						{repo.language ? (
							<div className="flex items-center gap-1.5">
								<span
									className="w-2.5 h-2.5 rounded-full shrink-0"
									style={{ backgroundColor: langColor }}
								/>
								<span className="text-xs text-muted-foreground">
									{repo.language}
								</span>
							</div>
						) : (
							<div />
						)}

						<div className="flex items-center gap-3 text-xs text-muted-foreground">
							<div className="flex items-center gap-1">
								<LuStar size={12} />
								<span>{repo.stargazers_count}</span>
							</div>
							<div className="flex items-center gap-1">
								<LuGitFork size={12} />
								<span>{repo.forks_count}</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</MotionDiv>
	);
};

const RepoSkeleton = () => (
	<div className="p-6 border rounded-2xl border-border bg-card">
		<div className="flex items-center gap-2.5 mb-3">
			<Skeleton className="w-4 h-4 rounded" />
			<Skeleton className="w-40 h-4" />
		</div>
		<Skeleton className="w-full h-3 mb-2" />
		<Skeleton className="w-5/6 h-3 mb-2" />
		<Skeleton className="w-3/4 h-3 mb-6" />
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-1.5">
				<Skeleton className="w-2.5 h-2.5 rounded-full" />
				<Skeleton className="w-16 h-3" />
			</div>
			<div className="flex gap-3">
				<Skeleton className="w-8 h-3" />
				<Skeleton className="w-8 h-3" />
			</div>
		</div>
	</div>
);

const ReposClient = () => {
	const t = useTranslations();
	const reposQuery = useQuery({
		queryKey: ["repos"],
		queryFn: () => getGithubRepos(process.env.GITHUB_USERNAME || ""),
	});

	return (
		<div className="container py-16 ">
			<div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl -z-10" />

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
						{t("repo.badge")}
					</span>
					<div className="w-8 h-px bg-primary/40" />
				</div>

				<h2 className="mb-4 text-3xl font-bold md:text-4xl">
					{t("repo.title")}
				</h2>

				<p className="mx-auto text-base md:w-1/2 text-muted-foreground">
					{t("repo.description_1")}
				</p>
				<p className="mx-auto text-base md:w-1/2 text-muted-foreground">
					{t("repo.description_2")}
				</p>
			</MotionSection>

			<div className="grid grid-cols-1 gap-5 mx-auto md:grid-cols-2 lg:max-w-screen-xl">
				{reposQuery.isLoading
					? Array.from({ length: 9 }).map((_, i) => <RepoSkeleton key={i} />)
					: reposQuery.data?.map((repo, i) => (
							<RepoCard key={repo.name} repo={repo} index={i} />
						))}
			</div>
		</div>
	);
};

export default ReposClient;
