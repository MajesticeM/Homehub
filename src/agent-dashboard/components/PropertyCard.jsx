import React from 'react';
import { Bed, Bath, Car, Eye, MessageSquare, MapPin, MoreVertical, Edit2, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatZAR } from '../utils/currency';

export default function PropertyCard({
  property,
  onView,
  onEdit,
  onDuplicate,
  onToggleStatus
}) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="prop-card">
      <div className="prop-image-wrap" onClick={() => onView(property)} style={{ cursor: 'pointer' }}>
        <img
          src={property.coverImage || property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'}
          alt={property.title}
          className="prop-image"
          loading="lazy"
        />
        <div className="prop-badges">
          <span className="prop-type-badge">{property.type}</span>
          <StatusBadge status={property.status} size="small" />
        </div>
      </div>

      <div className="prop-content">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="prop-price">
              {formatZAR(property.monthlyRent)}
              <span className="prop-period"> / mo</span>
            </div>
            {property.deposit && (
              <div style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>
                Deposit: {formatZAR(property.deposit)}
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="btn-icon"
              style={{ border: 'none', padding: 4 }}
              title="Property actions"
            >
              <MoreVertical size={16} />
            </button>

            {showMenu && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 28,
                  width: 170,
                  zIndex: 20,
                  padding: '4px 0',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <button
                  className="nav-item"
                  style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
                  onClick={() => {
                    setShowMenu(false);
                    onView(property);
                  }}
                >
                  <ExternalLink size={14} /> View Details
                </button>
                <button
                  className="nav-item"
                  style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(property);
                  }}
                >
                  <Edit2 size={14} /> Edit Listing
                </button>
                <button
                  className="nav-item"
                  style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
                  onClick={() => {
                    setShowMenu(false);
                    onDuplicate(property);
                  }}
                >
                  <Copy size={14} /> Duplicate
                </button>
                <button
                  className="nav-item"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8125rem',
                    color: property.status === 'Rented' ? 'var(--color-primary)' : 'var(--color-purple)'
                  }}
                  onClick={() => {
                    setShowMenu(false);
                    onToggleStatus(property, property.status === 'Rented' ? 'Published' : 'Rented');
                  }}
                >
                  <CheckCircle size={14} /> {property.status === 'Rented' ? 'Mark Available' : 'Mark Rented'}
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="prop-title" onClick={() => onView(property)} style={{ cursor: 'pointer' }}>
          {property.title}
        </h3>

        <div className="prop-location">
          <MapPin size={14} />
          <span>{property.suburb}, {property.city}</span>
        </div>

        <div className="prop-specs">
          <div className="prop-spec-item" title="Bedrooms">
            <Bed size={15} />
            <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Beds`}</span>
          </div>
          <div className="prop-spec-item" title="Bathrooms">
            <Bath size={15} />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="prop-spec-item" title="Parking bays">
            <Car size={15} />
            <span>{property.parkingSpots || 0} Parking</span>
          </div>
        </div>
      </div>

      <div className="prop-stats-bar">
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Eye size={13} /> {property.views || 0} Views
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <MessageSquare size={13} /> {property.enquiriesCount || 0} Enquiries
        </span>
        <span style={{ fontWeight: 600 }}>{property.id}</span>
      </div>
    </div>
  );
}
