const express = require("express")
const router = express.Router()
const {handleSignUp,
    handleuserlogin
} = require("../controller/user")

router.post("/signup", handleSignUp)
router.post("/login", handleuserlogin)

module.exports = router