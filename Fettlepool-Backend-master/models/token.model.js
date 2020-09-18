const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const TokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    expiry: {
        type: Date,
        required: true
    },
    scopes: {
        type: [String],
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const Token = resources.model("Token", TokenSchema)

module.exports = Token