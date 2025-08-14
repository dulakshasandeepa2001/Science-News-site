/**
 * Parse and format date strings for consistent display and sorting
 * @param {string} dateStr - Date string in format like "August 14, 2025"
 * @returns {Date} JavaScript Date object
 */
export function parseArticleDate(dateStr) {
  return new Date(dateStr);
}

/**
 * Format a date to a readable string
 * @param {Date} date - JavaScript Date object
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {string} dateStr - Date string
 * @returns {string} Relative time string
 */
export function getRelativeTimeString(dateStr) {
  const date = parseArticleDate(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    return formatDate(date);
  }
}
