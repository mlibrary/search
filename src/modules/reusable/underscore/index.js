export function findWhere (array, criteria) {
  return array?.find((item) => {
    return Object.keys(criteria).every((key) => {
      return item[key] === criteria[key];
    });
  });
}
