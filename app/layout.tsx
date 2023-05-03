import ClientOnly from "./components/clientOnly";
import Modal from "./components/modals";
import Navbar from "./components/navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
	title: "Airbnb",
	description: "Airbnb clone",
};

const font = Nunito({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<Modal />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
