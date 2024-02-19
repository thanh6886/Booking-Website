const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");

const app = express();
// connect database
const connectMonfoDb = () => {
  mongoose.connect(
    `mongodb+srv://root:Zz12345678@cluster1.opblshg.mongodb.net/asm2?retryWrites=true&w=majority`
  );
  mongoose.connection.on("open", function () {
    console.log("Mongoose default connection is open to MongoDB Atlas");
  });
  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
  });
};
connectMonfoDb();
app.use(express.json());
app.use(cors());
require("dotenv").config();
// route
app.use("/admin", adminRoutes);
app.use(clientRoutes);

app.listen(process.env.PORT, function () {
  console.log("API Listen: ", `http://localhost:${process.env.PORT}/`);
});
