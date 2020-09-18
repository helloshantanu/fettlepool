const {
    create_token,
    validate_token,
    create_admin_token,
    validate_admin_token,
    get_token_details
} = require('../services/token.service')
const {
  get_user
} = require('../services/users.service')
const {
  base64decode
} = require('../helpers/utils.helper')
const {
    get_admin
} = require('../services/admin.service')


const create_token_controller = async (req, res, next) =>  {
    const userId = res.locals["user"]
    const token = await create_token(userId)
    if(token != null){
        res.json({
            "userId": userId,
            "token": token["token"],
            "expiry": token["expiry"],
            "scopes": token["scopes"],
            "message": "Tokens generated successfuly",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Could not create token",
            "status": 500
        })
    }
}

const validate_token_controller = async (req, res, next) => {
    try {
        const header = req.headers["authorization"]
        const token = header.substr(7, header.length)
        const scope = req.body["scope"]
        const valid_token_document = await validate_token(token,scope)
        if(valid_token_document != null && valid_token_document){
            const token_document = await get_token_details(token)
            res.locals["user"] = token_document["userId"]
            const user_document = await get_user(token_document["userId"])
            res.locals["email"] = user_document["email"]
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Unauthorized",
                "status": 401
            })
        }
    } catch (TOKEN_MISSING_ERROR) {
        console.log("REQUEST TOKEN MISSING")
        res.status(403)
        res.json({
            "message": "Forbidden",
            "status": 403
        })
    }
}

const validate_token_form_data_controller = async (req, res, next) => {
    try {
        const header = req.headers["authorization"]
        const token = header.substr(7, header.length)
        const scope = req.headers["scope"]
        const valid_token_document = await validate_token(token,scope)
        if(valid_token_document != null && valid_token_document){
            const token_document = await get_token_details(token)
            res.locals["user"] = token_document["userId"]
            const user_document = await get_user(token_document["userId"])
            res.locals["email"] = user_document["email"]
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Unauthorized",
                "status": 401
            })
        }
    } catch (TOKEN_MISSING_ERROR) {
        console.log("REQUEST TOKEN MISSING")
        res.status(403)
        res.json({
            "message": "Forbidden",
            "status": 403
        })
    }
}

const validate_token_controller_as_a_request = async (req, res, next) => {
    try {
        const header = req.headers["authorization"]
        const token = header.substr(7, header.length)
        const scope = req.body["scope"]
        const valid_token_document = await validate_token(token, userId, scope)
        if(valid_token_document != null && valid_token_document){
            const token_document = await get_token_details(token)
            res.locals["user"] = token_document["userId"]
            const user_document = await get_user(token_document["userId"])
            res.locals["email"] = user_document["email"]
            res.send("ok")
        } else {
            res.status(401)
            res.json({
                "message": "Unauthorized",
                "status": 401
            })
        }
    } catch (TOKEN_MISSING_ERROR) {
        console.log("REQUEST TOKEN MISSING")
        res.status(403)
        res.json({
            "message": "Forbidden",
            "status": 403
        })
    }
}

const create_admin_token_controller = async (req, res, next) => {
    const userId = res.locals["user"]
    const token = await create_admin_token(userId)
    if(token != null){
        res.json({
            "userId": userId,
            "token": token["token"],
            "expiry": token["expiry"],
            "scopes": token["scopes"],
            "message": "Tokens generated successfuly",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Could not create token",
            "status": 500
        })
    }
}

const validate_admin_token_controller = async (req, res, next) =>  {
    try {
        const header = req.headers["authorization"]
        const token = header.substr(7, header.length)
        const scope = req.body["scope"]
        const valid_token_document = await validate_admin_token(token, scope)
        if(valid_token_document){
            const token_document = await get_token_details(token)
            res.locals["user"] = token_document["userId"]
            const user_document = await get_admin(token_document["userId"])
            res.locals["email"] = user_document["email"]
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Unauthorized",
                "status": 401
            })
        }
    } catch (TOKEN_MISSING_ERROR) {
        console.log(TOKEN_MISSING_ERROR)
        res.status(403)
        res.json({
            "message": "Forbidden",
            "status": 403
        })
    }
}

const validate_admin_token_form_data_controller = async (req, res, next) =>  {
    try {
        const header = req.headers["authorization"]
        const token = header.substr(7, header.length)
        const scope = req.headers["scope"]
        const valid_token_document = await validate_admin_token(token, scope)
        if(valid_token_document){
            const token_document = await get_token_details(token)
            res.locals["user"] = token_document["userId"]
            const user_document = await get_admin(token_document["userId"])
            res.locals["email"] = user_document["email"]
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Unauthorized",
                "status": 401
            })
        }
    } catch (TOKEN_MISSING_ERROR) {
        console.log(TOKEN_MISSING_ERROR)
        res.status(403)
        res.json({
            "message": "Forbidden",
            "status": 403
        })
    }
}

module.exports = {
    "create_token": create_token_controller,
    "validate_token": validate_token_controller,
    "create_admin_token": create_admin_token_controller,
    "validate_admin_token": validate_admin_token_controller,
    "validate_admin_token_form_data": validate_admin_token_form_data_controller,
    "validate_token_form_data": validate_token_form_data_controller,
    "validate_token_on_request": validate_token_controller_as_a_request
}
