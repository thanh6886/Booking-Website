import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import NavbarItem from './NavbarItem'
import { Link } from 'react-router-dom'

function Navbar(props) {
  const [currentUser, setCurrentUser] = useState(null)
  const listOptions = [
    {
      type: 'Stays',
      icon: 'fa-bed',
      active: true,
    },
    {
      type: 'Flights',
      icon: 'fa-plane',
      active: false,
    },
    {
      type: 'Car rentals',
      icon: 'fa-car',
      active: false,
    },
    {
      type: 'Attractions',
      icon: 'fa-bed',
      active: false,
    },
    {
      type: 'Airport taxis',
      icon: 'fa-taxi',
      active: false,
    },
  ]

  useEffect(() => {
    const curUser = localStorage.getItem('currentUser')
    if (curUser) {
      const parsedUser = JSON.parse(curUser)
      setCurrentUser(parsedUser)
    }
  }, [])

  return (
    <nav className={styles['wrap-nav']}>
      <div className={styles.nav}>
        <div className={styles.options}>
          <span>
            <a href="/">Booking</a>
          </span>
          <div className={styles.button}>
            {props.isLogin && (
              <p style={{ marginRight: '16px' }}>{props.email}</p>
            )}
            <Link
              className={styles.register}
              to={props.isLogin ? '/transactions/' + currentUser?._id : '/signup'}
            >
              {props.isLogin ? 'Transactions' : 'Sign Up'}
            </Link>
            {props.isLogin || (
              <Link className={styles.login} to="/login">
                Login
              </Link>
            )}
            {props.isLogin && (
              <button className={styles.login} onClick={props.onLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
        <ul className={styles['list-option']}>
          <NavbarItem list={listOptions} />
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
