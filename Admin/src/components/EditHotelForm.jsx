import { useParams } from 'react-router-dom'
import classes from './EditHotelForm.module.css'
import { useEffect, useRef, useState } from 'react'
import url from '../util/url'

const EditHotelForm = () => {
  const { hotelId } = useParams()
  const nameInput = useRef()
  const cityInput = useRef()
  const distanceInput = useRef()
  const descInput = useRef()
  const imageInput = useRef()
  const typeInput = useRef()
  const addressInput = useRef()
  const titleInput = useRef()
  const priceInput = useRef()
  const featuredInput = useRef()
  const [hotel, setHotel] = useState(null)

  useEffect(() => {
    fetch(url.root + '/admin/hotel/' + hotelId)
      .then(res => res.json())
      .then(data => setHotel(data))
      .catch(err => console.log(err))
  }, [hotelId])

  const editHotel = (hotelId) => {
    fetch(url.root + '/admin/hotel/' +hotelId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.current.value.trim(),
        city: cityInput.current.value.trim(),
        distance: distanceInput.current.value.trim(),
        description: descInput.current.value.trim(),
        image: imageInput.current.value.trim(),
        type: typeInput.current.value.trim(),
        address: addressInput.current.value.trim(),
        title: titleInput.current.value.trim(),
        price: priceInput.current.value.trim(),
        featured: featuredInput.current.value.trim(),
      })
    })
    .then(() => alert('Edit successfully.'))
    .catch(err => console.log(err))
  }

  return (
    <>
      <h2 className={classes.title}>Edit Hotel</h2>
      <div className={classes.form}>
        {hotel && <div className={classes.row}>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="name">Name</label><br/>
              <input type="text" ref={nameInput} id='name' defaultValue={hotel.name}/>
            </div>
            <div className={classes.input}>
              <label htmlFor="city">City</label><br/>
              <input type="text" ref={cityInput} id='city' defaultValue={hotel.city}/>
            </div>
            <div className={classes.input}>
              <label htmlFor="distance">Distance from City Center (meters)</label><br/>
              <input type="text" ref={distanceInput} id='distance' defaultValue={hotel.distance}/>
            </div>
            <div className={classes.input}>
              <label htmlFor="description">Description</label><br/>
              <input type="text" ref={descInput} id='description' defaultValue={hotel.desc} />
            </div>
            <div className={classes.input}>
              <label htmlFor="image">Images</label><br/>
              <textarea ref={imageInput} id="image" cols="30" rows="2" defaultValue={hotel.photos.join(', ')}></textarea>
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="type">Type</label><br/>
              <input type="text" ref={typeInput} id='type' defaultValue={hotel.type} />
            </div>
            <div className={classes.input}>
              <label htmlFor="address">Address</label><br/>
              <input type="text" ref={addressInput} id='address' defaultValue={hotel.address} />
            </div>
            <div className={classes.input}>
              <label htmlFor="title">Title</label><br/>
              <input type="text" ref={titleInput} id='title' defaultValue={hotel.title} />
            </div>
            <div className={classes.input}>
              <label htmlFor="price">Price</label><br/>
              <input type="text" ref={priceInput} id='price' defaultValue={hotel.cheapestPrice} />
            </div>
            <div className={classes.input}>
              <label htmlFor="featured">Featured</label><br/>
              <select ref={featuredInput} id="featured" defaultValue={(hotel.featured === true).toString()}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>}
        <div className={classes.input}>
          <label htmlFor="rooms">Rooms</label><br/>
          <div className={classes.rooms}>
            <p>2 Bed Room</p>
            <p>1 Bed Room</p>
            <p>Basement Double Room</p>
            <p>Superior Basement Room</p>
            <p>Deluxe Room</p>
            <p>Premier City View Room</p>
            <p>Budget Double Room</p>
            <p>Deluxe Window</p>
            <p>Budget Twin Room</p>
          </div>
        </div>
        {hotel && <button className={classes.btn} onClick={() => editHotel(hotel._id)}>Send</button>} 
      </div>
    </>
  )
}

export default EditHotelForm