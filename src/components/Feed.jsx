import Navbar from './Navbar';
import Stories from './Stories';
import PostCard from './PostCard';

export default function Feed({ stories, posts, activeNav, onNavChange, onLike }) {
  return (
    <main style={{
      flex: 1, background: 'var(--main-bg)',
      borderRadius: '0 24px 24px 0', padding: '28px 28px 20px',
      display: 'flex', flexDirection: 'column', minHeight: 0,
      position: 'relative',
    }}>
      <Navbar active={activeNav} onNavChange={onNavChange} />
      <Stories stories={stories} />

      {/* View count bubble */}
      <div style={{
        position:'absolute', top:18, right:24,
        fontFamily:'Syne', fontWeight:700, fontSize:13, color:'var(--text-muted)',
        animation:'fadeIn 0.5s ease',
      }}>76</div>

      {/* Posts */}
      <div style={{ display:'flex', flexDirection:'column', gap:16, overflowY:'auto', scrollbarWidth:'none', flex:1 }}>
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} onLike={onLike} />
        ))}
      </div>

      {/* Profile button bottom-right */}
      <button style={{
        position:'absolute', bottom:20, right:24,
        width:42, height:42, borderRadius:'50%', border:'none', cursor:'pointer',
        background:'var(--card-bg)', boxShadow:'0 4px 16px rgba(59,130,246,0.15)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'var(--text-muted)', transition:'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='scale(1.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.transform='scale(1)'; }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
    </main>
  );
}
