const  express = require("express")
const path = require("path")
const app = express()
const Port = 8001
const urlshort = require("./route/url")
const User = require("./models/url")
const {connectMongoDB} = require("./connection")
const staticRouter = require("./route/staticRouter")
const user = require("./route/user")
const cookieParser = require("cookie-parser")
const {checkforAuthentication, restrictTo} = require("./middlewares/auth")

connectMongoDB( "mongodb://127.0.0.1:27017/url-short").then(() => console.log(
    "MongoDb is connected"
))

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"))

// app.get("/test", async (req, res) => {
//     const allurls = await User.find({});
//     return res.render('home', {
//         urls: allurls

//     });
// })

app.use(express.json())
app.use(express.urlencoded())

app.use(cookieParser())
app.use(checkforAuthentication);
app.use("/url",restrictTo(["NORMAL"]), urlshort);
app.use("/", staticRouter)

app.use("/user", user)



app.get("/:shortid", async (req, res) => {
    const shortId = req.params.shortid
    const entry = await User.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    }
)

res.redirect(entry.redirectURL)

})

app.listen(Port, () => console.log(`Port is connected at ${Port}`))

