import type { Metadata } from "next";
import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
	title: "Idle Data - Modern LiveJournal",
	description:
		"A modern web application with uptime monitoring and journal features, built with Encore.dev and Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<Providers>
				<body>{children}</body>
			</Providers>
		</html>
	);
}
