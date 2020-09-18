const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const RazorpaySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    entity: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    international: {
        type: Boolean,
        default: false
    },
    amount_refunded: {
        type: Number,
        required: true
    },
    refund_status: {
        type: String,
        required: true
    },
    captured: {
        type: Boolean
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    error_code: {
        type: String
    },
    error_description: {
        type: String
    },
    notes: {
        default: {}
    },
    fee: {
        type: Number
    },
    tax: {
        type: Number
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const RazorPay = resources.model("RazorPay", RazorpaySchema)
module.exports = RazorPay