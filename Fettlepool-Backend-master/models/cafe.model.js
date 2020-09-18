const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const CafeSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    menu: [
        {
            itemName: {
                type: String
            },
            itemImage: {
                type:String
            },
            itemPrice: {
                type: String
            },
            itemDescription: {
                type: String
            },
            created_at: {
                type: Date,
                default: new Date()
            },
            isAvailable: {
                type: Boolean,
                default: true
            },
            isBestSeller: {
                type: Boolean,
                default: false
            },

        }
    ],
    created_at: {
        type: Date,
        default: new Date()
    },
})

const Cafe = resources.model("cafes", CafeSchema)
module.exports = Cafe