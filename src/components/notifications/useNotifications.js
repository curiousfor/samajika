import { useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────
// useNotifications — backend-ready hook
//
// TO CONNECT REAL BACKEND:
//   1. Replace `simulateIncoming` with a WebSocket listener:
//      const ws = new WebSocket('wss://yourapi.com/ws/notifications')
//      ws.onmessage = e => addNotification(JSON.parse(e.data))
//
//   2. Replace mock fetch in `useEffect` with:
//      const data = await fetch('/api/notifications').then(r => r.json())
//      setNotifications(data)
//
//   3. Replace markRead / markAllRead / dismiss with real API calls:
//      await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' })
// ─────────────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS = [
  { id:'n1', type:'message',    read:false, time:'2 min ago',  group:'new',
    title:'Stranger #4821',     body:'Sent you a new message',
    preview:'"tokyo! you should visit sometime"',
    avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=stranger1' },
  { id:'n2', type:'connection', read:false, time:'15 min ago', group:'new',
    title:'New connection',     body:'Stranger #3302 wants to reconnect with you',
    avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=stranger2' },
  { id:'n3', type:'badge',      read:false, time:'1 hr ago',   group:'new',
    title:'You earned a badge', body:'Congrats! You unlocked the "Social Butterfly" badge for 10 chats',
    avatar:null },
  { id:'n4', type:'missed_call',read:true,  time:'3 hr ago',   group:'earlier',
    title:'Missed video call',  body:'Stranger #7104 tried to start a video call with you',
    avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=stranger3' },
  { id:'n5', type:'like',       read:true,  time:'5 hr ago',   group:'earlier',
    title:'Viraj liked your post', body:'Your post "How to cook food" got a new like',
    avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=viraj' },
  { id:'n6', type:'follow',     read:true,  time:'Yesterday',  group:'earlier',
    title:'Beast started following you', body:'You have a new follower',
    avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=beast' },
  { id:'n7', type:'mention',    read:true,  time:'Yesterday',  group:'earlier',
    title:'Hardlight mentioned you', body:'Hardlight mentioned you in a comment',
    avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=hardlight' },
  { id:'n8', type:'system',     read:true,  time:'2 days ago', group:'earlier',
    title:'Account verified',   body:'Your account has been verified successfully ✓',
    avatar:null },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial load — replace with real API fetch
  useEffect(() => {
    setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setLoading(false);
    }, 400);
  }, []);

  // Simulate incoming real-time notification — replace with WebSocket
  const simulateIncoming = useCallback(() => {
    const incoming = {
      id: 'n_' + Date.now(),
      type: 'message',
      read: false,
      time: 'just now',
      group: 'new',
      title: 'New notification',
      body: 'You have a new activity on your profile',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now(),
    };
    setNotifications(prev => [incoming, ...prev]);
  }, []);

  const markRead = useCallback((id) => {
    // Replace body with: await fetch(`/api/notifications/${id}/read`, { method:'PATCH' })
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read:true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    // Replace with: await fetch('/api/notifications/read-all', { method:'POST' })
    setNotifications(prev => prev.map(n => ({ ...n, read:true })));
  }, []);

  const dismiss = useCallback((id) => {
    // Replace with: await fetch(`/api/notifications/${id}`, { method:'DELETE' })
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return { notifications, loading, unreadCount, markRead, markAllRead, dismiss, simulateIncoming };
}
