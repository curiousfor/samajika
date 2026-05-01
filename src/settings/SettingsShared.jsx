// Shared UI primitives used across all settings sections

export const S = {
  section: {
    display: 'flex', flexDirection: 'column', gap: 24,
    animation: 'fadeUp 0.35s ease both',
  },
  card: {
    background: '#fff', borderRadius: 16,
    border: '1px solid #e8f0f8', overflow: 'hidden',
  },
  cardHeader: {
    padding: '16px 20px', borderBottom: '1px solid #e8f0f8',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  cardBody: { padding: '8px 0' },
  row: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '13px 20px', transition: 'background 0.15s', cursor: 'default',
  },
  label: { fontFamily: 'Syne', fontWeight: 700, fontSize: 14, color: '#1e293b' },
  sublabel: { fontSize: 12, color: '#64748b', marginTop: 2 },
  input: {
    width: '100%', padding: '10px 14px', borderRadius: 12,
    border: '1.5px solid #e2e8f0', fontSize: 14, color: '#1e293b',
    outline: 'none', fontFamily: 'DM Sans', transition: 'border-color 0.2s',
    background: '#f8fafc',
  },
  textarea: {
    width: '100%', padding: '10px 14px', borderRadius: 12,
    border: '1.5px solid #e2e8f0', fontSize: 14, color: '#1e293b',
    outline: 'none', fontFamily: 'DM Sans', resize: 'vertical',
    background: '#f8fafc', minHeight: 80,
  },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: 600, color: '#64748b', letterSpacing: 0.4 },
  sectionTitle: {
    fontFamily: 'Syne', fontWeight: 800, fontSize: 16, color: '#1e293b',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  btn: {
    padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
    fontFamily: 'Syne', fontWeight: 700, fontSize: 13, transition: 'all 0.2s',
  },
  btnPrimary: { background: '#3b82f6', color: '#fff', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' },
  btnDanger: { background: '#fee2e2', color: '#ef4444' },
  btnGhost: { background: '#f1f5f9', color: '#64748b' },
};

export function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: 46, height: 26, borderRadius: 13, cursor: 'pointer',
      background: value ? '#3b82f6' : '#cbd5e1',
      position: 'relative', transition: 'background 0.25s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 23 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}/>
    </div>
  );
}

export function SettingRow({ label, sub, children, danger }) {
  return (
    <div style={{ ...S.row, background: 'transparent' }}
      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <div>
        <div style={{ ...S.label, color: danger ? '#ef4444' : '#1e293b' }}>{label}</div>
        {sub && <div style={S.sublabel}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

export function SectionCard({ title, icon, children }) {
  return (
    <div style={S.card}>
      <div style={S.cardHeader}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={S.sectionTitle}>{title}</span>
      </div>
      <div style={S.cardBody}>{children}</div>
    </div>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: '#f1f5f9', margin: '0 20px' }} />;
}

export function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      padding: '7px 12px', borderRadius: 9, border: '1.5px solid #e2e8f0',
      fontSize: 13, color: '#1e293b', background: '#f8fafc',
      fontFamily: 'DM Sans', cursor: 'pointer', outline: 'none',
    }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Badge({ text, color = '#3b82f6' }) {
  return (
    <span style={{
      background: color + '18', color, borderRadius: 20, padding: '3px 10px',
      fontSize: 11, fontWeight: 700, fontFamily: 'Syne',
    }}>{text}</span>
  );
}
