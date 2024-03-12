const mongoose = require("mongoose");

const Quran_schema = new mongoose.Schema({});

const Quran = mongoose.model(
  "Quran",
  Quran_schema,
  "Quran"
);

module.exports = Quran;
