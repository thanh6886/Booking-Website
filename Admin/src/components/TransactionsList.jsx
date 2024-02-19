import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import classes from './TransactionsList.module.css'
import { useEffect, useState } from 'react'
import url from '../util/url'

const TransactionsList = () => {
  const [trans, setTrans] = useState(null)

  useEffect(() => {
    fetch(url.root + '/admin/transactions')
      .then(res => res.json())
      .then(data => setTrans(data))
  }, [])

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Transactions List</h2>
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
              <div className={classes['border-bottom']}>User</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Hotel</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Room</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Date</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Price</div>
            </td>
            <td>
              <div className={classes['border-bottom']}>Payment Method</div>
            </td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {trans && trans.map(tran => {
            return (
              <tr>
                <td>
                  <input type="checkbox" className="trans-box" />
                </td>
                <td>{tran._id}</td>
                <td>{tran.user.email}</td>
                <td>{tran.hotel}</td>
                <td>{tran.room.join(', ')}</td>
                <td>
                  {new Date(tran.dateStart).toLocaleDateString()} -{' '}
                  {new Date(tran.dateEnd).toLocaleDateString()}
                </td>
                <td>${tran.price}</td>
                <td>{tran.payment}</td>
                <td>
                  <span
                    className={`${classes['wrap-icon']} ${
                      classes[`${tran.status.toLowerCase()}`]
                    }`}
                  >
                    {tran.status}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className={classes.pagination}>
        1-9 of 9 <IoIosArrowBack /> <IoIosArrowForward />
      </p>
    </div>
  )
}

export default TransactionsList
