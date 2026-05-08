import { useState } from 'react';

// Icon per notification type
function NotifIcon({ type }) {
  const configs = {
    message:     { bg:'#3b82f620', color:'#3b82f6', path:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    connection:  { bg:'#8b5cf620', color:'#8b5cf6', path:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75' },
    badge:       { bg:'#f59e0b20', color:'#f59e0b', path:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
    missed_call: { bg:'#ef444420', color:'#ef4444', path:'M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.5a19.86 19.86 0 0 1-3-8.59A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6' },
    like:        { bg:'#ec489920', color:'#ec4899', path:'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
    follow:      { bg:'#22c55e20', color:'#22c55e', path:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M19 8v6 M22 11h-6' },
    mention:     { bg:'#06b6d420', color:'#06b6d4', path:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M9 10h.01 M12 10h.01 M15 10h.01' },
    system:      { bg:'#64748b20', color:'#64748b', path:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  };
  const c = configs[type] || configs.system;
  return (
    <div style={{ width:42, height:42, borderRadius:12, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {c.path.split(' M').map((seg, i) => <path key={i} d={i === 0 ? seg : 'M' + seg} />)}
      </svg>
    </div>
  );
}

// Action buttons per type
function ActionButtons({ type, onDismiss, onMarkRead }) {
  const btn = (label, variant, onClick) => {
    const styles = {
      primary:   { background:'var(--accent)', color:'var(--text-on-accent)', border:'none' },
      secondary: { background:'var(--btn-secondary-bg)', color:'var(--accent)', border:'none' },
      ghost:     { background:'transparent', color:'var(--text-muted)', border:'1px solid var(--border)' },
      danger:    { background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'none' },
    };
    return (
      <button onClick={onClick} style={{
        padding:'6px 14px', borderRadius:20, cursor:'pointer', fontSize:12, fontWeight:600,
        fontFamily:'DM Sans, sans-serif', transition:'opacity 0.18s', ...styles[variant],
      }}
      onMouseEnter={e => e.currentTarget.style.opacity='0.75'}
      onMouseLeave={e => e.currentTarget.style.opacity='1'}>
        {label}
      </button>
    );
  };

  if (type === 'message')    return <div style={{ display:'flex', gap:8, marginTop:10 }}>{btn('Reply','primary', onMarkRead)}{btn('Dismiss','ghost', onDismiss)}</div>;
  if (type === 'connection') return <div style={{ display:'flex', gap:8, marginTop:10 }}>{btn('Accept','primary', onMarkRead)}{btn('Decline','danger', onDismiss)}</div>;
  if (type === 'follow')     return <div style={{ display:'flex', gap:8, marginTop:10 }}>{btn('Follow Back','primary', onMarkRead)}{btn('Dismiss','ghost', onDismiss)}</div>;
  return null;
}

export default function NotificationItem({ notif, onMarkRead, onDismiss, index }) {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => onDismiss(notif.id), 280);
  };

  const handleMarkRead = () => onMarkRead(notif.id);

  return (
    <div onClick={!notif.read ? handleMarkRead : undefined}
      style={{
        display:'flex', gap:13, padding:'14px 16px',
        background: notif.read ? 'transparent' : 'var(--accent-dim)',
        borderRadius:14, cursor: notif.read ? 'default' : 'pointer',
        border:'1px solid var(--border-inner)',
        marginBottom:8, position:'relative',
        transition:'all 0.28s cubic-bezier(0.4,0,0.2,1)',
        opacity: dismissing ? 0 : 1,
        transform: dismissing ? 'translateX(20px)' : 'none',
        animation: `fadeUp 0.35s ease ${index * 0.05}s both`,
      }}>

      {/* Unread dot */}
      {!notif.read && (
        <div style={{
          position:'absolute', left:6, top:'50%', transform:'translateY(-50%)',
          width:6, height:6, borderRadius:'50%', background:'var(--accent)',
          boxShadow:'0 0 6px var(--accent-shadow)',
          animation:'pulse 2s infinite',
        }}/>
      )}

      {/* Avatar or icon */}
      <div style={{ flexShrink:0 }}>
        {notif.avatar
          ? <img src={notif.avatar} alt="" style={{ width:42, height:42, borderRadius:'50%', border:'2px solid var(--border)', objectFit:'cover' }}/>
          : <NotifIcon type={notif.type} />
        }
      </div>

      {/* Content */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
          <span style={{ fontWeight: notif.read ? 500 : 700, fontSize:13, color:'var(--text-primary)', lineHeight:1.4 }}>
            {notif.title}
          </span>
          <span style={{ fontSize:11, color:'var(--text-muted)', flexShrink:0, marginTop:1 }}>{notif.time}</span>
        </div>
        <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2, lineHeight:1.5 }}>{notif.body}</p>

        {/* Message preview */}
        {notif.preview && (
          <div style={{
            marginTop:8, padding:'8px 12px', borderRadius:10,
            background:'var(--card-bg-alt)', border:'1px solid var(--border-inner)',
            fontSize:12, color:'var(--text-muted)', fontStyle:'italic',
          }}>
            {notif.preview}
          </div>
        )}

        <ActionButtons type={notif.type} onDismiss={handleDismiss} onMarkRead={handleMarkRead} />
      </div>

      {/* Dismiss X — always visible on hover */}
      <button onClick={e => { e.stopPropagation(); handleDismiss(); }}
        title="Dismiss"
        style={{
          position:'absolute', top:10, right:10, width:22, height:22, borderRadius:'50%',
          border:'none', cursor:'pointer', background:'var(--icon-bg)',
          color:'var(--text-muted)', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center',
          opacity:0, transition:'opacity 0.18s', padding:0, fontFamily:'sans-serif',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity='1'}
        onFocus={e => e.currentTarget.style.opacity='1'}
        ref={el => {
          if (!el) return;
          const parent = el.closest('[data-notif]') || el.parentElement;
          const show = () => el.style.opacity = '1';
          const hide = () => el.style.opacity = '0';
          parent.addEventListener('mouseenter', show);
          parent.addEventListener('mouseleave', hide);
        }}>
        ×
      </button>
    </div>
  );
}
