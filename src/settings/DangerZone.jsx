import { useState } from 'react';
import { SectionCard, Btn } from './SettingsUI';

function ConfirmModal({ type, onConfirm, onCancel }) {
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const isDel = type === 'delete';

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(15,23,42,0.55)', backdropFilter:'blur(4px)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000,
      animation:'fadeIn 0.2s ease',
    }}>
      <div style={{
        background:'var(--modal-bg)', borderRadius:22, padding:'28px 28px 24px',
        width:'100%', maxWidth:420, boxShadow:'0 24px 80px rgba(0,0,0,0.22)',
        animation:'fadeUp 0.3s ease',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
          <div style={{ width:44, height:44, borderRadius:12, background: isDel ? '#fee2e2' : '#fef3c7', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDel?'#dc2626':'#d97706'} strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:16, color:'var(--text-primary)' }}>
              {isDel ? 'Delete Account' : 'Deactivate Account'}
            </div>
            <div style={{ fontSize:12, color:'var(--text-muted)' }}>This action {isDel ? 'is permanent and cannot be undone' : 'can be reversed by logging in again'}.</div>
          </div>
        </div>

        <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:18, lineHeight:1.6 }}>
          {isDel
            ? 'All your posts, followers, and data will be permanently deleted. There is no going back. Please be absolutely certain.'
            : 'Your account will be hidden from others. You can reactivate it anytime by logging back in.'}
        </p>

        <div style={{ marginBottom:14 }}>
          <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text-muted)', letterSpacing:.5, marginBottom:6 }}>
            ENTER YOUR PASSWORD TO CONFIRM
          </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width:'100%', padding:'10px 14px', borderRadius:12, border:'1.5px solid var(--input-border)', fontSize:14, outline:'none', background:'var(--input-bg)', fontFamily:'DM Sans,sans-serif', color:'var(--text-primary)' }} />
        </div>

        {isDel && (
          <label style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18, cursor:'pointer' }}>
            <input type="checkbox" checked={check} onChange={e => setCheck(e.target.checked)} style={{ accentColor:'#dc2626' }} />
            <span style={{ fontSize:12, color:'var(--text-muted)' }}>I understand this action is irreversible.</span>
          </label>
        )}

        <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
          <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
          <button onClick={() => password && (!isDel || check) && onConfirm()} style={{
            padding:'10px 20px', borderRadius:12, border:'none', cursor:'pointer',
            background: isDel ? '#dc2626' : '#d97706', color:'#fff', fontWeight:600, fontSize:14,
            fontFamily:'DM Sans,sans-serif', opacity: (password && (!isDel || check)) ? 1 : 0.45,
            transition:'opacity 0.2s',
          }}>
            {isDel ? 'Delete My Account' : 'Deactivate Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DangerZone() {
  const [modal, setModal] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => { setDownloading(false); setDownloaded(true); }, 2000);
  };

  return (
    <div>
      {modal && <ConfirmModal type={modal} onConfirm={() => setModal(null)} onCancel={() => setModal(null)} />}

      <SectionCard title="Your Data">
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div>
            <div style={{ fontWeight:600, fontSize:14, color:'var(--text-primary)', marginBottom:4 }}>Download Your Archive</div>
            <div style={{ fontSize:12, color:'var(--text-muted)' }}>Get a copy of all your posts, images, and account data. Usually ready within 24 hours.</div>
          </div>
          <Btn variant="secondary" onClick={handleDownload} style={{ flexShrink:0 }}>
            {downloading ? '⏳ Preparing...' : downloaded ? '✓ Requested' : '⬇ Request Archive'}
          </Btn>
        </div>
      </SectionCard>

      <div style={{ background:'var(--card-bg)', borderRadius:18, padding:'22px 24px', boxShadow:'var(--card-shadow)', border:'1.5px solid var(--border-danger)' }}>
        <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, color:'#dc2626', marginBottom:18, paddingBottom:12, borderBottom:'1px solid #fee2e2', display:'flex', alignItems:'center', gap:8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Danger Zone
        </h3>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid #fee2e2' }}>
          <div>
            <div style={{ fontWeight:600, fontSize:14, color:'var(--text-primary)' }}>Deactivate Account</div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Temporarily hide your account. You can come back any time.</div>
          </div>
          <Btn variant="ghost" onClick={() => setModal('deactivate')} style={{ borderColor:'#fca5a5', color:'#dc2626', flexShrink:0 }}>Deactivate</Btn>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0' }}>
          <div>
            <div style={{ fontWeight:600, fontSize:14, color:'#dc2626' }}>Delete Account</div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Permanently remove your account and all data. This cannot be undone.</div>
          </div>
          <Btn variant="danger" onClick={() => setModal('delete')} style={{ flexShrink:0 }}>Delete Account</Btn>
        </div>
      </div>
    </div>
  );
}
