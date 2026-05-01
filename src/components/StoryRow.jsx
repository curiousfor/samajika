// ─── StoryRow Component ───────────────────────────────────────────────────────
import React, { useState } from 'react';
import Avatar from './Avatar';

function StoryBubble({ story, index, onClick }) {
  const [viewed, setViewed] = useState(false);

  const handleClick = () => {
    setViewed(true);
    onClick?.(story);
  };

  return (
    <button
      className={`story-bubble ${viewed ? 'viewed' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={handleClick}
      aria-label={`${story.username}'s story`}
    >
      <Avatar
        src={story.avatar}
        name={story.username}
        size={56}
        ring={!viewed}
      />
      <span className="story-name">{story.username}</span>
    </button>
  );
}

export default function StoryRow({ stories, loading }) {
  const handleStoryClick = (story) => {
    // TODO: Open story viewer modal / navigate to /stories/:id
    console.log('View story:', story.id);
  };

  return (
    <div className="story-row">
      {loading
        ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="story-bubble skeleton" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="skel-circle large" />
              <div className="skel-line short" />
            </div>
          ))
        : stories.map((s, i) => (
            <StoryBubble key={s.id} story={s} index={i} onClick={handleStoryClick} />
          ))
      }
    </div>
  );
}
