const User = require('../models/user')
const Hotel = require('../models/hotel')
const Room = require('../models/room')
const Transaction = require('../models/transaction')

exports.postLogin = async (req, res) => {
  const email = req.body.email.trim().toLowerCase()
  const password = req.body.password.trim()

  try {
    const user = await User.findOne({ email: email })

    if (user && user.password === password) {
      if (user.isAdmin) {
        return res.status(201).json({
          message: 'Login successfully!',
          user: user,
        })
      }
      throw new Error('Permission denied.')
    }
    throw new Error('Email or password wrongs.')
  } catch (err) {
    res.status(500).json({
      message: 'Login failed!',
      err: err.message,
    })
  }
}

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.find()
    const userQty = users.length // users card
    const transactions = await Transaction.find().populate('user hotel')
    const transactionQty = transactions.length // orders card
    let totalEarning = 0 // earnings card
    transactions.forEach(trans => (totalEarning += trans.price))
    const balance = totalEarning / 12 // balance card
    const latestTrans = [] // table
    for (let i = 0; i < 8; i++) {
      const lastItem = transactions.pop()
      if (lastItem) {
        latestTrans.push(lastItem)
      } else {
        break
      }
    }
    res.status(200).json({
      users: userQty,
      orders: transactionQty,
      earnings: totalEarning,
      balance: balance,
      latestTransactions: latestTrans,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  } catch (err) {
    console.log(err)
  }
}
 
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.hotelId
  try {
    const trans = await Transaction.find({hotel: hotelId})
    if (trans.length > 0) {
      return res.status(403).json({msg: 'The hotel related to some transactions. You can\'t remove.'})
    }
    await Hotel.findByIdAndRemove(hotelId)
    const hotels = await Hotel.find()
    res.status(201).json(hotels)
  } catch (err) {
    console.log(err)
  }
}

exports.postHotel = async (req, res) => {
  const hotel = new Hotel({
    ...req.body,
    cheapestPrice: req.body.price,
    featured: req.body.featured === 'true',
    rooms: [],
    photos: [...req.body.image],
    rating: 0
  })
  await hotel.save()
  res.status(201).json({ message: 'success' })
}

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (err) {
    console.log(err)
  }

}

exports.deleteRoom = async (req, res) => {
  const roomId = req.params.roomId
  try {
    const trans = await Transaction.find({ endDate: { $gte: new Date() } })
    const room = await Room.find({_id: roomId})
    let isValid = true

    // check if deleting room is valid or not
    for (let i = 0; i < trans.length; i++) {
      if (!isValid) break
      for (let j = 0; j < trans[i].room.length; j++) {
        if (!isValid) break
        for (let k = 0; k < room[0].roomNumbers.length; k++) {
          if (room[0].roomNumbers[k] === trans[i].room[j]) {
            isValid = false
          }
          if (!isValid) break
        }
      }
    }
    if (isValid) {
      await Room.findOneAndRemove({_id: roomId})
      const rooms = await Room.find()
      res.status(201).json(rooms)
    } else {
      res.status(403).json({msg: 'Some guests are booking this room now.'})
    }
  } catch (err) {
    console.log(err)
  }
}

exports.postRoom = async (req, res) => {
  try {
    const room = new Room(req.body)
    await room.save()
    res.status(201).json({message: 'Success'})
  } catch (err) {
    console.log(err)
  }
}

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
    res.status(200).json(transactions)
  } catch (err) {
    console.log(err)
  }
}

exports.getHotel = async (req, res) => {
  const hotelId = req.params.hotelId
  try {
    const pointHotel = await Hotel.findOne({_id: hotelId})
    res.status(200).json(pointHotel)
  } catch (err) {
    console.log(err)
  }
}

exports.putHotel = async (req, res) => {
  const hotelId = req.params.hotelId
  try {
    await Hotel.updateOne({_id: hotelId}, req.body)
    res.status(201).json({msg: 'success'})
  } catch (err) {
    console.log(err)
  }
} 

exports.getRoom = async (req, res) => {
  const roomId = req.params.roomId
  try {
    const pointRoom = await Room.findOne({_id: roomId})
    res.status(200).json(pointRoom)
  } catch (err) {
    console.log(err)
  }
}

exports.putRoom = async (req, res) => {
  const roomId = req.params.roomId
  try {
    await Room.updateOne({_id: roomId}, req.body)
    res.status(201).json({msg: 'success'})
  } catch (err) {
    console.log(err)
  }
}