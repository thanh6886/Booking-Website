import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../DatePicker'
import classes from './FormBooking.module.css'
import url from '../../utils/url'

const FormBooking = ({ hotel, transactions }) => {
  const navigate = useNavigate()
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [isSelectDate, setIsSelectDate] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [rooms, setRooms] = useState([])
  const fullnameInput = useRef()
  const emailInput = useRef()
  const phoneInput = useRef()
  const identityCardInput = useRef()

  // dựa trên thời gian khách chọn để tìm ra các phòng chưa có ng thuê
  const setAvailableRooms = (state) => {
    // mapping toàn bộ transactions của khách sạn, chỉ giữ lại số phòng và chuyển date thành dạng số tiện so sánh
    const trans = transactions.map(tran => {
      return {
        room: tran.room,
        startDate: new Date(tran.startDate).getTime(),
        endDate: new Date(tran.endDate).getTime(),
      }
    })

    // các phòng đang đc sử dụng
    const fillRooms = []

    // tìm các phòng đang đc sử dụng dựa trên thời gian client chọn và push vào arr fillRooms để tiện remove tránh render ra giao diện
    trans.forEach(tran => {
      let isFit = false

      if (
        tran.startDate >= state[0].startDate.getTime() &&
        tran.endDate <= state[0].endDate.getTime()
      ) {
        isFit = true
      }

      if (
        tran.startDate <= state[0].startDate.getTime() &&
        tran.endDate >= state[0].startDate.getTime()
      ) {
        isFit = true
      }

      if (
        tran.startDate <= state[0].endDate.getTime() &&
        tran.endDate >= state[0].endDate.getTime()
      ) {
        isFit = true
      }

      if (
        tran.startDate <= state[0].startDate.getTime() &&
        tran.endDate >= state[0].endDate.getTime()
      ) {
        isFit = true
      }

      if (isFit) {
        tran.room.forEach(r => fillRooms.push(r))
      }
    })

    // mapping rooms để điều chỉnh k bị ảnh hưởng trực tiếp tới hotel object
    const mappingRooms = hotel.rooms.map(r => ({
      ...r,
      roomNumbers: [...r.roomNumbers],
    }))

    // loại bỏ các phòng đã có ng thuê
    for (let i = 0; i < mappingRooms.length; i++) {
      for (let j = 0; j < fillRooms.length; j++) {
        if (mappingRooms[i].roomNumbers.includes(fillRooms[j])) {
          mappingRooms[i].roomNumbers.splice(j, 1)
          fillRooms.splice(j, 1)
          j--
        }
      }
    }

    const result = mappingRooms.filter(room => room.roomNumbers.length > 0)
    setRooms(result)
  }

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const parsedUser = JSON.parse(user)
      setCurrentUser(parsedUser)
    }
  }, [])

  // convert type of dateState to mm/dd/yyyy
  let startDate = dateState[0].startDate.getDate()
  let endDate = dateState[0].endDate.getDate()

  let rentDay = endDate - startDate
  if (startDate === endDate) {
    rentDay = 1
  }

  const saveTransaction = () => {
    const formInfo = {
      fullname: fullnameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
      identityCard: identityCardInput.current.value,
    }
    // check
    if (!isSelectDate) return
    
    for (const key in formInfo) if (formInfo[key] === '') return

    const roomsList = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
    const pointRoomsDom = roomsList.filter(room => room.checked)
    const pointRooms = pointRoomsDom.map(room => +room.id.split('-')[1])

    const payment = document.querySelector('#payment').value

    if (payment === '') return

    const trans = {
      userId: currentUser._id,
      hotel: hotel._id,
      rooms: pointRooms,
      startDate: dateState[0].startDate.toLocaleDateString(),
      endDate: dateState[0].endDate.toLocaleDateString(),
      total: totalPrice,
      payment: payment,
    }
    
    fetch(url.root + '/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trans),
    })
      .then(res => res.json())
      .then(data => {
        console.log('check');
        if (data.message === 'Transaction saved.') {
          navigate('/transactions/' + currentUser._id)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={classes['form-booking']}>
      <div className={classes.dates}>
        <h3 className={classes.title}>Dates</h3>
        <DatePicker
          dateState={dateState}
          setDateState={date => {
            setAvailableRooms(date)
            setDateState(date)
          }}
          onClick={() => {
            setTotalPrice(0)
            const checkboxes = document.querySelectorAll(
              'input[type="checkbox"]'
            )
            for (const input of checkboxes) {
              input.checked = false
            }
            if (isSelectDate === false) {
              setIsSelectDate(true)
            }
          }}
        />
      </div>

      <div className={classes['reserve-info']}>
        <h3 className={classes.title}>Reserve Info</h3>
        <label htmlFor="fullname">Your Full Name:</label>
        <input
          type="text"
          placeholder="Full Name"
          id="fullname"
          ref={fullnameInput}
        />
        <br />
        <label htmlFor="email">Your Email:</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          ref={emailInput}
          value={currentUser ? currentUser.email : ''}
        />
        <br />
        <label htmlFor="phone">Your Phone Number:</label>
        <input
          type="text"
          placeholder="Phone Number"
          id="phone"
          ref={phoneInput}
        />
        <br />
        <label htmlFor="card">Your Identity Card Number:</label>
        <input
          type="text"
          placeholder="Card Number"
          id="card"
          ref={identityCardInput}
        />
        <br />
      </div>

      {/* render rooms */}
      {isSelectDate && (
        <div className={classes['select-rooms']}>
          <h3 className={classes.title}>Select Rooms</h3>
          <div className={classes.rooms}>
            {rooms.map(room => {
              return (
                <div className={classes.room} key={room._id}>
                  <h4 className={classes['title-room']}>{room.title}</h4>
                  <p>{room.desc}</p>
                  <div className={classes['space-between']}>
                    <p>
                      <span className={classes['small-text']}>Max people:</span>{' '}
                      <span className={classes.bold}>{room.maxPeople}</span>
                    </p>

                    {/* render options room */}
                    <div className={classes['tick-rooms']}>
                      {room.roomNumbers.map(roomNum => {
                        return (
                          <div className={classes['tick-room']} key={roomNum}>
                            <label htmlFor={`tick-${roomNum}`}>{roomNum}</label>
                            <input
                              type="checkbox"
                              id={`tick-${roomNum}`}
                              onChange={e => {
                                if (e.target.checked) {
                                  setTotalPrice(
                                    prevValue =>
                                      prevValue + room.price * rentDay
                                  )
                                } else {
                                  setTotalPrice(
                                    prevValue =>
                                      prevValue - room.price * rentDay
                                  )
                                }
                              }}
                            />
                          </div>
                        )
                      })}{' '}
                    </div>
                  </div>
                  <p className={classes.bold}>
                    $<span>{room.price}</span>
                  </p>
                </div>
              )
            })}{' '}
          </div>
        </div>
      )}
      <div className={classes['total-bill']}>
        <h3 className={classes.title}>
          Total Bill: $<span>{totalPrice}</span>
        </h3>
        <div className={classes.confirm}>
          <select id="payment" name="payment">
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button onClick={saveTransaction}>Reserve Now</button>
        </div>
      </div>
    </div>
  )
}

export default FormBooking
