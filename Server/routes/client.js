const express = require('express');

const clientCtrls = require('../controllers/client')

const router = express.Router()

router.post('/signup', clientCtrls.postSignup)
router.post('/login', clientCtrls.postLogin)
router.get('/homepage', clientCtrls.getHomeInfo)
router.get('/hotels', clientCtrls.getHotels)
router.post('/search', clientCtrls.postSearch)
router.get('/detail/:hotelId', clientCtrls.getHotel)
router.post('/transactions', clientCtrls.postTransaction)
router.get('/transactions/:userId', clientCtrls.getTransactions)

module.exports = router 