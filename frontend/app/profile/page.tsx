"use client";

import { useEffect, useState } from "react";
import type { FC } from "react";
import { Header, UserHeader, Navigation } from "../components/shared";

function ProfilePage() {
  const [baseURL, setBaseURL] = useState("");
  useEffect(() => setBaseURL(window.location.origin), []);

  if (!baseURL) return null;

  return (
    <div className="lj-container">
      <Header />
      <UserHeader />
      <Navigation activePage="profile" />
      <div className="lj-profile-main">
        <div className="lj-profile-content">
          <ProfileInfo />
        </div>
        <div className="lj-profile-sidebar">
          <ProfileStats />
        </div>
      </div>
    </div>
  );
}

const ProfileInfo: FC = () => {
  return (
    <div className="lj-profile-info">
      <div className="lj-profile-header">
        <div className="lj-profile-avatar">
          <div className="lj-avatar-placeholder">
            <div className="lj-avatar-circle">
              <span className="lj-avatar-initial">O</span>
            </div>
          </div>
        </div>
        <div className="lj-profile-details">
          <div className="lj-profile-name">
            <span className="lj-usericon">👤</span>
            <span className="lj-profile-username">hellaspooky</span>
          </div>
          <div className="lj-profile-motto">you speak only in riddles and loss</div>          <div className="lj-profile-actions">
            <span className="lj-pro-badge">PRO</span>
            <a href="/pro" className="lj-profile-link">Enable a Professional package</a>
          </div>
        </div>
        <div className="lj-profile-settings">
          <button type="button" className="lj-settings-icon">⚙️</button>
        </div>
      </div>      <div className="lj-profile-tabs">
        <a href="/" className="lj-tab">RECENT ENTRIES</a>
        <a href="/friends" className="lj-tab">FRIENDS</a>
        <a href="/profile" className="lj-tab active">PROFILE</a>
        <a href="/archive" className="lj-tab">ARCHIVE</a>
        <a href="/tags" className="lj-tab">TAGS</a>
        <a href="/categories" className="lj-tab">CATEGORIES</a>
        <a href="/memories" className="lj-tab">MEMORIES</a>
        <a href="/photos" className="lj-tab">MY PHOTO</a>
        <a href="/videos" className="lj-tab">MY VIDEO</a>
      </div>

      <div className="lj-profile-info-section">
        <div className="lj-info-row">
          <span className="lj-info-label">JOURNAL CREATED:</span>
          <span className="lj-info-value">on 18 November 2016 (#79447935)</span>
        </div>
        <div className="lj-info-row">
          <span className="lj-info-label">UPDATED:</span>
          <span className="lj-info-value">on 19 December 2023</span>
        </div>
        <div className="lj-info-row">
          <span className="lj-info-label">NAME:</span>
          <span className="lj-info-value">hellaspooky</span>
        </div>
        <div className="lj-info-row">
          <span className="lj-info-label">LOCATION:</span>
          <span className="lj-info-value">United States</span>
        </div>
      </div>
    </div>
  );
};

const ProfileStats: FC = () => {
  return (
    <div className="lj-profile-stats">
      <div className="lj-widget">
        <div className="lj-widget-header">
          STATISTICS
        </div>
        <div className="lj-widget-content">
          <div className="lj-stat-item">
            <div className="lj-stat-icon">📝</div>
            <div className="lj-stat-details">
              <div className="lj-stat-number">644</div>
              <div className="lj-stat-label">Journal entries</div>
            </div>
          </div>
          
          <div className="lj-stat-item">
            <div className="lj-stat-icon">💬</div>
            <div className="lj-stat-details">
              <div className="lj-stat-number">30</div>
              <div className="lj-stat-label">Comments posted</div>
            </div>
          </div>
          
          <div className="lj-stat-item">
            <div className="lj-stat-icon">💭</div>
            <div className="lj-stat-details">
              <div className="lj-stat-number">84</div>
              <div className="lj-stat-label">Comments received</div>
            </div>
          </div>
          
          <div className="lj-stat-item">
            <div className="lj-stat-icon">🏷️</div>
            <div className="lj-stat-details">
              <div className="lj-stat-number">5</div>
              <div className="lj-stat-label">Tags</div>
            </div>
          </div>
          
          <div className="lj-stat-item">
            <div className="lj-stat-icon">📸</div>
            <div className="lj-stat-details">
              <div className="lj-stat-number">87</div>
              <div className="lj-stat-label">Photos</div>
            </div>
          </div>
          
          <div className="lj-stat-item">
            <div className="lj-stat-icon">🎁</div>
            <div className="lj-stat-details">
              <div className="lj-stat-number">1</div>
              <div className="lj-stat-label">V-Gift</div>
            </div>
          </div>
          
          <div className="lj-stat-item">
            <div className="lj-stat-icon">👥</div>
            <div className="lj-stat-details">
              <div className="lj-stat-number">3</div>
              <div className="lj-stat-label">Userpics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
