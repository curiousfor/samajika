import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import SettingsPage from './settings/SettingsPage';
import { api } from './data/mockData';
import './styles/globals.css';

// Sidebar only shows on the home feed
const SIDEBAR_ROUTES = ['home'];

function AppShell() {
  const [friends, setFriends]   = useState([]);
  const [stories, setStories]   = useState([]);
  const [posts, setPosts]       = useState([]);
  const [activeNav, setActiveNav] = useState('home');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([api.getFriends(), api.getStories(), api.getPosts()])
      .then(([f, s, p]) => { setFriends(f); setStories(s); setPosts(p); setLoading(false); });
  }, []);

  const sidebarOpen = SIDEBAR_ROUTES.includes(activeNav);

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <div style={{ width:36, height:36, border:'4px solid var(--accent)', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
    </div>
  );

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:20 }}>
      <div style={{
        display:'flex', width:'100%', maxWidth:980, height:640,
        borderRadius:24, overflow:'hidden',
        boxShadow:'var(--app-shadow)',
      }}>

        {/* Sidebar — slides in/out via width + opacity */}
        <div style={{
          width: sidebarOpen ? 260 : 0,
          opacity: sidebarOpen ? 1 : 0,
          overflow: 'hidden',
          flexShrink: 0,
          transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
          // Delay opacity out slightly so width closes first visually
          transitionDelay: sidebarOpen ? '0s, 0s' : '0s, 0.05s',
        }}>
          <Sidebar friends={friends} />
        </div>

        {activeNav === 'settings'
          ? <SettingsPage onBack={() => setActiveNav('home')} />
          : <Feed
              stories={stories} posts={posts}
              activeNav={activeNav} onNavChange={setActiveNav}
              onLike={id => api.likePost(id)}
            />
        }

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
