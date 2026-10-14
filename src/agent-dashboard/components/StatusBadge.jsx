import React from 'react';

export default function StatusBadge({ status, size = 'normal' }) {
  if (!status) return null;

  // Normalize status to CSS class friendly token
  const statusKey = status.toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <span className={`badge badge-${statusKey} ${size === 'small' ? 'badge-sm' : ''}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}
