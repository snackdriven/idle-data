import { FC } from "react";
import Link from "next/link";

export const UserHeader: FC = () => {
	return (
		<div className="lj-user-header">
			<Link href="/profile" className="lj-username-link">
				<span className="lj-username">HELLASPOOKY</span>
			</Link>
			<span className="lj-tagline">you speak only in riddles and loss</span>
		</div>
	);
};
