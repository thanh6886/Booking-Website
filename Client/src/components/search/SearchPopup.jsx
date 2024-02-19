import { useContext, useState } from 'react'
import styles from './SearchPopup.module.css'
import SearchDataContext from '../../store/search-data-context'
import { DateRange } from 'react-date-range'
import convertTypeDate from '../../utils/mm-dd-yyyy'

// show sidebar search model
function SearchPopup() {
  const { findHotels } = useContext(SearchDataContext)
  const [destination, setDestination] = useState('')
  const [adultQty, setAdultQty] = useState('')
  const [childrenQty, setChildrenQty] = useState('')
  const [roomQty, setRoomQty] = useState('')
  const [isFocusDateInput, setIsFocusDateInput] = useState(false)
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const fetchHotels = () => {
    findHotels({ destination, date: dateState, adultQty, childrenQty, roomQty })
  }
  return (
    <div className={styles.wrap}>
      <form className={styles.form}>
        <h3>Search</h3>
        <div className={`${styles.fs13} ${styles.div}`}>
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            name="destination"
            list="destination"
            placeholder="Ha Noi"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
          <datalist id="destination">
            <option value="Ha Noi" />
            <option value="Ho Chi Minh" />
            <option value="Da Nang" />
          </datalist>
        </div>
        <div className={`${styles.fs13} ${styles.div}`}>
          <label htmlFor="date">Check-in Date</label>
          <p
            className={styles.date}
            onClick={() => setIsFocusDateInput(prevState => !prevState)}
          >
            {convertTypeDate(dateState[0].startDate)} to{' '}
            {convertTypeDate(dateState[0].endDate)}
          </p>
          {isFocusDateInput && (
            <div
              onMouseDown={e => e.preventDefault()}
              className={styles['date-picker-container']}
            >
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                onChange={item => setDateState([item.selection])}
                ranges={dateState}
              />
            </div>
          )}
        </div>
        <div>
          <p className={styles.fs13}>Options</p>
          <div className={styles.fs12}>
            <span>Min price per night</span>
            <input type="number" />
          </div>
          <div className={styles.fs12}>
            <span>Max price per night</span>
            <input type="number" />
          </div>
          <div className={styles.fs12}>
            <span>Adult</span>
            <input
              type="number"
              name="adultQty"
              placeholder={1}
              value={adultQty}
              onChange={e => setAdultQty(e.target.value)}
            />
          </div>
          <div className={styles.fs12}>
            <span>Children</span>
            <input
              type="number"
              name="childrenQty"
              placeholder={0}
              value={childrenQty}
              onChange={e => setChildrenQty(e.target.value)}
            />
          </div>
          <div className={styles.fs12}>
            <span>Room</span>
            <input
              type="number"
              name="roomQty"
              placeholder={1}
              value={roomQty}
              onChange={e => setRoomQty(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.button} type="button" onClick={fetchHotels}>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchPopup
