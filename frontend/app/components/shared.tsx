import type { FC } from "react";

export const Header: FC = () => {
	return (
		<div className="app-top-header">
			<div className="app-header-content">
				<div className="app-logo">
					<a href="/" style={{ textDecoration: "none", color: "white" }}>
						<span className="app-logo-text">JOURNAL APP</span>
					</a>
				</div>
				<div className="app-top-nav">
					<a href="/find">FIND MORE</a>
					<a href="/friends">FRIENDS FEED</a>
					<a href="/shop">SHOP</a>
				</div>
				<div className="app-user-section">
					<a
						href="/"
						className="app-post-button"
						style={{ textDecoration: "none", color: "white" }}
					>
						POST NEW ENTRY
					</a>
					<span className="app-notifications">🔔</span>
					<div className="app-user-dropdown">
						<span className="app-username-top">USER123 ▼</span>
						<div className="app-dropdown-menu">
							<a href="/profile">View Profile</a>
							<a href="/settings">Settings</a>
							<a href="/logout">Logout</a>
						</div>
					</div>
					<span className="app-search">🔍</span>
				</div>
			</div>
		</div>
	);
};

export const UserHeader: FC = () => {
	return (
		<div className="app-user-header">
			<a href="/profile" style={{ textDecoration: "none", color: "inherit" }}>
				<span className="app-username">USER123</span>
			</a>
			<span className="app-tagline">Welcome to the application</span>
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
		<div className="app-nav">
			<div className="app-nav-tabs">
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
