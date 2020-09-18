const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const CardSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    rfid: {
        type: String,
        required: true
    },
    cardNo: {
        type: String,
        required: true
    },
    gymId: {
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    blockedBy: {
        type: String
    }
})

const Card = resources.model("Card", CardSchema)
module.exports = Card