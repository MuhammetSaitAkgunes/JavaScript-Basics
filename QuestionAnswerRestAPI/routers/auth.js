// api/auth
const express = require("express");
const { register, tokentest } = require("../controllers/auth");
const router = express.Router();
const { getAccessToRoute } = require("../middleware/authorization/auth");


router.post("/register", register);
router.get("/tokentest", getAccessToRoute, tokentest);

module.exports = router;