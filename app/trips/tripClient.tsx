"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";
import Container from "../components/container";
import Heading from "../components/heading";
import ListingCard from "../components/listings/card";
import { ROUTE } from "../api/constant";

interface TripsClientProps {
	reservations: SafeReservation[];
	currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
	reservations,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const onCancel = React.useCallback(
		(id: string) => {
			setDeletingId(id);
			setIsLoading(true);

			axios
				.delete(`${ROUTE.reservations}/${id}`)
				.then(() => {
					toast.success("Reservation cancelled");
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
			<Heading
				title="Trips"
				subTitle="Where you've been and where you're going"
			/>
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel reservation"
						currentUser={currentUser}
						isLoading={isLoading}
					/>
				))}
			</div>
		</Container>
	);
};

export default TripsClient;
