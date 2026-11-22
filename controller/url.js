const User = require("../models/url")
const shortid = require("shortid")



async function handleGetShortUrl(req, res){
    const body = req.body
    if(!body){
        return res.status(400).json({Msg: "url is required"});
    }
    const shortId = shortid(8)
    const result = await User.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    console.log(result)
    return res.render("home", {
        id: shortId
    })
    
}





module.exports = {
    handleGetShortUrl
}