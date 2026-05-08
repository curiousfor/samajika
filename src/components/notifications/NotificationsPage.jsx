import { useState, useMemo } from 'react';

import NotificationItem from './NotificationItem';

const TABS = [
  { id:'all',      label:'All'      },
  { id:'message',  label:'Messages' },
  { id:'activity', label:'Activity' },
  { id:'system',   label:'System'   },
];

const ACTIVITY_TYPES = ['like','follow','mention','badge','connection','missed_call'];
const SYSTEM_TYPES   = ['system','badge'];

function Tab({ tab, active, count, onClick }) {
  const isActive = active === tab.id;
  return (
    <button onClick={() => onClick(tab.id)} style={{
      display:'flex', alignItems:'center', gap:6,
      padding:'7px 16px', borderRadius:20, border:'1.5px solid var(--border)',
      cursor:'pointer', fontFamily:'DM Sans, sans-serif', fontWeight: isActive ? 600 : 400,
      fontSize:13, transition:'all 0.2s',
      background: isActive ? 'var(--accent)' : 'var(--card-bg)',
      color: isActive ? 'var(--text-on-accent)' : 'var(--text-muted)',
      boxShadow: isActive ? '0 4px 12px var(--accent-shadow)' : 'none',
    }}>
      {tab.label}
      {count > 0 && (
        <span style={{
          background: isActive ? 'rgba(255,255,255,0.3)' : 'var(--accent)',
          color: isActive ? '#fff' : 'var(--text-on-accent)',
          borderRadius:20, padding:'1px 7px', fontSize:10, fontWeight:700,
          minWidth:18, textAlign:'center',
        }}>{count}</span>
      )}
    </button>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign:'center', padding:'48px 24px', color:'var(--text-muted)' }}>
      <div style={{ fontSize:40, marginBottom:12 }}>🔔</div>
      <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:16, color:'var(--text-primary)', marginBottom:6 }}>All caught up!</div>
      <div style={{ fontSize:13 }}>No notifications in this category.</div>
    </div>
  );
}

function LoadingSkeleton() {
  return Array.from({ length:4 }).map((_, i) => (
    <div key={i} style={{
      display:'flex', gap:12, padding:'14px 16px', borderRadius:14,
      border:'1px solid var(--border-inner)', marginBottom:8,
      animation:`fadeUp 0.3s ease ${i*0.07}s both`,
    }}>
      <div style={{ width:42, height:42, borderRadius:'50%', background:'var(--border)', flexShrink:0, animation:'pulse 1.5s infinite' }}/>
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8, justifyContent:'center' }}>
        <div style={{ width:'55%', height:10, borderRadius:6, background:'var(--border)', animation:'pulse 1.5s infinite' }}/>
        <div style={{ width:'80%', height:8,  borderRadius:6, background:'var(--border)', animation:'pulse 1.5s infinite' }}/>
      </div>
    </div>
  ));
}

export default function NotificationsPage({ notifications = [], unreadCount = 0, onMarkRead, onMarkAllRead, onDismiss, simulateIncoming, onBack }) {
  const loading = notifications.length === 0 && false; // loading handled by parent
  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState('all'); // all | unread

  // Filter by tab
  const filtered = useMemo(() => {
    let list = notifications;
    if (activeTab === 'message')  list = list.filter(n => n.type === 'message');
    if (activeTab === 'activity') list = list.filter(n => ACTIVITY_TYPES.includes(n.type));
    if (activeTab === 'system')   list = list.filter(n => SYSTEM_TYPES.includes(n.type));
    if (filter === 'unread')      list = list.filter(n => !n.read);
    return list;
  }, [notifications, activeTab, filter]);

  // Group by new / earlier
  const grouped = useMemo(() => ({
    new:     filtered.filter(n => n.group === 'new'),
    earlier: filtered.filter(n => n.group === 'earlier'),
  }), [filtered]);

  // Tab unread counts
  const counts = useMemo(() => ({
    all:      notifications.filter(n => !n.read).length,
    message:  notifications.filter(n => !n.read && n.type === 'message').length,
    activity: notifications.filter(n => !n.read && ACTIVITY_TYPES.includes(n.type)).length,
    system:   notifications.filter(n => !n.read && SYSTEM_TYPES.includes(n.type)).length,
  }), [notifications]);

  const GroupLabel = ({ label }) => (
    <div style={{ fontSize:11, fontWeight:700, letterSpacing:1, color:'var(--text-muted)', fontFamily:'Syne, sans-serif', margin:'16px 0 10px', paddingLeft:4 }}>
      {label}
    </div>
  );

  return (
    <div style={{ display:'flex', flex:1, background:'var(--main-bg)', borderRadius:'0 24px 24px 0', flexDirection:'column', overflow:'hidden', animation:'fadeIn 0.3s ease' }}>

      {/* Header */}
      <div style={{ padding:'22px 24px 16px', borderBottom:'1px solid var(--border-inner)', background:'var(--main-bg)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={onBack} style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              width:32, height:32, borderRadius:10, border:'none', cursor:'pointer',
              background:'var(--card-bg)', color:'var(--text-muted)', transition:'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='var(--text-on-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.color='var(--text-muted)'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:20, color:'var(--text-primary)', margin:0 }}>
              Notifications
              {unreadCount > 0 && (
                <span style={{ marginLeft:8, background:'var(--accent)', color:'var(--text-on-accent)', borderRadius:20, padding:'2px 9px', fontSize:12, fontWeight:700, verticalAlign:'middle' }}>
                  {unreadCount}
                </span>
              )}
            </h2>
          </div>

          {/* Actions */}
          <div style={{ display:'flex', gap:8 }}>
            {/* Unread filter toggle */}
            <button onClick={() => setFilter(f => f === 'all' ? 'unread' : 'all')} style={{
              padding:'6px 12px', borderRadius:20, border:'1.5px solid var(--border)',
              cursor:'pointer', fontSize:12, fontWeight:500, fontFamily:'DM Sans, sans-serif',
              background: filter === 'unread' ? 'var(--accent-dim)' : 'var(--card-bg)',
              color: filter === 'unread' ? 'var(--accent)' : 'var(--text-muted)',
              transition:'all 0.18s',
            }}>
              {filter === 'unread' ? 'Unread only' : 'All'}
            </button>

            {/* Mark all read */}
            {unreadCount > 0 && (
              <button onClick={onMarkAllRead} style={{
                padding:'6px 14px', borderRadius:20, border:'none',
                cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'DM Sans, sans-serif',
                background:'var(--accent)', color:'var(--text-on-accent)',
                boxShadow:'0 4px 10px var(--accent-shadow)', transition:'opacity 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                Mark all read
              </button>
            )}

            {/* Dev: simulate incoming — remove in production */}
            <button onClick={simulateIncoming} title="Simulate incoming (dev only)" style={{
              width:32, height:32, borderRadius:10, border:'1.5px solid var(--border)',
              cursor:'pointer', background:'var(--card-bg)', color:'var(--text-muted)',
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--card-bg)'; e.currentTarget.style.color='var(--text-muted)'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none' }}>
          {TABS.map(tab => <Tab key={tab.id} tab={tab} active={activeTab} count={counts[tab.id]} onClick={setActiveTab} />)}
        </div>
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 20px 20px', scrollbarWidth:'none' }}>
        {loading ? (
          <div style={{ paddingTop:12 }}><LoadingSkeleton /></div>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {grouped.new.length > 0 && (
              <>
                <GroupLabel label="NEW" />
                {grouped.new.map((n, i) => (
                  <NotificationItem key={n.id} notif={n} index={i} onMarkRead={onMarkRead} onDismiss={onDismiss} />
                ))}
              </>
            )}
            {grouped.earlier.length > 0 && (
              <>
                <GroupLabel label="EARLIER" />
                {grouped.earlier.map((n, i) => (
                  <NotificationItem key={n.id} notif={n} index={i + grouped.new.length} onMarkRead={onMarkRead} onDismiss={onDismiss} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
