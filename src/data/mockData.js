// Replace these with real API calls when integrating backend

export const currentUser = {
  id: 'me',
  name: 'You',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
};

export const friends = [
  { id: '1', name: 'Viraj', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viraj', status: 'away', lastSeen: '11min' },
  { id: '2', name: 'Beast', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beast', status: 'online', lastSeen: null },
  { id: '3', name: 'Hardlight', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hardlight', status: 'busy', lastSeen: null },
  { id: '4', name: 'Error', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=error', status: 'away', lastSeen: '5min' },
  { id: '5', name: 'Gwen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gwen', status: 'offline', emoji: '🤩' },
];

export const stories = [
  { id: '1', name: 'quin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quin' },
  { id: '2', name: 'zed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zed' },
  { id: '3', name: 'zaahen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zaahen' },
  { id: '4', name: 'garen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=garen' },
  { id: '5', name: 'Gwen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gwen2' },
];

export const posts = [
  {
    id: '1',
    title: 'How to cook food',
    date: 'APRIL 23',
    day: 'thu 11:00a.m',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    excerpt: 'If u want to cook food then first have a home then a knife and vegetables then some untensils......',
    author: { name: 'viraj', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viraj' },
    views: 76,
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    title: 'How to cook food',
    date: 'APRIL 23',
    day: 'thu 11:00a.m',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    excerpt: 'If u want to cook food then first have a home then a knife and vegetables then some untensils......',
    author: { name: 'viraj', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viraj' },
    views: 76,
    likes: 31,
    comments: 5,
  },
];

// API Service — swap mock returns for real fetch calls
export const api = {
  getFriends: async () => friends,
  getStories: async () => stories,
  getPosts: async () => posts,
  getCurrentUser: async () => currentUser,
  likePost: async (postId) => ({ postId, liked: true }),
  search: async (query) => friends.filter(f => f.name.toLowerCase().includes(query.toLowerCase())),
};
