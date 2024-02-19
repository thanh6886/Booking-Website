import { FaRegUser, FaShoppingCart, FaDollarSign, FaRegListAlt } from 'react-icons/fa'
import classes from './InfoBoard.module.css'

const InfoBoard = (info) => {
  console.log(info);
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <p className={classes.type}>Users</p>
        <p className={classes.qty}>{info.users}</p>
        <p className={classes.icon}>
          <span className={`${classes['wrap-icon']} ${classes.red}`}><FaRegUser/></span>
        </p>
      </div>
      <div className={classes.card}>
        <p className={classes.type}>Orders</p>
        <p className={classes.qty}>{info.orders}</p>
        <p className={classes.icon}>
          <span className={`${classes['wrap-icon']} ${classes.yellow}`}><FaShoppingCart/></span>
        </p>
      </div>
      <div className={classes.card}>
        <p className={classes.type}>Earnings</p>
        <p className={classes.qty}>$ {info.earnings}</p>
        <p className={classes.icon}>
          <span className={`${classes['wrap-icon']} ${classes.green}`}><FaDollarSign/></span>
        </p>
      </div>
      <div className={classes.card}>
        <p className={classes.type}>Balance</p>
        <p className={classes.qty}>$ {info.balance}</p>
        <p className={classes.icon}>
          <span className={`${classes['wrap-icon']} ${classes.purple}`}><FaRegListAlt/></span>
        </p>
      </div>
    </div>
  )
}

export default InfoBoard