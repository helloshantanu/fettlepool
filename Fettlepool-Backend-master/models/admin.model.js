const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gymId: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isMobileVerified: {
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
    isConfirmed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    hasBeenDeactivated: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        deleted_by:{
            type: String,
        },
        deleted_at: {
            type: Date,
            default: new Date()
        }
    },
    isSuperUser:{
        type:Boolean,
        default:false
    }
})

const Admin = resources.model("Admin", AdminSchema)

module.exports = Admin