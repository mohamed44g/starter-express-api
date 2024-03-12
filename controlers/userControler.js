const user = require("../model/userModel");
const errorHandler = require("../middleware/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../utils/appError");

const registerUser = errorHandler(async (req, res, next) => {
  const { username, name } = req.body;
  const password = await bcrypt.hash(req.body.password, 8);

  const check = await user.findOne({ username: username });

  if (check) {
    const err = new Error("this user name is already exist");
    err.status = 400;
    next(err);
    return;
  }

  const newUser = new user({
    username,
    name,
    password,
  });

  await newUser.save();
  res
    .status(201)
    .json({ status: "success", data: { message: "user have been created" } });
});

const loginUser = errorHandler(async (req, res, next) => {
  const { username, password } = req.body;
  console.log("done");

  if (!username || !password) {
    const err = new Error("username and password are required");
    err.status = 400;
    return next(err);
  }

  const ckeckUser = await user.findOne({ username: username });

  if (!ckeckUser) {
    const err = new Error("user not found");
    err.status = 404;
    return next(err);
  }

  const matchedPassword = await bcrypt.compare(password, ckeckUser.password);

  if (ckeckUser && matchedPassword) {
    const accesstoken = jwt.sign(
      { id: ckeckUser._id, username: ckeckUser.username },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { id: ckeckUser._id, username: ckeckUser.username },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );
    const setrefreshToken = await user.updateOne(
      { username: username },
      { $set: { refreshToken } }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.json({ status: "success", data: { accesstoken } });
    console.log(req.cookies["refreshToken"]);
  } else {
    const err = new Error("email or password is wrong");
    err.status = 400;
    return next(err);
  }
});

const deleteUser = errorHandler(async (req, res) => {
  if (res.locals.jwt) {
    const deleteuser = await user.deleteOne({
      username: res.locals.jwt.username,
    });
    res.json({
      status: "success",
      data: { message: "account deleted successfully" },
    });
  }
});

const signoutUser = errorHandler(async (req, res) => {
  const deleteTask = await user.deleteOne({ _id: req.params.taskId });
  res.json({ status: "success", data: null });
});

const getUser = errorHandler(async (req, res) => {
  const data = await user.find({});
  res.json({ status: "success", data: { data } });
});

const CheckToken = errorHandler(async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  if (!auth) {
    return res
      .status(401)
      .json({ status: "error", data: { message: "not authorized" } });
  }

  console.log("from CheckToken");

  const decode = jwt.verify(auth, process.env.SECRET_KEY, (err) => {
    if (err) {
      return res
        .status(401)
        .json({ status: "error", data: { message: "not authorized" } });
    } else {
      return res.status(200).json({ status: "success", data: { auth } });
    }
  });
});

const setFavorite = errorHandler(async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  console.log(req.body, auth);
  const favoriteItem = req.body;
  const decode = jwt.verify(auth, process.env.SECRET_KEY);
  const data = await user.findOne({ _id: decode.id }, { favorites: 1, _id: 0 });
  const check = data.favorites[favoriteItem.type].find(
    (ele) => ele.id === favoriteItem.id && ele.name === favoriteItem.name
  );
  if (!check) {
    data.favorites[favoriteItem.type].push(favoriteItem);
  }
  const update = await user.updateOne(
    { _id: decode.id },
    { $set: { favorites: data.favorites } }
  );
  res.send({ data: data });
});

const deleteFavorite = errorHandler(async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  const favoriteItem = req.body;
  const decode = jwt.verify(auth, process.env.SECRET_KEY);
  const data = await user.findOne({ _id: decode.id }, { favorites: 1, _id: 0 });
  data.favorites[favoriteItem.type] = data.favorites[favoriteItem.type].filter(
    (item) => item.id != favoriteItem.id
  );
  const update = await user.updateOne(
    { _id: decode.id },
    { $set: { favorites: data.favorites } }
  );
  res.send({ data: data });
});

const getFavorite = errorHandler(async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  const type = req.params.type;
  const decode = jwt.verify(auth, process.env.SECRET_KEY);
  const data = await user.findOne({ _id: decode.id }, { favorites: 1, _id: 0 });
  res.send({ data: data.favorites[type] });
});

const getAllFavorite = errorHandler(async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  const decode = jwt.verify(auth, process.env.SECRET_KEY);
  const data = await user.findOne({ _id: decode.id }, { favorites: 1, _id: 0 });
  res.send({
    data: [
      ...data.favorites.Quran,
      ...data.favorites.QuranStory,
      ...data.favorites.MassengerStory,
      ...data.favorites.Tafsir,
      ...data.favorites.Azkar,
      ...data.favorites.hadeeth,
    ],
  });
});

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  signoutUser,
  getUser,
  CheckToken,
  setFavorite,
  deleteFavorite,
  getFavorite,
  getAllFavorite,
};
