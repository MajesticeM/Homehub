import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Copy,
  ExternalLink,
  Send,
  Check,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { formatZAPhoneForWhatsApp, createWhatsAppLink, isValidZAPhone, normalizeZAPhoneForWhatsApp } from '../utils/validation';
import { formatDate } from '../utils/dates';

export default function Messages({
  leads,
  agent,
  onRecordLeadOutcome
}) {
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || '');
  const [copiedId, setCopiedId] = useState(null);
  const [outcomeStatus, setOutcomeStatus] = useState('Contacted');
  const [outcomeNote, setOutcomeNote] = useState('');
  const [customMsg, setCustomMsg] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Template messages
  const templates = [
    {
      label: 'Initial Greeting & Callback',
      text: (name, prop) =>
        `Hi ${name}, thank you for your enquiry regarding our rental listing "${prop}". When would be a convenient time today to discuss details or arrange a viewing? Best regards, ${agent.name} (Habitat SA).`
    },
    {
      label: 'Viewing Confirmation & Directions',
      text: (name, prop) =>
        `Hi ${name}, confirming your viewing appointment for "${prop}". Please let me know if you need complex gate access instructions or parking guidance upon arrival. See you then!`
    },
    {
      label: 'Document Submission Request',
      text: (name, prop) =>
        `Good day ${name}, to proceed with your application for "${prop}", please prepare your SA ID / Passport, latest 3 months bank statements (stamped), and latest payslip.`
    },
    {
      label: 'Lease Agreement Notification',
      text: (name, prop) =>
        `Hi ${name}, great news! Your rental application for "${prop}" has been approved by the landlord. We are preparing the lease agreement for your digital signature.`
    }
  ];

  const currentLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleCopyPhone = (phone, id) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeMessageText =
    customMsg ||
    (currentLead
      ? templates[0].text(currentLead.tenantName, currentLead.propertyTitle)
      : '');

  const waUrl = currentLead
    ? createWhatsAppLink(currentLead.phone, agent.name, currentLead.propertyTitle, activeMessageText)
    : '#';

  const handleSaveOutcome = (e) => {
    e.preventDefault();
    if (!currentLead) return;
    onRecordLeadOutcome(currentLead.id, {
      status: outcomeStatus,
      note: outcomeNote || `Contacted via WhatsApp / Phone: ${outcomeStatus}`
    });
    setSavedSuccess(true);
    setOutcomeNote('');
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Tenant Communication & WhatsApp Dispatch
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          Direct South African WhatsApp click-to-chat integration, quick call dialing, pre-filled response templates, and communication outcome logs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Left: Tenant Directory */}
        <div className="card" style={{ padding: 18, maxHeight: '720px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>
            Recent Tenant Enquiries ({leads.length})
          </h3>

          <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {leads.map((lead) => {
              const isSelected = lead.id === selectedLeadId;
              return (
                <div
                  key={lead.id}
                  onClick={() => {
                    setSelectedLeadId(lead.id);
                    setCustomMsg('');
                  }}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-primary-subtle)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{lead.tenantName}</span>
                    <span className="badge badge-draft" style={{ fontSize: '0.65rem' }}>
                      {lead.contactPreference}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: 2 }}>
                    {lead.phone}
                  </div>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: 4
                    }}
                  >
                    {lead.propertyTitle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Message Composer & Quick Actions */}
        {currentLead ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Lead banner */}
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{currentLead.tenantName}</h3>
                    <span className="badge badge-newenquiry">{currentLead.status}</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: 4 }}>
                    Interested in: <strong>{currentLead.propertyTitle}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleCopyPhone(currentLead.phone, currentLead.id)}
                  >
                    {copiedId === currentLead.id ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                    <span>{copiedId === currentLead.id ? 'Copied' : currentLead.phone}</span>
                  </button>

                  <a
                    href={`tel:${currentLead.phone}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <Phone size={14} /> Call
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageSquare size={14} /> Open in WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Sparkles size={16} color="var(--color-primary)" />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Pre-filled Message Templates</h4>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {templates.map((tpl, i) => (
                  <button
                    key={i}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => setCustomMsg(tpl.text(currentLead.tenantName, currentLead.propertyTitle))}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>

              <label className="form-label" style={{ marginBottom: 6 }}>
                Customized Message (URL encoded into WhatsApp click-to-chat link)
              </label>
              <textarea
                className="form-control"
                rows={4}
                value={activeMessageText}
                onChange={(e) => setCustomMsg(e.target.value)}
              />

              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Validated ZA Phone format: <strong>+{normalizeZAPhoneForWhatsApp(currentLead.phone)}</strong>
                </span>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  <Send size={16} /> Send via WhatsApp Web / App
                </a>
              </div>
            </div>

            {/* Record Contact Outcome */}
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: 10 }}>
                Record Contact Outcome & Notes
              </h4>
              <form onSubmit={handleSaveOutcome} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                  <div>
                    <label className="form-label">New Status</label>
                    <select
                      className="form-control"
                      value={outcomeStatus}
                      onChange={(e) => setOutcomeStatus(e.target.value)}
                    >
                      <option value="Contacted">Contacted</option>
                      <option value="Viewing Scheduled">Viewing Scheduled</option>
                      <option value="Application in Progress">Application in Progress</option>
                      <option value="Closed / Not Proceeding">Closed / Not Proceeding</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Outcome Summary / Note</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Sent viewing slot choices, tenant replied via voice note..."
                      value={outcomeNote}
                      onChange={(e) => setOutcomeNote(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
                  {savedSuccess && (
                    <span style={{ color: 'var(--color-success)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Check size={14} /> Outcome logged to CRM
                    </span>
                  )}
                  <button type="submit" className="btn btn-primary btn-sm">
                    Log Contact Outcome
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
