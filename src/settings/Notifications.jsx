import { useState } from 'react';
import { SectionCard, Toggle } from './SettingsUI';

const PUSH_ITEMS = [
  { key:'likes',     label:'Likes on your posts',      sub:'When someone likes your content.' },
  { key:'comments',  label:'Comments on your posts',    sub:'When someone replies to your post.' },
  { key:'followers', label:'New Followers',             sub:'When someone follows your account.' },
  { key:'dms',       label:'Direct Messages',           sub:'New messages in your inbox.' },
  { key:'mentions',  label:'Mentions',                  sub:'When someone @mentions you.' },
  { key:'reposts',   label:'Reposts',                   sub:'When someone reposts your content.' },
];

const EMAIL_ITEMS = [
  { key:'digest',    label:'Weekly Digest',             sub:'A summary of your top activity.' },
  { key:'marketing', label:'Product Updates & News',    sub:'Tips, new features and announcements.' },
  { key:'missed',    label:'Missed Activity Alerts',    sub:'What happened while you were away.' },
  { key:'security',  label:'Security Alerts',           sub:'Sign-ins and important account changes.' },
];

export default function Notifications() {
  const [push, setPush] = useState({ likes:true, comments:true, followers:true, dms:true, mentions:true, reposts:false });
  const [email, setEmail] = useState({ digest:true, marketing:false, missed:true, security:true });
  const [quiet, setQuiet] = useState({ enabled:false });

  const allPushOn = Object.values(push).every(Boolean);
  const toggleAllPush = () => {
    const next = !allPushOn;
    setPush(Object.fromEntries(Object.keys(push).map(k => [k, next])));
  };

  return (
    <div>
      <SectionCard title="Push & In-App Notifications">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <span style={{ fontSize:12, color:'var(--text-muted)' }}>Control what pings you in real-time.</span>
          <button onClick={toggleAllPush} style={{ fontSize:12, color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>
            {allPushOn ? 'Mute All' : 'Enable All'}
          </button>
        </div>
        {PUSH_ITEMS.map(item => (
          <Toggle key={item.key} on={push[item.key]} label={item.label} sub={item.sub}
            onChange={v => setPush(p => ({ ...p, [item.key]: v }))} />
        ))}
      </SectionCard>

      <SectionCard title="Email Notifications">
        <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:4 }}>Choose what lands in your inbox.</p>
        {EMAIL_ITEMS.map(item => (
          <Toggle key={item.key} on={email[item.key]} label={item.label} sub={item.sub}
            onChange={v => setEmail(p => ({ ...p, [item.key]: v }))} />
        ))}
      </SectionCard>

      <SectionCard title="Quiet Hours">
        <Toggle on={quiet.enabled} label="Enable Quiet Hours"
          sub="Pause all push notifications during a set time window."
          onChange={v => setQuiet(p => ({ ...p, enabled: v }))} />
        {quiet.enabled && (
          <div style={{ display:'flex', gap:16, marginTop:16 }}>
            {['From','To'].map(label => (
              <div key={label} style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:6 }}>{label.toUpperCase()}</div>
                <input type="time" defaultValue={label==='From'?'22:00':'07:00'}
                  style={{ width:'100%', padding:'9px 12px', borderRadius:12, border:'1.5px solid var(--border)', fontSize:14, outline:'none', fontFamily:'DM Sans,sans-serif', color:'var(--text-primary)', background:'var(--input-bg)' }} />
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
