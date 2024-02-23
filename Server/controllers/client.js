const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

exports.postSignup = async (req, res, next) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

  try {
    if (password.length < 5) {
      throw new Error("Password requires at least 5 characters.");
    }
    const pointUser = await User.findOne({ email });
    if (!pointUser) {
      const user = new User({ email, password });
      const userDb = await user.save();
      res.status(201).json({
        message: "Created successfully!",
      });
    } else {
      throw new Error("Email already exists.");
    }
  } catch (err) {
    res.status(500).json({
      message: "Created failed!",
      err: err.message,
    });
  }
};

exports.postLogin = async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

  try {
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      res.status(201).json({
        message: "Login successfully!",
        user: user,
      });
    } else {
      throw new Error("Email or password wrongs.");
    }
  } catch (err) {
    res.status(500).json({
      message: "Login failed!",
      err: err.message,
    });
  }
};

exports.getHomeInfo = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    const propsByArea = { HN: 0, HCM: 0, DN: 0 }; // quantity of hotels by area

    const propsByType = {
      hotel: 0,
      apartment: 0,
      resort: 0,
      villa: 0,
      cabin: 0,
    }; // quantity of hotels by type

    for (const hotel of hotels) {
      if (hotel.city === "Ha Noi") propsByArea.HN++;
      if (hotel.city === "Ho Chi Minh") propsByArea.HCM++;
      if (hotel.city === "Da Nang") propsByArea.DN++;
      if (hotel.type === "hotel") propsByType.hotel++;
      if (hotel.type === "apartment") propsByType.apartment++;
      if (hotel.type === "resort") propsByType.resort++;
      if (hotel.type === "villa") propsByType.villa++;
      if (hotel.type === "cabin") propsByType.cabin++;
    }

    // top 3 highest rating hotels
    const highestRatingHotels = [...hotels];
    highestRatingHotels.sort((a, b) => b.rating - a.rating);
    highestRatingHotels.length = 3;

    res.status(200).json({ propsByArea, propsByType, highestRatingHotels });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Database throws error." });
  }
};

exports.postSearch = async (req, res) => {
  const dest = req.body.destination;
  const date = {
    startDate: req.body.date.startDate,
    endDate: req.body.date.endDate,
  };
  const adultQty = Number(req.body.adultQty) || 1;
  const childrenQty = Number(req.body.childrenQty) || 0;
  const maxPeople = adultQty + childrenQty;
  const roomQty = req.body.roomQty || 1;

  try {
    let hotels = [];
    if (dest !== "") {
      hotels = await Hotel.find({ city: dest }).populate("rooms");
    } else {
      hotels = await Hotel.find().populate("rooms");
    }
    const transactions = await Transaction.find({
      $or: [
        {
          startDate: { $lte: date.startDate },
          endDate: { $gte: date.endDate },
        },
        {
          startDate: { $gte: date.startDate },
          endDate: { $lte: date.endDate },
        },
        {
          startDate: {
            $gte: date.startDate,
            $lte: date.endDate,
          },
        },
        {
          endDate: {
            $gte: date.startDate,
            $lte: date.endDate,
          },
        },
      ],
    });

    // The point hotels will have to satisfy 2 conditions:
    // 1. There are available rooms gte guest room needs
    // 2. There are available hotel capacity gte the number of guests
    const pointHotels = hotels.filter((hotel) => {
      let maxRoomsQty = 0;
      let maxGuestsQty = 0;
      let curentGuestsQty = 0;
      const rentedRoomNumbers = [];

      // lập danh sách các phòng đã đc thuê, để tiện tính toán số lượng khách đã lưu trú tại khách sạn, từ đó có thể tính đc số lượng phòng còn sẵn và sức chứa còn lại.
      if (transactions.length > 0) {
        const pointTrans = transactions.filter(
          (tran) => tran.hotel.toString() === hotel._id.toString()
        );
        pointTrans.forEach((tran) => {
          tran.room.forEach((r) => {
            rentedRoomNumbers.push(r);
          });
        });
      }

      // tính toán số lượng khách đã lưu trú, tổng sức chứa của khách sạn, tổng số phòng
      hotel.rooms.forEach((r) => {
        for (const numRoom of rentedRoomNumbers) {
          if (r.roomNumbers.includes(numRoom)) {
            curentGuestsQty += r.maxPeople;
          }
        }
        maxGuestsQty += r.maxPeople * r.roomNumbers.length;
        maxRoomsQty += r.roomNumbers.length;
      });
      // đưa ra kết quả về số phòng và lượng khách có thể tiếp đón
      const availableRoomsQty = maxRoomsQty - rentedRoomNumbers.length;
      const availableGuestsQty = maxGuestsQty - curentGuestsQty;

      // trả về các khách sạn thỏa mãn đk
      return availableGuestsQty >= maxPeople && availableRoomsQty >= roomQty;
    });

    res.status(200).json(pointHotels);
  } catch (err) {
    console.log(err);
  }
};

exports.getHotel = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    const pointHotel = await Hotel.findOne({ _id: hotelId }).populate("rooms");
    const trans = await Transaction.find({ hotel: hotelId });
    res.status(200).json({ hotel: pointHotel, transactions: trans });
  } catch (err) {
    console.log(err);
  }
};

exports.postTransaction = async (req, res) => {
  const transaction = {
    user: req.body.userId,
    hotel: req.body.hotel,
    room: req.body.rooms,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    price: req.body.total,
    payment: req.body.payment,
    status: "Booked",
  };

  try {
    const trans = new Transaction(transaction);
    await trans.save();
    res.status(201).json({ message: "Transaction saved." });
  } catch (err) {
    console.log(err);
  }
};

exports.getTransactions = async (req, res) => {
  const userId = req.params.userId;
  try {
    const pointTransactions = await Transaction.find({ user: userId });
    res.status(200).json(pointTransactions);
  } catch (err) {
    console.log(err);
  }
};
