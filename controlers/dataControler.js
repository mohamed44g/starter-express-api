const errorHandler = require("../middleware/error");
const azkar = require("../model/azkarModel");
const Massenger = require("../model/MassengerStories");
const sonnModel = require("../model/sonn");
const QuranStoryModel = require("../model/QuranStories");
const Quran = require("../model/Quran");
const Hadeeth = require("../model/hadeeth");
const questions = require("../model/questions");

const getAzkar = errorHandler(async (req, res, next) => {
  const data = await azkar
    .find({}, { id: 1, category: 1, _id: 0 })
    .sort({ id: 1 });
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }
  console.log("done");
  res.json({ status: "success", data });
});

const getZekr = errorHandler(async (req, res, next) => {
  const id = +req.params.id;
  const data = await azkar.findOne({ id: id });
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }

  res.json({ status: "success", data });
});

const MassengerStories = errorHandler(async (req, res, next) => {
  const data = await Massenger.find({}, { id: 1, name: 1, _id: 0 }).sort({
    id: 1,
  });

  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }
  console.log("done");
  res.json({ status: "success", data });
});

const MassengerStory = errorHandler(async (req, res, next) => {
  const id = +req.params.id;
  const data = await Massenger.findOne({ id: id });
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }

  res.json({ status: "success", data });
});

const Sonn = errorHandler(async (req, res, next) => {
  const data = await sonnModel.find({}).sort({ id: 1 });
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }
  console.log("done");
  res.json({ status: "success", data });
});

const QuranStories = errorHandler(async (req, res, next) => {
  const data = await QuranStoryModel.find({}, { id: 1, name: 1, _id: 0 }).sort({
    id: 1,
  });

  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }
  console.log("done");
  res.json({ status: "success", data });
});

const QuranStory = errorHandler(async (req, res, next) => {
  const id = +req.params.id;
  const data = await QuranStoryModel.findOne({ id: id });
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }

  res.json({ status: "success", data });
});

const getQuran = errorHandler(async (req, res, next) => {
  const id = +req.params.id;
  const data = await Quran.findOne({ number: id });
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }

  res.json({ status: "success", data });
});

const getHadeeths = errorHandler(async (req, res, next) => {
  const data = await Hadeeth.find({}, { id: 1, category: 1, _id: 0 }).sort({
    id: 1,
  });

  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }
  console.log("done");
  res.json({ status: "success", data });
});

const getHadeeth = errorHandler(async (req, res, next) => {
  const id = +req.params.id;
  const data = await Hadeeth.findOne({ id: id });
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }

  res.json({ status: "success", data });
});

const getquestions = errorHandler(async (req, res, next) => {
  let page = +req.query.page;
  let skip = (page - 1) * 20;
  const data = await questions.find({}).skip(skip).limit(20);
  if (!data) {
    const err = new Error("something went wrong");
    err.status = 404;
    next(err);
    return;
  }

  res.json({ status: "success", data });
});

module.exports = {
  getAzkar,
  getZekr,
  MassengerStories,
  MassengerStory,
  Sonn,
  QuranStories,
  QuranStory,
  getQuran,
  getHadeeths,
  getHadeeth,
  getquestions,
  
};
