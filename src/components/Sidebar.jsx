import { useState } from 'react';

const statusColor = { online: '#22c55e', busy: '#ef4444', away: '#94a3b8', offline: '#cbd5e1' };

function FriendItem({ friend, index }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
      borderRadius: 14, cursor: 'pointer', transition: 'background 0.2s',
      animation: `slideIn 0.35s ease both`,
      animationDelay: `${index * 0.07}s`,
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.09)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img src={friend.avatar} alt={friend.name} style={{
          width: 44, height: 44, borderRadius: '50%', objectFit: 'cover',
          border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }} />
        <span style={{
          position: 'absolute', bottom: 1, right: 1,
          width: 11, height: 11, borderRadius: '50%',
          background: statusColor[friend.status],
          border: '2px solid var(--sidebar-bg)',
          animation: friend.status === 'online' ? 'pulse 2s infinite' : 'none',
        }} />
      </div>
      <span style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', flex: 1 }}>
        {friend.name}
      </span>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        {friend.emoji || friend.lastSeen || ''}
      </span>
    </div>
  );
}

export default function Sidebar({ friends }) {
  const [query, setQuery] = useState('');
  const filtered = friends.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside style={{
      width: 260, background: 'var(--sidebar-bg)',
      borderRadius: '24px 0 0 24px', padding: '28px 16px',
      display: 'flex', flexDirection: 'column', gap: 20,
      animation: 'fadeIn 0.4s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 6 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'linear-gradient(135deg,#3b82f6,#6366f1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span style={{ fontFamily:'Syne', fontWeight:800, fontSize:18, color:'var(--text-primary)' }}>proto 1</span>
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <svg style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search"
          style={{
            width:'100%', padding:'10px 12px 10px 36px',
            borderRadius: 12, border: 'none',
            background: 'rgba(255,255,255,0.7)', fontSize: 14,
            color: 'var(--text-primary)', outline: 'none',
            backdropFilter: 'blur(6px)',
            transition: 'box-shadow 0.2s',
          }}
          onFocus={e => e.target.style.boxShadow='0 0 0 2px var(--accent)'}
          onBlur={e => e.target.style.boxShadow='none'}
        />
      </div>

      {/* Friends */}
      <div>
        <p style={{ fontFamily:'Syne', fontWeight:700, fontSize:13, color:'var(--text-muted)', letterSpacing:1, paddingLeft:6, marginBottom:8 }}>
          FRIENDS
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {filtered.map((f, i) => <FriendItem key={f.id} friend={f} index={i} />)}
        </div>
      </div>
    </aside>
  );
}
