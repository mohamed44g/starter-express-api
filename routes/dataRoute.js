const express = require("express");
const verifyRoutes = require("../middleware/verifyRout");

const router = express();
const controler = require("../controlers/dataControler");

router.get("/azkars", verifyRoutes, controler.getAzkar);
router.get("/zekr/:id", verifyRoutes, controler.getZekr);
router.get("/MassengerStories", verifyRoutes, controler.MassengerStories);
router.get("/MassengerStory/:id", verifyRoutes, controler.MassengerStory);
router.get("/Sunnah", verifyRoutes, controler.Sonn);
router.get("/QuranStories", verifyRoutes, controler.QuranStories);
router.get("/QuranStory/:id", verifyRoutes, controler.QuranStory);
router.get("/Quran/:id", verifyRoutes, controler.getQuran);
router.get("/Hadeeth", verifyRoutes, controler.getHadeeths);
router.get("/Hadeeth/:id", verifyRoutes, controler.getHadeeth);
router.get("/questions", verifyRoutes, controler.getquestions);

module.exports = router;
