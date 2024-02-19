const express = require('express');

const adminCtrls = require('../controllers/admin')

const router = express.Router()

router.post('/login', adminCtrls.postLogin)
router.get('/dashboard', adminCtrls.getDashboard)
router.get('/hotels', adminCtrls.getHotels)
router.delete('/hotel/:hotelId', adminCtrls.deleteHotel)
router.post('/hotel', adminCtrls.postHotel)
router.get('/rooms', adminCtrls.getRooms)
router.delete('/room/:roomId', adminCtrls.deleteRoom)
router.post('/room', adminCtrls.postRoom)
router.get('/transactions', adminCtrls.getTransactions)
router.get('/hotel/:hotelId', adminCtrls.getHotel)
router.put('/hotel/:hotelId', adminCtrls.putHotel)
router.get('/room/:roomId', adminCtrls.getRoom)
router.put('/room/:roomId', adminCtrls.putRoom)

module.exports = router 