import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  MessageSquare,
  FileCheck2,
  BarChart3,
  Briefcase,
  User,
  Settings,
  LogOut,
  Building,
  ShieldCheck,
  X
} from 'lucide-react';

export default function Sidebar({
  activePage,
  onNavigate,
  agent,
  leadsCount = 0,
  appointmentsCount = 0,
  applicationsCount = 0,
  mobileOpen = false,
  onCloseMobile
}) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'leads', label: 'Leads & Enquiries', icon: Users, badge: leadsCount },
    { id: 'appointments', label: 'Viewings & Appointments', icon: Calendar, badge: appointmentsCount },
    { id: 'messages', label: 'Messages & WhatsApp', icon: MessageSquare },
    { id: 'applications', label: 'Rental Applications', icon: FileCheck2, badge: applicationsCount },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'team', label: 'Agency & Team', icon: Briefcase },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="modal-backdrop"
          style={{ zIndex: 35 }}
          onClick={onCloseMobile}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-link">
            <div className="brand-icon-box">
              <Building size={20} />
            </div>
            <span>Habitat <span style={{ color: 'var(--color-teal)' }}>SA</span></span>
            <span className="brand-tag">Agent</span>
          </div>

          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="btn-icon"
              style={{ border: 'none', padding: 4 }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-title">Main Menu</span>

          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  if (mobileOpen) onCloseMobile();
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className={`nav-badge ${item.id === 'leads' ? 'nav-badge-alert' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <span className="nav-section-title">Operations</span>

          {menuItems.slice(4, 8).map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  if (mobileOpen) onCloseMobile();
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </button>
            );
          })}

          <span className="nav-section-title">Account</span>

          {menuItems.slice(8).map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  if (mobileOpen) onCloseMobile();
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="agent-mini-card">
            <img
              src={agent.avatar || agent.photo}
              alt={agent.name}
              className="agent-avatar"
            />
            <div className="agent-meta">
              <div className="agent-name">{agent.name}</div>
              <div className="agent-role">
                {agent.isVerified && (
                  <ShieldCheck size={12} style={{ display: 'inline', color: 'var(--color-success)', marginRight: 3 }} />
                )}
                {agent.role}
              </div>
            </div>
            <button
              onClick={() => alert('Logout action: for prototype demonstration.')}
              title="Logout"
              className="btn-icon"
              style={{ border: 'none', padding: 4, color: 'var(--color-muted)' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
