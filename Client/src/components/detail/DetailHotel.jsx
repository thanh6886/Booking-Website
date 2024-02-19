import React, { useEffect, useState } from 'react'
import styles from './DetailHotel.module.css'
import { useParams } from 'react-router-dom'
import FormBooking from '../form/FormBooking'
import url from '../../utils/url'

function DetailHotel() {
  const { hotelId } = useParams()
  const [hotel, setHotel] = useState(null)
  const [trans, setTrans] = useState(null)
  const [isShow, setIsShow] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url.root + '/detail/' + hotelId)
        const pointHotel = await response.json()
        setHotel(pointHotel.hotel)
        setTrans(pointHotel.transactions)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [hotelId])

  useEffect(() => {
    window.scrollTo({top: 1056, behavior: 'smooth'})
  }, [isShow])

  const showBookingModel = () => {
    if (isShow) {
      window.scrollTo({top: 1056, behavior: 'smooth'})
    } else {
      setIsShow(true)
    }
  }
  
  return (
    <div className={styles.wrap}>
      {/* HEADER PART */}
      {hotel && <div className={styles['basic-info']}>
        <h2>{hotel.name}</h2>
        <p className={styles.address}>
          <i className="fa-solid fa-location-dot"></i> {hotel.address}
        </p>
        <p className={styles.blue}>Excellent location - {hotel.distance}m from center</p>
        <p className={styles.green}>Book a stay over ${hotel.cheapestPrice} at this property and get a free airport taxi</p>
        <button className={`${styles.button} ${styles.posri}`} onClick={showBookingModel}>
          Reserve or Book now!
        </button>
      </div>}

      {/* IMAGE PART */}
      {hotel && <div className={styles['wrap-img']}>
        {hotel.photos.map(image => (
          <img src={image} alt={hotel.name} width="380px" key={image}/>
        ))}
      </div>}

      {/* DETAIL INFO PART */}
      {hotel && <div className={styles.detail}>
        <div className={styles.content}>
          <h2>{hotel.title}</h2>
          <p>{hotel.desc}</p>
        </div>
        <div className={styles.booking}>
          <p className={styles.price9night}>
            <b>${hotel.cheapestPrice}</b> (1 nights)
          </p>
          <button className={`${styles.button} ${styles.w100}`} onClick={showBookingModel}>
            Reserve or Book now!
          </button>
        </div>
      </div>}
      {isShow && <FormBooking hotel={hotel} transactions={trans} />}
    </div>
  )
}

export default DetailHotel
