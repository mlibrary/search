import React from 'react'

const LinkToMARC = ({ recordUid }) => {
  const url = `https://mirlyn.lib.umich.edu/Record/${recordUid}/Details#tabs`

  return (
    <div className="marc-link-container">
      <a href={url} className="button-light">See MARC Data</a>
    </div>
  )
}

export default LinkToMARC;
