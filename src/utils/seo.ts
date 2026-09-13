import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

// localePrefix is "as-needed": en unprefixed, zh under /zh
export function localizedPath(locale: string, path: string) {
	return locale === routing.defaultLocale ? path || "/" : `/${locale}${path}`;
}

// per-page canonical + hreflang, resolved against metadataBase in the locale layout
export function localeAlternates(
	locale: string,
	path: string,
): NonNullable<Metadata["alternates"]> {
	return {
		canonical: localizedPath(locale, path),
		languages: {
			...Object.fromEntries(
				routing.locales.map((l) => [l, localizedPath(l, path)]),
			),
			"x-default": localizedPath(routing.defaultLocale, path),
		},
	};
}
