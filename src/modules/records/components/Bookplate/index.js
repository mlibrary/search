import React from 'react'

const Bookplate = ({ imageUrl, description }) => {
  return (
    <div>
      <p className="bookplate-description">This purchase made possible by the {description}</p>
      <img src={imageUrl} alt="" className="bookplate-image" />
    </div>
  )
}

export default Bookplate
