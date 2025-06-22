import { FC } from "react";
import Link from "next/link";

export type NavigationPage =
	| "recent"
	| "friends"
	| "archive"
	| "profile"
	| "memories"
	| "rss";

interface NavigationProps {
	activePage?: NavigationPage;
}

interface NavItem {
	href: string;
	label: string;
	id: NavigationPage;
}

const NAV_ITEMS: NavItem[] = [
	{ href: "/", label: "RECENT ENTRIES", id: "recent" },
	{ href: "/friends", label: "FRIENDS", id: "friends" },
	{ href: "/archive", label: "ARCHIVE", id: "archive" },
	{ href: "/profile", label: "PROFILE", id: "profile" },
	{ href: "/add", label: "ADD TO MEMORIES", id: "memories" },
	{ href: "/rss", label: "RSS", id: "rss" },
];

export const Navigation: FC<NavigationProps> = ({ activePage = "recent" }) => {
	return (
		<nav className="lj-nav" role="navigation">
			<div className="lj-nav-tabs">
				{NAV_ITEMS.map((item) => (
					<Link
						key={item.id}
						href={item.href}
						className={`lj-nav-tab ${activePage === item.id ? "active" : ""}`}
						aria-current={activePage === item.id ? "page" : undefined}
					>
						{item.label}
					</Link>
				))}
			</div>
		</nav>
	);
};
