import { FC } from "react";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Header: FC = () => {
  return (
    <header className="lj-top-header">
      <div className="lj-header-content">
        <div className="lj-logo">
          <Link href="/" className="lj-logo-link">
            <span className="lj-logo-text">LIVEJOURNAL</span>
          </Link>
        </div>
        <nav className="lj-top-nav">
          <Link href="/find" className="lj-nav-link">FIND MORE</Link>
          <Link href="/friends" className="lj-nav-link">FRIENDS FEED</Link>
          <Link href="/shop" className="lj-nav-link">SHOP</Link>
        </nav>
        <div className="lj-user-section">
          <Link href="/" className="lj-post-button">POST NEW ENTRY</Link>
          <button className="lj-notifications" aria-label="View notifications">
            <span aria-hidden="true">🔔</span>
          </button>
          <div className="lj-user-dropdown">
            <button className="lj-username-top" aria-haspopup="true" aria-expanded="false">
              HELLASPOOKY <span aria-hidden="true">▼</span>
            </button>
            <div className="lj-dropdown-menu" role="menu">
              <Link href="/profile" className="lj-dropdown-item" role="menuitem">View Profile</Link>
              <Link href="/settings" className="lj-dropdown-item" role="menuitem">Settings</Link>
              <Link href="/logout" className="lj-dropdown-item" role="menuitem">Logout</Link>
            </div>
          </div>
          <button className="lj-search" aria-label="Search">
            <span aria-hidden="true">🔍</span>
          </button>
          <ThemeToggle size="sm" variant="icon" />
        </div>
      </div>
    </header>
  );
}; 