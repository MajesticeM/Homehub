import React, { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  Image as ImageIcon,
  Trash2,
  Star,
  Info,
  DollarSign,
  Building,
  MapPin,
  ListFilter,
  Eye,
  AlertCircle
} from 'lucide-react';
import FormField from '../components/FormField';
import { formatZAR, calculateTotalMonthlyCost } from '../utils/currency';

export default function AddProperty({
  onSaveProperty,
  onCancel,
  initialData = null
}) {
  const isEditing = !!initialData;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [formData, setFormData] = useState(
    initialData || {
      // Step 1: Basic info
      title: '',
      type: 'Apartment',
      description: '',
      // Step 2: Location
      province: 'Gauteng',
      city: 'Johannesburg',
      suburb: '',
      streetAddress: '',
      addressVisibility: 'Suburbs Only',
      // Step 3: Costs
      monthlyRent: '',
      deposit: '',
      electricity: '0',
      water: '0',
      internet: '0',
      parking: '0',
      otherRecurring: '0',
      onceOffFees: '1000',
      // Step 4: Features
      bedrooms: '1',
      bathrooms: '1',
      furnishedStatus: 'Unfurnished',
      bathroomType: 'Private En-suite',
      kitchenType: 'Full Kitchen',
      parkingSpots: '1',
      petPolicy: 'No Pets Allowed',
      securityFeatures: ['Electric Fence', 'Access Controlled'],
      amenities: ['Fibre Internet Ready'],
      moveInDate: '2026-11-01',
      minLeasePeriod: '12 Months',
      // Step 5: Images
      coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
      ],
      // Step 6: Availability
      moveInTiming: 'Immediate',
      occupancyStatus: 'Vacant',
      viewingAvailability: 'Weekdays 10:00 - 16:00',
      // Meta
      status: 'Published'
    }
  );

  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCheckboxArrayToggle = (category, item) => {
    setFormData((prev) => {
      const currentList = prev[category] || [];
      const updated = currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      return { ...prev, [category]: updated };
    });
  };

  // Live Cost Calculations
  const totalMonthlyCost = calculateTotalMonthlyCost({
    monthlyRent: formData.monthlyRent,
    electricity: formData.electricity,
    water: formData.water,
    internet: formData.internet,
    parking: formData.parking,
    otherRecurring: formData.otherRecurring
  });

  // Image Upload handler via FileReader
  const handleImageUpload = (e) => {
    setUploadError('');
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select valid image files (JPG, PNG, WebP).');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Image exceeds 5MB size limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target.result;
        setFormData((prev) => {
          const newImages = [...prev.images, resultUrl];
          return {
            ...prev,
            images: newImages,
            coverImage: prev.coverImage || resultUrl
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => {
      const filtered = prev.images.filter((_, idx) => idx !== indexToRemove);
      const newCover = prev.coverImage === prev.images[indexToRemove]
        ? (filtered[0] || '')
        : prev.coverImage;
      return { ...prev, images: filtered, coverImage: newCover };
    });
  };

  const setAsCover = (imgUrl) => {
    setFormData((prev) => ({ ...prev, coverImage: imgUrl }));
  };

  // Validation per step
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Property title is required';
      if (!formData.description.trim()) errs.description = 'Please provide a property description';
    } else if (step === 2) {
      if (!formData.suburb.trim()) errs.suburb = 'Suburb or township is required';
      if (!formData.city.trim()) errs.city = 'City is required';
    } else if (step === 3) {
      if (!formData.monthlyRent || Number(formData.monthlyRent) <= 0) {
        errs.monthlyRent = 'Please specify a valid monthly rental amount';
      }
      if (!formData.deposit || Number(formData.deposit) <= 0) {
        errs.deposit = 'Deposit amount is required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (finalStatus = 'Published') => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert('Please fill in all mandatory fields before publishing.');
      return;
    }

    const newProperty = {
      ...formData,
      id: formData.id || `PROP-${Math.floor(100 + Math.random() * 900)}`,
      status: finalStatus,
      monthlyRent: Number(formData.monthlyRent),
      deposit: Number(formData.deposit),
      electricity: Number(formData.electricity || 0),
      water: Number(formData.water || 0),
      internet: Number(formData.internet || 0),
      parking: Number(formData.parking || 0),
      otherRecurring: Number(formData.otherRecurring || 0),
      onceOffFees: Number(formData.onceOffFees || 0),
      bedrooms: Number(formData.bedrooms || 0),
      bathrooms: Number(formData.bathrooms || 1),
      views: formData.views || 0,
      enquiriesCount: formData.enquiriesCount || 0,
      dateCreated: formData.dateCreated || new Date().toISOString().split('T')[0]
    };

    onSaveProperty(newProperty);
  };

  const stepsList = [
    'Basic Info',
    'Location',
    'Rental Costs',
    'Features',
    'Images',
    'Availability',
    'Preview'
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {isEditing ? `Edit Listing (${formData.id})` : 'Create New Rental Listing'}
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            Complete the details below to publish your property to the South African tenant directory
          </p>
        </div>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {/* Wizard Step Indicator */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div className="wizard-progress">
          {stepsList.map((stepName, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isActive = currentStep === stepNum;
            return (
              <div
                key={stepName}
                className={`step-indicator ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  if (isCompleted || isActive) setCurrentStep(stepNum);
                }}
                style={{ cursor: isCompleted ? 'pointer' : 'default' }}
              >
                <div className="step-circle">
                  {isCompleted ? <Check size={16} /> : stepNum}
                </div>
                <span className="step-label">{stepName}</span>
              </div>
            );
          })}
        </div>

        {/* Wizard Form Steps */}
        <div style={{ marginTop: 24 }}>
          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Step 1: Basic Information</h3>
              <div className="form-grid">
                <div className="form-full">
                  <FormField
                    label="Property Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern 2-Bed Luxury Apartment with Balcony"
                    required
                    error={errors.title}
                    hint="A descriptive headline highlighting key appeal and location"
                  />
                </div>

                <FormField
                  label="Property Type"
                  name="type"
                  type="select"
                  value={formData.type}
                  onChange={handleChange}
                  options={['Apartment', 'Studio', 'Townhouse', 'Room', 'Cottage', 'Flat', 'House']}
                  required
                />

                <div className="form-full">
                  <FormField
                    label="Property Description"
                    name="description"
                    type="textarea"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the condition, security features, proximity to public transport (Gautrain, MyCiTi), shopping centres, and universities..."
                    required
                    error={errors.description}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Step 2: Location & Address</h3>
              <div className="form-grid">
                <FormField
                  label="Province"
                  name="province"
                  type="select"
                  value={formData.province}
                  onChange={handleChange}
                  options={[
                    'Gauteng',
                    'Western Cape',
                    'KwaZulu-Natal',
                    'Eastern Cape',
                    'Free State',
                    'Mpumalanga',
                    'Limpopo',
                    'North West',
                    'Northern Cape'
                  ]}
                  required
                />

                <FormField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Johannesburg, Cape Town, Pretoria, Durban"
                  required
                  error={errors.city}
                />

                <FormField
                  label="Suburb or Township"
                  name="suburb"
                  value={formData.suburb}
                  onChange={handleChange}
                  placeholder="e.g. Rosebank, Sea Point, Hatfield, Bryanston, Umhlanga"
                  required
                  error={errors.suburb}
                />

                <FormField
                  label="Street Address / Complex Name"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="e.g. 42 Oxford Road, The Median"
                />

                <div className="form-full">
                  <FormField
                    label="Public Address Visibility Setting"
                    name="addressVisibility"
                    type="select"
                    value={formData.addressVisibility}
                    onChange={handleChange}
                    options={['Suburbs Only', 'Exact Address', 'Complex Name Only']}
                    hint="For safety and privacy, you can display only the suburb until a viewing appointment is confirmed."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RENTAL COSTS */}
          {currentStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Step 3: Rental & Additional Costs</h3>
              <div className="form-grid">
                <FormField
                  label="Monthly Rental Amount"
                  name="monthlyRent"
                  type="number"
                  prefix="R"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  placeholder="14500"
                  required
                  error={errors.monthlyRent}
                />

                <FormField
                  label="Security Deposit"
                  name="deposit"
                  type="number"
                  prefix="R"
                  value={formData.deposit}
                  onChange={handleChange}
                  placeholder="14500"
                  required
                  error={errors.deposit}
                  hint="Typically 1 to 1.5 months of base rent"
                />

                <FormField
                  label="Estimated Electricity (Monthly)"
                  name="electricity"
                  type="number"
                  prefix="R"
                  value={formData.electricity}
                  onChange={handleChange}
                  hint="Prepaid or billed (0 if included)"
                />

                <FormField
                  label="Estimated Water (Monthly)"
                  name="water"
                  type="number"
                  prefix="R"
                  value={formData.water}
                  onChange={handleChange}
                  hint="0 if included in rent"
                />

                <FormField
                  label="Internet / Fibre Fee (Monthly)"
                  name="internet"
                  type="number"
                  prefix="R"
                  value={formData.internet}
                  onChange={handleChange}
                  hint="0 if tenant arranges own ISP"
                />

                <FormField
                  label="Dedicated Parking Bay Fee"
                  name="parking"
                  type="number"
                  prefix="R"
                  value={formData.parking}
                  onChange={handleChange}
                  hint="0 if included"
                />

                <FormField
                  label="Other Recurring Costs (e.g. Garden/Cleaning)"
                  name="otherRecurring"
                  type="number"
                  prefix="R"
                  value={formData.otherRecurring}
                  onChange={handleChange}
                />

                <FormField
                  label="Once-off Lease / Admin Fee"
                  name="onceOffFees"
                  type="number"
                  prefix="R"
                  value={formData.onceOffFees}
                  onChange={handleChange}
                  hint="Lease prep, credit check & inspection fee"
                />
              </div>

              {/* Real-time Housing Cost Calculator */}
              <div className="cost-calculator-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.9375rem', marginBottom: 10 }}>
                  <DollarSign size={18} color="var(--color-primary)" />
                  <span>Estimated Total Monthly Tenant Commitment</span>
                </div>
                <div className="cost-row">
                  <span>Base Monthly Rent:</span>
                  <span>{formatZAR(formData.monthlyRent || 0)}</span>
                </div>
                <div className="cost-row">
                  <span>Utilities (Electricity + Water):</span>
                  <span>{formatZAR(Number(formData.electricity || 0) + Number(formData.water || 0))}</span>
                </div>
                <div className="cost-row">
                  <span>Connectivity & Parking:</span>
                  <span>{formatZAR(Number(formData.internet || 0) + Number(formData.parking || 0))}</span>
                </div>
                <div className="cost-row">
                  <span>Other Recurring:</span>
                  <span>{formatZAR(formData.otherRecurring || 0)}</span>
                </div>
                <div className="cost-total-row">
                  <span>Estimated Total Monthly Cost:</span>
                  <span>{formatZAR(totalMonthlyCost)} / mo</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: 8 }}>
                  Once-off move-in fees required: Deposit {formatZAR(formData.deposit || 0)} + Admin {formatZAR(formData.onceOffFees || 0)} = {formatZAR(Number(formData.deposit || 0) + Number(formData.onceOffFees || 0))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FEATURES */}
          {currentStep === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Step 4: Property Features & Arrangements</h3>
              <div className="form-grid">
                <FormField
                  label="Bedrooms"
                  name="bedrooms"
                  type="select"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  options={[
                    { value: '0', label: '0 (Studio / Bachelor)' },
                    { value: '1', label: '1 Bedroom' },
                    { value: '2', label: '2 Bedrooms' },
                    { value: '3', label: '3 Bedrooms' },
                    { value: '4', label: '4 Bedrooms' },
                    { value: '5', label: '5+ Bedrooms' }
                  ]}
                />

                <FormField
                  label="Bathrooms"
                  name="bathrooms"
                  type="select"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  options={['1', '1.5', '2', '2.5', '3', '4']}
                />

                <FormField
                  label="Furnished Status"
                  name="furnishedStatus"
                  type="select"
                  value={formData.furnishedStatus}
                  onChange={handleChange}
                  options={['Unfurnished', 'Semi-Furnished', 'Fully Furnished']}
                />

                <FormField
                  label="Bathroom Arrangement"
                  name="bathroomType"
                  type="select"
                  value={formData.bathroomType}
                  onChange={handleChange}
                  options={['Private En-suite', 'Shared Bathroom', 'Full Family Bathroom']}
                />

                <FormField
                  label="Kitchen Arrangement"
                  name="kitchenType"
                  type="select"
                  value={formData.kitchenType}
                  onChange={handleChange}
                  options={['Full Kitchen', 'Open-Plan Gourmet', 'Kitchenette', 'Shared Communal Kitchen']}
                />

                <FormField
                  label="Parking Bays"
                  name="parkingSpots"
                  type="select"
                  value={formData.parkingSpots}
                  onChange={handleChange}
                  options={['0', '1', '2', '3+']}
                />

                <FormField
                  label="Pet Policy"
                  name="petPolicy"
                  type="select"
                  value={formData.petPolicy}
                  onChange={handleChange}
                  options={[
                    'No Pets Allowed',
                    'Cats Only (Body Corp approval)',
                    'Small Dogs & Cats Allowed',
                    'Pet Friendly'
                  ]}
                />

                <FormField
                  label="Minimum Lease Period"
                  name="minLeasePeriod"
                  type="select"
                  value={formData.minLeasePeriod}
                  onChange={handleChange}
                  options={['6 Months', '10 Months', '12 Months', '24 Months']}
                />
              </div>

              {/* Security features checkboxes */}
              <div>
                <label className="form-label" style={{ marginBottom: 8 }}>
                  Security & Access Control
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                  {[
                    '24/7 Security Guard',
                    'Biometric Access',
                    'CCTV Surveillance',
                    'Electric Fence',
                    'Armed Response',
                    'Boomed Off Enclosure',
                    'Intercom'
                  ].map((sec) => (
                    <label key={sec} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem' }}>
                      <input
                        type="checkbox"
                        checked={(formData.securityFeatures || []).includes(sec)}
                        onChange={() => handleCheckboxArrayToggle('securityFeatures', sec)}
                      />
                      <span>{sec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <label className="form-label" style={{ marginBottom: 8 }}>
                  Amenities & Facilities
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                  {[
                    'Fibre Internet Ready',
                    'Backup Inverter / Solar',
                    'Balcony / Patio',
                    'Pool & Clubhouse',
                    'Gym Access',
                    'Private Garden',
                    'Laundromat On-site',
                    'Elevator Access'
                  ].map((amenity) => (
                    <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem' }}>
                      <input
                        type="checkbox"
                        checked={(formData.amenities || []).includes(amenity)}
                        onChange={() => handleCheckboxArrayToggle('amenities', amenity)}
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: IMAGES */}
          {currentStep === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Step 5: Property Images</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                  Upload clear photos of living spaces, bedrooms, bathrooms, and exterior. Local preview is supported.
                </p>
              </div>

              {/* Upload Drop Zone */}
              <label
                style={{
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  padding: '36px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#fafbfc',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <Upload size={32} color="var(--color-primary)" style={{ marginBottom: 8 }} />
                <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Click or drop photos to upload</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: 4 }}>
                  Supports PNG, JPG, WebP up to 5MB each.
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>

              {uploadError && (
                <div style={{ color: 'var(--color-danger)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertCircle size={14} />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Image Previews Grid */}
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 12 }}>
                  Selected Images ({formData.images?.length || 0})
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
                  {(formData.images || []).map((imgUrl, idx) => {
                    const isCover = formData.coverImage === imgUrl;
                    return (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          height: 120,
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          border: isCover ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          boxShadow: 'var(--shadow-xs)'
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt={`Uploaded preview ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />

                        {isCover && (
                          <span
                            style={{
                              position: 'absolute',
                              top: 4,
                              left: 4,
                              background: 'var(--color-primary)',
                              color: '#fff',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            Cover Image
                          </span>
                        )}

                        <div
                          style={{
                            position: 'absolute',
                            bottom: 4,
                            right: 4,
                            display: 'flex',
                            gap: 4
                          }}
                        >
                          {!isCover && (
                            <button
                              onClick={() => setAsCover(imgUrl)}
                              style={{
                                background: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                padding: 4,
                                borderRadius: 'var(--radius-sm)'
                              }}
                              title="Set as Cover"
                            >
                              <Star size={12} />
                            </button>
                          )}
                          <button
                            onClick={() => removeImage(idx)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.8)',
                              color: '#fff',
                              padding: 4,
                              borderRadius: 'var(--radius-sm)'
                            }}
                            title="Remove image"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: AVAILABILITY */}
          {currentStep === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Step 6: Availability & Viewings</h3>
              <div className="form-grid">
                <FormField
                  label="Move-in Timing"
                  name="moveInTiming"
                  type="select"
                  value={formData.moveInTiming}
                  onChange={handleChange}
                  options={['Immediate', 'Available 1 Nov 2026', 'Available 1 Dec 2026', 'From a future date']}
                />

                <FormField
                  label="Earliest Move-in Date"
                  name="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={handleChange}
                />

                <FormField
                  label="Current Occupancy Status"
                  name="occupancyStatus"
                  type="select"
                  value={formData.occupancyStatus}
                  onChange={handleChange}
                  options={['Vacant', 'Occupied (Notice given)', 'Under Renovation']}
                />

                <div className="form-full">
                  <FormField
                    label="Viewing Availability Times"
                    name="viewingAvailability"
                    value={formData.viewingAvailability}
                    onChange={handleChange}
                    placeholder="e.g. Weekdays 10:00 - 17:00, Saturdays 11:00 - 13:00"
                    hint="Times when prospective tenants can book viewings"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: PREVIEW & PUBLISH */}
          {currentStep === 7 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Step 7: Preview & Final Confirmation</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                  Review listing details before publishing to active property portals
                </p>
              </div>

              {/* Listing Card Preview */}
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'hidden',
                  flexWrap: 'wrap'
                }}
              >
                <img
                  src={formData.coverImage}
                  alt={formData.title}
                  style={{ width: 280, height: 220, objectFit: 'cover' }}
                />
                <div style={{ padding: 20, flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="badge badge-published">Ready to Publish</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {formatZAR(formData.monthlyRent)} <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-muted)' }}>/ mo</span>
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{formData.title || 'Untitled Property'}</h4>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                    <MapPin size={14} />
                    <span>{formData.suburb}, {formData.city} ({formData.province})</span>
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', display: 'flex', gap: 14 }}>
                    <span>{formData.bedrooms === '0' ? 'Studio' : `${formData.bedrooms} Bedrooms`}</span>
                    <span>•</span>
                    <span>{formData.bathrooms} Bathrooms</span>
                    <span>•</span>
                    <span>{formData.furnishedStatus}</span>
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {formData.description}
                  </p>

                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span>Total Estimated Monthly: <strong>{formatZAR(totalMonthlyCost)}</strong></span>
                    <span>Move-in: <strong>{formData.moveInTiming}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 18,
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {currentStep > 1 ? (
            <button className="btn btn-secondary" onClick={handlePrev}>
              <ChevronLeft size={16} /> Previous Step
            </button>
          ) : (
            <div />
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              className="btn btn-secondary"
              onClick={() => handleSubmit('Draft')}
            >
              Save as Draft
            </button>

            {currentStep < totalSteps ? (
              <button className="btn btn-primary" onClick={handleNext}>
                <span>Next Step</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => handleSubmit('Published')}
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                <Check size={16} />
                <span>Publish Listing Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
