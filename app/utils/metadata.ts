import { Metadata } from "next";
import { DOMAIN_PRODUCT } from "../sitemap";

type SafeMetaData = {
	title?: string;
	thumbnailUrl?: string;
	description?: string;
	url?: string;
};

export const getMetaData = ({
	title = "",
	thumbnailUrl = "./images/logo.png",
	description = "Airbnb your home",
	url = DOMAIN_PRODUCT,
}: SafeMetaData): Metadata => {
	return {
		title: `${title} | Airbnb`,
		description: description,

		twitter: {
			title: `${title} | Airbnb`,
			description: description,
			images: thumbnailUrl,
			card: "summary_large_image",
		},
		openGraph: {
			type: "website",
			url: url,
			title: `${title} | Airbnb`,
			description: description,
			images: thumbnailUrl,
		},
	};
};
