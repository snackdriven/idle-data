import type { FC } from "react";

export const Header: FC = () => {
	return (
		<div className="lj-top-header">
			<div className="lj-header-content">
				<div className="lj-logo">
					<a href="/" style={{ textDecoration: "none", color: "white" }}>
						<span className="lj-logo-text">LIVEJOURNAL</span>
					</a>
				</div>
				<div className="lj-top-nav">
					<a href="/find">FIND MORE</a>
					<a href="/friends">FRIENDS FEED</a>
					<a href="/shop">SHOP</a>
				</div>
				<div className="lj-user-section">
					<a
						href="/"
						className="lj-post-button"
						style={{ textDecoration: "none", color: "white" }}
					>
						POST NEW ENTRY
					</a>
					<span className="lj-notifications">🔔</span>
					<div className="lj-user-dropdown">
						<span className="lj-username-top">HELLASPOOKY ▼</span>
						<div className="lj-dropdown-menu">
							<a href="/profile">View Profile</a>
							<a href="/settings">Settings</a>
							<a href="/logout">Logout</a>
						</div>
					</div>
					<span className="lj-search">🔍</span>
				</div>
			</div>
		</div>
	);
};

export const UserHeader: FC = () => {
	return (
		<div className="lj-user-header">
			<a href="/profile" style={{ textDecoration: "none", color: "inherit" }}>
				<span className="lj-username">HELLASPOOKY</span>
			</a>
			<span className="lj-tagline">you speak only in riddles and loss</span>
		</div>
	);
};

interface NavigationProps {
	activePage?:
		| "recent"
		| "friends"
		| "archive"
		| "profile"
		| "memories"
		| "rss";
}

export const Navigation: FC<NavigationProps> = ({ activePage = "recent" }) => {
	return (
		<div className="lj-nav">
			<div className="lj-nav-tabs">
				<a href="/" className={activePage === "recent" ? "active" : ""}>
					RECENT ENTRIES
				</a>
				<a href="/friends" className={activePage === "friends" ? "active" : ""}>
					FRIENDS
				</a>
				<a href="/archive" className={activePage === "archive" ? "active" : ""}>
					ARCHIVE
				</a>
				<a href="/profile" className={activePage === "profile" ? "active" : ""}>
					PROFILE
				</a>
				<a href="/add" className={activePage === "memories" ? "active" : ""}>
					ADD TO MEMORIES
				</a>
				<a href="/rss" className={activePage === "rss" ? "active" : ""}>
					RSS
				</a>
			</div>
		</div>
	);
};
