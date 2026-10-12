import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Plus,
  CheckCircle,
  XCircle,
  Edit2,
  Phone,
  MessageSquare,
  List,
  CalendarDays,
  FileEdit
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { formatDate } from '../utils/dates';
import { createWhatsAppLink } from '../utils/validation';

export default function Appointments({
  appointments,
  properties,
  leads,
  agent,
  onAddAppointment,
  onUpdateAppointmentStatus,
  onRescheduleAppointment,
  onRecordFeedback
}) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAppointmentForFeedback, setSelectedAppointmentForFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  // New appointment form state
  const [newApt, setNewApt] = useState({
    tenantName: '',
    tenantPhone: '',
    propertyId: properties[0]?.id || '',
    date: '2026-10-15',
    time: '11:00',
    notes: 'Meet prospective tenant at front gate'
  });

  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter === 'All') return true;
    return apt.status === statusFilter;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newApt.tenantName || !newApt.tenantPhone || !newApt.date || !newApt.time) {
      alert('Please fill in all mandatory appointment fields.');
      return;
    }

    const prop = properties.find((p) => p.id === newApt.propertyId);

    const appointment = {
      id: `APT-${Math.floor(300 + Math.random() * 600)}`,
      tenantName: newApt.tenantName,
      tenantPhone: newApt.tenantPhone,
      propertyId: newApt.propertyId,
      propertyTitle: prop ? prop.title : 'Selected Property',
      location: prop ? `${prop.streetAddress || prop.suburb}, ${prop.city}` : 'TBD',
      assignedAgentId: agent.id,
      date: newApt.date,
      time: newApt.time,
      status: 'Scheduled',
      notes: newApt.notes
    };

    onAddAppointment(appointment);
    setIsCreateModalOpen(false);
    setNewApt({
      tenantName: '',
      tenantPhone: '',
      propertyId: properties[0]?.id || '',
      date: '2026-10-15',
      time: '11:00',
      notes: ''
    });
  };

  const handleSaveFeedback = () => {
    if (!selectedAppointmentForFeedback) return;
    onRecordFeedback(selectedAppointmentForFeedback.id, feedbackText);
    setSelectedAppointmentForFeedback(null);
    setFeedbackText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top action header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Viewings & Appointments
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            Manage in-person property walkthroughs, virtual viewings, feedback, and calendar scheduling
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={18} />
          <span>+ Schedule Viewing</span>
        </button>
      </div>

      {/* Filter and Mode Toggle Bar */}
      <div
        className="card"
        style={{
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontWeight: 600 }}>Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-control"
            style={{ width: 'auto', height: 38, padding: '0 10px', fontSize: '0.8125rem' }}
          >
            <option value="All">All Viewings</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} /> List View
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('calendar')}
          >
            <CalendarDays size={16} /> Calendar Matrix
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' ? (
        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Appointment</th>
                  <th>Tenant</th>
                  <th>Property & Location</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Agent Notes & Feedback</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                        {apt.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{apt.tenantName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{apt.tenantPhone}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{apt.propertyTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={12} /> {apt.location}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{formatDate(apt.date, { format: 'short' })}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> {apt.time}
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={apt.status} size="small" />
                    </td>
                    <td style={{ maxWidth: 220, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      {apt.notes || 'No notes added'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {apt.status === 'Scheduled' && (
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => onUpdateAppointmentStatus(apt.id, 'Confirmed')}
                            title="Confirm attendance"
                          >
                            <CheckCircle size={14} color="var(--color-success)" /> Confirm
                          </button>
                        )}

                        {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                            title="Mark viewing completed"
                          >
                            Complete
                          </button>
                        )}

                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setSelectedAppointmentForFeedback(apt);
                            setFeedbackText(apt.notes || '');
                          }}
                          title="Record viewing feedback"
                        >
                          <FileEdit size={13} />
                        </button>

                        <a
                          href={createWhatsAppLink(apt.tenantPhone, agent.name, apt.propertyTitle, `Hi ${apt.tenantName}, reminding you about our property viewing for ${apt.propertyTitle} on ${formatDate(apt.date)} at ${apt.time}. Let me know if you need directions.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-whatsapp"
                          title="WhatsApp viewing confirmation"
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
      ) : (
        /* Calendar Schedule Cards View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="badge badge-draft">{apt.id}</span>
                <StatusBadge status={apt.status} size="small" />
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{apt.tenantName}</h4>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{apt.propertyTitle}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '8px 12px', background: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CalendarIcon size={14} color="var(--color-primary)" /> {formatDate(apt.date, { format: 'short' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={14} color="var(--color-primary)" /> {apt.time}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                <MapPin size={12} style={{ display: 'inline', verticalAlign: -1 }} /> {apt.location}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--color-border-subtle)', display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setSelectedAppointmentForFeedback(apt);
                    setFeedbackText(apt.notes || '');
                  }}
                >
                  Notes
                </button>
                <a
                  href={createWhatsAppLink(apt.tenantPhone, agent.name, apt.propertyTitle)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-whatsapp"
                  style={{ flex: 1 }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Viewing Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Schedule Property Viewing"
        subtitle="Book a physical or virtual walkthrough appointment with a prospective tenant"
      >
        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FormField
            label="Tenant Full Name"
            name="tenantName"
            value={newApt.tenantName}
            onChange={(e) => setNewApt({ ...newApt, tenantName: e.target.value })}
            placeholder="e.g. Sipho Dlamini"
            required
          />

          <FormField
            label="Tenant Phone Number (South Africa)"
            name="tenantPhone"
            value={newApt.tenantPhone}
            onChange={(e) => setNewApt({ ...newApt, tenantPhone: e.target.value })}
            placeholder="082 555 1234"
            required
          />

          <FormField
            label="Property"
            name="propertyId"
            type="select"
            value={newApt.propertyId}
            onChange={(e) => setNewApt({ ...newApt, propertyId: e.target.value })}
            options={properties.map((p) => ({ value: p.id, label: `${p.title} (${p.suburb})` }))}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormField
              label="Viewing Date"
              name="date"
              type="date"
              value={newApt.date}
              onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
              required
            />

            <FormField
              label="Viewing Time"
              name="time"
              type="time"
              value={newApt.time}
              onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}
              required
            />
          </div>

          <FormField
            label="Appointment Notes & Access Instructions"
            name="notes"
            type="textarea"
            rows={2}
            value={newApt.notes}
            onChange={(e) => setNewApt({ ...newApt, notes: e.target.value })}
            placeholder="e.g. Guardhouse code required, tenant accompanied by partner..."
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm & Book Viewing
            </button>
          </div>
        </form>
      </Modal>

      {/* Record Feedback Modal */}
      <Modal
        isOpen={!!selectedAppointmentForFeedback}
        onClose={() => setSelectedAppointmentForFeedback(null)}
        title="Record Viewing Feedback & Follow-up"
        subtitle={`Viewing with ${selectedAppointmentForFeedback?.tenantName}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Document the tenant's impressions, objections, and next steps (e.g. submitted application, requested rental price discount, etc.).
          </p>

          <textarea
            className="form-control"
            rows={4}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Enter viewing feedback and tenant response..."
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedAppointmentForFeedback(null)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSaveFeedback}
            >
              Save Feedback
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
