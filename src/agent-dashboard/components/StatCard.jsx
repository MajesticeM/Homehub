import React from 'react';

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBg = 'var(--color-primary-subtle)',
  iconColor = 'var(--color-primary)',
  trendText,
  onClick
}) {
  return (
    <div className="stat-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="stat-card-header">
        <span className="stat-label">{title}</span>
        {Icon && (
          <div
            className="stat-icon-wrapper"
            style={{ backgroundColor: iconBg, color: iconColor }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="stat-value">{value}</div>

      {trendText && (
        <div className="stat-footer">
          <span className="stat-trend-up">{trendText}</span>
        </div>
      )}
    </div>
  );
}
