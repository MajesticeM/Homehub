import React, { useState } from 'react';
import {
  Bell,
  Shield,
  Lock,
  Globe,
  Database,
  Check,
  AlertCircle
} from 'lucide-react';

export default function Settings({
  agent,
  onUpdateAgent
}) {
  const [preferences, setPreferences] = useState({
    ...agent.notificationPreferences
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateAgent({
      ...agent,
      notificationPreferences: preferences
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Platform Settings & POPIA Compliance
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          Configure notifications, messaging alerts, and South African regulatory data privacy controls
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Notification Settings */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Bell size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Notification & Alert Preferences</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={preferences.whatsappAlerts}
                onChange={() => handleToggle('whatsappAlerts')}
                style={{ marginTop: 4 }}
              />
              <div>
                <strong style={{ fontSize: '0.875rem' }}>Instant WhatsApp Leads Notification</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Receive immediate WhatsApp alert on your mobile when a tenant requests a callback.
                </p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={preferences.emailOnNewLead}
                onChange={() => handleToggle('emailOnNewLead')}
                style={{ marginTop: 4 }}
              />
              <div>
                <strong style={{ fontSize: '0.875rem' }}>Email Alert for New Portal Enquiries</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Send an email notification with lead details and affordability estimate.
                </p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={preferences.viewingReminders}
                onChange={() => handleToggle('viewingReminders')}
                style={{ marginTop: 4 }}
              />
              <div>
                <strong style={{ fontSize: '0.875rem' }}>Viewing Appointment Reminders</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Send automated reminder 2 hours before scheduled physical property walkthroughs.
                </p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={preferences.applicationUpdates}
                onChange={() => handleToggle('applicationUpdates')}
                style={{ marginTop: 4 }}
              />
              <div>
                <strong style={{ fontSize: '0.875rem' }}>Rental Application Pipeline Updates</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Notify when a tenant uploads FICA documents or payslips for vetting.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* POPIA & Privacy Info Card */}
        <div className="card" style={{ padding: 24, backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Shield size={20} color="var(--color-teal)" />
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
              POPIA Data Privacy Notice (Protection of Personal Information Act)
            </h3>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            In accordance with the South African Protection of Personal Information Act (Act 4 of 2013), tenant identity documents, bank statements, and contact details must be processed solely for the legitimate purpose of rental assessment and lease conclusion. They must not be retained beyond legal requirement or disclosed to unverified third parties.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
          {savedSuccess && (
            <span style={{ color: 'var(--color-success)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Check size={16} /> Settings saved!
            </span>
          )}
          <button type="submit" className="btn btn-primary">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
