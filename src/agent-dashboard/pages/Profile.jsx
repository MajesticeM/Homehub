import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  MapPin,
  Check,
  Building,
  Award
} from 'lucide-react';
import FormField from '../components/FormField';

export default function Profile({
  agent,
  onUpdateAgent
}) {
  const [profileData, setProfileData] = useState({ ...agent });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguagesChange = (e) => {
    const langs = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
    setProfileData((prev) => ({ ...prev, languages: langs }));
  };

  const handleAreasChange = (e) => {
    const areas = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
    setProfileData((prev) => ({ ...prev, areasServed: areas }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAgent(profileData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Agent Profile & Credentials</h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          Manage your public letting specialist profile displayed to tenants across property search listings
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Profile Card Header */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <img
              src={profileData.avatar || profileData.photo}
              alt={profileData.name}
              style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary-subtle)' }}
            />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{profileData.name}</h3>
                {profileData.isVerified && (
                  <span className="badge badge-published" style={{ gap: 4 }}>
                    <ShieldCheck size={13} /> PPRA / EAAB Verified
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9375rem' }}>
                {profileData.role} • {profileData.agency}
              </p>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', marginTop: 2 }}>
                Fidelity Fund Certificate: <strong>{profileData.ffcNumber}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="card" style={{ padding: 24 }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Personal & Agency Details</h4>
          <div className="form-grid">
            <FormField
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              required
            />

            <FormField
              label="Professional Role / Title"
              name="role"
              value={profileData.role}
              onChange={handleChange}
              required
            />

            <FormField
              label="Agency Name"
              name="agency"
              value={profileData.agency}
              onChange={handleChange}
              required
            />

            <FormField
              label="Branch Office"
              name="office"
              value={profileData.office}
              onChange={handleChange}
            />

            <FormField
              label="Work Email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleChange}
              required
            />

            <FormField
              label="Primary Contact Phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              required
            />

            <FormField
              label="WhatsApp Business Number"
              name="whatsapp"
              value={profileData.whatsapp}
              onChange={handleChange}
              hint="Format: 082 555 8192 or +27825558192"
              required
            />

            <FormField
              label="PPRA Fidelity Fund Cert (FFC Number)"
              name="ffcNumber"
              value={profileData.ffcNumber}
              onChange={handleChange}
              hint="Required by South African Property Practitioners Act"
            />

            <div className="form-full">
              <label className="form-label">Languages Spoken (comma separated)</label>
              <input
                className="form-control"
                value={(profileData.languages || []).join(', ')}
                onChange={handleLanguagesChange}
                placeholder="English, isiZulu, Sesotho, Afrikaans"
              />
            </div>

            <div className="form-full">
              <label className="form-label">Areas & Suburbs Served (comma separated)</label>
              <input
                className="form-control"
                value={(profileData.areasServed || []).join(', ')}
                onChange={handleAreasChange}
                placeholder="Rosebank, Sandton, Sea Point, Morningside"
              />
            </div>

            <div className="form-full">
              <FormField
                label="Professional Biography"
                name="bio"
                type="textarea"
                rows={4}
                value={profileData.bio}
                onChange={handleChange}
                placeholder="Describe your property letting background, service guarantee, and areas of expertise..."
              />
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
            {isSaved && (
              <span style={{ color: 'var(--color-success)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={16} /> Changes saved successfully!
              </span>
            )}
            <button type="submit" className="btn btn-primary">
              Save Profile Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
