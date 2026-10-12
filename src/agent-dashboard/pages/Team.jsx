import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  UserPlus,
  Award,
  CheckCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { initialTeam } from '../data/mockData';

export default function Team({
  agent,
  properties,
  leads
}) {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [newInvite, setNewInvite] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Agent'
  });

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!newInvite.name || !newInvite.email) {
      alert('Please enter member name and email');
      return;
    }

    const newMember = {
      id: `ag-0${teamMembers.length + 1}`,
      name: newInvite.name,
      role: newInvite.role === 'Agency Administrator' ? 'Letting Principal' : 'Rental Agent Associate',
      email: newInvite.email,
      phone: newInvite.phone || '082 000 0000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      activeListings: 0,
      closedDealsThisMonth: 0,
      avgResponseMinutes: 20,
      status: 'Online',
      accessRole: newInvite.role
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsInviteModalOpen(false);
    setNewInvite({ name: '', email: '', phone: '', role: 'Agent' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Agency Overview Header */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Building size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Habitat SA Letting & Realty Group</h2>
              <span className="badge badge-published">Registered EAAB / PPRA</span>
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: 2 }}>
              Rosebank Central & Sandton Hub • Johannesburg Head Office • Firm FFC #2026/881023
            </p>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsInviteModalOpen(true)}
        >
          <UserPlus size={18} />
          <span>+ Invite Letting Agent</span>
        </button>
      </div>

      {/* Team Roster */}
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 16 }}>
          Agency Letting Specialists ({teamMembers.length})
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {teamMembers.map((member) => (
            <div key={member.id} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{member.name}</h4>
                    {member.id === agent.id && (
                      <span className="badge badge-draft" style={{ fontSize: '0.65rem' }}>You</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{member.role}</div>
                </div>
                <span className="badge badge-draft" style={{ fontSize: '0.7rem' }}>
                  {member.accessRole}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={13} color="var(--color-muted)" />
                  <span>{member.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={13} color="var(--color-muted)" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                  padding: '10px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-primary)' }}>
                    {member.activeListings}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>Listings</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-success)' }}>
                    {member.closedDealsThisMonth}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>Deals MTD</div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-teal)' }}>
                    {member.avgResponseMinutes}m
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>Avg Resp</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite New Agent to Agency"
        subtitle="Agent will receive an invitation to manage assigned rental listings and enquiries"
      >
        <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FormField
            label="Agent Full Name"
            name="name"
            value={newInvite.name}
            onChange={(e) => setNewInvite({ ...newInvite, name: e.target.value })}
            placeholder="e.g. Lerato Ndlovu"
            required
          />

          <FormField
            label="Professional Email Address"
            name="email"
            type="email"
            value={newInvite.email}
            onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
            placeholder="lerato.n@habitatsa.co.za"
            required
          />

          <FormField
            label="Mobile Phone / WhatsApp Number"
            name="phone"
            value={newInvite.phone}
            onChange={(e) => setNewInvite({ ...newInvite, phone: e.target.value })}
            placeholder="082 123 4567"
          />

          <FormField
            label="System Permissions Role"
            name="role"
            type="select"
            value={newInvite.role}
            onChange={(e) => setNewInvite({ ...newInvite, role: e.target.value })}
            options={['Agent', 'Independent Agent', 'Agency Administrator']}
            hint="Administrators can approve leases and invite colleagues. Agents manage their assigned listings."
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsInviteModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send Invitation Link
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
