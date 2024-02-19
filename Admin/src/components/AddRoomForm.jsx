import { useEffect, useRef, useState } from 'react'
import classes from './AddRoomForm.module.css'
import url from '../util/url'

const AddRoomForm = () => {
  const titleInput = useRef()
  const priceInput = useRef()
  const maxPeopleInput = useRef()
  const descInput = useRef()
  const roomsInput = useRef()
  const hotelInput = useRef()
  const [hotels, setHotels] = useState([])

  const postAddHotel = () => {
    const formRoom = {
      title: titleInput.current.value.trim(),
      price: priceInput.current.value.trim(),
      maxPeople: maxPeopleInput.current.value.trim(),
      desc: descInput.current.value.trim(),
      roomNumbers: roomsInput.current.value.trim().split(', ')
    }
    for (const key in formRoom) {
      if (formRoom[key] === '') {
        return
      }
    }

    fetch(url.root + '/admin/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formRoom)
    })
      .then(() => alert('Saved successfully!'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetch(url.root + '/admin/hotels')
      .then(res => res.json())
      .then(data => {
        setHotels(data.map(hotel => hotel.name))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h2 className={classes.title}>Add New Room</h2>
      <div className={classes.form}>
        <div className={classes.row}>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="title">Title</label><br/>
              <input type="text" id='title' ref={titleInput} placeholder='Your room title...'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="price">Price</label><br/>
              <input type="text" id='price' ref={priceInput} placeholder='100'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="rooms">Rooms</label><br/>
              <textarea id="rooms" cols="30" ref={roomsInput} rows="2"></textarea>
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="description">Description</label><br/>
              <input type="text" id='description' ref={descInput} placeholder='Your description...'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="maxPeople">Max People</label><br/>
              <input type="text" id='maxPeople' ref={maxPeopleInput} placeholder='100'/>
            </div>
            <div className={classes.input}>
              <label htmlFor="hotel">Choose a hotel</label><br/>
              <select id="hotel" ref={hotelInput}>
                {hotels.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className={classes.tar}>
          <button className={classes.btn} onClick={postAddHotel}>Send</button> 
        </div>
      </div>
    </>
  )
}

export default AddRoomForm