import React from 'react'
import { Button } from '../../../reusable'

const StarOutline = () => (
  <svg className="favorite-icon" width="20px" height="19px" viewBox="0 0 20 19">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#6E6E6E">
        <path d="M10,13.39603 L6.237,15.66603 L7.232,11.38503 L3.91,8.50703 L8.29,8.13103 L10,4.095 L11.71,8.13103 L16.09,8.50703 L12.768,11.38503 L13.763,15.66603 L10,13.39603 Z M12.809,6.62699 L10,0 L7.191,6.62699 L0,7.244 L5.455,11.97103 L3.82,19.00003 L10,15.27203 L16.18,19.00003 L14.545,11.97103 L20,7.244 L12.809,6.62699 Z"></path>
      </g>
    </g>
  </svg>
)

const StarSolid = () => (
  <svg className="favorite-icon" width="20px" height="19px" viewBox="0 0 20 19" >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#FFCB05" stroke="#D8AB00" strokeWidth="2">
        <path d="M14.6698222,16.9215052 L13.4343602,11.6101522 L17.5566868,8.03870593 L12.1233321,7.57175929 L10,2.56238887 L7.87666795,7.57175929 L2.44331315,8.03870593 L6.56563981,11.6101522 L5.33017784,16.9215052 L10,14.1052549 L14.6698222,16.9215052 Z"></path>
      </g>
    </g>
  </svg>
)

const FavoriteButton = ({
  favorited,
  handleClick
}) => {
  return (
    <Button kind="tertiary" small className="favorite-button" onClick={() => handleClick()}>
      {favorited ? (
        <React.Fragment><StarSolid />Remove Favorite</React.Fragment>
      ) : (
        <React.Fragment><StarOutline />Save to Favorites</React.Fragment>
      )}
    </Button>
  )
}

export default FavoriteButton
