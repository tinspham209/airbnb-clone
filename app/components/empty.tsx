"use client";

import { useRouter } from "next/navigation";

import Button from "./button";
import Heading from "./heading";

interface EmptyStateProps {
	title?: string;
	subTitle?: string;
	showReset?: boolean;
	redirect?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = "No exact matches",
	subTitle = "Try changing or removing some of your filters.",
	showReset,
	redirect = "/",
}) => {
	const router = useRouter();

	return (
		<div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
			<Heading center title={title} subTitle={subTitle} />
			<div className="w-48 mt-4">
				{showReset && (
					<Button outline onClick={() => router.push(redirect)}>
						Remove all filters
					</Button>
				)}
			</div>
		</div>
	);
};

export default EmptyState;
