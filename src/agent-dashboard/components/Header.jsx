import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, ShieldCheck, ChevronDown, ExternalLink } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

export default function Header({
  activePage,
  agent,
  searchTerm,
  onSearchChange,
  notifications,
  onMarkAllAsRead,
  onToggleRead,
  onSelectNotification,
  onNavigate,
  onToggleMobileMenu,
  onSwitchToTenantView,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageTitles = {
    overview: 'Dashboard Overview',
    properties: 'Property Listings',
    addProperty: 'Add New Property',
    leads: 'Leads & Enquiries CRM',
    appointments: 'Viewings & Appointments',
    messages: 'Tenant Messages & WhatsApp',
    applications: 'Rental Applications Pipeline',
    analytics: 'Performance & Analytics',
    team: 'Agency & Team Management',
    profile: 'Agent Profile',
    settings: 'Settings & Compliance'
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="mobile-menu-toggle"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="page-title">{pageTitles[activePage] || 'Dashboard'}</h1>
        </div>
      </div>

      <div className="header-search-box">
        <Search className="header-search-icon" size={18} />
        <input
          type="text"
          placeholder="Search properties, leads, tenants..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="header-right">
        {onSwitchToTenantView && (
          <button
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontWeight: 600
            }}
            onClick={onSwitchToTenantView}
            title="Switch to Tenant Public Search Portal"
          >
            <ExternalLink size={14} /> Tenant View
          </button>
        )}

        {/* Notification bell */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="notif-button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notif-badge" />}
          </button>

          {showNotifications && (
            <NotificationPanel
              notifications={notifications}
              onMarkAllAsRead={onMarkAllAsRead}
              onToggleRead={onToggleRead}
              onSelectNotification={(notif) => {
                setShowNotifications(false);
                onSelectNotification(notif);
              }}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* User profile dropdown */}
        <div style={{ position: 'relative' }} ref={userRef}>
          <button
            className="user-menu-btn"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            aria-label="Agent profile menu"
          >
            <img
              src={agent.avatar || agent.photo}
              alt={agent.name}
              className="user-menu-avatar"
            />
            <div className="user-menu-details">
              <div className="user-menu-name">{agent.name}</div>
              <div className="user-menu-sub">{agent.role}</div>
            </div>
            <ChevronDown size={14} color="var(--color-muted)" />
          </button>

          {showUserDropdown && (
            <div
              className="card"
              style={{
                position: 'absolute',
                top: 48,
                right: 0,
                width: 220,
                padding: '8px 0',
                zIndex: 50,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{agent.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{agent.agency}</div>
                {agent.isVerified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, color: 'var(--color-success)', fontSize: '0.7188rem' }}>
                    <ShieldCheck size={12} /> Verified EAAB/PPRA Agent
                  </div>
                )}
              </div>

              <div style={{ padding: '6px 0' }}>
                <button
                  className="nav-item"
                  style={{ padding: '8px 16px', width: '100%' }}
                  onClick={() => {
                    setShowUserDropdown(false);
                    onNavigate('profile');
                  }}
                >
                  <User size={16} /> My Profile
                </button>
                <button
                  className="nav-item"
                  style={{ padding: '8px 16px', width: '100%' }}
                  onClick={() => {
                    setShowUserDropdown(false);
                    onNavigate('settings');
                  }}
                >
                  <Settings size={16} /> Account Settings
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 6 }}>
                <button
                  className="nav-item"
                  style={{ padding: '8px 16px', width: '100%', color: 'var(--color-danger)' }}
                  onClick={() => {
                    setShowUserDropdown(false);
                    if (onLogout) onLogout();
                  }}
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
