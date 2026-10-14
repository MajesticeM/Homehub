/**
 * Validation and WhatsApp communication link utilities
 */

export function isValidZAPhone(phone) {
  if (!phone) return false;
  // Cleans spaces, dashes, parentheses
  const clean = phone.replace(/[\s\-()]/g, '');
  // Matches 0[6-8][0-9]{8} or +27[6-8][0-9]{8} or 27[6-8][0-9]{8}
  const regex = /^(\+27|27|0)[1-8][0-9]{8}$/;
  return regex.test(clean);
}

export function normalizeZAPhoneForWhatsApp(phone) {
  if (!phone) return '';
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = '27' + clean.slice(1);
  }
  return clean;
}

export const formatZAPhoneForWhatsApp = normalizeZAPhoneForWhatsApp;

export function createWhatsAppLink(phoneNumber, agentName = 'Thabo', propertyTitle = '', customMessage = '') {
  const normalizedPhone = normalizeZAPhoneForWhatsApp(phoneNumber);
  if (!normalizedPhone) return '#';

  let defaultMsg = `Hi, thank you for your interest in our rental property`;
  if (propertyTitle) {
    defaultMsg += ` (${propertyTitle})`;
  }
  defaultMsg += `. When would be a convenient time to discuss details or arrange a viewing? Best regards, ${agentName} from Habitat SA.`;

  const finalMsg = customMessage || defaultMsg;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(finalMsg)}`;
}

export function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
