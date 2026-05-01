// Shared primitives — import from here in every settings section

export function Toggle({ on, onChange, label, sub }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 0', borderBottom:'1px solid #e8f0f8' }}>
      <div>
        <div style={{ fontSize:14, fontWeight:500, color:'var(--text-primary)' }}>{label}</div>
        {sub && <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{sub}</div>}
      </div>
      <button onClick={() => onChange(!on)} style={{
        width:44, height:24, borderRadius:12, border:'none', cursor:'pointer', position:'relative',
        background: on ? 'var(--accent)' : '#cbd5e1', transition:'background 0.22s',
        flexShrink:0, marginLeft:16,
      }}>
        <span style={{
          position:'absolute', top:3, left: on ? 22 : 3, width:18, height:18,
          borderRadius:'50%', background:'#fff',
          boxShadow:'0 1px 4px rgba(0,0,0,0.18)', transition:'left 0.22s',
        }}/>
      </button>
    </div>
  );
}

export function SettingInput({ label, sub, ...props }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text-muted)', letterSpacing:.5, marginBottom:6 }}>{label}</label>
      {sub && <p style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6 }}>{sub}</p>}
      <input {...props} style={{
        width:'100%', padding:'10px 14px', borderRadius:12, border:'1.5px solid #dde8f5',
        fontSize:14, color:'var(--text-primary)', background:'rgba(255,255,255,0.8)', outline:'none',
        transition:'border-color 0.2s', fontFamily:'DM Sans, sans-serif',
        ...(props.style||{}),
      }}
      onFocus={e => e.target.style.borderColor='var(--accent)'}
      onBlur={e => e.target.style.borderColor='#dde8f5'}
      />
    </div>
  );
}

export function SettingSelect({ label, options, value, onChange }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text-muted)', letterSpacing:.5, marginBottom:6 }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width:'100%', padding:'10px 14px', borderRadius:12, border:'1.5px solid #dde8f5',
        fontSize:14, color:'var(--text-primary)', background:'rgba(255,255,255,0.8)', outline:'none',
        cursor:'pointer', fontFamily:'DM Sans, sans-serif',
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function SectionCard({ title, children }) {
  return (
    <div style={{ background:'#fff', borderRadius:18, padding:'22px 24px', marginBottom:16, boxShadow:'0 2px 14px rgba(59,130,246,0.07)' }}>
      {title && <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, color:'var(--text-primary)', marginBottom:18, paddingBottom:12, borderBottom:'1px solid #e8f0f8' }}>{title}</h3>}
      {children}
    </div>
  );
}

export function Btn({ children, variant='primary', onClick, style={} }) {
  const base = {
    padding:'10px 20px', borderRadius:12, border:'none', cursor:'pointer',
    fontSize:14, fontWeight:600, fontFamily:'DM Sans, sans-serif', transition:'all 0.2s', ...style,
  };
  const vars = {
    primary:   { background:'var(--accent)', color:'#fff', boxShadow:'0 4px 12px rgba(59,130,246,0.28)' },
    secondary: { background:'#eaf1fb', color:'var(--accent)', boxShadow:'none' },
    danger:    { background:'#fee2e2', color:'#dc2626', boxShadow:'none' },
    ghost:     { background:'transparent', color:'var(--text-muted)', boxShadow:'none', border:'1.5px solid #dde8f5' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...vars[variant] }}
      onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
      onMouseLeave={e => e.currentTarget.style.opacity='1'}>
      {children}
    </button>
  );
}
