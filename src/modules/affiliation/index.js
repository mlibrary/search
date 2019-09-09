export function affiliationCookieSetter(affiliation) {
  if (affiliation) {
    document.cookie = `affiliation=${affiliation};path=/`;
  }
}
