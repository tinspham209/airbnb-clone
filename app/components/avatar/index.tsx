"use client";

import Image from "next/image";
import React from "react";

interface Props {
	imgUrl?: string | null | undefined;
}

const Avatar: React.FC<Props> = ({ imgUrl }) => {
	return (
		<Image
			className="rounded-full"
			height={"30"}
			width={"30"}
			alt="Avatar"
			src={imgUrl || "/images/placeholder.jpg"}
		/>
	);
};

export default Avatar;
