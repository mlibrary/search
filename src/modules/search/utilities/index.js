export const encodeURIQuery = function(query) {
  return query !== '' ? `?q=${encodeURIComponent(query)}` : '';
}
