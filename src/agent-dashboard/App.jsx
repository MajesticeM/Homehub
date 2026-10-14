import React, { useState, useMemo, useEffect } from 'react';
import './index.css';
import { savePropertyToSupabase, isSupabaseConfigured } from '../lib/supabase';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Modal from './components/Modal';
import FormField from './components/FormField';

// Pages
import Overview from './pages/Overview';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import Leads from './pages/Leads';
import Appointments from './pages/Appointments';
import Messages from './pages/Messages';
import Applications from './pages/Applications';
import Analytics from './pages/Analytics';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Mock Data
import {
  initialAgent,
  initialProperties,
  initialLeads,
  initialAppointments,
  initialApplications,
  initialNotifications
} from './data/mockData';

export default function App({ onSwitchToTenantView, currentAgent = initialAgent, onLogout }) {
  const [activePage, setActivePage] = useState('overview');
  const [agent, setAgent] = useState(currentAgent || initialAgent);
  const [properties, setProperties] = useState(initialProperties);
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('habitat_leads_sa_v1');
      return saved ? JSON.parse(saved) : initialLeads;
    } catch {
      return initialLeads;
    }
  });
  const [appointments, setAppointments] = useState(initialAppointments);
  const [applications, setApplications] = useState(() => {
    if (externalApplications && externalApplications.length > 0) return externalApplications;
    try {
      const saved = localStorage.getItem('habitat_applications_sa_v1');
      return saved ? JSON.parse(saved) : initialApplications;
    } catch {
      return initialApplications;
    }
  });
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('habitat_notifications_sa_v1');
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  // Sync to shared storage so changes reflect across customer portal & agent dashboard
  useEffect(() => {
    localStorage.setItem('habitat_applications_sa_v1', JSON.stringify(applications));
    if (onUpdateExternalApplications) {
      onUpdateExternalApplications(applications);
    }
  }, [applications, onUpdateExternalApplications]);

  useEffect(() => {
    localStorage.setItem('habitat_leads_sa_v1', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('habitat_notifications_sa_v1', JSON.stringify(notifications));
  }, [notifications]);

  // Listen to storage events and application submissions in real time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'habitat_applications_sa_v1' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setApplications(parsed);
        } catch (_err) {}
      }
      if (e.key === 'habitat_leads_sa_v1' && e.newValue) {
        try {
          setLeads(JSON.parse(e.newValue));
        } catch (_err) {}
      }
      if (e.key === 'habitat_notifications_sa_v1' && e.newValue) {
        try {
          setNotifications(JSON.parse(e.newValue));
        } catch (_err) {}
      }
    };

    const handleCustomAppSubmit = (e) => {
      if (e.detail) {
        setApplications((prev) => [e.detail, ...prev.filter((a) => a.id !== e.detail.id)]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('habitat_application_submitted', handleCustomAppSubmit);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('habitat_application_submitted', handleCustomAppSubmit);
    };
  }, []);

  // Selected item states
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickScheduleModalOpen, setQuickScheduleModalOpen] = useState(false);

  // New quick appointment form state
  const [quickAptForm, setQuickAptForm] = useState({
    tenantName: '',
    tenantPhone: '',
    propertyId: initialProperties[0]?.id || '',
    date: '2026-10-14',
    time: '14:30',
    notes: 'Booked via Quick Action'
  });

  useEffect(() => {
    setAgent(currentAgent || initialAgent);
  }, [currentAgent]);

  // Navigation helper
  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Property Handlers
  const handleSaveProperty = async (propertyData) => {
    try {
      if (isSupabaseConfigured) {
        const result = await savePropertyToSupabase(propertyData);
        if (result.ok) {
          console.info('Property saved to Supabase:', result.data);
        } else {
          console.warn('Supabase save was skipped or misconfigured:', result.reason);
        }
      } else {
        console.warn('Supabase is not configured. Saving locally only. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable remote persistence.');
      }
    } catch (error) {
      console.error('Unable to save property to Supabase:', error);
      alert('The property was saved locally, but the remote database save failed. Check your Supabase connection settings.');
    }

    if (editingProperty) {
      setProperties((prev) =>
        prev.map((p) => (p.id === propertyData.id ? propertyData : p))
      );
      setEditingProperty(null);
    } else {
      setProperties((prev) => [propertyData, ...prev]);
    }
    setSelectedProperty(propertyData);
    setActivePage('propertyDetails');
  };

  const handleEditProperty = (prop) => {
    setEditingProperty(prop);
    setActivePage('addProperty');
  };

  const handleDuplicateProperty = (prop) => {
    const duplicated = {
      ...prop,
      id: `PROP-${Math.floor(200 + Math.random() * 800)}`,
      title: `${prop.title} (Copy)`,
      status: 'Draft',
      views: 0,
      enquiriesCount: 0,
      dateCreated: new Date().toISOString().split('T')[0]
    };
    setProperties([duplicated, ...properties]);
    alert(`Duplicated as Draft: ${duplicated.title}`);
  };

  const handleTogglePropertyStatus = (prop, newStatus) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === prop.id ? { ...p, status: newStatus } : p))
    );
    if (selectedProperty && selectedProperty.id === prop.id) {
      setSelectedProperty({ ...selectedProperty, status: newStatus });
    }
  };

  // Lead Handlers
  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleAddLeadNote = (leadId, noteText) => {
    const newNote = {
      id: `n-${Date.now()}`,
      author: agent.name,
      date: new Date().toISOString(),
      text: noteText
    };
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, notes: [newNote, ...(l.notes || [])] } : l
      )
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({
        ...prev,
        notes: [newNote, ...(prev.notes || [])]
      }));
    }
  };

  const handleRecordLeadOutcome = (leadId, { status, note }) => {
    handleUpdateLeadStatus(leadId, status);
    if (note) {
      handleAddLeadNote(leadId, note);
    }
  };

  // Appointment Handlers
  const handleAddAppointment = (newAppointment) => {
    setAppointments([newAppointment, ...appointments]);
  };

  const handleUpdateAppointmentStatus = (aptId, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status: newStatus } : a))
    );
  };

  const handleRecordFeedback = (aptId, feedback) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, notes: feedback } : a))
    );
  };

  // Application Handlers
  const handleUpdateApplicationStatus = (appId, newStatus, note) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              status: newStatus,
              notes: note ? `${note} (${new Date().toLocaleDateString('en-ZA')})` : a.notes
            }
          : a
      )
    );
  };

  // Notification Handlers
  const handleMarkAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleToggleNotifRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: !n.read } : n))
    );
  };

  const handleSelectNotification = (notif) => {
    // Mark as read
    handleToggleNotifRead(notif.id);
    if (notif.linkPage) {
      if (notif.linkPage === 'leads' && notif.targetId) {
        const found = leads.find((l) => l.id === notif.targetId);
        if (found) setSelectedLead(found);
      } else if (notif.linkPage === 'properties' && notif.targetId) {
        const found = properties.find((p) => p.id === notif.targetId);
        if (found) {
          setSelectedProperty(found);
          setActivePage('propertyDetails');
          return;
        }
      }
      setActivePage(notif.linkPage);
    }
  };

  // Quick schedule submission
  const handleQuickScheduleSubmit = (e) => {
    e.preventDefault();
    if (!quickAptForm.tenantName || !quickAptForm.tenantPhone) {
      alert('Please fill in tenant name and phone number.');
      return;
    }
    const prop = properties.find((p) => p.id === quickAptForm.propertyId);
    const newAppointment = {
      id: `APT-${Math.floor(400 + Math.random() * 500)}`,
      tenantName: quickAptForm.tenantName,
      tenantPhone: quickAptForm.tenantPhone,
      propertyId: quickAptForm.propertyId,
      propertyTitle: prop ? prop.title : 'Selected Property',
      location: prop ? `${prop.suburb}, ${prop.city}` : 'To be confirmed',
      assignedAgentId: agent.id,
      date: quickAptForm.date,
      time: quickAptForm.time,
      status: 'Scheduled',
      notes: quickAptForm.notes
    };
    handleAddAppointment(newAppointment);
    setQuickScheduleModalOpen(false);
    alert(`Viewing successfully scheduled for ${quickAptForm.tenantName}!`);
  };

  // Lead scheduling shortcut
  const handleScheduleViewingForLead = (lead) => {
    setSelectedLead(null);
    setQuickAptForm({
      tenantName: lead.tenantName,
      tenantPhone: lead.phone,
      propertyId: lead.propertyId || properties[0]?.id || '',
      date: '2026-10-15',
      time: '12:00',
      notes: `Viewing requested for ${lead.propertyTitle}`
    });
    setQuickScheduleModalOpen(true);
  };

  // Counts for sidebar badges
  const leadsCount = leads.filter((l) => l.status === 'New Enquiry').length;
  const appointmentsCount = appointments.filter((a) => a.status === 'Scheduled').length;
  const applicationsCount = applications.filter((a) => a.status === 'Under Review' || a.status === 'Awaiting Documents').length;

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={navigateTo}
        agent={agent}
        leadsCount={leadsCount}
        appointmentsCount={appointmentsCount}
        applicationsCount={applicationsCount}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          activePage={activePage}
          agent={agent}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotifsAsRead}
          onToggleRead={handleToggleNotifRead}
          onSelectNotification={handleSelectNotification}
          onNavigate={navigateTo}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          onSwitchToTenantView={onSwitchToTenantView}
          onLogout={onLogout}
        />

        <main className="page-content">
          {/* PAGE 1: OVERVIEW */}
          {activePage === 'overview' && (
            <Overview
              agent={agent}
              properties={properties}
              leads={leads}
              appointments={appointments}
              onNavigate={navigateTo}
              onSelectLead={(lead) => {
                setSelectedLead(lead);
                setActivePage('leads');
              }}
              onSelectProperty={(prop) => {
                setSelectedProperty(prop);
                setActivePage('propertyDetails');
              }}
              onOpenScheduleModal={() => setQuickScheduleModalOpen(true)}
            />
          )}

          {/* PAGE 2: PROPERTIES */}
          {activePage === 'properties' && (
            <Properties
              properties={properties}
              onNavigate={navigateTo}
              onViewProperty={(prop) => {
                setSelectedProperty(prop);
                setActivePage('propertyDetails');
              }}
              onEditProperty={handleEditProperty}
              onDuplicateProperty={handleDuplicateProperty}
              onToggleStatus={handleTogglePropertyStatus}
            />
          )}

          {/* PAGE 3: ADD PROPERTY */}
          {activePage === 'addProperty' && (
            <AddProperty
              initialData={editingProperty}
              onSaveProperty={handleSaveProperty}
              onCancel={() => {
                setEditingProperty(null);
                setActivePage('properties');
              }}
            />
          )}

          {/* PAGE 4: PROPERTY DETAILS */}
          {activePage === 'propertyDetails' && (
            <PropertyDetails
              property={selectedProperty || properties[0]}
              onBack={() => setActivePage('properties')}
              onEdit={handleEditProperty}
              onToggleStatus={handleTogglePropertyStatus}
              onScheduleViewing={(prop) => {
                setQuickAptForm({
                  tenantName: '',
                  tenantPhone: '',
                  propertyId: prop.id,
                  date: '2026-10-16',
                  time: '11:00',
                  notes: `Viewing for ${prop.title}`
                });
                setQuickScheduleModalOpen(true);
              }}
            />
          )}

          {/* PAGE 5: LEADS & ENQUIRIES CRM */}
          {activePage === 'leads' && (
            <Leads
              leads={leads}
              properties={properties}
              agent={agent}
              selectedLead={selectedLead}
              onSelectLead={(lead) => setSelectedLead(lead)}
              onCloseLeadDetails={() => setSelectedLead(null)}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onAddLeadNote={handleAddLeadNote}
              onScheduleViewingForLead={handleScheduleViewingForLead}
            />
          )}

          {/* PAGE 6: VIEWINGS & APPOINTMENTS */}
          {activePage === 'appointments' && (
            <Appointments
              appointments={appointments}
              properties={properties}
              leads={leads}
              agent={agent}
              onAddAppointment={handleAddAppointment}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              onRecordFeedback={handleRecordFeedback}
            />
          )}

          {/* PAGE 7: MESSAGES & WHATSAPP */}
          {activePage === 'messages' && (
            <Messages
              leads={leads}
              agent={agent}
              onRecordLeadOutcome={handleRecordLeadOutcome}
            />
          )}

          {/* PAGE 8: RENTAL APPLICATIONS */}
          {activePage === 'applications' && (
            <Applications
              applications={applications}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
            />
          )}

          {/* PAGE 9: REPORTS & ANALYTICS */}
          {activePage === 'analytics' && (
            <Analytics
              properties={properties}
              leads={leads}
              appointments={appointments}
              applications={applications}
            />
          )}

          {/* PAGE 10: AGENCY & TEAM */}
          {activePage === 'team' && (
            <Team
              agent={agent}
              properties={properties}
              leads={leads}
            />
          )}

          {/* PAGE 11: MY PROFILE */}
          {activePage === 'profile' && (
            <Profile
              agent={agent}
              onUpdateAgent={(updated) => setAgent(updated)}
            />
          )}

          {/* PAGE 12: SETTINGS */}
          {activePage === 'settings' && (
            <Settings
              agent={agent}
              onUpdateAgent={(updated) => setAgent(updated)}
            />
          )}
        </main>
      </div>

      {/* Quick Schedule Viewing Modal */}
      <Modal
        isOpen={quickScheduleModalOpen}
        onClose={() => setQuickScheduleModalOpen(false)}
        title="Schedule Property Viewing"
        subtitle="Reserve a physical inspection appointment for a prospective tenant"
      >
        <form onSubmit={handleQuickScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FormField
            label="Tenant Name"
            name="tenantName"
            value={quickAptForm.tenantName}
            onChange={(e) => setQuickAptForm({ ...quickAptForm, tenantName: e.target.value })}
            placeholder="e.g. Lerato Khumalo"
            required
          />

          <FormField
            label="Tenant Phone Number (South Africa)"
            name="tenantPhone"
            value={quickAptForm.tenantPhone}
            onChange={(e) => setQuickAptForm({ ...quickAptForm, tenantPhone: e.target.value })}
            placeholder="082 491 8203"
            required
          />

          <FormField
            label="Property"
            name="propertyId"
            type="select"
            value={quickAptForm.propertyId}
            onChange={(e) => setQuickAptForm({ ...quickAptForm, propertyId: e.target.value })}
            options={properties.map((p) => ({ value: p.id, label: `${p.title} (${p.suburb})` }))}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormField
              label="Date"
              name="date"
              type="date"
              value={quickAptForm.date}
              onChange={(e) => setQuickAptForm({ ...quickAptForm, date: e.target.value })}
              required
            />
            <FormField
              label="Time"
              name="time"
              type="time"
              value={quickAptForm.time}
              onChange={(e) => setQuickAptForm({ ...quickAptForm, time: e.target.value })}
              required
            />
          </div>

          <FormField
            label="Appointment Instructions"
            name="notes"
            type="textarea"
            rows={2}
            value={quickAptForm.notes}
            onChange={(e) => setQuickAptForm({ ...quickAptForm, notes: e.target.value })}
            placeholder="e.g. Guardhouse code required, tenant accompanied by partner..."
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setQuickScheduleModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Book Viewing Now
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
