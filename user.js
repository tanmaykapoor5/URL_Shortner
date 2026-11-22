const userdata = require("../models/user")
const {v4: uuidv4} = require("uuid")
const {setUser} = require("../service/auth")

async function handleSignUp(req, res){
    const body = req.body;
    if(!body ||
        !body.name ||
        !body.password
        
    ){
        return res.status(400).json({msg: "all fields required"})
    }

    await userdata.create({
        name: body.name,
        email: body.email,
        password: body.password,
    })

    return res.render("home");


}

async function handleuserlogin(req, res){
    const {email, password} = req.body
    const user = await userdata.findOne({email, password});
    if(!user){
        return res.render("login", {
            error: "Invalid username or password"
        })

    }
    // const sessionID = uuidv4()
    const token = setUser(user)
    res.cookie("token", token)
    return res.redirect("/");


}

module.exports = {
    handleSignUp,
    handleuserlogin
}