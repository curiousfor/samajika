import { useState } from 'react';
import AccountProfile from './AccountProfile';
import PrivacySafety from './PrivacySafety';
import SecurityAccess from './SecurityAccess';
import Notifications from './Notifications';
import DisplayAccessibility from './DisplayAccessibility';
import DangerZone from './DangerZone';

const SECTIONS = [
  { id:'profile',     label:'Account Profile',       icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id:'privacy',     label:'Privacy & Safety',      icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id:'security',    label:'Security & Access',     icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> },
  { id:'notifs',      label:'Notifications',         icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  { id:'display',     label:'Display & Accessibility',icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> },
  { id:'danger',      label:'Data & Account',        icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> },
];

const VIEWS = { profile:<AccountProfile/>, privacy:<PrivacySafety/>, security:<SecurityAccess/>, notifs:<Notifications/>, display:<DisplayAccessibility/>, danger:<DangerZone/> };

export default function SettingsPage({ onBack }) {
  const [active, setActive] = useState('profile');

  return (
    <div style={{ display:'flex', flex:1, background:'var(--main-bg)', borderRadius:'0 24px 24px 0', overflow:'hidden', animation:'fadeIn 0.3s ease' }}>

      {/* Settings sidebar */}
      <div style={{ width:220, background:'var(--sidebar-bg)', padding:'24px 12px', display:'flex', flexDirection:'column', gap:4, flexShrink:0, borderRight:'1px solid rgba(59,130,246,0.08)' }}>
        <button onClick={onBack} style={{
          display:'flex', alignItems:'center', gap:8, marginBottom:16, padding:'8px 10px',
          background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:13, fontFamily:'DM Sans,sans-serif', borderRadius:10,
          transition:'background 0.18s',
        }}
        onMouseEnter={e => e.currentTarget.style.background='rgba(59,130,246,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background='none'}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Feed
        </button>

        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:11, color:'var(--text-muted)', letterSpacing:1, paddingLeft:10, marginBottom:8 }}>SETTINGS</div>

        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:13,
            border:'none', cursor:'pointer', textAlign:'left', width:'100%',
            background: active===s.id ? 'rgba(59,130,246,0.12)' : 'transparent',
            color: active===s.id ? 'var(--accent)' : 'var(--text-muted)',
            fontFamily:'DM Sans,sans-serif', fontWeight: active===s.id ? 600 : 400, fontSize:13,
            transition:'all 0.18s',
          }}
          onMouseEnter={e => { if(active!==s.id) e.currentTarget.style.background='rgba(59,130,246,0.06)'; }}
          onMouseLeave={e => { if(active!==s.id) e.currentTarget.style.background='transparent'; }}>
            <span style={{ opacity: active===s.id ? 1 : 0.6 }}>{s.icon}</span>
            {s.label}
            {s.id==='danger' && <span style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'#ef4444', flexShrink:0 }}/>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', padding:'28px 28px 40px', scrollbarWidth:'none' }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:22, color:'var(--text-primary)', marginBottom:22 }}>
            {SECTIONS.find(s=>s.id===active)?.label}
          </h2>
          <div key={active} style={{ animation:'fadeUp 0.3s ease' }}>
            {VIEWS[active]}
          </div>
        </div>
      </div>
    </div>
  );
}
