import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import classes from './Transaction.module.css'

const Transaction = ({ trans }) => {
  console.log(trans)
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Latest Transactions</h2>
      <div className={classes['wrap-trans']}>
        <div className={`${classes.row} ${classes.p16}`}>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '3%' }}
          >
            <input type="checkbox" />
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '15%' }}
          >
            ID
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '8%' }}
          >
            User
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '24%' }}
          >
            Hotel
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '8%' }}
          >
            Room
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '17%' }}
          >
            Date
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '5%' }}
          >
            Price
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '14%' }}
          >
            Payment Method
          </span>
          <span
            className={`${classes.col} ${classes.head}`}
            style={{ width: '6%' }}
          >
            Status
          </span>
        </div>
        {trans.map(tran => {
          return (
            <div className={classes.row}>
              <span className={classes.col} style={{ width: '3%' }}>
                <input type="checkbox" />
              </span>
              <span className={classes.col} style={{ width: '15%' }}>
                {tran._id}
              </span>
              <span className={classes.col} style={{ width: '8%' }}>
                {tran.user.email}
              </span>
              <span className={classes.col} style={{ width: '24%' }}>
                {tran.hotel.title}
              </span>
              <span className={classes.col} style={{ width: '8%' }}>
                {tran.room.join(', ')}
              </span>
              <span className={classes.col} style={{ width: '17%' }}>
                {new Date(tran.startDate).toLocaleDateString()} -{' '}
                {new Date(tran.endDate).toLocaleDateString()}
              </span>
              <span className={classes.col} style={{ width: '5%' }}>
                ${tran.price}
              </span>
              <span className={classes.col} style={{ width: '14%' }}>
                {tran.payment}
              </span>
              <span className={`${classes.col}`} style={{ width: '6%' }}>
                <span
                  className={`${classes['wrap-icon']} ${
                    classes[tran.status.toLowerCase()]
                  }`}
                >
                  {tran.status}
                </span>
              </span>
            </div>
          )
        })}
      </div>
      <p className={classes.pagination}>
        1-8 of 8 <IoIosArrowBack /> <IoIosArrowForward />
      </p>
    </div>
  )
}

export default Transaction
