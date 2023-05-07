"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "@/app/hooks/modal/useSearchModal";
import CountrySelect, { CountrySelectValue } from "../select/country";
import Heading from "../heading";
import { DateRangePicker } from "../inputs/calendar";
import Counter from "../inputs/counter";
import Modal from ".";

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal = () => {
	const router = useRouter();
	const searchModal = useSearchModal();
	const params = useSearchParams();

	const [step, setStep] = useState(STEPS.LOCATION);

	const [location, setLocation] = useState<CountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const onBack = useCallback(() => {
		setStep((value) => value - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((value) => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		step,
		searchModal,
		location,
		router,
		guestCount,
		roomCount,
		dateRange,
		onNext,
		bathroomCount,
		params,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return "Search";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined;
		}

		return "Back";
	}, [step]);

	const getHeadingBody = React.useCallback(() => {
		switch (step) {
			case STEPS.LOCATION:
				return {
					title: "Where do you wanna go?",
					subTitle: "HFind the perfect location!",
				};
			case STEPS.DATE:
				return {
					title: "When do you plan to go?",
					subTitle: "Make sure everyone is free!",
				};
			case STEPS.INFO:
				return {
					title: "More information",
					subTitle: "Find your perfect place!",
				};

			default:
				return {
					title: "Unknown step",
					subTitle: "Please try again!",
				};
		}
	}, [step]);

	const bodyLocation = React.useMemo(() => {
		return <BodyLocation location={location} setLocation={setLocation} />;
	}, [location]);

	const bodyDate = React.useMemo(() => {
		return <BodyDate dateRange={dateRange} setDateRange={setDateRange} />;
	}, [dateRange]);

	const bodyInfo = React.useMemo(() => {
		return (
			<BodyInfo
				bathroomCount={bathroomCount}
				guestCount={guestCount}
				roomCount={roomCount}
				setBathroomCount={setBathroomCount}
				setGuestCount={setGuestCount}
				setRoomCount={setRoomCount}
			/>
		);
	}, [bathroomCount, guestCount, roomCount]);

	const bodyContent = React.useMemo(() => {
		switch (step) {
			case STEPS.LOCATION:
				return bodyLocation;
			case STEPS.DATE:
				return bodyDate;
			case STEPS.INFO:
				return bodyInfo;
			default:
				return bodyLocation;
		}
	}, [bodyDate, bodyLocation, step, bodyInfo]);

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title="Filters"
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			onClose={searchModal.onClose}
			body={
				<div className="flex flex-col gap-8 h-[75vh] md:h-[50vh]">
					<Heading
						title={getHeadingBody().title}
						subTitle={getHeadingBody().subTitle}
					/>
					{bodyContent}
				</div>
			}
		/>
	);
};

interface BodyLocationProps {
	location: any;
	setLocation: any;
}

const BodyLocation: React.FC<BodyLocationProps> = ({
	location,
	setLocation,
}) => {
	const Map = useMemo(
		() =>
			dynamic(() => import("../map"), {
				ssr: false,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);
	return (
		<>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</>
	);
};

interface BodyDateProps {
	dateRange: any;
	setDateRange: any;
}

const BodyDate: React.FC<BodyDateProps> = ({ dateRange, setDateRange }) => {
	return (
		<>
			<DateRangePicker
				onChange={(value) => setDateRange(value.selection)}
				value={dateRange}
			/>
		</>
	);
};

interface BodyInfoProps {
	guestCount: any;
	setGuestCount: any;
	setRoomCount: any;
	roomCount: any;
	setBathroomCount: any;
	bathroomCount: any;
}

const BodyInfo: React.FC<BodyInfoProps> = ({
	guestCount,
	setGuestCount,
	bathroomCount,
	roomCount,
	setBathroomCount,
	setRoomCount,
}) => {
	return (
		<>
			<Counter
				onChange={(value) => setGuestCount(value)}
				value={guestCount}
				title="Guests"
				subtitle="How many guests are coming?"
			/>
			<hr />
			<Counter
				onChange={(value) => setRoomCount(value)}
				value={roomCount}
				title="Rooms"
				subtitle="How many rooms do you need?"
			/>
			<hr />
			<Counter
				onChange={(value) => {
					setBathroomCount(value);
				}}
				value={bathroomCount}
				title="Bathrooms"
				subtitle="How many bathrooms do you need?"
			/>
		</>
	);
};

export default SearchModal;
