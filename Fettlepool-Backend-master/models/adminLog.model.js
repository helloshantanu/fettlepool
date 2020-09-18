const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const AdminLogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    gymId: {
        type: String,
        required: true
    },
    accessCard: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    entryTime: {
        type: Date,
        default: new Date()
    }
})

const AdminLog = resources.model("AdminLog", AdminLogSchema)
module.exports = AdminLog