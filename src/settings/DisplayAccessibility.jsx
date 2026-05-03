import { useState } from 'react';
import { SectionCard, Toggle } from './SettingsUI';
import { useTheme } from '../context/ThemeContext';

// Preview cards use intentional hardcoded colors — they're showing
// what each theme looks like, not consuming theme variables.
const THEMES = [
  {
    id: 'light', label: 'Light',
    preview: (
      <div style={{ height:60, borderRadius:9, background:'#eaf1fb', border:'1.5px solid #dde8f5', overflow:'hidden', padding:8, display:'flex', flexDirection:'column', gap:5 }}>
        <div style={{ display:'flex', gap:5 }}>
          <div style={{ width:18, height:7, borderRadius:3, background:'#dde8f5' }}/>
          <div style={{ width:30, height:7, borderRadius:3, background:'#3b82f6' }}/>
        </div>
        <div style={{ width:'100%', height:11, borderRadius:3, background:'#fff' }}/>
        <div style={{ width:'65%', height:7, borderRadius:3, background:'#fff' }}/>
        <div style={{ width:'80%', height:7, borderRadius:3, background:'#f0f6ff' }}/>
      </div>
    ),
  },
  {
    id: 'dark', label: 'Dark',
    preview: (
      <div style={{ height:60, borderRadius:9, background:'#1e293b', border:'1.5px solid #0f172a', overflow:'hidden', padding:8, display:'flex', flexDirection:'column', gap:5 }}>
        <div style={{ display:'flex', gap:5 }}>
          <div style={{ width:18, height:7, borderRadius:3, background:'#0f172a' }}/>
          <div style={{ width:30, height:7, borderRadius:3, background:'#60a5fa' }}/>
        </div>
        <div style={{ width:'100%', height:11, borderRadius:3, background:'#0f172a' }}/>
        <div style={{ width:'65%', height:7, borderRadius:3, background:'#0f172a' }}/>
        <div style={{ width:'80%', height:7, borderRadius:3, background:'#0a0f1e' }}/>
      </div>
    ),
  },
  {
    id: 'neon', label: 'Neon',
    preview: (
      <div style={{ height:60, borderRadius:9, background:'#0d0d16', border:'1px solid rgba(0,245,255,0.2)', overflow:'hidden', padding:8, display:'flex', flexDirection:'column', gap:5, boxShadow:'0 0 12px rgba(0,245,255,0.06)' }}>
        <div style={{ display:'flex', gap:5 }}>
          <div style={{ width:18, height:7, borderRadius:3, background:'#1a1a2e' }}/>
          <div style={{ width:30, height:7, borderRadius:3, background:'#00f5ff', boxShadow:'0 0 6px rgba(0,245,255,0.7)' }}/>
        </div>
        <div style={{ width:'100%', height:11, borderRadius:3, background:'#0a0a0f', border:'1px solid rgba(0,245,255,0.1)' }}/>
        <div style={{ width:'65%', height:7, borderRadius:3, background:'rgba(0,245,255,0.06)', border:'1px solid rgba(0,245,255,0.1)' }}/>
        <div style={{ width:'80%', height:7, borderRadius:3, background:'rgba(255,45,120,0.08)', border:'1px solid rgba(255,45,120,0.15)' }}/>
      </div>
    ),
  },
];

const ACCENT_COLORS = [
  { color:'#3b82f6', label:'Blue'   },
  { color:'#8b5cf6', label:'Purple' },
  { color:'#ec4899', label:'Pink'   },
  { color:'#22c55e', label:'Green'  },
  { color:'#f59e0b', label:'Amber'  },
  { color:'#ef4444', label:'Red'    },
];

const FONT_SIZES = ['Small','Default','Large','Extra Large'];

export default function DisplayAccessibility() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(1);
  const [accent, setAccent] = useState('#3b82f6');
  const [prefs, setPrefs] = useState({ autoplay:true, reducedMotion:false, compactMode:false, highContrast:false });

  const toggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const handleAccent = color => {
    setAccent(color);
    document.documentElement.style.setProperty('--accent', color);
  };

  const handleFontSize = val => {
    setFontSize(val);
    const sizes = ['13px','15px','17px','19px'];
    document.documentElement.style.fontSize = sizes[val];
  };

  return (
    <div>
      <SectionCard title="Theme">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:6 }}>
          {THEMES.map(t => {
            const isActive = theme === t.id;
            const isNeon   = t.id === 'neon';
            return (
              <button key={t.id} onClick={() => setTheme(t.id)} style={{
                padding:'11px 9px 10px', borderRadius:13, cursor:'pointer', textAlign:'center',
                border: isActive
                  ? (isNeon ? '2px solid #00f5ff' : '2px solid var(--accent)')
                  : '1.5px solid var(--border)',
                background: isActive
                  ? (isNeon ? 'rgba(0,245,255,0.06)' : 'var(--accent-dim)')
                  : 'var(--card-bg)',
                transition:'all 0.2s', fontFamily:'DM Sans, sans-serif',
                boxShadow: isActive && isNeon ? '0 0 18px rgba(0,245,255,0.2)' : 'none',
              }}>
                <div style={{ marginBottom:8 }}>{t.preview}</div>
                <div style={{ fontWeight:600, fontSize:12, color: isActive ? (isNeon ? '#00f5ff' : 'var(--accent)') : 'var(--text-muted)' }}>
                  {t.label}
                </div>
                {isActive && (
                  <div style={{ width:5, height:5, borderRadius:'50%', margin:'5px auto 0', background: isNeon ? '#00f5ff' : 'var(--accent)', boxShadow: isNeon ? '0 0 8px #00f5ff' : 'none' }}/>
                )}
              </button>
            );
          })}
        </div>
        <p style={{ fontSize:11, color:'var(--text-muted)', marginTop:8 }}>Saved automatically and applied across the whole app.</p>
      </SectionCard>

      {/* Accent color — hidden in neon (has its own fixed palette) */}
      {theme !== 'neon' && (
        <SectionCard title="Accent Color">
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:14 }}>Personalise your highlight color.</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {ACCENT_COLORS.map(({ color, label }) => (
              <button key={color} onClick={() => handleAccent(color)} title={label} style={{
                width:34, height:34, borderRadius:'50%', background:color, cursor:'pointer',
                border:'none', outline: accent === color ? `3px solid ${color}` : '3px solid transparent',
                outlineOffset:3, transition:'outline 0.18s, transform 0.15s',
                transform: accent === color ? 'scale(1.15)' : 'scale(1)',
              }}/>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Neon palette info */}
      {theme === 'neon' && (
        <SectionCard title="Neon Palette">
          <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:14 }}>Neon uses its own signature color system.</p>
          <div style={{ display:'flex', gap:14 }}>
            {[['#00f5ff','Cyan'],['#ff2d78','Pink'],['#bf00ff','Purple'],['#39ff14','Green']].map(([c, l]) => (
              <div key={c} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{ width:34, height:34, borderRadius:'50%', background:c, boxShadow:`0 0 14px ${c}99` }}/>
                <span style={{ fontSize:10, color:'var(--text-muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard title="Font Size">
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
          <span style={{ fontSize:11, color:'var(--text-muted)' }}>A</span>
          <span style={{ fontSize:18, fontWeight:600, color:'var(--text-muted)' }}>A</span>
        </div>
        <input type="range" min={0} max={3} value={fontSize}
          onChange={e => handleFontSize(+e.target.value)}
          style={{ width:'100%', accentColor:'var(--accent)', cursor:'pointer' }}/>
        <div style={{ textAlign:'center', marginTop:10, fontSize:13, color:'var(--accent)', fontWeight:600 }}>
          {FONT_SIZES[fontSize]}
        </div>
      </SectionCard>

      <SectionCard title="Accessibility & Media">
        <Toggle on={prefs.autoplay}      label="Autoplay Videos & GIFs"  sub="Videos play automatically as you scroll."          onChange={() => toggle('autoplay')} />
        <Toggle on={prefs.reducedMotion} label="Reduce Motion"            sub="Minimize animations and transitions."              onChange={() => toggle('reducedMotion')} />
        <Toggle on={prefs.compactMode}   label="Compact Mode"             sub="Tighter layout to see more posts at once."         onChange={() => toggle('compactMode')} />
        <Toggle on={prefs.highContrast}  label="High Contrast"            sub="Increase contrast for better readability."         onChange={() => toggle('highContrast')} />
      </SectionCard>
    </div>
  );
}
