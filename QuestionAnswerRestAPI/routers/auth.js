// api/auth
const express = require("express");
const { register, getUser } = require("../controllers/auth");
const router = express.Router();
const { getAccessToRoute } = require("../middleware/authorization/auth");


router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);

module.exports = router;