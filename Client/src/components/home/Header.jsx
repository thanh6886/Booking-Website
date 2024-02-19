import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css' // css of date-range model
import 'react-date-range/dist/theme/default.css' // css of date-range model
import SearchDataContext from '../../store/search-data-context'

// show options header
function Header() {
  const { findHotels } = useContext(SearchDataContext)
  const navigate = useNavigate()
  const [isFocusDateInput, setIsFocusDateInput] = useState(false)
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })
  const [openOptions, setOpenOptions] = useState(false)
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const destinationInput = useRef()

  // navigate page to /search
  const clickHandler = event => {
    event.preventDefault()
    findHotels(
      {
        destination: destinationInput.current.value,
        date: { startDate: dateState.startDate, endDate: dateState.endDate },
        adultQty: options.adult,
        childrenQty: options.children,
        roomQty: options.room,
      },
      () => {
        navigate('/search')
      }
    )
  }

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const showDateInputHandler = () => {
    setIsFocusDateInput(prevState => !prevState)
  }

  // convert type of dateState to mm/dd/yyyy
  let startDate = dateState[0].startDate.toLocaleDateString()
  let endDate = dateState[0].endDate.toLocaleDateString()

  return (
    <>
      {/* model date-picker */}
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

      {openOptions && (
        <div className={styles.options}>
          <div className={styles.optionItem}>
            <span className={styles.optionText}>Adult</span>
            <div className={styles.optionCounter}>
              <button
                disabled={options.adult <= 1}
                className={styles.optionCounterButton}
                onClick={() => handleOption('adult', 'd')}
              >
                -
              </button>
              <span className={styles.optionCounterNumber}>
                {options.adult}
              </span>
              <button
                className={styles.optionCounterButton}
                onClick={() => handleOption('adult', 'i')}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.optionItem}>
            <span className={styles.optionText}>Children</span>
            <div className={styles.optionCounter}>
              <button
                disabled={options.children <= 0}
                className={styles.optionCounterButton}
                onClick={() => handleOption('children', 'd')}
              >
                -
              </button>
              <span className={styles.optionCounterNumber}>
                {options.children}
              </span>
              <button
                className={styles.optionCounterButton}
                onClick={() => handleOption('children', 'i')}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.optionItem}>
            <span className={styles.optionText}>Room</span>
            <div className={styles.optionCounter}>
              <button
                disabled={options.room <= 1}
                className={styles.optionCounterButton}
                onClick={() => handleOption('room', 'd')}
              >
                -
              </button>
              <span className={styles.optionCounterNumber}>{options.room}</span>
              <button
                className={styles.optionCounterButton}
                onClick={() => handleOption('room', 'i')}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className={styles['wrap-header']}>
        {/* MESSAGE PART */}
        <div className={styles.header}>
          <h1>A lifetime of discounts? It's Genius.</h1>
          <p>
            Get rewarded for your travels - unlock instant savings of 10% or
            more with a free account
          </p>
          <button className={styles.button}>Sign in / Register</button>
        </div>
        {/* FORM SEARCH */}
        <form className={styles.form}>
          <div>
            <label htmlFor="city">
              <i className="fa fa-bed"></i>
            </label>
            <input
              type="text"
              id="city"
              placeholder="Where are you going?"
              list="destination"
              ref={destinationInput}
            />
            <datalist id="destination">
              <option value="Ha Noi" />
              <option value="Ho Chi Minh" />
              <option value="Da Nang" />
            </datalist>
          </div>

          <div className={styles.divDate} onClick={showDateInputHandler}>
            <label htmlFor="">
              <i className="fa fa-calendar"></i>
            </label>
            &nbsp;{startDate} to {endDate}
          </div>

          <div className={styles.roomCount}>
            <div>
              <i className="fa fa-female"></i>
            </div>
            <div
              className={styles.qtyInput}
              onClick={() => setOpenOptions(prevState => !prevState)}
            >
              1 adult - 0 children - 1 room
            </div>
          </div>

          <button onClick={clickHandler} className={styles.button}>
            Search
          </button>
        </form>
      </header>
    </>
  )
}

export default Header
