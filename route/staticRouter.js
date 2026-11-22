const express = require("express")
const { restrictTo } = require("../middlewares/auth")
const router = express.Router()

router.get("/",  (req, res) => {
    return res.render('home')
})

router.get("/signup", (req, res) => {
    return res.render('signup.ejs')

})

router.get("/login", (req, res) => {
    return res.render('login.ejs')

})


module.exports = router;