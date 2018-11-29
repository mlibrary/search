import React from 'react'
import { Button } from '../../../reusable'
import { Icon } from '../../../core'

const StarSolidIcon = () => (
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
    <Button kind="secondary" small className="favorite-button" onClick={() => handleClick()}>
      {favorited ? (
        <React.Fragment><StarSolidIcon />Remove Favorite</React.Fragment>
      ) : (
        <React.Fragment><Icon name="star" />Save to Favorites</React.Fragment>
      )}
    </Button>
  )
}

export default FavoriteButton
