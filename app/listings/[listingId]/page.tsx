import { getListings, getReservations } from "@/app/actions";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/clientOnly";
import EmptyState from "@/app/components/empty";
import ListingClient from "./listingClient";
import { Metadata } from "next";
import { DOMAIN_PRODUCT } from "@/app/sitemap";
import { getMetaData } from "@/app/utils/metadata";

export const dynamic = "auto";

export async function generateStaticParams() {
	const listings = await getListings({});

	return listings!.map((listing) => {
		return {
			listingId: listing.id,
		};
	});
}

export const revalidate = 120;

export async function generateMetadata({
	params,
}: {
	params: IParams;
}): Promise<Metadata> {
	const listing = await getListingById(params);
	if (listing) {
		const metaData = getMetaData({
			title: listing.title || "",
			thumbnailUrl: listing.imageSrc || "",
			description: listing.description || "",
			url: `${DOMAIN_PRODUCT}/listing/${listing.id}`,
		});
		return metaData;
	}
	return getMetaData({});
}

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();
	const reservations = await getReservations(params);

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient
				listing={listing}
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ListingPage;
