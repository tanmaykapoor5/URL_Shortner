const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,


    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: 'NORMAL',
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
})

const usermodel = mongoose.model("userdata", userSchema)
module.exports = usermodel