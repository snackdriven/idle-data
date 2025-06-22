import { FC } from "react";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Header: FC = () => {
	return (
		<header className="app-top-header">
			<div className="app-header-content">
				<div className="app-logo">
					<Link href="/" className="app-logo-link">
						<span className="app-logo-text">JOURNAL APP</span>
					</Link>
				</div>
				<nav className="app-top-nav">
					<Link href="/find" className="app-nav-link">
						FIND MORE
					</Link>
					<Link href="/friends" className="app-nav-link">
						FRIENDS FEED
					</Link>
					<Link href="/shop" className="app-nav-link">
						SHOP
					</Link>
				</nav>
				<div className="app-user-section">
					<Link href="/" className="app-post-button">
						POST NEW ENTRY
					</Link>
					<button className="app-notifications" aria-label="View notifications">
						<span aria-hidden="true">🔔</span>
					</button>
					<div className="app-user-dropdown">
						<button
							className="app-username-top"
							aria-haspopup="true"
							aria-expanded="false"
						>
							USER123 <span aria-hidden="true">▼</span>
						</button>
						<div className="app-dropdown-menu" role="menu">
							<Link
								href="/profile"
								className="app-dropdown-item"
								role="menuitem"
							>
								View Profile
							</Link>
							<Link
								href="/settings"
								className="app-dropdown-item"
								role="menuitem"
							>
								Settings
							</Link>
							<Link href="/logout" className="app-dropdown-item" role="menuitem">
								Logout
							</Link>
						</div>
					</div>
					<button className="app-search" aria-label="Search">
						<span aria-hidden="true">🔍</span>
					</button>
					<ThemeToggle size="sm" variant="icon" />
				</div>
			</div>
		</header>
	);
};
