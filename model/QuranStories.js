const mongoose = require("mongoose");

const QuranStories_schema = new mongoose.Schema({});

const QuranStories = mongoose.model(
  "QuranStories",
  QuranStories_schema,
  "QuranStories"
);

module.exports = QuranStories;