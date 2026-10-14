import React from 'react';
import {
  ChevronLeft,
  MapPin,
  Bed,
  Bath,
  Car,
  ShieldCheck,
  Calendar,
  DollarSign,
  Share2,
  Edit2,
  CheckCircle,
  Eye,
  MessageSquare,
  Lock,
  ExternalLink
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatZAR, calculateTotalMonthlyCost } from '../utils/currency';
import { formatDate } from '../utils/dates';

export default function PropertyDetails({
  property,
  onBack,
  onEdit,
  onToggleStatus,
  onScheduleViewing,
  enquiries = []
}) {
  if (!property) return null;

  const totalMonthly = calculateTotalMonthlyCost({
    monthlyRent: property.monthlyRent,
    electricity: property.electricity,
    water: property.water,
    internet: property.internet,
    parking: property.parking,
    otherRecurring: property.otherRecurring
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Navigation header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ChevronLeft size={16} /> Back to Properties
        </button>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onEdit(property)}>
            <Edit2 size={14} /> Edit Listing
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onScheduleViewing(property)}
          >
            <Calendar size={14} /> Schedule Viewing
          </button>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 4, maxHeight: 380, overflow: 'hidden' }}>
          <img
            src={property.coverImage}
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 280 }}
          />
          {property.images && property.images.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {property.images.slice(1, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Detail ${i + 1}`}
                  style={{ width: '100%', height: 188, objectFit: 'cover' }}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="badge badge-draft">{property.type}</span>
                <StatusBadge status={property.status} />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>ID: {property.id}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 8 }}>{property.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: 4 }}>
                <MapPin size={16} />
                <span>
                  {property.addressVisibility === 'Exact Address' ? property.streetAddress + ', ' : ''}
                  {property.suburb}, {property.city}, {property.province}
                </span>
                {property.addressVisibility !== 'Exact Address' && (
                  <span className="badge badge-draft" style={{ fontSize: '0.65rem' }}>
                    <Lock size={10} /> {property.addressVisibility}
                  </span>
                )}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {formatZAR(property.monthlyRent)}
                <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--color-muted)' }}> / month</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                Deposit: {formatZAR(property.deposit)}
              </div>
            </div>
          </div>

          {/* Key specs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16,
              padding: '16px 20px',
              backgroundColor: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Bedrooms</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginTop: 2 }}>
                {property.bedrooms === 0 ? 'Studio Suite' : `${property.bedrooms} Bed`}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Bathrooms</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginTop: 2 }}>{property.bathrooms} Bath</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Furnishing</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginTop: 2 }}>{property.furnishedStatus}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Parking</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginTop: 2 }}>{property.parkingSpots || 0} Dedicated Bays</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Move-in Timing</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginTop: 2 }}>{property.moveInTiming || 'Immediate'}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>About This Property</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {property.description}
            </p>
          </div>

          {/* Cost breakdown widget */}
          <div className="cost-calculator-box">
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-primary)' }}>
              Detailed Rental Cost Breakdown (South African Standard)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
                  Monthly Recurring
                </div>
                <div className="cost-row">
                  <span>Base Rent:</span>
                  <strong>{formatZAR(property.monthlyRent)}</strong>
                </div>
                <div className="cost-row">
                  <span>Electricity (Est.):</span>
                  <span>{formatZAR(property.electricity || 0)}</span>
                </div>
                <div className="cost-row">
                  <span>Water (Est.):</span>
                  <span>{formatZAR(property.water || 0)}</span>
                </div>
                <div className="cost-row">
                  <span>High-Speed Fibre:</span>
                  <span>{formatZAR(property.internet || 0)}</span>
                </div>
                <div className="cost-row">
                  <span>Parking Bay:</span>
                  <span>{formatZAR(property.parking || 0)}</span>
                </div>
                <div className="cost-total-row">
                  <span>Total Monthly:</span>
                  <span>{formatZAR(totalMonthly)} / mo</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
                  Once-Off Lease Initiation
                </div>
                <div className="cost-row">
                  <span>Security Deposit:</span>
                  <span>{formatZAR(property.deposit)}</span>
                </div>
                <div className="cost-row">
                  <span>Lease Admin Fee:</span>
                  <span>{formatZAR(property.onceOffFees || 0)}</span>
                </div>
                <div className="cost-total-row" style={{ color: 'var(--color-text)' }}>
                  <span>Total Move-in Capital:</span>
                  <span>{formatZAR(Number(property.deposit || 0) + Number(property.onceOffFees || 0))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features and Amenities lists */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: 10 }}>Security Features</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(property.securityFeatures || []).map((sec, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    <ShieldCheck size={14} color="var(--color-success)" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: 10 }}>Building Amenities</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(property.amenities || []).map((amenity, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    <CheckCircle size={14} color="var(--color-primary)" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
