const express = require("express");
const {
    handleGenerateNewURL,
    handleGetURLAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewURL);
router.get("/:shortId", handleGetURLAnalytics);

module.exports = router;
