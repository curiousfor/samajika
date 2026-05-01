// ─── TopNav Component ─────────────────────────────────────────────────────────
import React, { useState } from 'react';

const ICONS = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  exchange: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4"/>
    </svg>
  ),
  flag: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  settings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    </svg>
  ),
};

const TABS = [
  { id: 'home',     icon: 'home' },
  { id: 'social',   icon: 'users' },
  { id: 'exchange', icon: 'exchange' },
  { id: 'flag',     icon: 'flag' },
  { id: 'settings', icon: 'settings' },
];

export default function TopNav({ activeTab, onTabChange }) {
  return (
    <nav className="top-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-label={tab.id}
        >
          {ICONS[tab.icon]}
          {activeTab === tab.id && <span className="nav-active-pill" />}
        </button>
      ))}
    </nav>
  );
}
