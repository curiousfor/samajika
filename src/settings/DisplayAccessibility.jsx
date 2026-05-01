import { useState } from 'react';
import { SectionCard, Toggle } from './SettingsUI';

const THEMES = [
  { id:'light', label:'Light', icon:'☀️', desc:'Clean white interface' },
  { id:'dark',  label:'Dark',  icon:'🌙', desc:'Easy on the eyes' },
  { id:'system',label:'System',icon:'💻', desc:'Follows your device' },
];

const FONT_SIZES = ['Small','Default','Large','Extra Large'];
const ACCENT_COLORS = ['#3b82f6','#8b5cf6','#ec4899','#22c55e','#f59e0b','#ef4444'];

export default function DisplayAccessibility() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(1);
  const [accent, setAccent] = useState('#3b82f6');
  const [prefs, setPrefs] = useState({ autoplay:true, reducedMotion:false, compactMode:false, highContrast:false });

  const toggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      <SectionCard title="Theme">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
          {THEMES.map(t => (
            <button key={t.id} onClick={() => setTheme(t.id)} style={{
              padding:'14px 10px', borderRadius:14, cursor:'pointer', textAlign:'center',
              border: theme===t.id ? '2px solid var(--accent)' : '1.5px solid #dde8f5',
              background: theme===t.id ? '#eaf1fb' : '#fff',
              transition:'all 0.18s', fontFamily:'DM Sans,sans-serif',
            }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{t.icon}</div>
              <div style={{ fontWeight:600, fontSize:13, color: theme===t.id ? 'var(--accent)' : 'var(--text-primary)' }}>{t.label}</div>
              <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:2 }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Accent Color">
        <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:14 }}>Personalise your highlight color.</p>
        <div style={{ display:'flex', gap:10 }}>
          {ACCENT_COLORS.map(c => (
            <button key={c} onClick={() => setAccent(c)} style={{
              width:36, height:36, borderRadius:'50%', border: accent===c ? `3px solid ${c}` : '3px solid transparent',
              background:c, cursor:'pointer', outline: accent===c ? `2px solid #fff` : 'none',
              outlineOffset: accent===c ? '-5px' : '0',
              boxShadow: accent===c ? `0 0 0 2px ${c}` : 'none',
              transition:'all 0.18s',
            }}/>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Font Size">
        <div style={{ marginBottom:8 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:11, color:'var(--text-muted)' }}>A</span>
            <span style={{ fontSize:16, fontWeight:600, color:'var(--text-muted)' }}>A</span>
          </div>
          <input type="range" min={0} max={3} value={fontSize} onChange={e => setFontSize(+e.target.value)}
            style={{ width:'100%', accentColor:'var(--accent)' }}/>
          <div style={{ textAlign:'center', marginTop:8, fontSize:13, color:'var(--accent)', fontWeight:600 }}>{FONT_SIZES[fontSize]}</div>
        </div>
      </SectionCard>

      <SectionCard title="Accessibility & Media">
        <Toggle on={prefs.autoplay} label="Autoplay Videos & GIFs"
          sub="Videos play automatically as you scroll." onChange={() => toggle('autoplay')} />
        <Toggle on={prefs.reducedMotion} label="Reduce Motion"
          sub="Minimize animations and transitions." onChange={() => toggle('reducedMotion')} />
        <Toggle on={prefs.compactMode} label="Compact Mode"
          sub="Tighter layout to see more posts at once." onChange={() => toggle('compactMode')} />
        <Toggle on={prefs.highContrast} label="High Contrast"
          sub="Increase contrast for better readability." onChange={() => toggle('highContrast')} />
      </SectionCard>
    </div>
  );
}
