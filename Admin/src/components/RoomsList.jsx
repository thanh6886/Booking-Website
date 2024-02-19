import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './RoomsList.module.css'
import url from '../util/url'

const RoomsList = () => {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState(null)

  useEffect(() => {
    fetch(url.root + '/admin/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.log(err))
  }, [])

  const deleteRoom = roomId => {
    const isAccept = window.confirm('Are you sure?')
    if (isAccept) {
      fetch(url.root + '/admin/room/' + roomId, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          if (data.msg) {
            alert(data.msg)
          } else {
            setRooms(data)
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <div className={classes['title-content']}>
        <span className={classes.title}>Rooms List</span>
        <button
          className={`${classes['wrap-icon']} ${classes.add}`}
          onClick={() => navigate('/new-room')}
        >
          Add New
        </button>
      </div>
      <div className={classes['fake-table']}>
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
                <div className={classes['border-bottom']}>Title</div>
              </td>
              <td>
                <div className={classes['border-bottom']}>Description</div>
              </td>
              <td>
                <div className={classes['border-bottom']}>Price</div>
              </td>
              <td>
                <div className={classes['border-bottom']}>Max People</div>
              </td>
              <td>
                <div className={classes['border-bottom']}>Action</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {rooms &&
              rooms.map(room => {
                return (
                  <tr key={room._id}>
                    <td>
                      <input type="checkbox" className="trans-box" />
                    </td>
                    <td>{room._id}</td>
                    <td>{room.title}</td>
                    <td className={classes.desc}>{room.desc}</td>
                    <td>{room.price}</td>
                    <td>{room.maxPeople}</td>
                    <td>
                      <button
                        className={`${classes['wrap-icon']} ${classes.delete}`}
                        onClick={() => deleteRoom(room._id)}
                      >
                        Delete
                      </button>
                      <button
                        className={`${classes['wrap-icon']} ${classes.edit}`}
                        onClick={() => navigate('/edit-room/' + room._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className={classes.pagination}>
        1 - 9 of 9 <IoIosArrowBack /> <IoIosArrowForward />
      </div>
    </>
  )
}

export default RoomsList
