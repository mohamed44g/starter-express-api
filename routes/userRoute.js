const express = require("express");
const fs = require("fs");
const verifyRoutes = require("../middleware/verifyRout");

const router = express();
const controler = require("../controlers/userControler");

router.post("/register", controler.registerUser);
router.get("/getusers", verifyRoutes, controler.getUser);
router.post("/login", controler.loginUser);
router.post("/delete", verifyRoutes, controler.deleteUser);
router.post("/signout", verifyRoutes, controler.signoutUser);
router.post("/CheckToken", controler.CheckToken);
router.patch("/favorite", verifyRoutes, controler.setFavorite);
router.delete("/favorite", verifyRoutes, controler.deleteFavorite);
router.get("/favorite/:type", verifyRoutes, controler.getFavorite);
router.get("/favorite/", verifyRoutes, controler.getAllFavorite);

module.exports = router;
