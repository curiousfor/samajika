import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import SettingsPage from './settings/SettingsPage';  // ADD THIS
import { api } from './data/mockData';
import './styles/globals.css';

export default function App() {
  const [friends, setFriends] = useState([]);
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeNav, setActiveNav] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getFriends(), api.getStories(), api.getPosts()])
      .then(([f, s, p]) => { setFriends(f); setStories(s); setPosts(p); setLoading(false); });
  }, []);

  const handleLike = async (postId) => {
    await api.likePost(postId);
  };

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <div style={{ width:36, height:36, border:'4px solid var(--accent)', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  );

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:20 }}>
      <div style={{
        display:'flex', width:'100%', maxWidth:980, height:640,
        borderRadius:24, overflow:'hidden',
        boxShadow:'0 24px 80px rgba(30,60,114,0.18), 0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <Sidebar friends={friends} />

        {/* CHANGE: wrap Feed in this conditional */}
        {activeNav === 'settings'
          ? <SettingsPage onBack={() => setActiveNav('home')} />
          : <Feed
              stories={stories} posts={posts}
              activeNav={activeNav} onNavChange={setActiveNav}
              onLike={handleLike}
            />
        }

      </div>
    </div>
  );
}