// ─── Custom Hooks ─────────────────────────────────────────────────────────────
// Each hook is backend-ready: swap the mock data with real fetch() calls

import { useState, useEffect } from 'react';
import { FRIENDS, POSTS, STORY_USERS, CURRENT_USER } from '../data/mockData';

// ── useCurrentUser ─────────────────────────────────────────────────────────
export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with → fetch('/api/me').then(r => r.json()).then(setUser)
    setTimeout(() => { setUser(CURRENT_USER); setLoading(false); }, 300);
  }, []);

  return { user, loading };
}

// ── useFriends ─────────────────────────────────────────────────────────────
export function useFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with → fetch('/api/friends').then(r => r.json()).then(setFriends)
    setTimeout(() => { setFriends(FRIENDS); setLoading(false); }, 400);
  }, []);

  return { friends, loading };
}

// ── useStories ─────────────────────────────────────────────────────────────
export function useStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with → fetch('/api/stories').then(r => r.json()).then(setStories)
    setTimeout(() => { setStories(STORY_USERS); setLoading(false); }, 350);
  }, []);

  return { stories, loading };
}

// ── usePosts ───────────────────────────────────────────────────────────────
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with → fetch('/api/posts/feed').then(r => r.json()).then(setPosts)
    setTimeout(() => { setPosts(POSTS); setLoading(false); }, 500);
  }, []);

  const likePost = (postId) => {
    // TODO: replace with → fetch(`/api/posts/${postId}/like`, { method: 'POST' })
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1, liked: !p.liked } : p)
    );
  };

  return { posts, loading, likePost };
}

// ── useSearch ──────────────────────────────────────────────────────────────
export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    // TODO: replace with → fetch(`/api/search?q=${query}`).then(r => r.json()).then(setResults)
    const timeout = setTimeout(() => {
      setResults(FRIENDS.filter(f => f.username.toLowerCase().includes(query.toLowerCase())));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return { query, setQuery, results };
}
