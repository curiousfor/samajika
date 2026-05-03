import { useState, useRef } from 'react';
import { SectionCard, SettingInput, Btn } from './SettingsUI';

function AvatarUpload({ avatar, onUpload }) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:24 }}>
      <div style={{ position:'relative', cursor:'pointer' }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={() => ref.current.click()}>
        <img src={avatar} alt="avatar" style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--border)' }}/>
        <div style={{
          position:'absolute', inset:0, borderRadius:'50%', background:'rgba(59,130,246,0.55)',
          display:'flex', alignItems:'center', justifyContent:'center',
          opacity: hover ? 1 : 0, transition:'opacity 0.2s',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
        <input ref={ref} type="file" accept="image/*" style={{ display:'none' }} onChange={e => onUpload(e.target.files[0])} />
      </div>
      <div>
        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, color:'var(--text-primary)' }}>Profile Photo</div>
        <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:10 }}>JPG, PNG or GIF · Max 5MB</div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="secondary" onClick={() => ref.current.click()}>Upload</Btn>
          <Btn variant="ghost">Remove</Btn>
        </div>
      </div>
    </div>
  );
}

function CoverUpload() {
  const ref = useRef();
  const [cover, setCover] = useState(null);
  return (
    <div style={{ marginBottom:24 }}>
      <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', letterSpacing:.5, marginBottom:8 }}>COVER PHOTO</div>
      <div style={{
        height:110, borderRadius:14, border:'2px dashed var(--cover-dash-border)', background: cover ? `url(${cover}) center/cover` : 'var(--cover-bg)',
        display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', overflow:'hidden', position:'relative',
      }} onClick={() => ref.current.click()}>
        {!cover && (
          <div style={{ textAlign:'center', color:'var(--text-muted)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom:6 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <div style={{ fontSize:13 }}>Click to upload cover</div>
          </div>
        )}
        {cover && <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Btn variant="secondary" onClick={e => { e.stopPropagation(); setCover(null); }}>Remove</Btn>
        </div>}
        <input ref={ref} type="file" accept="image/*" style={{ display:'none' }}
          onChange={e => { const f=e.target.files[0]; if(f) setCover(URL.createObjectURL(f)); }} />
      </div>
    </div>
  );
}

export default function AccountProfile() {
  const [form, setForm] = useState({
    displayName:'Viraj', username:'viraj', bio:'Building things on the internet ✨', website:'', email:'viraj@example.com', phone:''
  });
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=viraj');
  const [saved, setSaved] = useState(false);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleAvatarUpload = file => { if (file) setAvatar(URL.createObjectURL(file)); };

  const charLeft = 160 - form.bio.length;

  return (
    <div>
      <SectionCard title="Media">
        <AvatarUpload avatar={avatar} onUpload={handleAvatarUpload} />
        <CoverUpload />
      </SectionCard>

      <SectionCard title="Profile Details">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
          <SettingInput label="DISPLAY NAME" value={form.displayName} onChange={set('displayName')} placeholder="Your name" />
          <SettingInput label="USERNAME" value={form.username} onChange={set('username')} placeholder="@handle" />
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text-muted)', letterSpacing:.5, marginBottom:6 }}>BIO</label>
          <textarea value={form.bio} onChange={set('bio')} maxLength={160}
            rows={3} placeholder="Tell the world about yourself..."
            style={{ width:'100%', padding:'10px 14px', borderRadius:12, border:'1.5px solid var(--input-border)', fontSize:14, color:'var(--text-primary)', background:'var(--input-bg)', outline:'none', resize:'none', fontFamily:'DM Sans,sans-serif', transition:'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor='var(--accent)'}
            onBlur={e => e.target.style.borderColor='var(--input-border)'} />
          <div style={{ textAlign:'right', fontSize:11, color: charLeft < 20 ? '#ef4444' : 'var(--text-muted)' }}>{charLeft} left</div>
        </div>
        <SettingInput label="WEBSITE" value={form.website} onChange={set('website')} placeholder="https://yoursite.com" type="url" />
      </SectionCard>

      <SectionCard title="Personal Information">
        <SettingInput label="EMAIL ADDRESS" value={form.email} onChange={set('email')} type="email" />
        <SettingInput label="PHONE NUMBER" value={form.phone} onChange={set('phone')} type="tel" placeholder="+1 (555) 000-0000" />
        <p style={{ fontSize:11, color:'var(--text-muted)', marginTop:-8, marginBottom:16 }}>
          Phone is used for 2FA only and won't be shown publicly.
        </p>
      </SectionCard>

      <div style={{ display:'flex', justifyContent:'flex-end', gap:10 }}>
        <Btn variant="ghost">Discard</Btn>
        <Btn variant="primary" onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </Btn>
      </div>
    </div>
  );
}
