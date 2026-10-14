import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  Filter,
  DollarSign
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { formatZAR } from '../utils/currency';
import { formatDate } from '../utils/dates';

export default function Applications({
  applications,
  onUpdateApplicationStatus,
  onAddApplicationNote
}) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [newStatus, setNewStatus] = useState('');
  const [appNote, setAppNote] = useState('');

  const statuses = [
    'All',
    'Application Submitted',
    'Awaiting Documents',
    'Under Review',
    'Approved',
    'Declined',
    'Lease Preparation',
    'Lease Signed',
    'Withdrawn'
  ];

  const filtered = applications.filter((app) => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (!selectedApp || !newStatus) return;
    onUpdateApplicationStatus(selectedApp.id, newStatus, appNote);
    setSelectedApp(null);
    setNewStatus('');
    setAppNote('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Rental Applications Pipeline
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            Review tenant vetting, TPN credit score checks, FICA documents, and lease progress
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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

      {/* Applications Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Applicant</th>
                <th>Property</th>
                <th>Rent / Stated Income</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Outstanding Steps</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td>
                    <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                      {app.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{app.applicantName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{app.phone}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {app.propertyTitle}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      {formatZAR(app.monthlyRent)} / mo
                    </div>
                    {app.statedIncome && (
                      <div style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>
                        Net Income: {formatZAR(app.statedIncome)}
                      </div>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                    {formatDate(app.submissionDate, { format: 'short' })}
                  </td>
                  <td>
                    <StatusBadge status={app.status} size="small" />
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', maxWidth: 200 }}>
                    {app.outstandingSteps || 'All steps satisfied'}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setSelectedApp(app);
                        setNewStatus(app.status);
                        setAppNote(app.notes || '');
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Update Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={`Review Application (${selectedApp?.id})`}
        subtitle={`Applicant: ${selectedApp?.applicantName}`}
      >
        {selectedApp && (
          <form onSubmit={handleStatusSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ padding: 14, backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>{selectedApp.propertyTitle}</span>
                <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{formatZAR(selectedApp.monthlyRent)} / mo</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: 4 }}>
                Credit Vetting: <strong>{selectedApp.creditScore}</strong>
              </div>
            </div>

            {/* Document Checklist */}
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 8 }}>
                FICA & Verification Documents
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(selectedApp.documents || []).map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem'
                    }}
                  >
                    <span>{doc.name}</span>
                    <span className={`badge ${doc.status === 'Verified' ? 'badge-published' : 'badge-draft'}`} style={{ fontSize: '0.7rem' }}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginTop: 6 }}>
                *POPIA notice: Tenant financial records are confidential and stored in compliance with South African privacy laws.
              </div>
            </div>

            <div>
              <label className="form-label">Update Application Pipeline Status</label>
              <select
                className="form-control"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {statuses.filter((s) => s !== 'All').map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Internal Agent Vetting Notes</label>
              <textarea
                className="form-control"
                rows={3}
                value={appNote}
                onChange={(e) => setAppNote(e.target.value)}
                placeholder="Record reference check remarks, affordability remarks, or lease drafting instructions..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedApp(null)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save & Update Pipeline
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
