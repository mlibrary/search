/*
  What does this do?

  Walk through the ResourceAccess aka holdings data
  structure and pick out the holding that matches
  the passed in barcode. Remove everything else, but keep
  the holding container information. In other words,
  it should maintain the resource acccess data shape, but
  only contain the holding that matches the barcode.

  If it can't be found, return undefined.
*/

export default function (holdings, barcode) {
  let result;

  if (holdings) {
    holdings.forEach((holding) => {
      holding.rows.forEach((row) => {
        row.forEach((cell) => {
          if (cell.to && cell.to.action === 'get-this' && cell.to.barcode === barcode) {
            result = [].concat({
              ...holding,
              rows: [row]
            });
          }
        });
      });
    });
  }

  return result;
}
