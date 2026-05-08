// Navbar receives unreadCount for the notification badge on the flag icon

const NAV_ICONS = [
  { id: 'home', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  )},
  { id: 'people', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { id: 'exchange', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  )},
  { id: 'notifications', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  )},
  { id: 'settings', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )},
];

export default function Navbar({ active, onNavChange, unreadCount = 0 }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', gap: 4,
      background: 'var(--sidebar-bg)', borderRadius: 16,
      padding: '6px 8px', marginBottom: 20,
      animation: 'fadeUp 0.4s ease both',
    }}>
      {NAV_ICONS.map(({ id, icon }, i) => {
        const isActive = active === id;
        const showBadge = id === 'notifications' && unreadCount > 0 && !isActive;
        return (
          <button key={id} onClick={() => onNavChange(id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flex: 1, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? 'var(--text-on-accent)' : 'var(--text-muted)',
              transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
              transform: isActive ? 'scale(1.08)' : 'scale(1)',
              boxShadow: isActive ? '0 4px 14px var(--accent-shadow)' : 'none',
              position: 'relative',
            }}
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text-muted)'; }}}
          >
            {icon}

            {/* Live badge on flag/notifications icon */}
            {showBadge && (
              <span style={{
                position: 'absolute', top: 6, right: 'calc(50% - 18px)',
                minWidth: 16, height: 16, borderRadius: 20,
                background: 'var(--busy)', color: '#fff',
                fontSize: 9, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px', border: '2px solid var(--sidebar-bg)',
                animation: 'pulse 2s infinite',
                boxShadow: '0 0 8px rgba(239,68,68,0.5)',
              }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
