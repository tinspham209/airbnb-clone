"use client";
import React from "react";
import Modal from ".";
import { useRentModal } from "@/app/hooks";
import Heading from "../heading";
import { categories } from "../categories";
import CategoryBoxInput from "../categories/input";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../select/country";
import dynamic from "next/dynamic";

enum STEP_KEY {
	CATEGORY = "category",
	LOCATION = "location",
	PRICE = "price",
	TITLE = "title",
	DESCRIPTION = "description",
	GUEST_COUNT = "guestCount",
	ROOM_COUNT = "roomCount",
	BATHROOM_COUNT = "bathroomCount",
	IMAGE_SRC = "imageSrc",
}

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const rentModal = useRentModal();
	const [step, setStep] = React.useState(STEPS.CATEGORY);

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = React.useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = React.useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return "Back";
	}, [step]);

	const getHeadingBody = React.useCallback(() => {
		switch (step) {
			case STEPS.CATEGORY:
				return {
					title: "Which of these best describes your place?",
					subTitle: "Pick a category",
				};
			case STEPS.LOCATION:
				return {
					title: "Where is your place located?",
					subTitle: "Help guests find you!",
				};
			case STEPS.INFO:
				return {
					title: "Share some basics about your place",
					subTitle: "What amenities do you have?",
				};
			case STEPS.IMAGES:
				return {
					title: "Add a photo of your place",
					subTitle: "Show guests what your place looks like!",
				};
			case STEPS.DESCRIPTION:
				return {
					title: "How would you describe your place?",
					subTitle: "Short and sweet works best!",
				};
			case STEPS.PRICE:
				return {
					title: "Now, set your price",
					subTitle: "How much do you charge per night?",
				};
			default:
				return {
					title: "Unknown step",
					subTitle: "Please try again!",
				};
		}
	}, [step]);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch(STEP_KEY.CATEGORY);
	const location = watch(STEP_KEY.LOCATION);

	const setCustomValue = React.useCallback(
		(id: string, value: any) => {
			setValue(id, value, {
				shouldDirty: true,
				shouldTouch: true,
				shouldValidate: true,
			});
		},
		[setValue]
	);

	const bodyContent = React.useMemo(() => {
		switch (step) {
			case STEPS.CATEGORY:
				return (
					<BodyCategory setCustomValue={setCustomValue} category={category} />
				);
			case STEPS.LOCATION:
				return (
					<BodyLocation setCustomValue={setCustomValue} location={location} />
				);
			case STEPS.INFO:
				return <BodyInfo />;
			case STEPS.IMAGES:
				return <BodyImages />;
			case STEPS.DESCRIPTION:
				return <BodyDescription />;
			case STEPS.PRICE:
				return <BodyPrice />;
			default:
				return (
					<BodyCategory setCustomValue={setCustomValue} category={category} />
				);
		}
	}, [category, location, setCustomValue, step]);

	return (
		<Modal
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={() => {
				onNext();
			}}
			title="Airbnb your home!"
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
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

interface Props {}

interface BodyCategoryProps {
	setCustomValue: (id: string, value: any) => void;
	category: string;
}

const BodyCategory: React.FC<BodyCategoryProps> = ({
	category,
	setCustomValue,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto">
			{categories.map((item, index) => (
				<div key={`${item.label}-${index}`} className="col-span-1">
					<CategoryBoxInput
						onClick={(_category) => {
							if (_category === category) {
								setCustomValue(STEP_KEY.CATEGORY, "");
							} else {
								setCustomValue(STEP_KEY.CATEGORY, _category);
							}
						}}
						selected={category === item.label}
						label={item.label}
						icon={item.icon}
					/>
				</div>
			))}
		</div>
	);
};

interface BodyLocationProps {
	setCustomValue: (id: string, value: any) => void;
	location: any;
}

const BodyLocation: React.FC<BodyLocationProps> = ({
	location,
	setCustomValue,
}) => {
	const Map = React.useMemo(
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
				onChange={(value) => setCustomValue(STEP_KEY.LOCATION, value)}
			/>
			<Map center={location?.latlng} />
		</>
	);
};

const BodyInfo: React.FC<Props> = ({}) => {
	return <></>;
};

const BodyImages: React.FC<Props> = ({}) => {
	return <></>;
};

const BodyDescription: React.FC<Props> = ({}) => {
	return <></>;
};

const BodyPrice: React.FC<Props> = ({}) => {
	return <></>;
};

export default RentModal;
