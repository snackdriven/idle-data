"use client";

import { useEffect, useState } from "react";
import type { FC } from "react";
import { Header, UserHeader, Navigation } from "../components/shared";

function ProfilePage() {
	const [baseURL, setBaseURL] = useState("");
	useEffect(() => setBaseURL(window.location.origin), []);

	if (!baseURL) return null;

	return (
		<div className="app-container">
			<Header />
			<UserHeader />
			<Navigation activePage="profile" />
			<div className="app-profile-main">
				<div className="app-profile-content">
					<ProfileInfo />
				</div>
				<div className="app-profile-sidebar">
					<ProfileStats />
				</div>
			</div>
		</div>
	);
}

const ProfileInfo: FC = () => {
	return (
		<div className="app-profile-info">
			<div className="app-profile-header">
				<div className="app-profile-avatar">
					<div className="app-avatar-placeholder">
						<div className="app-avatar-circle">
							<span className="app-avatar-initial">O</span>
						</div>
					</div>
				</div>
				<div className="app-profile-details">
					<div className="app-profile-name">
						<span className="app-usericon">👤</span>
						<span className="app-profile-username">user123</span>
					</div>
					<div className="app-profile-motto">
						Welcome to the application
					</div>{" "}
					<div className="app-profile-actions">
						<span className="app-pro-badge">PRO</span>
						<a href="/pro" className="app-profile-link">
							Enable a Professional package
						</a>
					</div>
				</div>
				<div className="app-profile-settings">
					<button type="button" className="app-settings-icon">
						⚙️
					</button>
				</div>
			</div>{" "}
			<div className="app-profile-tabs">
				<a href="/" className="app-tab">
					RECENT ENTRIES
				</a>
				<a href="/friends" className="app-tab">
					FRIENDS
				</a>
				<a href="/profile" className="app-tab active">
					PROFILE
				</a>
				<a href="/archive" className="app-tab">
					ARCHIVE
				</a>
				<a href="/tags" className="app-tab">
					TAGS
				</a>
				<a href="/categories" className="app-tab">
					CATEGORIES
				</a>
				<a href="/memories" className="app-tab">
					MEMORIES
				</a>
				<a href="/photos" className="app-tab">
					MY PHOTO
				</a>
				<a href="/videos" className="app-tab">
					MY VIDEO
				</a>
			</div>
			<div className="app-profile-info-section">
				<div className="app-info-row">
					<span className="app-info-label">JOURNAL CREATED:</span>
					<span className="app-info-value">on 18 November 2016 (#79447935)</span>
				</div>
				<div className="app-info-row">
					<span className="app-info-label">UPDATED:</span>
					<span className="app-info-value">on 19 December 2023</span>
				</div>
				<div className="app-info-row">
					<span className="app-info-label">NAME:</span>
					<span className="app-info-value">user123</span>
				</div>
				<div className="app-info-row">
					<span className="app-info-label">LOCATION:</span>
					<span className="app-info-value">United States</span>
				</div>
			</div>
		</div>
	);
};

const ProfileStats: FC = () => {
	return (
		<div className="app-profile-stats">
			<div className="app-widget">
				<div className="app-widget-header">STATISTICS</div>
				<div className="app-widget-content">
					<div className="app-stat-item">
						<div className="app-stat-icon">📝</div>
						<div className="app-stat-details">
							<div className="app-stat-number">644</div>
							<div className="app-stat-label">Journal entries</div>
						</div>
					</div>

					<div className="app-stat-item">
						<div className="app-stat-icon">💬</div>
						<div className="app-stat-details">
							<div className="app-stat-number">30</div>
							<div className="app-stat-label">Comments posted</div>
						</div>
					</div>

					<div className="app-stat-item">
						<div className="app-stat-icon">💭</div>
						<div className="app-stat-details">
							<div className="app-stat-number">84</div>
							<div className="app-stat-label">Comments received</div>
						</div>
					</div>

					<div className="app-stat-item">
						<div className="app-stat-icon">🏷️</div>
						<div className="app-stat-details">
							<div className="app-stat-number">5</div>
							<div className="app-stat-label">Tags</div>
						</div>
					</div>

					<div className="app-stat-item">
						<div className="app-stat-icon">📸</div>
						<div className="app-stat-details">
							<div className="app-stat-number">87</div>
							<div className="app-stat-label">Photos</div>
						</div>
					</div>

					<div className="app-stat-item">
						<div className="app-stat-icon">🎁</div>
						<div className="app-stat-details">
							<div className="app-stat-number">1</div>
							<div className="app-stat-label">V-Gift</div>
						</div>
					</div>

					<div className="app-stat-item">
						<div className="app-stat-icon">👥</div>
						<div className="app-stat-details">
							<div className="app-stat-number">3</div>
							<div className="app-stat-label">Userpics</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
