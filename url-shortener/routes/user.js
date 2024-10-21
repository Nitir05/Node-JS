const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

const router = express.Router({strict: true});

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;

