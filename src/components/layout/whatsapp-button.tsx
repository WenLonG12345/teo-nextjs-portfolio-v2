"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG } from "@/constants";

const WhatsAppButton = () => {
	const t = useTranslations();

	return (
		<a
			href={SITE_CONFIG.contact.whatsapp}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={t("home.whatsapp")}
			className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full w-12 h-12 bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
		>
			<FaWhatsapp size={24} />
		</a>
	);
};

export default WhatsAppButton;
