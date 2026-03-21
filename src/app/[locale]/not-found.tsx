"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { MotionDiv } from "@/utils/motion-div";

const NotFoundPage = () => {
	const t = useTranslations();

	return (
		<div className="container flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 py-32">
			<MotionDiv
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="space-y-4"
			>
				<div className="text-8xl font-bold text-primary leading-none">404</div>
				<h1 className="text-3xl font-semibold">Page Not Found</h1>
				<p className="text-muted-foreground max-w-md mx-auto">
					{t("notFound.description")}
				</p>
			</MotionDiv>

			<MotionDiv
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.4 }}
			>
				<Link href="/">
					<Button size="lg" aria-label="Back to home">
						{t("notFound.back_home")}
					</Button>
				</Link>
			</MotionDiv>
		</div>
	);
};

export default NotFoundPage;
