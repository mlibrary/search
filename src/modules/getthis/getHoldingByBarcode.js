const getHoldingByBarcode = (holdings, barcode) => {
  if (!holdings) {
    return null;
  }

  const result = [];

  holdings.forEach((holding) => {
    return holding.rows.forEach((row) => {
      return row.forEach((cell) => {
        if (cell.to?.action === 'get-this' && cell.to?.barcode === barcode) {
          result.push({
            ...holding,
            rows: [row]
          });
        }
        return result;
      });
    });
  });

  return result;
};

export default getHoldingByBarcode;
