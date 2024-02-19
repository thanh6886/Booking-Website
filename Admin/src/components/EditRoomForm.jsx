import { useEffect, useRef, useState } from 'react'
import classes from './EditRoomForm.module.css'
import { useParams } from 'react-router-dom'
import url from '../util/url'

const EditRoomForm = () => {
  const { roomId } = useParams()
  const titleInput = useRef()
  const priceInput = useRef()
  const maxPeopleInput = useRef()
  const descInput = useRef()
  const roomsInput = useRef()
  const [hotels, setHotels] = useState([])
  const [room, setRoom] = useState(null)

  const putRoom = () => {
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

    fetch(url.root + '/admin/room/' + roomId, {
      method: 'PUT',
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

  useEffect(() => {
    fetch(url.root + '/admin/room/' + roomId)
      .then(res => res.json())
      .then(data => setRoom(data))
      .catch(err => console.log(err))
  }, [roomId])

  return (
    <>
      <h2 className={classes.title}>Edit New Room</h2>
      <div className={classes.form}>
        {room && <div className={classes.row}>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="title">Title</label><br/>
              <input type="text" id='title' ref={titleInput} defaultValue={room.title}/>
            </div>
            <div className={classes.input}>
              <label htmlFor="price">Price</label><br/>
              <input type="text" id='price' ref={priceInput} defaultValue={room.price}/>
            </div>
            <div className={classes.input}>
              <label htmlFor="rooms">Rooms</label><br/>
              <textarea id="rooms" cols="30" ref={roomsInput} rows="2" defaultValue={room.roomNumbers.join(', ')}></textarea>
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.input}>
              <label htmlFor="description">Description</label><br/>
              <input type="text" id='description' ref={descInput} defaultValue={room.desc}/>
            </div>
            <div className={classes.input}>
              <label htmlFor="maxPeople">Max People</label><br/>
              <input type="text" id='maxPeople' ref={maxPeopleInput} defaultValue={room.maxPeople}/>
            </div>
            <div className={classes.input}>
              <label htmlFor="hotel">Choose a hotel</label><br/>
              <select id="hotel">
                {hotels.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
        </div>}
        <div className={classes.tar}>
          <button className={classes.btn} onClick={putRoom}>Send</button> 
        </div>
      </div>
    </>
  )
}

export default EditRoomForm