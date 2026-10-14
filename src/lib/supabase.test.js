import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizePropertyForSupabase } from './supabase.js';

test('sanitizePropertyForSupabase maps camelCase listing fields to Supabase columns', () => {
  const record = sanitizePropertyForSupabase({
    id: 'PROP-123',
    title: 'Modern Apartment',
    streetAddress: '12 Main Road',
    monthlyRent: 13500,
    onceOffFees: 1200,
    securityFeatures: ['CCTV', 'Guard'],
    coverImage: 'https://example.com/cover.jpg',
    images: ['a.jpg', 'b.jpg'],
    amenities: ['Pool', 'Gym'],
    bedrooms: 2,
    availability: 'Immediate'
  });

  assert.equal(record.id, 'PROP-123');
  assert.equal(record.title, 'Modern Apartment');
  assert.equal(record.street_address, '12 Main Road');
  assert.equal(record.monthly_rent, 13500);
  assert.equal(record.once_off_fees, 1200);
  assert.deepEqual(record.security_features, ['CCTV', 'Guard']);
  assert.equal(record.cover_image, 'https://example.com/cover.jpg');
  assert.deepEqual(record.images, ['a.jpg', 'b.jpg']);
  assert.deepEqual(record.amenities, ['Pool', 'Gym']);
  assert.equal(record.bedrooms, 2);
  assert.equal(record.created_at.length > 0, true);
  assert.equal(record.updated_at.length > 0, true);
  assert.equal(record.availability, undefined);
});
