require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const mongoose = require("mongoose");
const fs = require("fs");
const axios = require("axios");
const azkar = require("./model/azkarModel");
const dataRouter = require("./routes/dataRoute");

mongoose
  .connect(process.env.DATABASE, {
    dbName: "Moslemon",
  })
  .then(() => console.log("Connected!"));

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/data", dataRouter);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "error", massage: "this resource not avalble" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ status: "error", message: err.message });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;