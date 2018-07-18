import React from 'react'
import { Button } from '../../../reusable'

const StarOutline = () => (
  <svg className="icon" viewBox="0 0 16 15"><path d="M3 15l1-5.2-4-4L5.5 5 8 0l2.5 5 5.5.7-4 4 1 5.2-5-2.5L3 15zm5-3.6l3.6 1.8-.7-3.8 2.9-3-4-.5L8 2.2 6.2 5.9l-4 .5 2.9 2.9-.7 3.8L8 11.4z"></path></svg>
)

const StarSolid = () => (
  <svg className="icon" viewBox="0 0 16 15"><path d="M7.998 0L5.5 5 0 5.75l4 4L3 15l4.998-2.5L13 15l-1-5.25 4-4.005L10.5 5z"></path></svg>
)

const FavoriteButton = ({
  isFavorited,
  handleClick
}) => {
  return (
    <Button kind="tertiary" small className="favorite-button" onClick={() => handleClick}>
      {isFavorited ? (
        <React.Fragment><StarSolid />Remove Favorite</React.Fragment>
      ) : (
        <React.Fragment><StarOutline />Save to Favorites</React.Fragment>
      )}
    </Button>
  )
}

export default FavoriteButton
