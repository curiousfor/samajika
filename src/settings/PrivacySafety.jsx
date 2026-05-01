import { useState } from 'react';
import { SectionCard, Toggle, SettingSelect, Btn } from './SettingsUI';

const WHO_OPTS = [
  { value:'everyone', label:'Everyone' },
  { value:'followers', label:'People You Follow' },
  { value:'none', label:'No One' },
];

function MutedWords({ words, onAdd, onRemove }) {
  const [input, setInput] = useState('');
  const add = () => {
    const w = input.trim();
    if (w && !words.includes(w)) { onAdd(w); setInput(''); }
  };
  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a word or phrase..."
          style={{ flex:1, padding:'9px 14px', borderRadius:12, border:'1.5px solid #dde8f5', fontSize:13, outline:'none', fontFamily:'DM Sans,sans-serif', color:'var(--text-primary)' }}
          onFocus={e => e.target.style.borderColor='var(--accent)'}
          onBlur={e => e.target.style.borderColor='#dde8f5'} />
        <Btn variant="primary" onClick={add}>Add</Btn>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {words.map(w => (
          <span key={w} style={{ display:'flex', alignItems:'center', gap:5, background:'#eaf1fb', color:'var(--accent)', borderRadius:20, padding:'4px 12px', fontSize:12, fontWeight:500 }}>
            {w}
            <button onClick={() => onRemove(w)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:14, lineHeight:1, padding:0 }}>×</button>
          </span>
        ))}
        {words.length === 0 && <span style={{ fontSize:12, color:'var(--text-muted)' }}>No muted words yet.</span>}
      </div>
    </div>
  );
}

function UserListItem({ user, type, onAction }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid #f0f6ff' }}>
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt={user} style={{ width:38, height:38, borderRadius:'50%', border:'2px solid #dde8f5' }}/>
      <span style={{ flex:1, fontWeight:500, fontSize:14, color:'var(--text-primary)' }}>@{user}</span>
      <Btn variant={type === 'blocked' ? 'secondary' : 'ghost'} onClick={() => onAction(user)}>
        {type === 'blocked' ? 'Unblock' : 'Unmute'}
      </Btn>
    </div>
  );
}

export default function PrivacySafety() {
  const [priv, setPriv] = useState({ privateAccount:false, approveFollowers:false, hideActivity:false });
  const [interact, setInteract] = useState({ mentions:'everyone', dms:'followers', tags:'everyone' });
  const [mutedWords, setMutedWords] = useState(['spam', 'promo']);
  const [blocked, setBlocked] = useState(['shadowbanned_user', 'troll99']);
  const [muted, setMuted] = useState(['annoying_bot']);

  const togglePriv = k => setPriv(p => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      <SectionCard title="Account Visibility">
        <Toggle on={priv.privateAccount} onChange={() => togglePriv('privateAccount')}
          label="Private Account"
          sub="Only approved followers can see your posts and profile." />
        <Toggle on={priv.approveFollowers} onChange={() => togglePriv('approveFollowers')}
          label="Manually Approve Followers"
          sub="Review follower requests before they're approved." />
        <Toggle on={priv.hideActivity} onChange={() => togglePriv('hideActivity')}
          label="Hide Activity Status"
          sub="Others won't see when you were last active." />
      </SectionCard>

      <SectionCard title="Interaction Controls">
        <SettingSelect label="WHO CAN MENTION YOU" options={WHO_OPTS} value={interact.mentions} onChange={v => setInteract(p => ({ ...p, mentions:v }))} />
        <SettingSelect label="WHO CAN SEND YOU DMs" options={WHO_OPTS} value={interact.dms} onChange={v => setInteract(p => ({ ...p, dms:v }))} />
        <SettingSelect label="WHO CAN TAG YOU IN POSTS" options={WHO_OPTS} value={interact.tags} onChange={v => setInteract(p => ({ ...p, tags:v }))} />
      </SectionCard>

      <SectionCard title="Muted Words & Phrases">
        <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:14 }}>Posts containing these words won't appear in your feed.</p>
        <MutedWords words={mutedWords}
          onAdd={w => setMutedWords(p => [...p, w])}
          onRemove={w => setMutedWords(p => p.filter(x => x !== w))} />
      </SectionCard>

      <SectionCard title="Blocked Users">
        {blocked.length ? blocked.map(u => <UserListItem key={u} user={u} type="blocked" onAction={u => setBlocked(p => p.filter(x => x !== u))} />) :
          <p style={{ fontSize:13, color:'var(--text-muted)', padding:'8px 0' }}>No blocked users.</p>}
      </SectionCard>

      <SectionCard title="Muted Users">
        {muted.length ? muted.map(u => <UserListItem key={u} user={u} type="muted" onAction={u => setMuted(p => p.filter(x => x !== u))} />) :
          <p style={{ fontSize:13, color:'var(--text-muted)', padding:'8px 0' }}>No muted users.</p>}
      </SectionCard>
    </div>
  );
}
