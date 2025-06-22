import { FC } from "react";
import Link from "next/link";

export const UserHeader: FC = () => {
	return (
		<div className="app-user-header">
			<Link href="/profile" className="app-username-link">
				<span className="app-username">USER123</span>
			</Link>
			<span className="app-tagline">Welcome to the application</span>
		</div>
	);
};
