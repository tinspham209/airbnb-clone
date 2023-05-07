import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import ClientOnly from "../components/clientOnly";
import EmptyState from "../components/empty";
import FavoritesClient from "./favoritesClient";

const ListingPage = async () => {
	const listings = await getFavoriteListings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No favorites found"
					subTitle="Looks like you have no favorite listings."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default ListingPage;
