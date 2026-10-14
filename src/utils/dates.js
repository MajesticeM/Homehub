/**
 * Date and time formatting utilities
 */

export function formatDate(dateString, options = { format: 'medium' }) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  if (options.format === 'short') {
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short'
    });
  }

  if (options.format === 'relative') {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  }

  if (options.format === 'full') {
    return date.toLocaleDateString('en-ZA', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  return date.toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatTime(timeString) {
  if (!timeString) return '';
  // Can be "14:30" or ISO date
  if (timeString.includes('T')) {
    const d = new Date(timeString);
    return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  return timeString;
}

export function getTodayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
