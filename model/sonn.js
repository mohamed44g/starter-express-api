const mongoose = require("mongoose");

const sonn_schema = new mongoose.Schema({});

const sonn = mongoose.model("Sunnah", sonn_schema, "Sunnah");

module.exports = sonn;
