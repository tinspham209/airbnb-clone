"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import Container from "../components/container";
import Heading from "../components/heading";
import ListingCard from "../components/listings/card";
import { ROUTE } from "../api/constant";

interface PropertiesClientProps {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
	listings,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = useCallback(
		(id: string) => {
			setDeletingId(id);
			setIsLoading(true);

			axios
				.delete(`${ROUTE.listings}/${id}`)
				.then(() => {
					toast.success("Listing deleted");
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error);
					setIsLoading(false);
				})
				.finally(() => {
					setDeletingId("");
					setIsLoading(false);
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading title="Properties" subTitle="List of your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing: any) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onDelete}
						disabled={deletingId === listing.id}
						actionLabel="Delete property"
						currentUser={currentUser}
						isLoading={isLoading}
					/>
				))}
			</div>
		</Container>
	);
};

export default PropertiesClient;
