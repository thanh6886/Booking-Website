import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './HotelLists.module.css'
import url from '../util/url'

const HotelLists = () => {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState(null)

  useEffect(() => {
    fetch(url.root + '/admin/hotels')
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.log(err))
  }, [])
 
  const deleteHotel = (hotelId) => {
    const isAccept = window.confirm('Are you sure?')
    if (isAccept) {
      fetch(url.root + '/admin/hotel/' + hotelId, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.msg) {
            alert(data.msg)
          } else {
            setHotels(data)
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <div className={classes['title-content']}>
        <span className={classes.title}>Hotel Lists</span>
        <button className={`${classes['wrap-icon']} ${classes.add}`} onClick={() => navigate('/new-hotel')}>Add New</button>
      </div>
      <table className={classes.table}>
        <thead>
          <tr>
            <td>
              <div className={classes['border-bottom']}>
                <input type="checkbox" className="select-all" />
              </div>
            </td>
            <td>
              <div className={classes['border-bottom']}>ID</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Name</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Type</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Title</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>City</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Action</div>
            </td>
          </tr>
        </thead>
        <tbody>
          {hotels && hotels.map(hotel => {
            return (
              <tr key={hotel._id}>
                <td>
                  <input type="checkbox" className="trans-box" />
                </td>
                <td>{hotel._id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.type}</td>
                <td>{hotel.title}</td>
                <td>{hotel.city}</td>
                <td>
                  <button
                    className={`${classes['wrap-icon']} ${classes.delete}`}
                    onClick={() => deleteHotel(hotel._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`${classes['wrap-icon']} ${classes.edit}`}
                    onClick={() => navigate('/edit-hotel/' + hotel._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default HotelLists