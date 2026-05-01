// ─── Avatar Component ─────────────────────────────────────────────────────────
import React from 'react';

const GRADIENTS = [
  'linear-gradient(135deg, #f97316, #ef4444)',
  'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  'linear-gradient(135deg, #10b981, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #f97316)',
  'linear-gradient(135deg, #ec4899, #8b5cf6)',
  'linear-gradient(135deg, #14b8a6, #3b82f6)',
];

function getGradient(name = '') {
  const idx = name.charCodeAt(0) % GRADIENTS.length;
  return GRADIENTS[idx];
}

const STATUS_COLORS = {
  online:  '#22c55e',
  busy:    '#ef4444',
  away:    null, // no dot shown – we show time text instead
  offline: null,
};

export default function Avatar({
  src,
  name = '?',
  size = 44,
  showStatus = false,
  status = 'offline',
  className = '',
  style = {},
  ring = false,
}) {
  const dotColor = STATUS_COLORS[status];

  return (
    <div
      className={`avatar-wrapper ${className}`}
      style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...style }}
    >
      {ring && (
        <div style={{
          position: 'absolute', inset: -2,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          zIndex: 0,
        }} />
      )}

      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: size, height: size,
            borderRadius: '50%',
            objectFit: 'cover',
            position: 'relative',
            zIndex: 1,
            border: ring ? '2px solid var(--bg-sidebar)' : 'none',
          }}
        />
      ) : (
        <div style={{
          width: size, height: size,
          borderRadius: '50%',
          background: getGradient(name),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size * 0.38,
          fontWeight: 700,
          color: '#fff',
          position: 'relative',
          zIndex: 1,
          border: ring ? '2px solid var(--bg-sidebar)' : 'none',
        }}>
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      {showStatus && dotColor && (
        <span style={{
          position: 'absolute', bottom: 1, right: 1,
          width: 10, height: 10,
          borderRadius: '50%',
          background: dotColor,
          border: '2px solid var(--bg-sidebar)',
          zIndex: 2,
        }} />
      )}
    </div>
  );
}
