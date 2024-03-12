const mongoose = require("mongoose");

const MassengerStories_schema = new mongoose.Schema({});

const MassengerStories = mongoose.model(
  "MassengerStories",
  MassengerStories_schema,
  "MessengersStories"
);

module.exports = MassengerStories;
