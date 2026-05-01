import { useState } from 'react';
import { SectionCard, SettingInput, Btn } from './SettingsUI';

function PasswordForm() {
  const [f, setF] = useState({ current:'', next:'', confirm:'' });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const set = k => e => setF(p => ({ ...p, [k]: e.target.value }));
  const strength = p => !p ? 0 : p.length < 6 ? 1 : p.length < 10 ? 2 : /[A-Z]/.test(p) && /\d/.test(p) ? 4 : 3;
  const s = strength(f.next);
  const colors = ['','#ef4444','#f59e0b','#3b82f6','#22c55e'];
  const labels = ['','Weak','Fair','Good','Strong'];

  const save = () => {
    if (!f.current) return setErr('Enter your current password.');
    if (f.next.length < 8) return setErr('New password must be at least 8 characters.');
    if (f.next !== f.confirm) return setErr('Passwords do not match.');
    setErr(''); setOk(true); setF({ current:'', next:'', confirm:'' });
    setTimeout(() => setOk(false), 2500);
  };

  return (
    <SectionCard title="Password">
      <SettingInput label="CURRENT PASSWORD" type="password" value={f.current} onChange={set('current')} placeholder="••••••••" />
      <SettingInput label="NEW PASSWORD" type="password" value={f.next} onChange={set('next')} placeholder="••••••••" />
      {f.next && (
        <div style={{ marginTop:-8, marginBottom:14 }}>
          <div style={{ display:'flex', gap:4, marginBottom:4 }}>
            {[1,2,3,4].map(i => <div key={i} style={{ flex:1, height:3, borderRadius:4, background: i <= s ? colors[s] : '#e2e8f0', transition:'background 0.3s' }} />)}
          </div>
          <span style={{ fontSize:11, color:colors[s], fontWeight:600 }}>{labels[s]}</span>
        </div>
      )}
      <SettingInput label="CONFIRM NEW PASSWORD" type="password" value={f.confirm} onChange={set('confirm')} placeholder="••••••••" />
      {err && <p style={{ color:'#ef4444', fontSize:12, marginBottom:12 }}>{err}</p>}
      {ok  && <p style={{ color:'#22c55e', fontSize:12, marginBottom:12 }}>✓ Password updated successfully!</p>}
      <Btn variant="primary" onClick={save}>Update Password</Btn>
    </SectionCard>
  );
}

function TwoFA() {
  const [enabled, setEnabled] = useState(false);
  const [method, setMethod] = useState('app');
  const [step, setStep] = useState(0);

  if (!enabled) return (
    <SectionCard title="Two-Factor Authentication">
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:'#eaf1fb', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1"/></svg>
        </div>
        <div>
          <div style={{ fontWeight:600, fontSize:14, color:'var(--text-primary)' }}>2FA is disabled</div>
          <div style={{ fontSize:12, color:'var(--text-muted)' }}>Add a layer of security to your account.</div>
        </div>
      </div>
      <div style={{ display:'flex', gap:10, marginBottom:18 }}>
        {['app','sms'].map(m => (
          <button key={m} onClick={() => setMethod(m)} style={{
            flex:1, padding:'10px', borderRadius:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:500, fontSize:13,
            border: method===m ? '2px solid var(--accent)' : '1.5px solid #dde8f5',
            background: method===m ? '#eaf1fb' : '#fff', color: method===m ? 'var(--accent)' : 'var(--text-muted)',
            transition:'all 0.18s',
          }}>
            {m === 'app' ? '📱 Authenticator App' : '💬 SMS'}
          </button>
        ))}
      </div>
      <Btn variant="primary" onClick={() => { setEnabled(true); setStep(1); }}>Enable 2FA</Btn>
    </SectionCard>
  );

  return (
    <SectionCard title="Two-Factor Authentication">
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
        <span style={{ background:'#dcfce7', color:'#16a34a', borderRadius:20, padding:'3px 12px', fontSize:12, fontWeight:600 }}>✓ Enabled</span>
        <span style={{ fontSize:12, color:'var(--text-muted)' }}>via {method === 'app' ? 'Authenticator App' : 'SMS'}</span>
      </div>
      {method === 'app' && step === 1 && (
        <div style={{ textAlign:'center', padding:'12px 0' }}>
          <div style={{ width:120, height:120, background:'#f1f5f9', borderRadius:12, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'var(--text-muted)' }}>QR Code Here</div>
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:12 }}>Scan with your authenticator app, then enter the 6-digit code.</p>
          <SettingInput label="VERIFICATION CODE" placeholder="000 000" />
          <Btn variant="primary" onClick={() => setStep(2)}>Verify & Activate</Btn>
        </div>
      )}
      {step === 2 && <p style={{ fontSize:13, color:'#22c55e' }}>✓ 2FA is active. Your account is secured.</p>}
      <div style={{ marginTop:16 }}>
        <Btn variant="danger" onClick={() => { setEnabled(false); setStep(0); }}>Disable 2FA</Btn>
      </div>
    </SectionCard>
  );
}

const SESSIONS = [
  { id:1, device:'Windows Desktop', browser:'Chrome', location:'Mumbai, IN', current:true, time:'Now' },
  { id:2, device:'iPhone 15', browser:'Safari', location:'Delhi, IN', current:false, time:'2h ago' },
  { id:3, device:'MacBook Pro', browser:'Firefox', location:'Shimla, IN', current:false, time:'Yesterday' },
];

function Sessions() {
  const [sessions, setSessions] = useState(SESSIONS);
  return (
    <SectionCard title="Active Sessions">
      {sessions.map(s => (
        <div key={s.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #f0f6ff' }}>
          <div style={{ width:40, height:40, borderRadius:10, background:'#eaf1fb', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              {s.device.includes('iPhone') ? <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></> : <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>}
            </svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:500, color:'var(--text-primary)', display:'flex', alignItems:'center', gap:8 }}>
              {s.device} · {s.browser}
              {s.current && <span style={{ background:'#dcfce7', color:'#16a34a', borderRadius:20, padding:'1px 8px', fontSize:10, fontWeight:600 }}>This device</span>}
            </div>
            <div style={{ fontSize:11, color:'var(--text-muted)' }}>{s.location} · {s.time}</div>
          </div>
          {!s.current && <Btn variant="danger" onClick={() => setSessions(p => p.filter(x => x.id !== s.id))}>Log Out</Btn>}
        </div>
      ))}
      {sessions.filter(s => !s.current).length > 0 && (
        <div style={{ marginTop:14 }}>
          <Btn variant="ghost" onClick={() => setSessions(p => p.filter(s => s.current))}>Log Out All Other Devices</Btn>
        </div>
      )}
    </SectionCard>
  );
}

export default function SecurityAccess() {
  return (
    <div>
      <PasswordForm />
      <TwoFA />
      <Sessions />
    </div>
  );
}
