"use client";

import React from "react";

interface Props {
	onClick?: () => void;
	label: string;
	disabled?: boolean;
}

const MenuItem: React.FC<Props> = ({ label, onClick, disabled }) => {
	return (
		<div
			onClick={() => {
				if (onClick) onClick();
			}}
			className={`px-4 py-3 hover:bg-neutral-50 transition font-semibold ${
				disabled ? "hover:bg-white cursor-default" : ""
			}`}
		>
			{label}
		</div>
	);
};

export default MenuItem;
