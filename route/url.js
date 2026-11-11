const express = require("express")
const router = express.Router()

const {handleGetShortUrl} = require("../controller/url")

router.post("/", handleGetShortUrl)

module.exports = router