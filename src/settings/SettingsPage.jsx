import { useState } from 'react';
import AccountProfile from './AccountProfile';
import PrivacySafety from './PrivacySafety';
import SecurityAccess from './SecurityAccess';
import Notifications from './Notifications';
import DisplayAccessibility from './DisplayAccessibility';
import DangerZone from './DangerZone';

const SECTIONS = [
  { id:'profile',  label:'Account Profile',        icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { id:'privacy',  label:'Privacy & Safety',        icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { id:'security', label:'Security & Access',       icon:'M5 11h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V11z M8 11V7a4 4 0 0 1 8 0v4' },
  { id:'notifs',   label:'Notifications',           icon:'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0' },
  { id:'display',  label:'Display & Accessibility', icon:'M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' },
  { id:'danger',   label:'Data & Account',          icon:'M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', danger:true },
];

const VIEWS = {
  profile:  <AccountProfile />,
  privacy:  <PrivacySafety />,
  security: <SecurityAccess />,
  notifs:   <Notifications />,
  display:  <DisplayAccessibility />,
  danger:   <DangerZone />,
};

function NavIcon({ d }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {d.split(' M').map((seg, i) => <path key={i} d={i === 0 ? seg : 'M' + seg} />)}
    </svg>
  );
}

export default function SettingsPage({ onBack }) {
  const [active, setActive] = useState('profile');
  const activeSection = SECTIONS.find(s => s.id === active);

  return (
    <div style={{ display:'flex', flex:1, overflow:'hidden', animation:'fadeIn 0.3s ease' }}>

      {/* Settings sidebar */}
      <aside style={{
        width:220, background:'var(--sidebar-bg)', padding:'20px 12px',
        display:'flex', flexDirection:'column', gap:2, flexShrink:0,
        borderRight:'1px solid var(--border-inner)',
      }}>
        <button onClick={onBack} style={{
          display:'flex', alignItems:'center', gap:7, marginBottom:14,
          padding:'8px 10px', background:'none', border:'none', cursor:'pointer',
          color:'var(--text-muted)', fontSize:12, fontFamily:'DM Sans, sans-serif',
          borderRadius:10, transition:'background 0.18s', width:'100%', textAlign:'left',
        }}
        onMouseEnter={e => e.currentTarget.style.background='var(--accent-dim)'}
        onMouseLeave={e => e.currentTarget.style.background='none'}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Feed
        </button>

        <div style={{ fontSize:10, fontFamily:'Syne, sans-serif', fontWeight:700, color:'var(--text-muted)', letterSpacing:1, paddingLeft:10, marginBottom:6 }}>SETTINGS</div>

        {SECTIONS.map(s => {
          const isActive = active === s.id;
          return (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              display:'flex', alignItems:'center', gap:9, padding:'9px 12px',
              borderRadius:12, border:'none', cursor:'pointer', textAlign:'left', width:'100%',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              color: isActive ? 'var(--accent)' : s.danger ? 'var(--busy)' : 'var(--text-muted)',
              fontFamily:'DM Sans, sans-serif', fontWeight: isActive ? 600 : 400, fontSize:13,
              transition:'all 0.18s',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--accent-dim)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
              <NavIcon d={s.icon} />
              {s.label}
              {s.danger && <span style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'var(--busy)' }}/>}
            </button>
          );
        })}
      </aside>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', padding:'26px 26px 40px', scrollbarWidth:'none', background:'var(--main-bg)' }}>
        <div style={{ maxWidth:580, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:20, color:'var(--text-primary)', marginBottom:20 }}>
            {activeSection?.label}
          </h2>
          <div key={active} style={{ animation:'fadeUp 0.28s ease' }}>
            {VIEWS[active]}
          </div>
        </div>
      </div>
    </div>
  );
}
