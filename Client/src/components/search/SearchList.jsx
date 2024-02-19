import React, { useContext } from 'react'
import styles from './SearchList.module.css'
import SearchDataContext from '../../store/search-data-context'
import { useNavigate } from 'react-router-dom'

// show search list hotels
function SearchList() {
  const { hotels } = useContext(SearchDataContext)
  const navigate = useNavigate()
  console.log(hotels);
  
  return (
    <div className={styles.wrap}>
      {hotels.length === 0 && <p>Have no hotels with your require.</p>}
      {hotels.length > 0 && hotels.map((place, index) => (
        <div className={styles.place} key={index}>
          <div className={styles.img}>
            <img
              src={place.photos[0]}
              alt={place.name}
              width="200px"
              height="200px"
            />
          </div>
          <div className={styles.detail}>
            <h2 className={styles.name}>{place.name}</h2>
            <p>{place.distance}m from center</p>
            <h4>{place.desc}</h4>
            <h5 className={styles.green}>
              {place.featured && 'Free cancellation'}
            </h5>
            <p className={styles.green}>
              {place.featured &&
                'You can cancel later, so lock in this great price today!'}
            </p>
          </div>
          <div className={styles.mores}>
            <p className={styles.mb80}>
              <span>
                <b>{place.rating === 5 ? 'Exceptional' : 'Excellent'}</b>
              </span>
              <span className={styles.rate}>{place.rating}</span>
            </p>
            <p className={styles.price}>
              <span>
                <b>${place.cheapestPrice}</b>
              </span>
            </p>
            <p className={styles.gray}>Includes taxes and fees</p>
            <button className={styles.button} onClick={() => navigate(`/detail/${place._id}`)}>See availability</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchList
