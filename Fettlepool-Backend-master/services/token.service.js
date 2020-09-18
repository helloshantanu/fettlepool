const Tokens = require('../models/token.model')
const {
  generate_unique_identifier,
  calculate_expiry_days,
  check_scopes_existence
} = require('../helpers/utils.helper')
const {
  get_user
} = require('../services/users.service')

const create_token = async (userId) => {
    const token = generate_unique_identifier(64)
    const expiry = calculate_expiry_days(60)
    const new_token_document = new Tokens({
        userId: userId,
        token: token,
        isAdmin: false,
        expiry: expiry,
        scopes: [
            "user_profile",
            "edit_profile",
            "access_gym",
            "add_images",
            "use_cafe",
            "create_transactions",
            "create_payments",
            "access_wallet"
        ]
    })
    const new_token = await new_token_document.save()
    return new_token
}

const validate_token = async (token, scope) => {
    const token_document = await Tokens.findOne({
        "isAdmin": false,
        "token": token
    })
    if(token_document != null){
        const expiry = token_document["expiry"]
        const now = new Date()
        if(now < expiry){
            if(check_scopes_existence(token_document["scopes"], scope)){
                return true
            }
            return false
        }
        return false
    }
    return false
}

const get_token = async (userId) => {
    const token = await Tokens.find({
        "userId": userId
    }).sort({"created_at": -1})
    return token[0]
}

const create_admin_token = async (userId,usertype) => {
    const token = generate_unique_identifier(64)
    const expiry = calculate_expiry_days(60)
    var new_token_document
    if (usertype=="superuser") {
         new_token_document = new Tokens({
            userId: userId,
            token: token,
            isAdmin: true,
            expiry: expiry,
            scopes: [
                "user_profile",
                "edit_profile",
                "access_gym",
                "add_images",
                "use_cafe",
                "add_gym",
                "add_rfid",
                "add_cafe_items",
                "access_secure_users_data",
                "access_analytics",
                "access_sessions",
                "access_transactions",
                "create_transactions",
                "create_payments",
                "access_wallet",
                "verify_admin",
            ]
        })
    } else {
         new_token_document = new Tokens({
            userId: userId,
            token: token,
            isAdmin: true,
            expiry: expiry,
            scopes: [
                "user_profile",
                "edit_profile",
                "access_gym",
                "add_images",
                "use_cafe",
                "add_gym",
                "add_rfid",
                "add_cafe_items",
                "access_secure_users_data",
                "access_analytics",
                "access_sessions",
                "access_transactions",
                "create_transactions",
                "create_payments",
                "access_wallet",
            ]
        })
    }
    
    const new_token = await new_token_document.save()
    return new_token
}

const get_admin_token = async (userId) => {
    const token = await Tokens.find({
        "userId": userId,
        "isAdmin": true
    }).sort({"created_at": -1})
    return token[0]
}

const validate_admin_token = async (token, scope) => {
    const token_document = await Tokens.findOne({
        "token": token,
        "isAdmin": true
    })
    if(token_document != null){
        const expiry = token_document["expiry"]
        const now = new Date()
        if(now < expiry){
            if(check_scopes_existence(token_document["scopes"], scope)){
                return true
            }
            return false
        }
        return false
    }
    return false
}

const get_token_details = async (token) => {
    return await Tokens.findOne({
        "token": token
    })
}

const del_expired_token = async (token) => {
    return await Tokens.findOneAndDelete({
        "token": token
    })
}

module.exports = {
    create_token,
    validate_token,
    get_token,
    create_admin_token,
    validate_admin_token,
    get_admin_token,
    get_token_details,
    del_expired_token
}