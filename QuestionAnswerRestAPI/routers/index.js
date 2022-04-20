const express = require("express");

// buralara yönlendirme yapılacağı için burada dahil edilmesi gerekiyor.
const question = require("./question");
const auth = require("./auth");

// /api geldi buraya.
const router = express.Router();

router.use("/questions",question);
router.use("/auth",auth);


module.exports = router;