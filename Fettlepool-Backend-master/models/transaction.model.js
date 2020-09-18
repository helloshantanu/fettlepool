const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const TransactionSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    cardNo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    status:{
        type: String,
        required:true
    },
    method:{
        type: String,
        required: true
    },
    bank:{
        type: String,
    },
    vpa:{
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    created_at_razorpay: {
        type: Number,
        required: true
    },
    
})

const Transaction = resources.model("Transactions", TransactionSchema)
module.exports = Transaction