const mongoose = require("mongoose");

const Hadeeth_schema = new mongoose.Schema({});

const Hadeeth = mongoose.model("Hadeeth", Hadeeth_schema, "Hadeeth");

module.exports = Hadeeth;