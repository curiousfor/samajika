export default function Stories({ stories }) {
  return (
    <div style={{
      display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 4,
      scrollbarWidth: 'none', marginBottom: 20,
      animation: 'fadeUp 0.4s ease 0.1s both',
    }}>
      {stories.map((s, i) => (
        <div key={s.id} onClick={() => {}}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            cursor: 'pointer', flexShrink: 0,
            animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
          }}>
          <div style={{
            width: 58, height: 58, borderRadius: '50%', padding: 3,
            background: 'linear-gradient(135deg,#3b82f6,#6366f1,#8b5cf6)',
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(99,102,241,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 4px 12px rgba(99,102,241,0.3)'; }}>
            <img src={s.avatar} alt={s.name} style={{
              width: '100%', height: '100%', borderRadius: '50%',
              border: '2.5px solid var(--main-bg)', objectFit: 'cover',
            }}/>
          </div>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{s.name}</span>
        </div>
      ))}
    </div>
  );
}
