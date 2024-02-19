import { NavLink } from 'react-router-dom'
import {
  FaCarSide,
  FaHotel,
  FaHouseUser,
  FaRegUser,
  FaSignOutAlt,
  FaTrello,
} from 'react-icons/fa'
import classes from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <aside className={classes.container}>
      <div className={classes.logo}>Admin Page</div>
      <div className={classes.main}>
        <div className={classes.part}>
          <p className={classes['sub-text']}>Main</p>
          <NavLink to="/" className={classes['nav-link']}>
            <FaTrello />
            Dashboard
          </NavLink>
        </div>
        <div className={classes.part}>
          <p className={classes['sub-text']}>Lists</p>
          <NavLink className={classes['nav-link']}>
            <FaRegUser />
            Users
          </NavLink>
          <NavLink to="/hotels" className={classes['nav-link']}>
            <FaHotel />
            Hotels
          </NavLink>
          <NavLink to="/rooms" className={classes['nav-link']}>
            <FaHouseUser />
            Rooms
          </NavLink>
          <NavLink to="/transactions" className={classes['nav-link']}>
            <FaCarSide />
            Transactions
          </NavLink>
        </div>
        <div className={classes.part}>
          <p className={classes['sub-text']}>New</p>
          <NavLink to="/new-hotel" className={classes['nav-link']}>
            <FaHotel />
            New Hotel
          </NavLink>
          <NavLink to="/new-room" className={classes['nav-link']}>
            <FaHouseUser />
            New Room
          </NavLink>
        </div>
        <div className={classes.part}>
          <p className={classes['sub-text']}>User</p>
          <NavLink
            className={classes['nav-link']}
            to='/login'
            onClick={() => localStorage.removeItem('currentUser')}
          >
            <FaSignOutAlt />
            Logout
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
