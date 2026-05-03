// ─────────────────────────────────────────────────────────────
// Shared primitives — uses only CSS variables, never hex codes.
// Any new component using these will automatically theme-switch.
// ─────────────────────────────────────────────────────────────

export function Toggle({ on, onChange, label, sub }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 0', borderBottom:'1px solid var(--border-inner)' }}>
      <div>
        <div style={{ fontSize:14, fontWeight:500, color:'var(--text-primary)' }}>{label}</div>
        {sub && <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{sub}</div>}
      </div>
      <button onClick={() => onChange(!on)} style={{
        width:44, height:24, borderRadius:12, border:'none', cursor:'pointer', position:'relative',
        background: on ? 'var(--accent)' : 'var(--toggle-off)', transition:'background 0.22s',
        flexShrink:0, marginLeft:16,
        boxShadow: on ? '0 0 8px var(--accent-shadow)' : 'none',
      }}>
        <span style={{
          position:'absolute', top:3, left: on ? 22 : 3, width:18, height:18,
          borderRadius:'50%', background:'var(--toggle-thumb)',
          boxShadow:'0 1px 4px rgba(0,0,0,0.25)', transition:'left 0.22s',
        }}/>
      </button>
    </div>
  );
}

export function SettingInput({ label, sub, ...props }) {
  return (
    <div style={{ marginBottom:16 }}>
      {label && <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--text-muted)', letterSpacing:.6, marginBottom:6 }}>{label}</label>}
      {sub && <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6 }}>{sub}</p>}
      <input {...props} style={{
        width:'100%', padding:'10px 14px', borderRadius:12,
        border:'1.5px solid var(--input-border)',
        fontSize:14, color:'var(--text-primary)',
        background:'var(--input-bg)', outline:'none',
        transition:'border-color 0.2s, box-shadow 0.2s',
        fontFamily:'DM Sans, sans-serif',
        ...(props.style||{}),
      }}
      onFocus={e => { e.target.style.borderColor='var(--accent)'; e.target.style.boxShadow='0 0 0 3px var(--accent-dim)'; }}
      onBlur={e =>  { e.target.style.borderColor='var(--input-border)'; e.target.style.boxShadow='none'; }}
      placeholder={props.placeholder}
      />
    </div>
  );
}

export function SettingSelect({ label, options, value, onChange }) {
  return (
    <div style={{ marginBottom:16 }}>
      {label && <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--text-muted)', letterSpacing:.6, marginBottom:6 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width:'100%', padding:'10px 14px', borderRadius:12,
        border:'1.5px solid var(--input-border)',
        fontSize:14, color:'var(--text-primary)',
        background:'var(--input-bg)', outline:'none', cursor:'pointer',
        fontFamily:'DM Sans, sans-serif', transition:'border-color 0.2s',
      }}
      onFocus={e => e.target.style.borderColor='var(--accent)'}
      onBlur={e =>  e.target.style.borderColor='var(--input-border)'}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function SectionCard({ title, children, danger }) {
  return (
    <div style={{
      background:'var(--card-bg)', borderRadius:18, padding:'20px 22px', marginBottom:14,
      boxShadow:'var(--card-shadow)',
      border: danger ? '1.5px solid var(--border-danger)' : '1px solid var(--border)',
    }}>
      {title && (
        <h3 style={{
          fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:14,
          color: danger ? 'var(--busy)' : 'var(--text-primary)',
          marginBottom:16, paddingBottom:11,
          borderBottom:'1px solid var(--border-inner)',
          display:'flex', alignItems:'center', gap:7,
        }}>{title}</h3>
      )}
      {children}
    </div>
  );
}

export function Btn({ children, variant='primary', onClick, style={} }) {
  const base = {
    padding:'9px 18px', borderRadius:11, border:'none', cursor:'pointer',
    fontSize:13, fontWeight:600, fontFamily:'DM Sans, sans-serif',
    transition:'opacity 0.18s, transform 0.15s', ...style,
  };
  const vars = {
    primary:   { background:'var(--accent)', color:'var(--text-on-accent)', boxShadow:'0 4px 12px var(--accent-shadow)' },
    secondary: { background:'var(--btn-secondary-bg)', color:'var(--accent)' },
    danger:    { background:'rgba(239,68,68,0.12)', color:'#ef4444' },
    ghost:     { background:'transparent', color:'var(--text-muted)', border:'1.5px solid var(--btn-ghost-border)' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...vars[variant] }}
      onMouseEnter={e => e.currentTarget.style.opacity='0.8'}
      onMouseLeave={e => e.currentTarget.style.opacity='1'}
      onMouseDown={e => e.currentTarget.style.transform='scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform='scale(1)'}>
      {children}
    </button>
  );
}
