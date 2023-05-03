"use client";

import React from "react";

interface Props {
	onClick: () => void;
	label: string;
}

const MenuItem: React.FC<Props> = ({ label, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="px-4 py-3 hover:bg-neutral-50 transition font-semibold"
		>
			{label}
		</div>
	);
};

export default MenuItem;