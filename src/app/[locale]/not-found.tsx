"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const NotFoundPage = () => {
	const t = useTranslations();

	return (
		<div className="container flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 py-32">
			<div className="space-y-4">
				<div className="text-8xl font-bold text-primary leading-none">404</div>
				<h1 className="text-3xl font-semibold">Page Not Found</h1>
				<p className="text-muted-foreground max-w-md mx-auto">
					{t("notFound.description")}
				</p>
			</div>

			<div>
				<Link href="/">
					<Button size="lg" aria-label="Back to home">
						{t("notFound.back_home")}
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
