import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Clock,
  ArrowUpRight,
  Filter,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { formatZAR } from '../utils/currency';
import { analyticsMonthlyData } from '../data/mockData';

export default function Analytics({
  properties,
  leads,
  appointments,
  applications
}) {
  const [timeRange, setTimeRange] = useState('6months');

  // Dynamic calculations from actual datasets
  const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalEnquiries = leads.length;
  const totalAppointments = appointments.length;
  const totalApplications = applications.length;
  const totalLeasesSigned = applications.filter((a) => a.status === 'Lease Signed').length;

  // Funnel conversion percentages
  const enquiryToViewingPct = totalEnquiries > 0 ? Math.round((totalAppointments / totalEnquiries) * 100) : 0;
  const viewingToAppPct = totalAppointments > 0 ? Math.round((totalApplications / totalAppointments) * 100) : 0;
  const appToLeasePct = totalApplications > 0 ? Math.round((totalLeasesSigned / totalApplications) * 100) : 0;

  // Popular vs low enquiries
  const sortedByEnquiries = [...properties].sort((a, b) => b.enquiriesCount - a.enquiriesCount);
  const highDemand = sortedByEnquiries.slice(0, 3);
  const lowDemand = sortedByEnquiries.slice(-3).reverse();

  // SVG Chart Dimensions for enquiries over time
  const maxEnquiry = Math.max(...analyticsMonthlyData.map((d) => d.enquiries), 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Reports & Performance Analytics
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            Rental portfolio throughput, conversion funnels, tenant demand and listing engagement
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontWeight: 600 }}>Period:</span>
          <select
            className="form-control"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{ width: 'auto', height: 38, padding: '0 10px', fontSize: '0.8125rem' }}
          >
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months (Active)</option>
            <option value="ytd">Year to Date 2026</option>
          </select>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="stats-grid">
        <StatCard
          title="Total Listing Views"
          value={totalViews.toLocaleString()}
          icon={Eye}
          iconBg="var(--color-primary-subtle)"
          iconColor="var(--color-primary)"
          trendText="+18.4% vs last month"
        />
        <StatCard
          title="Active Tenant Leads"
          value={totalEnquiries}
          icon={Users}
          iconBg="var(--color-info-bg)"
          iconColor="var(--color-info)"
          trendText="Across WhatsApp & Portal"
        />
        <StatCard
          title="Viewings Conducted"
          value={totalAppointments}
          icon={Calendar}
          iconBg="var(--color-teal-light)"
          iconColor="var(--color-teal)"
          trendText="Physical & virtual tours"
        />
        <StatCard
          title="Leases Signed"
          value={totalLeasesSigned}
          icon={CheckCircle}
          iconBg="var(--color-success-bg)"
          iconColor="var(--color-success)"
          trendText="Closed tenancy contracts"
        />
        <StatCard
          title="Avg Agent Response"
          value="14 mins"
          icon={Clock}
          iconBg="var(--color-purple-bg)"
          iconColor="var(--color-purple)"
          trendText="Target: Under 30 mins"
        />
      </div>

      {/* Main Row: Trend Chart & Funnel */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'stretch' }}>
        {/* Enquiries Over Time SVG Chart */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Tenant Enquiries & Deal Pipeline Over Time</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                Monthly volume progression (May - October 2026)
              </p>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div style={{ flex: 1, minHeight: 220, display: 'flex', alignItems: 'flex-end', gap: 16, paddingTop: 20 }}>
            {analyticsMonthlyData.map((item, idx) => {
              const heightPct = Math.round((item.enquiries / maxEnquiry) * 180);
              const viewingsHeight = Math.round((item.viewings / maxEnquiry) * 180);
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, width: '100%', justifyContent: 'center' }}>
                    {/* Enquiries bar */}
                    <div
                      style={{
                        width: '40%',
                        height: `${heightPct}px`,
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                      title={`${item.month} Enquiries: ${item.enquiries}`}
                    />
                    {/* Viewings bar */}
                    <div
                      style={{
                        width: '40%',
                        height: `${viewingsHeight}px`,
                        backgroundColor: 'var(--color-teal)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                      title={`${item.month} Viewings: ${item.viewings}`}
                    />
                  </div>

                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)' }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, backgroundColor: 'var(--color-primary)', borderRadius: 2 }} />
              Enquiries Received
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, backgroundColor: 'var(--color-teal)', borderRadius: 2 }} />
              Viewings Conducted
            </span>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 4 }}>Conversion Funnel</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginBottom: 20 }}>
            Lead to Signed Lease conversion rates
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Step 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Enquiry → Viewing</span>
                <strong>{enquiryToViewingPct}%</strong>
              </div>
              <div style={{ height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(enquiryToViewingPct, 100)}%`, height: '100%', backgroundColor: 'var(--color-primary)' }} />
              </div>
              <span style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>
                {totalAppointments} viewings out of {totalEnquiries} enquiries
              </span>
            </div>

            {/* Step 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Viewing → Application</span>
                <strong>{viewingToAppPct}%</strong>
              </div>
              <div style={{ height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(viewingToAppPct, 100)}%`, height: '100%', backgroundColor: 'var(--color-teal)' }} />
              </div>
              <span style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>
                {totalApplications} formal applications submitted
              </span>
            </div>

            {/* Step 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Application → Lease Signed</span>
                <strong>{appToLeasePct}%</strong>
              </div>
              <div style={{ height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(appToLeasePct, 100)}%`, height: '100%', backgroundColor: 'var(--color-success)' }} />
              </div>
              <span style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>
                {totalLeasesSigned} leases successfully approved & signed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Demand Highlights: High vs Low Demand Properties */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Most popular */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <TrendingUp size={18} color="var(--color-success)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>High Demand Listings</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {highDemand.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#f8fafc',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                    {p.suburb} • {formatZAR(p.monthlyRent)}/mo
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.875rem' }}>
                    {p.enquiriesCount} enquiries
                  </div>
                  <div style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>{p.views} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower demand */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <AlertTriangle size={18} color="var(--color-warning)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Listings Needing Attention</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lowDemand.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#fffbeb',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                    {p.suburb} • {formatZAR(p.monthlyRent)}/mo
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-warning-text)', fontSize: '0.875rem' }}>
                    {p.enquiriesCount} enquiries
                  </div>
                  <div style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>Consider price review</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
