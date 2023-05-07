import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/images/logo.png" />
				<link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
				<meta content="AirBnb Clone" name="keywords" />

				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			</Head>
			<body>
				<Main />

				<NextScript />
			</body>
		</Html>
	);
}
