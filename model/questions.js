const mongoose = require("mongoose");

const Questions_schema = new mongoose.Schema({});

const Questions = mongoose.model("Questions", Questions_schema, "questions");

module.exports = Questions;
