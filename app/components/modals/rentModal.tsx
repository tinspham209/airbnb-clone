"use client";
import React from "react";
import Modal from ".";
import { useRentModal } from "@/app/hooks";
import Heading from "../heading";
import { categories } from "../categories";
import CategoryBoxInput from "../categories/input";
import {
	FieldErrors,
	FieldValues,
	SubmitHandler,
	UseFormRegister,
	useForm,
} from "react-hook-form";
import CountrySelect from "../select/country";
import dynamic from "next/dynamic";
import Counter from "../inputs/counter";
import ImageUpload from "../upload/image";
import Input from "../inputs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/app/api/constant";

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
	const router = useRouter();
	const rentModal = useRentModal();
	const [step, setStep] = React.useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = React.useState(false);

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
	const guestCount = watch(STEP_KEY.GUEST_COUNT);
	const roomCount = watch(STEP_KEY.ROOM_COUNT);
	const bathroomCount = watch(STEP_KEY.BATHROOM_COUNT);
	const imageSrc = watch(STEP_KEY.IMAGE_SRC);

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

	const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
		if (step !== STEPS.PRICE) {
			return onNext();
		}

		setIsLoading(true);

		axios
			.post(ROUTE.listings, data)
			.then(() => {
				toast.success("Listing created successfully!");
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				rentModal.onClose();
			})
			.catch(() => {
				toast.error("Something went wrong.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyCategory = React.useMemo(() => {
		return <BodyCategory setCustomValue={setCustomValue} category={category} />;
	}, [category, setCustomValue]);

	const bodyLocation = React.useMemo(() => {
		return <BodyLocation setCustomValue={setCustomValue} location={location} />;
	}, [location, setCustomValue]);

	const bodyInfo = React.useMemo(() => {
		return (
			<BodyInfo
				setCustomValue={setCustomValue}
				values={{
					bathroomCount,
					guestCount,
					roomCount,
				}}
			/>
		);
	}, [bathroomCount, guestCount, roomCount, setCustomValue]);

	const bodyImages = React.useMemo(() => {
		return <BodyImages setCustomValue={setCustomValue} imgSrc={imageSrc} />;
	}, [imageSrc, setCustomValue]);

	const bodyDescription = React.useMemo(() => {
		return (
			<BodyDescription
				register={register}
				errors={errors}
				isLoading={isLoading}
			/>
		);
	}, [errors, isLoading, register]);

	const bodyPrice = React.useMemo(() => {
		return (
			<BodyPrice register={register} errors={errors} isLoading={isLoading} />
		);
	}, [errors, isLoading, register]);

	const bodyContent = React.useMemo(() => {
		switch (step) {
			case STEPS.CATEGORY:
				return bodyCategory;
			case STEPS.LOCATION:
				return bodyLocation;
			case STEPS.INFO:
				return bodyInfo;
			case STEPS.IMAGES:
				return bodyImages;
			case STEPS.DESCRIPTION:
				return bodyDescription;
			case STEPS.PRICE:
				return bodyPrice;
			default:
				return bodyCategory;
		}
	}, [
		bodyCategory,
		bodyDescription,
		bodyImages,
		bodyInfo,
		bodyLocation,
		bodyPrice,
		step,
	]);

	return (
		<Modal
			isLoading={isLoading}
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
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

interface BodyInfoProps {
	setCustomValue: (id: string, value: any) => void;
	values: {
		guestCount: number;
		roomCount: number;
		bathroomCount: number;
	};
}
const BodyInfo: React.FC<BodyInfoProps> = ({ setCustomValue, values }) => {
	const { bathroomCount, guestCount, roomCount } = values;
	return (
		<>
			<Counter
				onChange={(value) => setCustomValue(STEP_KEY.GUEST_COUNT, value)}
				value={guestCount}
				title="Guests"
				subtitle="How many guests do you allow?"
			/>
			<hr />
			<Counter
				onChange={(value) => setCustomValue(STEP_KEY.ROOM_COUNT, value)}
				value={roomCount}
				title="Rooms"
				subtitle="How many rooms do you have?"
			/>
			<hr />
			<Counter
				onChange={(value) => setCustomValue(STEP_KEY.BATHROOM_COUNT, value)}
				value={bathroomCount}
				title="Bathrooms"
				subtitle="How many bathrooms do you have?"
			/>
		</>
	);
};

interface BodyImagesProps {
	setCustomValue: (id: string, value: any) => void;
	imgSrc: string;
}

const BodyImages: React.FC<BodyImagesProps> = ({ imgSrc, setCustomValue }) => {
	return (
		<>
			<ImageUpload
				onChange={(value) => setCustomValue(STEP_KEY.IMAGE_SRC, value)}
				value={imgSrc}
			/>
		</>
	);
};

interface BodyDescriptionProps {
	isLoading: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const BodyDescription: React.FC<BodyDescriptionProps> = ({
	errors,
	isLoading,
	register,
}) => {
	return (
		<>
			<Input
				id={STEP_KEY.TITLE}
				label="Title"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<hr />
			<Input
				id={STEP_KEY.DESCRIPTION}
				label="Description"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</>
	);
};

const BodyPrice: React.FC<BodyDescriptionProps> = ({
	errors,
	isLoading,
	register,
}) => {
	return (
		<>
			<Input
				id="price"
				label="Price"
				formatPrice
				type="number"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</>
	);
};

export default RentModal;
