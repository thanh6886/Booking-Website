import { useRef } from 'react'
import classes from './AddHotelForm.module.css'
import url from '../util/url'

const AddHotelForm = () => {
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

  const postAddHotel = () => {
    const formProduct = {
      name: nameInput.current.value.trim(),
      city: cityInput.current.value.trim(),
      distance: distanceInput.current.value.trim(),
      desc: descInput.current.value.trim(),
      image: imageInput.current.value.trim().split(', '),
      type: typeInput.current.value.trim(),
      address: addressInput.current.value.trim(),
      title: titleInput.current.value.trim(),
      price: priceInput.current.value.trim(),
      featured: featuredInput.current.value.trim(),
    }
    for (const key in formProduct) {
      if (formProduct[key] === '') {
        return
      }
    }
    fetch(url.root + '/admin/hotel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formProduct)
    })
      .then(() => alert('Saved successfully!'))
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2 className={classes.title}>Add New Product</h2>
      <div className={classes.form}>
        <div className={classes.row}>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="name">Name</label><br/>
              <input type="text" id='name' ref={nameInput} placeholder='Your hotel name...'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="city">City</label><br/>
              <input type="text" id='city' ref={cityInput} placeholder='Ha Noi'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="distance">Distance from City Center (meters)</label><br/>
              <input type="text" id='distance' ref={distanceInput} placeholder='500'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="description">Description</label><br/>
              <input type="text" id='description' ref={descInput} placeholder='Your description...'/>
            </div>
              <div className={classes.input}>
                <label htmlFor="image">Images</label><br/>
                <textarea id="image" cols="30" ref={imageInput} rows="2"></textarea>
              </div>
          </div>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="type">Type</label><br/>
              <input type="text" id='type' ref={typeInput} placeholder='hotel'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="address">Address</label><br/>
              <input type="text" id='address' ref={addressInput} placeholder='Hang Dau, Hoan Kiem District, Hanoi, Vietnam'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="title">Title</label><br/>
              <input type="text" id='title' ref={titleInput} placeholder='Muong Thanh Hotel'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="price">Price</label><br/>
              <input type="text" id='price' ref={priceInput} placeholder='100'/>
            </div>
              <div className={classes.input}>
                <label htmlFor="featured">Featured</label><br/>
                <select id="featured" ref={featuredInput}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
          </div>
        </div>
        <div>
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
        </div>
          <button className={classes.btn} onClick={postAddHotel}>Send</button> 
      </div>
    </>
  )
}

export default AddHotelForm