import { ImageResponse } from "next/server";

export const alt = "About Airbnb your home";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default async function og() {
	const clashData = await fetch(
		new URL("./assets/fonts/TYPEWR__.TTF", import.meta.url)
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					textAlign: "center",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					flexWrap: "nowrap",
					fontFamily: "Clash",
					backgroundColor: "white",
					backgroundImage:
						"radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
					backgroundSize: "100px 100px",
				}}
			>
				Airbnb your home
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: "Typewriter",
					data: clashData,
					style: "normal",
				},
			],
		}
	);
}
