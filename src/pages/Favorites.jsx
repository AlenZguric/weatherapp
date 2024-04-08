import React from 'react'
import FavoriteCities from '../components/main/FavoriteCities'

function Favorites() {
  return (
    <div className="favorites-page">
      <div className="title">Favorites</div>
      <div className="favorites">
        <FavoriteCities/>
      </div>
    </div>
  )
}

export default Favorites