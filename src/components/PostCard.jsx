import { useState } from 'react';

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24"
      fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

export default function PostCard({ post, index, onLike }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLike = () => {
    setLiked(p => !p);
    setLikes(p => liked ? p - 1 : p + 1);
    onLike?.(post.id);
  };

  return (
    <div style={{
      background: 'var(--card-bg)', borderRadius: 20,
      padding: 0, overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(59,130,246,0.08)',
      display: 'flex', gap: 0,
      animation: `fadeUp 0.45s ease ${0.15 + index * 0.1}s both`,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(59,130,246,0.15)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(59,130,246,0.08)'; }}>

      {/* Image */}
      <div style={{ width: 130, height: 130, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {!imgLoaded && (
          <div style={{ width:'100%', height:'100%', background:'var(--sidebar-bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:24, height:24, border:'3px solid var(--accent)', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
          </div>
        )}
        <img src={post.image} alt={post.title} onLoad={() => setImgLoaded(true)}
          style={{ width:'100%', height:'100%', objectFit:'cover', display: imgLoaded ? 'block' : 'none', transition:'transform 0.4s' }}
          onMouseEnter={e => e.target.style.transform='scale(1.06)'}
          onMouseLeave={e => e.target.style.transform='scale(1)'}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', flex: 1, display:'flex', flexDirection:'column', gap: 6 }}>
        {/* Date badge + title */}
        <div style={{ display:'flex', gap: 12, alignItems:'flex-start' }}>
          <div style={{ background:'var(--accent)', borderRadius:10, padding:'6px 10px', textAlign:'center', flexShrink:0 }}>
            <div style={{ color:'#fff', fontSize:9, fontWeight:700, letterSpacing:1 }}>{post.date.split(' ')[0]}</div>
            <div style={{ color:'#fff', fontSize:20, fontWeight:800, lineHeight:1, fontFamily:'Syne' }}>{post.date.split(' ')[1]}</div>
          </div>
          <div>
            <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:15, color:'var(--text-primary)', marginBottom:2 }}>{post.title}</h3>
            <p style={{ fontSize:11, color:'var(--text-muted)' }}>{post.day}</p>
          </div>
        </div>

        <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.6, borderBottom:'1px solid var(--border-inner)', paddingBottom:8 }}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <img src={post.author.avatar} alt={post.author.name} style={{ width:22, height:22, borderRadius:'50%' }}/>
            <span style={{ fontSize:11, color:'var(--text-muted)' }}>posted by <b style={{color:'var(--accent)'}}>{post.author.name}</b></span>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span style={{
              background:'var(--accent)', color:'#fff', borderRadius:20,
              padding:'3px 10px', fontSize:11, fontWeight:600,
              display:'flex', alignItems:'center', gap:4,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              {post.views} views
            </span>
            <button onClick={handleLike} style={{
              background:'none', border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', gap:3,
              color: liked ? '#ef4444' : 'var(--text-muted)', fontSize:12,
              transition:'transform 0.15s',
            }}
            onMouseDown={e => e.currentTarget.style.transform='scale(1.3)'}
            onMouseUp={e => e.currentTarget.style.transform='scale(1)'}>
              <HeartIcon filled={liked}/> {likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
