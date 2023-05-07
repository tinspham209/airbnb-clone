"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";
import Container from "../components/container";
import Heading from "../components/heading";
import ListingCard from "../components/listings/card";
import { ROUTE } from "../api/constant";

interface ReservationsClientProps {
	reservations: SafeReservation[];
	currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
	reservations,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);
			setIsLoading(true);
			axios
				.delete(`${ROUTE.reservations}/${id}`)
				.then(() => {
					toast.success("Reservation cancelled");
					router.refresh();
				})
				.catch(() => {
					toast.error("Something went wrong.");
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
			<Heading title="Reservations" subTitle="Bookings on your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel guest reservation"
						currentUser={currentUser}
						isLoading={isLoading}
					/>
				))}
			</div>
		</Container>
	);
};

export default ReservationsClient;
