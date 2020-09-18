const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const AnalyticsSchema = new mongoose.Schema({
    users: {
        type: Number,
        required: true
    },
    regUsers: {
        type: Number,
        required: true
    },
    admins: {
        type: Number,
        required: true
    },
    menus: {
        type: Number,
        required: true
    },
    items: {
        type: Number,
        required: true
    },
    sessions: {
        type: Number,
        required: true
    },
    transactions: {
        type: Number,
        required: true
    },
    earnings: {
        type: Number,
        required: true
    },
    curWeekSessions:{
        type: Array,
        required:true
    },
    curWeekEarnings:{
        type: Array,
        required:true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
    
})

const Analytics = resources.model("Analytics", AnalyticsSchema)
module.exports = Analytics