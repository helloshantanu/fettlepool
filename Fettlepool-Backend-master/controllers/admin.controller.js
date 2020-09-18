const {
    create_admin,
    login_admin,
    disable_admin,
    get_admin,
    verify_admin,
    get_admin_by_details,
    get_admin_by_email,
    create_super_user,
    get_unverified_admins,
    is_super_user
} = require('../services/admin.service')
const {
  create_admin_token,
  get_admin_token,
  get_token_details,
  validate_admin_token,
  del_expired_token
} = require('../services/token.service')
const {
    create_card
} = require('../services/card.service')
const {
  base64decode,
  base64encode
} = require('../helpers/utils.helper')
const crypto = require("crypto")
const moment = require("moment");




const create_admin_controller = async (req, res, next) => {
    const name = req.body["name"]
    const password = req.body["password"]
    const email = req.body["email"]
    const mobile = req.body["mobile"]
    //TODO: Send the welcome email and the verification tokens to the email ID and 
    //the mobile no
    const current_admin = await get_admin()
    if(current_admin == null){
        try {
            const new_admin = await create_admin(name, email, password, mobile)
            if(new_admin != null){
                const token = await create_admin_token(new_admin["_id"],'admin')
                res.json({
                    "token": token["token"],
                    "expiry": token["expiry"],
                    "name": new_admin["name"],
                    "email": new_admin["email"],
                    "mobile": new_admin["mobile"],
                    "message": "Admin created successfully",
                    "status": 200
                })
            }
        } catch (UNABLE_TO_CREATE_ADMIN) {
            console.log(UNABLE_TO_CREATE_ADMIN)
            res.status(500)
            res.json({
                "message": "Unable to create admin",
                "status": 500
            })
        }
    } else {
        res.status(403)
        res.json({
            "message": "Admin already exists",
            "status": 403
        })
    }
}

const create_super_user_controller = async (req, res, next) => {
    const securityPin=req.body["pin"]
    const pin = process.env.HIGH_SECURITY_PIN

    if(securityPin==pin){
        const name = req.body["name"]
        const password = req.body["password"]
        const email = req.body["email"]
        const mobile = req.body["mobile"]
        //TODO: Send the welcome email and the verification tokens to the email ID and 
        //the mobile no
        const current_admin = await get_admin()
        if (current_admin == null) {
            try {
                const new_admin = await create_super_user(name, email, password, mobile)
                if (new_admin != null) {
                    const token = await create_admin_token(new_admin["_id"],'superuser')
                    res.json({
                        "token": token["token"],
                        "expiry": token["expiry"],
                        "name": new_admin["name"],
                        "email": new_admin["email"],
                        "mobile": new_admin["mobile"],
                        "message": "Super User created successfully",
                        "status": 200
                    })
                }
            } catch (UNABLE_TO_CREATE_ADMIN) {
                console.log(UNABLE_TO_CREATE_ADMIN)
                res.status(500)
                res.json({
                    "message": "Unable to create admin",
                    "status": 500
                })
            }
        } else {
            res.status(403)
            res.json({
                "message": "Admin already exists",
                "status": 403
            })
        }
    }

    else {
        res.status(404)
        res.json({
            "message": "UnAuthorised Access",
            "status": 404
        })
    }
    
}

const update_admin_controller = async(req, res, next) =>{

}

const login_admin_controller = async (req, res, next) => {
    try {
        const header = req.headers["authorization"]
        const subheader = header.split(" ", 2)
        const decoded_header = base64decode(subheader[1])
        const split_header= decoded_header.split(':')
        const email = split_header[0]
        const password = split_header[1]
        const loggedin_user = await login_admin(email, password)
        if(loggedin_user){
            const user_document = await get_admin_by_email(email)
            res.locals["user"] = user_document["_id"]
            const token_document = await get_admin_token(user_document["_id"])
            if (token_document["expiry"] < moment()) {
                const is_del_token = await del_expired_token(token_document["token"])
                var userType=''
                if(user_document['isSuperUser']==true)
                    userType ='superuser'

                const new_token = await create_admin_token(user_document["_id"],userType)
                if (is_del_token != null && new_token != null) {
                    res.status(200)
                    res.json({
                        "token": new_token["token"],
                        "expiry": new_token["expiry"],
                        "isConfirmed":user_document["isConfirmed"],
                        "email": email,
                        "first_name": user_document["name"],
                        "mobile": user_document["mobile"],
                        "message": "Logged in successfully",
                        "status": 200
                    })
                }
                else {
                    res.status(500)
                    res.json({
                        "message": "Server Error",
                    })
                }
            }

            else {
                res.status(200)
                res.json({
                    "token": token_document["token"],
                    "expiry": token_document["expiry"],
                    "isConfirmed":user_document["isConfirmed"],
                    "email": email,
                    "first_name": user_document["name"],
                    "mobile": user_document["mobile"],
                    "message": "Logged in successfully",
                    "status": 200
                })
            }
        } else {
          res.status(401)
          res.json({
            "status": 401,
            "message": "Invalid Credentials. Unauthorized"
          })
        }
      } catch (NOT_SUFFICIENT_ARGUMENT_ERROR) {
        res.status(401)
        res.json({
          "status": 401,
          "message": "Invalid Credentials. Unauthorized"
        })
      }
}

const get_admin_details = async (req, res, next) => {

}


const get_unverified_admins_controller = async (req, res, next) => {
    const admin= await is_super_user(req.params["email"])
    if(admin!=null)
    {
        const unv_admins = await get_unverified_admins()
        res.status(200)
        res.json(unv_admins)
    }
    else
    {
        res.status(401).json({"message":"Unauthorized Access"})
    }
    
}

const verify_admin_controller = async (req, res, next) => {
    const token=req.body["token"]
    const adminEmail=req.body["adminEmail"]  
    const tokenValidity= await validate_admin_token(token,'verify_admin')

    if(tokenValidity){
        // const data = await get_token_details(token)
        // const superUserId = data["userId"]

        const adminData = await get_admin_by_email(adminEmail)
        const adminId = adminData['_id']

        const verification=await verify_admin(adminId)
        
        if(verification){
            res.status(200).json({"message":"Admin Verified Successfully"})
        }
        else
            res.status(400).json({ "message": "Unauthorized Access" })

    }
    else
        res.status(401).json({ "message": "Unauthorized Access" })

}



const register_admin_card_controller = async (req, res, next) => {

    const adminId = res.locals["user"]
    const gymId = req.body["gymId"]
    const userId=adminId
    var balance = 0;

    const rfid_header = req.headers["x-fettlepool-device-auth"]
    
    const encrypted_rfid = crypto.createHash("sha256").update(rfid_header).digest("hex")

    const new_card = await create_card(userId, balance, encrypted_rfid, gymId, adminId)
    if (new_card != null) {
        res.status(200).json({
            "message": "Registeration Completed successfuly",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Error registering card",
            "status": 500
        })
    }
    

}



module.exports = {
    "create_admin": create_admin_controller,
    "get_admin": get_admin_details,
    "login_admin": login_admin_controller,
    "update_admin": update_admin_controller,
    "create_super_user": create_super_user_controller,
    "unverified_admins": get_unverified_admins_controller,
    "verify_admin": verify_admin_controller,
    "register_admin_card": register_admin_card_controller,
}