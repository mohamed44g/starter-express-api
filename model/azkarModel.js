const mongoose = require("mongoose");

const azkar_schema = new mongoose.Schema({});

const azkar = mongoose.model("Azkar", azkar_schema, "Azkar");

module.exports = azkar;
