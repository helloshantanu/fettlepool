const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    // location: {
    //     latitude: {
    //         type: Number
    //     },
    //     longitude: {
    //         type: Number
    //     }
    // },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    locality: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isMobileVerified: {
        type: Boolean,
        default: false
    },
    hasBeenDeactivated: {
        type: Boolean,
        default: false
    },
    lastEdited: {
        edited_by:{
            type: String,
        },
        edited_at: {
            type: Date,
            default: new Date()
        }
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    isDeleted: {
        deleted_by:{
            type: String,
        },
        deleted_at: {
            type: Date,
        }
    },
})

const User = resources.model("User", UserSchema)

module.exports = User