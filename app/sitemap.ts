import { getListings } from "./actions";

export const DOMAIN_PRODUCT = "https://airbnbclone.tinspham.dev";

export default async function sitemap() {
	const listings = await getListings({});

	const siteMapListingsRoute = listings.map((list) => ({
		url: `${DOMAIN_PRODUCT}/listings/${list.id}`,
		lastModified: new Date(),
	}));
	const routes = [
		"/listings",
		"/favorites",
		"/trips",
		"/reservations",
		"/properties",
	];

	const siteMapRoutes = routes.map((route) => ({
		url: `${DOMAIN_PRODUCT}${route}`,
		lastModified: new Date(),
	}));

	return [...siteMapRoutes, ...siteMapListingsRoute];
}
