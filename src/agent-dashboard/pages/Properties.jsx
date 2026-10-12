import React, { useState, useMemo } from 'react';
import {
  LayoutGrid,
  List,
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Building2,
  Eye,
  MessageSquare,
  Edit2,
  Copy,
  Trash2,
  ExternalLink,
  MapPin
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import StatusBadge from '../components/StatusBadge';
import { formatZAR } from '../utils/currency';
import { formatDate } from '../utils/dates';

export default function Properties({
  properties,
  onNavigate,
  onViewProperty,
  onEditProperty,
  onDuplicateProperty,
  onDeleteProperty,
  onToggleStatus
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-low', 'price-high', 'views'

  const propertyTypes = ['All', 'Apartment', 'Studio', 'Townhouse', 'Room', 'Cottage', 'Flat', 'House'];
  const statuses = ['All', 'Published', 'Reserved', 'Rented', 'Draft', 'Pending Review', 'Unpublished'];

  // Filtered & sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        const matchesSearch =
          search === '' ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.suburb.toLowerCase().includes(search.toLowerCase()) ||
          p.city.toLowerCase().includes(search.toLowerCase()) ||
          p.id.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
        const matchesType = typeFilter === 'All' || p.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.monthlyRent - b.monthlyRent;
        if (sortBy === 'price-high') return b.monthlyRent - a.monthlyRent;
        if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
        return new Date(b.dateCreated || 0) - new Date(a.dateCreated || 0);
      });
  }, [properties, search, statusFilter, typeFilter, sortBy]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top action header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Property Portfolio</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            Manage, publish, and track all residential rental units ({filteredProperties.length} of {properties.length} listings shown)
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onNavigate('addProperty')}
        >
          <Plus size={18} />
          <span>+ Add New Property</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          {/* Search input */}
          <div style={{ position: 'relative', width: 260 }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }}
            />
            <input
              type="text"
              placeholder="Filter by title, suburb, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              style={{ paddingLeft: 34, height: 38, fontSize: '0.875rem' }}
            />
          </div>

          {/* Status selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontWeight: 600 }}>Status:</span>
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

          {/* Type selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontWeight: 600 }}>Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', height: 38, padding: '0 10px', fontSize: '0.8125rem' }}
            >
              {propertyTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontWeight: 600 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ width: 'auto', height: 38, padding: '0 10px', fontSize: '0.8125rem' }}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* View mode toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: '#f1f5f9', padding: 3, borderRadius: 'var(--radius-md)' }}>
          <button
            className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            style={{
              padding: '6px 10px',
              backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
              borderColor: viewMode === 'grid' ? 'var(--color-border)' : 'transparent',
              borderRadius: 'var(--radius-sm)'
            }}
            title="Grid View"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            className={`btn-icon ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            style={{
              padding: '6px 10px',
              backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
              borderColor: viewMode === 'table' ? 'var(--color-border)' : 'transparent',
              borderRadius: 'var(--radius-sm)'
            }}
            title="Table View"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 ? (
        <div
          className="card"
          style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-muted)' }}
        >
          <Building2 size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)' }}>No Properties Found</h3>
          <p style={{ fontSize: '0.875rem', marginTop: 4 }}>
            Try adjusting your search criteria or filter options.
          </p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: 16 }}
            onClick={() => {
              setSearch('');
              setStatusFilter('All');
              setTypeFilter('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="property-grid">
          {filteredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onView={onViewProperty}
              onEdit={onEditProperty}
              onDuplicate={onDuplicateProperty}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Monthly Rent</th>
                  <th>Bed / Bath</th>
                  <th>Status</th>
                  <th>Stats</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                        />
                        <div>
                          <div
                            style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--color-text)' }}
                            onClick={() => onViewProperty(p)}
                          >
                            {p.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{p.type}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8125rem' }}>
                        <MapPin size={13} color="var(--color-muted)" />
                        <span>{p.suburb}, {p.city}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatZAR(p.monthlyRent)}
                      </div>
                      <div style={{ fontSize: '0.7188rem', color: 'var(--color-muted)' }}>
                        Deposit: {formatZAR(p.deposit)}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem' }}>
                        {p.bedrooms === 0 ? 'Studio' : `${p.bedrooms} Beds`} / {p.bathrooms} Baths
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={p.status} size="small" />
                    </td>
                    <td>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                        <div>{p.views} views</div>
                        <div>{p.enquiriesCount} enquiries</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => onViewProperty(p)}
                          title="View property details"
                        >
                          View
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => onEditProperty(p)}
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => onDuplicateProperty(p)}
                          title="Duplicate"
                        >
                          <Copy size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
