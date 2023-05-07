import { Nunito } from "next/font/google";
import ClientOnly from "./components/clientOnly";
import ModalWrapper from "./components/modals/wrapper";
import Navbar from "./components/navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import { getCurrentUser } from "./actions";

export const metadata = {
	title: "Airbnb",
	description: "Airbnb clone",
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ModalWrapper />
					<ToasterProvider />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
