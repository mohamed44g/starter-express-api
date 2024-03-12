const mongoose = require("mongoose");

const tasks = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },

  name: {
    type: String,
    required: [true, "name is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  refreshToken: {
    type: String,
  },

  favorites: {
    Quran: [],
    QuranStory: [],
    MassengerStory: [],
    Tafsir: [],
    Azkar: [],
    hadeeth: [],
  },
});

const user = mongoose.model("user", tasks);

module.exports = user;
