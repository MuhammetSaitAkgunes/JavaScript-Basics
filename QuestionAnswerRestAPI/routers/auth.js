// api/auth
const express = require("express");
const { register, getUser, login, logout} = require("../controllers/auth");
const router = express.Router();
const { getAccessToRoute } = require("../middleware/authorization/auth");


router.post("/register", register); 
router.post("/login", login);
router.get("/profile", getAccessToRoute, getUser);
router.get("/logout",getAccessToRoute, logout );

module.exports = router;