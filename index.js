const  express = require("express")
const app = express()
const Port = 8001
const urlshort = require("./route/url")
const User = require("./models/url")
const {connectMongoDB} = require("./connection")

connectMongoDB( "mongodb://127.0.0.1:27017/url-short").then(() => console.log(
    "MongoDb is connected"
))
app.use(express.json())
app.use("/url", urlshort);

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

