import React from 'react'
import MapWithPlaces from '../components/main/MapWithPlaces'

const MyPlaces =()=> {
  return (
    <div className="myplacesPage">
      <div className="city-details"></div>
      <div className="show-location">
        <MapWithPlaces/>
      </div>
    </div>
  )
}

export default MyPlaces