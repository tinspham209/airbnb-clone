import { Nunito } from "next/font/google";
import ClientOnly from "./components/clientOnly";
import ModalWrapper from "./components/modals/wrapper";
import Navbar from "./components/navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

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
					<ModalWrapper />
					<ToasterProvider />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
