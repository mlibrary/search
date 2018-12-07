export default function(holdings, barcode) {
  let result

  if (holdings) {
    holdings.forEach(holding => {
      holding.rows.forEach(row => {
        row.forEach(cell => {
          if (cell.to && cell.to.action === 'get-this' && cell.to.barcode === barcode) {
            result = [].concat(holding)
          }
        })
      })
    })
  }

  return result
}