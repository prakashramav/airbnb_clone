/**
 * Group photos by category
 * @param {Array} photosList 
 * @returns {Object} map of categoryName -> Array of photos
 */
export function groupPhotosByCategory(photosList) {
  if (!Array.isArray(photosList)) return {};
  return photosList.reduce((acc, photo) => {
    const cat = photo.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(photo);
    return acc;
  }, {});
}

/**
 * Format currency with US locale
 * @param {number} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get circular index for photo navigation
 * @param {number} currentIndex 
 * @param {number} totalCount 
 * @param {number} delta (+1 or -1)
 * @returns {number}
 */
export function getWrappedIndex(currentIndex, totalCount, delta) {
  if (totalCount <= 0) return 0;
  const next = currentIndex + delta;
  if (next < 0) return totalCount - 1;
  if (next >= totalCount) return 0;
  return next;
}
