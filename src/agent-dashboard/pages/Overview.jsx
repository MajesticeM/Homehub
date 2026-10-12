import React from 'react';
import {
  Building2,
  CheckCircle2,
  KeyRound,
  MessageSquare,
  PhoneCall,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink,
  Eye,
  Clock,
  Sparkles
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { formatZAR } from '../utils/currency';
import { formatDate, getTodayGreeting } from '../utils/dates';
import { createWhatsAppLink } from '../utils/validation';

export default function Overview({
  agent,
  properties,
  leads,
  appointments,
  onNavigate,
  onSelectLead,
  onSelectProperty,
  onOpenScheduleModal
}) {
  // Dynamic stats calculated from underlying mock data
  const totalProperties = properties.length;
  const availableProperties = properties.filter(
    (p) => p.status === 'Published'
  ).length;
  const rentedProperties = properties.filter((p) => p.status === 'Rented').length;
  const newEnquiries = leads.filter((l) => l.status === 'New Enquiry').length;
  const pendingCallbacks = leads.filter(
    (l) => l.contactPreference === 'Phone Call' || l.status === 'New Enquiry'
  ).length;
  const upcomingViewings = appointments.filter(
    (a) => a.status === 'Scheduled' || a.status === 'Confirmed'
  ).length;

  const greeting = getTodayGreeting();

  // Top 5 recent enquiries
  const recentEnquiries = [...leads]
    .sort((a, b) => new Date(b.dateReceived) - new Date(a.dateReceived))
    .slice(0, 5);

  // Top 4 upcoming appointments
  const upcomingAppointments = [...appointments]
    .filter((a) => a.status !== 'Cancelled')
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
    .slice(0, 4);

  // Top performing properties by views & enquiries
  const topProperties = [...properties]
    .sort((a, b) => (b.views + b.enquiriesCount * 10) - (a.views + a.enquiriesCount * 10))
    .slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #173f5f 0%, #0f2d46 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.85, fontSize: '0.875rem' }}>
            <Sparkles size={16} />
            <span>South Africa Residential Letting Hub</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: 4, letterSpacing: '-0.02em' }}>
            {greeting}, {agent.name.split(' ')[0]}
          </h2>
          <p style={{ opacity: 0.8, fontSize: '0.9375rem', marginTop: 4 }}>
            Here's what's happening with your rental properties today.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#ffffff', color: 'var(--color-primary)' }}
            onClick={() => onNavigate('addProperty')}
          >
            <Plus size={18} />
            <span>+ Add Property</span>
          </button>
          <button
            className="btn btn-outline-primary"
            style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            onClick={() => onNavigate('leads')}
          >
            <span>Review Leads ({newEnquiries})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Properties"
          value={totalProperties}
          icon={Building2}
          iconBg="var(--color-primary-subtle)"
          iconColor="var(--color-primary)"
          trendText="Across Gauteng & Western Cape"
          onClick={() => onNavigate('properties')}
        />
        <StatCard
          title="Available Properties"
          value={availableProperties}
          icon={CheckCircle2}
          iconBg="var(--color-success-bg)"
          iconColor="var(--color-success)"
          trendText="Ready for immediate lease"
          onClick={() => onNavigate('properties')}
        />
        <StatCard
          title="Rented Properties"
          value={rentedProperties}
          icon={KeyRound}
          iconBg="var(--color-purple-bg)"
          iconColor="var(--color-purple)"
          trendText="Leased & generating income"
          onClick={() => onNavigate('properties')}
        />
        <StatCard
          title="New Enquiries"
          value={newEnquiries}
          icon={MessageSquare}
          iconBg="var(--color-info-bg)"
          iconColor="var(--color-info)"
          trendText={`${newEnquiries} require agent contact`}
          onClick={() => onNavigate('leads')}
        />
        <StatCard
          title="Pending Callbacks"
          value={pendingCallbacks}
          icon={PhoneCall}
          iconBg="var(--color-warning-bg)"
          iconColor="var(--color-warning)"
          trendText="WhatsApp or phone calls"
          onClick={() => onNavigate('leads')}
        />
        <StatCard
          title="Upcoming Viewings"
          value={upcomingViewings}
          icon={Calendar}
          iconBg="var(--color-teal-light)"
          iconColor="var(--color-teal)"
          trendText="Scheduled this week"
          onClick={() => onNavigate('appointments')}
        />
      </div>

      {/* Quick Actions Strip */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          backgroundColor: '#ffffff'
        }}
      >
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
          Quick Actions:
        </span>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('addProperty')}>
          <Plus size={14} /> Add Property
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('leads')}>
          <MessageSquare size={14} /> View New Enquiries
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onOpenScheduleModal}>
          <Calendar size={14} /> Schedule Viewing
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('properties')}>
          <Building2 size={14} /> Manage Properties
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('analytics')}>
          <TrendingUp size={14} /> View Reports
        </button>
      </div>

      {/* Main Grid: Recent Enquiries Table + Upcoming Viewings */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
        {/* Recent Enquiries Table */}
        <div className="table-container">
          <div className="table-header-bar">
            <div>
              <h3 className="table-title">Recent Enquiries & Callbacks</h3>
              <p className="table-subtitle">Direct tenant interest from platform and WhatsApp</p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('leads')}
            >
              <span>View All Leads</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Interested Property</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{lead.tenantName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{lead.phone}</div>
                    </td>
                    <td>
                      <div
                        style={{
                          fontWeight: 500,
                          maxWidth: 220,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={lead.propertyTitle}
                      >
                        {lead.propertyTitle}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                        Budget: {formatZAR(lead.statedBudget)}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-draft" style={{ fontSize: '0.7rem' }}>
                        {lead.contactPreference}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                      {formatDate(lead.dateReceived, { format: 'relative' })}
                    </td>
                    <td>
                      <StatusBadge status={lead.status} size="small" />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => onSelectLead(lead)}
                          title="View lead details"
                        >
                          View
                        </button>
                        <a
                          href={createWhatsAppLink(lead.phone, agent.name, lead.propertyTitle)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-whatsapp"
                          title="Chat on WhatsApp"
                          style={{ padding: '6px 8px' }}
                        >
                          <MessageSquare size={13} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Viewings Card */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Upcoming Viewings</h3>
            <button
              onClick={() => onNavigate('appointments')}
              className="btn btn-sm btn-secondary"
            >
              <span>Calendar</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {upcomingAppointments.length === 0 ? (
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>No viewings scheduled today.</p>
            ) : (
              upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{apt.tenantName}</span>
                    <StatusBadge status={apt.status} size="small" />
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    {apt.propertyTitle}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: 4 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={13} /> {formatDate(apt.date, { format: 'short' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={13} /> {apt.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Property Performance Row */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Property Performance Highlights</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
              Most viewed and enquired rental units in your portfolio
            </p>
          </div>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onNavigate('properties')}
          >
            <span>View All Listings</span>
            <ExternalLink size={13} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {topProperties.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProperty(p)}
              style={{
                display: 'flex',
                gap: 14,
                padding: 12,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              className="card-hover-box"
            >
              <img
                src={p.coverImage}
                alt={p.title}
                style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                <StatusBadge status={p.status} size="small" />
                <h4
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    marginTop: 4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={p.title}
                >
                  {p.title}
                </h4>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatZAR(p.monthlyRent)} <span style={{ fontWeight: 400, color: 'var(--color-muted)' }}>/ mo</span>
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: '0.7188rem', color: 'var(--color-muted)', marginTop: 4 }}>
                  <span><Eye size={12} style={{ display: 'inline', verticalAlign: -1 }} /> {p.views}</span>
                  <span><MessageSquare size={12} style={{ display: 'inline', verticalAlign: -1 }} /> {p.enquiriesCount} enquiries</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
