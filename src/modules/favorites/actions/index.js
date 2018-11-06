export const FAVORITE = 'favorites/FAVORITE';
export const UNFAVORITE = 'favorites/UNFAVORITE';
export const TAG_FAVORITE = 'favorites/TAG_FAVORITE';
export const UNTAG_FAVORITE = 'favorites/UNTAG_FAVORITE';

export function favorite(payload) {
  return { type: FAVORITE, payload };
}

export function unfavorite(payload) {
  return { type: UNFAVORITE, payload };
}

export function tagFavorite(payload) {
  return { type: TAG_FAVORITE, payload };
}

export function untagFavorite(payload) {
  return { type: UNTAG_FAVORITE, payload };
}
