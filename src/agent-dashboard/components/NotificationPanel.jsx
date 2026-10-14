import React from 'react';
import { Bell, CheckCheck, MessageSquare, Calendar, FileText, Home, X } from 'lucide-react';
import { formatDate } from '../utils/dates';

export default function NotificationPanel({
  notifications,
  onMarkAllAsRead,
  onToggleRead,
  onSelectNotification,
  onClose
}) {
  const getIcon = (type) => {
    switch (type) {
      case 'enquiry':
        return <MessageSquare size={16} className="color-primary" />;
      case 'appointment':
        return <Calendar size={16} className="color-info" />;
      case 'application':
        return <FileText size={16} className="color-purple" />;
      case 'property':
        return <Home size={16} className="color-teal" />;
      default:
        return <Bell size={16} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-flyout">
      <div className="notif-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={16} />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="badge badge-newenquiry" style={{ padding: '2px 6px' }}>
              {unreadCount} new
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
              title="Mark all as read"
            >
              <CheckCheck size={14} /> Mark all
            </button>
          )}
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ border: 'none', padding: 4 }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '28px', textAlign: 'center', color: 'var(--color-muted)' }}>
            No notifications at the moment
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notif-item ${!notif.read ? 'unread' : ''}`}
              onClick={() => onSelectNotification(notif)}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {getIcon(notif.type)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)' }}>
                    {notif.title}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-light)' }}>
                    {formatDate(notif.timestamp, { format: 'relative' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  {notif.message}
                </p>
              </div>
              {!notif.read && (
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    marginTop: 6
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
