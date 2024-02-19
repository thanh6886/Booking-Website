import { useParams } from 'react-router-dom'
import classes from './Table.module.css'
import { useEffect, useState } from 'react'
import url from '../../utils/url'

const Table = () => {
  const { userId } = useParams()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch(url.root + '/transactions/' + userId)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.log(err))
  }, [userId])

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Your Transactions</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((trans, index) => {
              console.log(trans.status);
              return (
                <tr>
                  <td>{index}</td>
                  <td>{trans.hotel}</td>
                  <td>{trans.room.join(', ')}</td>
                  <td>
                    {new Date(trans.startDate).toLocaleDateString()} -{' '}
                    {new Date(trans.endDate).toLocaleDateString()}
                  </td>
                  <td>${trans.price}</td>
                  <td>{trans.payment}</td>
                  <td>
                    <span
                      className={`${classes.icon} ${
                        classes[`${trans.status.toLowerCase()}`]
                      }`}
                    >
                      {trans.status}
                    </span>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
