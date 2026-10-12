import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  LayoutGrid,
  List,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  ChevronRight,
  UserCheck,
  Send,
  Plus
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatZAR, calculateTotalMonthlyCost } from '../utils/currency';
import { formatDate } from '../utils/dates';
import { createWhatsAppLink } from '../utils/validation';

export default function Leads({
  leads,
  properties,
  agent,
  selectedLead,
  onSelectLead,
  onCloseLeadDetails,
  onUpdateLeadStatus,
  onAddLeadNote,
  onScheduleViewingForLead
}) {
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [newNoteText, setNewNoteText] = useState('');

  const statuses = [
    'All',
    'New Enquiry',
    'Contacted',
    'Viewing Scheduled',
    'Viewing Completed',
    'Application in Progress',
    'Lease Signed',
    'Closed / Not Proceeding'
  ];

  const kanbanColumns = [
    'New Enquiry',
    'Contacted',
    'Viewing Scheduled',
    'Application in Progress',
    'Lease Signed'
  ];

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        search === '' ||
        lead.tenantName.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.propertyTitle.toLowerCase().includes(search.toLowerCase()) ||
        lead.id.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [leads, search, statusFilter]);

  // Find linked property for currently selected lead
  const currentLeadProperty = useMemo(() => {
    if (!selectedLead) return null;
    return properties.find((p) => p.id === selectedLead.propertyId);
  }, [selectedLead, properties]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddLeadNote(selectedLead.id, newNoteText.trim());
    setNewNoteText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Leads & Enquiries CRM</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            Manage callback requests, WhatsApp enquiries, affordability checks, and viewing scheduling
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')}
          >
            <List size={16} /> Table View
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'kanban' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('kanban')}
          >
            <LayoutGrid size={16} /> Kanban Pipeline
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '14px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          <div style={{ position: 'relative', width: 280 }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }}
            />
            <input
              type="text"
              placeholder="Search tenant name, phone, property..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              style={{ paddingLeft: 34, height: 38, fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontWeight: 600 }}>Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', height: 38, padding: '0 10px', fontSize: '0.8125rem' }}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
          Showing <strong>{filteredLeads.length}</strong> enquiries
        </span>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lead ID</th>
                  <th>Tenant</th>
                  <th>Property of Interest</th>
                  <th>Budget</th>
                  <th>Contact Preference</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th>Follow-up</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} style={{ cursor: 'pointer' }} onClick={() => onSelectLead(lead)}>
                    <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                      {lead.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{lead.tenantName}</div>
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
                      >
                        {lead.propertyTitle}
                      </div>
                      <div style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>
                        Area: {lead.preferredLocation}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatZAR(lead.statedBudget)}
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
                    <td style={{ fontSize: '0.8125rem' }}>
                      {lead.followUpDate ? formatDate(lead.followUpDate, { format: 'short' }) : '—'}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <a
                          href={createWhatsAppLink(lead.phone, agent.name, lead.propertyTitle)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-whatsapp"
                          title="WhatsApp Tenant"
                          style={{ padding: '6px 8px' }}
                        >
                          <MessageSquare size={13} />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="btn btn-sm btn-secondary"
                          title="Call Tenant"
                          style={{ padding: '6px 8px' }}
                        >
                          <Phone size={13} />
                        </a>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => onSelectLead(lead)}
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Pipeline View */
        <div className="kanban-board">
          {kanbanColumns.map((colStatus) => {
            const colLeads = filteredLeads.filter((l) => l.status === colStatus);
            return (
              <div key={colStatus} className="kanban-column">
                <div className="kanban-col-header">
                  <span>{colStatus}</span>
                  <span className="badge badge-draft" style={{ fontSize: '0.7rem' }}>
                    {colLeads.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="kanban-card"
                      onClick={() => onSelectLead(lead)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)' }}>
                          {lead.id}
                        </span>
                        <span className="badge badge-draft" style={{ fontSize: '0.65rem' }}>
                          {lead.contactPreference}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{lead.tenantName}</div>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {lead.propertyTitle}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {formatZAR(lead.statedBudget)}
                        </span>
                        <a
                          href={createWhatsAppLink(lead.phone, agent.name, lead.propertyTitle)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-whatsapp"
                          onClick={(e) => e.stopPropagation()}
                          style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                        >
                          <MessageSquare size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CRM Lead Detail Side Panel */}
      {selectedLead && (
        <div className="side-panel">
          <div className="side-panel-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>
                  {selectedLead.id}
                </span>
                <StatusBadge status={selectedLead.status} size="small" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: 4 }}>
                {selectedLead.tenantName}
              </h3>
            </div>
            <button className="btn-icon" onClick={onCloseLeadDetails} style={{ border: 'none' }}>
              ✕
            </button>
          </div>

          <div className="side-panel-content">
            {/* Quick Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
              <a
                href={createWhatsAppLink(selectedLead.phone, agent.name, selectedLead.propertyTitle)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageSquare size={16} /> Open WhatsApp
              </a>

              <a
                href={`tel:${selectedLead.phone}`}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <Phone size={16} /> Call Tenant
              </a>

              <button
                className="btn btn-primary"
                style={{ width: '100%', gridColumn: 'span 2' }}
                onClick={() => onScheduleViewingForLead(selectedLead)}
              >
                <Calendar size={16} /> Schedule Viewing Appointment
              </button>
            </div>

            {/* Tenant Information Section */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 10 }}>
                Tenant Profile
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Phone Number:</span>
                  <strong>{selectedLead.phone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Email Address:</span>
                  <span>{selectedLead.email || 'Not provided'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Contact Preference:</span>
                  <span>{selectedLead.contactPreference}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Preferred Move-in:</span>
                  <span>{selectedLead.preferredMoveIn || 'Immediate'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Preferred Areas:</span>
                  <span>{selectedLead.preferredLocation}</span>
                </div>
              </div>
            </div>

            {/* Affordability Evaluation */}
            {currentLeadProperty && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 10 }}>
                  Rental Affordability Indicator
                </h4>
                {(() => {
                  const propCost = calculateTotalMonthlyCost({
                    monthlyRent: currentLeadProperty.monthlyRent,
                    electricity: currentLeadProperty.electricity,
                    water: currentLeadProperty.water,
                    internet: currentLeadProperty.internet,
                    parking: currentLeadProperty.parking
                  });
                  const isWithinBudget = selectedLead.statedBudget >= propCost;

                  return (
                    <div
                      className={`affordability-meter ${
                        isWithinBudget ? 'affordability-match' : 'affordability-overbudget'
                      }`}
                    >
                      {isWithinBudget ? <CheckCircle size={22} /> : <AlertCircle size={22} />}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                          {isWithinBudget
                            ? 'Listed Cost Within Stated Budget'
                            : 'Property Exceeds Stated Budget'}
                        </div>
                        <div style={{ fontSize: '0.75rem', marginTop: 2 }}>
                          Tenant budget: {formatZAR(selectedLead.statedBudget)} vs Total monthly: {formatZAR(propCost)}
                        </div>
                        <div style={{ fontSize: '0.6875rem', opacity: 0.85, marginTop: 4 }}>
                          *Notice: Indicative metric only. Formal verification requires credit check & proof of income.
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Property Information */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 10 }}>
                Property of Interest
              </h4>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: 12,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#f8fafc'
                }}
              >
                {currentLeadProperty && (
                  <img
                    src={currentLeadProperty.coverImage}
                    alt={currentLeadProperty.title}
                    style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{selectedLead.propertyTitle}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', fontWeight: 700, marginTop: 2 }}>
                    {currentLeadProperty ? formatZAR(currentLeadProperty.monthlyRent) + ' / mo' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Original Enquiry Message */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 10 }}>
                Enquiry Message
              </h4>
              <div
                style={{
                  padding: 14,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  fontStyle: 'italic'
                }}
              >
                "{selectedLead.message}"
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: 6 }}>
                Source: {selectedLead.enquirySource} • Received: {formatDate(selectedLead.dateReceived, { format: 'full' })}
              </div>
            </div>

            {/* Status Update Dropdown */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 10 }}>
                Update Lead Stage
              </h4>
              <select
                className="form-control"
                value={selectedLead.status}
                onChange={(e) => onUpdateLeadStatus(selectedLead.id, e.target.value)}
              >
                {statuses.filter((s) => s !== 'All').map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Internal Agent Notes & Timeline */}
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 10 }}>
                Internal Notes & Interactions
              </h4>

              <form onSubmit={handleAddNote} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input
                  type="text"
                  placeholder="Add note (e.g., Call outcome, tenant requirements)..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.8125rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={14} /> Add
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(selectedLead.notes || []).map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: 10,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--color-border-subtle)',
                      fontSize: '0.8125rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', fontSize: '0.7188rem', marginBottom: 4 }}>
                      <span>{n.author}</span>
                      <span>{formatDate(n.date, { format: 'relative' })}</span>
                    </div>
                    <p style={{ color: 'var(--color-text)' }}>{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
