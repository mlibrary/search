import ChooseAffiliation from './components/choose-affiliation'

export {
  ChooseAffiliation
}

export function affiliationCookieSetter(affiliation) {
  if (affiliation) {
    document.cookie = `affiliation=${affiliation};path=/`;
  }
}
