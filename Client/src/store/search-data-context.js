import React, { useState } from 'react'
import url from '../utils/url'

const SearchDataContext = React.createContext({
  hotels: [],
  findHotels: () => {},
})

export const SearchDataContextProvider = props => {
  const [hotels, setHotels] = useState([])

  const getHotelsBySearchInput = async (formInput, cb) => {
    try {
      const response = await fetch(url.root + '/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInput),
      })
      if (!response.ok) {
        throw new Error("Server doesn't response.")
      }
      const hotelsData = await response.json()
      setHotels(hotelsData)
      cb()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SearchDataContext.Provider
      value={{
        hotels: hotels,
        findHotels: getHotelsBySearchInput,
      }}
    >
      {props.children}
    </SearchDataContext.Provider>
  )
}

export default SearchDataContext
