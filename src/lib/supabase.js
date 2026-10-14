import { createClient } from '@supabase/supabase-js';

const runtimeEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const supabaseUrl = runtimeEnv.VITE_SUPABASE_URL;
const supabaseAnonKey = runtimeEnv.VITE_SUPABASE_ANON_KEY;

const columnMap = {
  id: 'id',
  title: 'title',
  type: 'type',
  description: 'description',
  province: 'province',
  city: 'city',
  suburb: 'suburb',
  streetAddress: 'street_address',
  addressVisibility: 'address_visibility',
  monthlyRent: 'monthly_rent',
  deposit: 'deposit',
  electricity: 'electricity',
  water: 'water',
  internet: 'internet',
  parking: 'parking',
  otherRecurring: 'other_recurring',
  onceOffFees: 'once_off_fees',
  bedrooms: 'bedrooms',
  bathrooms: 'bathrooms',
  furnishedStatus: 'furnished_status',
  bathroomType: 'bathroom_type',
  kitchenType: 'kitchen_type',
  parkingSpots: 'parking_spots',
  petPolicy: 'pet_policy',
  securityFeatures: 'security_features',
  amenities: 'amenities',
  moveInDate: 'move_in_date',
  minLeasePeriod: 'min_lease_period',
  coverImage: 'cover_image',
  images: 'images',
  moveInTiming: 'move_in_timing',
  occupancyStatus: 'occupancy_status',
  viewingAvailability: 'viewing_availability',
  status: 'status',
  views: 'views',
  enquiriesCount: 'enquiries_count',
  dateCreated: 'date_created',
  created_at: 'created_at',
  updated_at: 'updated_at',
  assignedAgentId: 'assigned_agent_id',
  featured: 'featured',
  availableDate: 'available_date'
};

export function sanitizePropertyForSupabase(propertyData = {}) {
  const record = {};

  Object.entries(propertyData).forEach(([key, value]) => {
    const mappedKey = columnMap[key];
    if (!mappedKey) return;

    if (Array.isArray(value)) {
      record[mappedKey] = value;
      return;
    }

    if (typeof value === 'string' && value.trim() === '') {
      record[mappedKey] = null;
      return;
    }

    if (mappedKey === 'monthly_rent' || mappedKey === 'deposit' || mappedKey === 'electricity' || mappedKey === 'water' || mappedKey === 'internet' || mappedKey === 'parking' || mappedKey === 'other_recurring' || mappedKey === 'once_off_fees' || mappedKey === 'bedrooms' || mappedKey === 'bathrooms' || mappedKey === 'parking_spots' || mappedKey === 'views' || mappedKey === 'enquiries_count') {
      record[mappedKey] = value === '' || value === null || value === undefined ? null : Number(value);
      return;
    }

    record[mappedKey] = value;
  });

  record.created_at = record.created_at || new Date().toISOString();
  record.updated_at = new Date().toISOString();
  record.images = Array.isArray(record.images) ? record.images : [];
  record.amenities = Array.isArray(record.amenities) ? record.amenities : [];
  record.security_features = Array.isArray(record.security_features) ? record.security_features : [];

  return record;
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      })
    : null;

export const isSupabaseConfigured = Boolean(supabase);

export async function savePropertyToSupabase(propertyData) {
  if (!supabase) {
    return {
      ok: false,
      reason: 'missing-config',
      data: null
    };
  }

  const record = sanitizePropertyForSupabase(propertyData);

  const { data, error } = await supabase
    .from('properties')
    .upsert(record, { onConflict: 'id' })
    .select();

  if (error) {
    throw error;
  }

  return {
    ok: true,
    reason: null,
    data
  };
}
