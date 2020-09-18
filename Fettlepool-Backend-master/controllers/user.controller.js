const {
  login_user,
  create_user,
  delete_user,
  get_user_by_email,
  get_all_users,
  get_user,
  update_user,
  get_user_by_details,
  update_user_details,
  register_card_details_service,
  send_verification_email_service,
  verify_email_service,
  change_password,
  upload_image_service,
  get_user_by_mobile,
  change_email_service,
  change_address_service,
  change_mobile_service,
  verify_mobile_service,
  verify_otp_service
} = require('../services/users.service')
const {
  get_token,
  create_token,
  create_admin_token,
  del_expired_token
} = require('../services/token.service')

const {
  base64decode,
  base64encode,
  create_S256_ecryption
} = require('../helpers/utils.helper')
const {
  get_card,
  create_card
} = require('../services/card.service')

var qs = require("querystring");
var http = require("https");
const crypto = require("crypto")
var unirest = require("unirest");
var path = require('path')
const Cards = require('../models/card.model')
const moment = require("moment");



const signup_controller = async (req, res, next) => {
  const first_name = req.body["first_name"]
  const email = req.body["email"]
  const mobile = req.body["mobile"]
  const password = req.body["password"]
  const current_user = await get_user_by_details(email, mobile)
  if(current_user == null){
    const new_user = await create_user(first_name, email, mobile,password)
    if(new_user != null){
      const token = await create_token(new_user["_id"])
      //TODO: Send a welcome email on behalf of fettlepool
      if(token != null){
        res.json({
          "message": "User created successfully",
          "name": new_user["firstName"],
          "email": email,
          "mobile": mobile,
          "access_token": token["token"],
          "expiry": token["expiry"],
          "scopes": token["scopes"]
        })
      } else {
        res.status(200)
        res.json({
          "message": "Unable to create tokens",
          "status": 200
        })
      }
    } else {
      res.status(500)
      res.json({
        "message": "Unable to create user",
        "status": 500
      })
    }
  } else {
    res.status(403)
    res.json({
      "message": "User already exists",
      "status": 403
    })
  }
}

const update_user_controller = async (req, res, next) => {

}

const update_user_details_controller = async (req, res, next) => {
  const userId =res.locals["user"]
  const dob= req.body["dob"]
  const gender= req.body["gender"]
  const updated_user= await update_user_details(userId,dob,gender)
  if(updated_user != null)
  res.status(200).json({"message":"Details updated successfully"})
  else
  res.status(500).json({"message":"Server Error"})

}

const register_card_details_controller = async (req, res, next) => {

  const adminId = res.locals["user"]
  const email= req.body["email"]
  const mobile= req.body["mobile"]
  const locality= req.body["locality"]
  const city= req.body["city"]
  const state= req.body["state"]
  const gymId= req.body["gymId"]
  var balance= req.body["balance"]
  const user = await get_user_by_details(email,mobile)
  const userId=user["_id"]

  const blockedCard = await Cards.find({
    "userId": userId,
    "isBlocked": true,
  }).sort({ "created_at": -1 }).limit(1)

  if (blockedCard.length != 0 && blockedCard[0]['balance']!=0)
    balance=blockedCard[0]['balance']
  
  const updated_user = await register_card_details_service(adminId,userId,locality,city,state)
  if(updated_user != null){

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
  else
  res.status(500).json({"message":"Server Error"})

}

const get_user_controller = async (req, res, next) => {
  const user = req.params["userID"]
  const current_user = await get_user(user)
  res.json(current_user) 
}

const get_user_by_token_controller = async (req, res, next) => {
  const userId = res.locals["user"]
  const user = await get_user(userId)
  if(user)
  res.status(200).json(user) 
  else
  res.status(501).json({"message":"Server Error"}) 
}

const get_all_user_controller = async (req, res, next) => {
  const users = await get_all_users()
  res.json(users)
}

const login_controller = async (req, res, next) => {
    try {
      const header = req.headers["authorization"]
      const subheader = header.split(" ", 2)
      const decoded_header = base64decode(subheader[1])
      const split_header= decoded_header.split(':')
      const email = split_header[0]
      const password = split_header[1]
      const loggedin_user = await login_user(email, password)
      if(loggedin_user){
          const user_document = await get_user_by_email(email)
          res.locals["user"] = user_document["_id"]
          
          const token_document = await get_token(user_document["_id"])
          
          if (token_document["expiry"]<moment()){
            const is_del_token = await del_expired_token(token_document["token"])
            const new_token = await create_token(user_document["_id"])
            if(is_del_token != null && new_token != null){
              res.status(200)
              res.json({
                "token": new_token["token"],
                "expiry": new_token["expiry"],
                "email": email,
                "first_name": user_document["firstName"],
                "mobile": user_document["mobile"],
                "isMobileVerified": user_document["isMobileVerified"],
                "dob":user_document["dob"], //new
                "message": "Logged in successfully",
                "status": 200
              })
            }
            else
            {
              res.status(500)
              res.json({
                "message": "Server Error",
              })
            }
            
          }
          else{
            res.status(200)
            res.json({
              "token": token_document["token"],
              "expiry": token_document["expiry"],
              "email": email,
              "first_name": user_document["firstName"],
              "isMobileVerified": user_document["isMobileVerified"],
              "mobile": user_document["mobile"],
              "message": "Logged in successfully",
              "status": 200
            })
          }
          
      } 
      else {
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

const login_user_middleware = async (req, res, next) => {
    try {
      const header = req.headers["authorization"]
      const subheader = header.split(" ", 2)
      const decoded_header = base64decode(subheader[1])
      const split_header= decoded_header.split(':')
      const email = split_header[0]
      const password = split_header[1]
      const loggedin_user = await login_user(email, password)
      if(loggedin_user){
          const user_document = await get_user_by_email(email)
          res.locals["user"] = user_document["_id"]
          next()
      }
    } catch (NOT_SUFFICIENT_ARGUMENTS) {
      res.status(401)
      res.json({
        "status": 401,
        "message": "Invalid Credentials. Unauthorized"
      })
    }
}

const send_otp_controller = async (request,response) => {
  try{

    var req = unirest("POST", "https://www.smsgateway.center/OTPApi/send");
    const userName = process.env.OTP_GATEWAY_ID
    const password = process.env.OTP_GATEWAY_PASSWORD
    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded"
    });

    req.form({
      "userId": userName,
      "password": password,
      "senderId": 'FTPOOL',
      "sendMethod": 'generate',
      "msgType": 'text',
      "mobile": request.headers['mobile'],
      "msg": 'Your Fettle Pool OTP code is $otp$. Please use the code within 10 minutes. Do not share the OTP with anyone.',
      "codeExpiry": 600,
      "codeLength": 4,
      "codeType": 'num',
      "retryExpiry": 120,
      "renew": true,
      "format": 'json',
      "medium": 'sms'
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      if(res.body.status=='success')
        response.status(200).json({ "message": "OTP sent successfully", "body": res.body})
      else
        response.status(500).json({ "message": "Error sending OTP","body":res.body })
    });

  }
  catch(err){
    console.log(err)
  }
}


const verify_otp_controller = async (request,response) => {

  const mobile = request.headers['mobile']
  const otp = request.headers['otp']

  var isVerifed= await verify_otp_service(mobile,otp)
  
  if (isVerifed==true) {
      const user = await get_user_by_mobile(request.headers['mobile']);
      const userId = user['_id'];
      const update = await verify_mobile_service(userId)
      if (update != null)
        response.status(200).json({ "message": "OTP verified successfully" })
    }
  else
    response.status(500).json({ "message": "Error verifying OTP" })
}


const verify_otp_forgot_password_controller = async (request,response) => {
  try{
    const mobile = request.headers['mobile']
    const otp = request.headers['otp']

    var isVerifed = await verify_otp_service(mobile, otp)

    if (isVerifed ==true){
      const user = await get_user_by_mobile(request.headers['mobile']);
      const userId=user['_id'];
      const token=await get_token(userId)
      response.status(200).json({ "message": "OTP verified successfully", "token": token['token'] })
    }
    else
      response.status(500).json({ "message": "Error verifying OTP" })
  }
  catch(err){
    console.log(err)
  }
}

const send_verification_email_controller = async (request, response) => {
    const email= request.params['email']
    const token = await send_verification_email_service(email);
    response.json(token)
}

const verify_email_controller = async (request, response) => {
    const token= request.params['token']
    const data = await verify_email_service(token);
    if(data!=null)
    response.sendFile('thankyou.html',{root:'./views'});
}

const change_password_controller = async (req, res) => {
  const userId=res.locals['user']
  const password=req.body['password']
  const user= await change_password(userId,password)
  if(user!=null)
    res.status(200).json({"message":"Password changed Successfully"})
  else
    res.status(500).json({"message":"Server Error, Please try again later"})
}

const change_email_controller = async (req, res) => {
  const adminId=res.locals['user']
  const userId=req.body['userId']
  const oldEmail=req.body['oldEmail']
  const newEmail=req.body['newEmail']

  
  const document= await change_email_service(adminId,userId,oldEmail,newEmail)
  if(document!=null)
    res.status(200).json({"message":"Email Changed Successfully"})
  else
    res.status(500).json({"message":"Server Error, Please try again later"})
}


const change_mobile_controller = async (req, res) => {
  const adminId=res.locals['user']
  const userId=req.body['userId']
  const oldMobile=req.body['oldMobile']
  const newMobile=req.body['newMobile']
  const document= await change_mobile_service(adminId,userId,oldMobile,newMobile)
  if(document!=null)
    res.status(200).json({"message":"Mobile Changed Successfully"})
  else
    res.status(500).json({"message":"Server Error, Please try again later"})
}


const change_address_controller = async (req, res) => {
  const adminId=res.locals['user']
  const userId=req.body['userId']
  const locality=req.body['locality']
  const city=req.body['city']
  const state=req.body['state']

  const document= await change_address_service(adminId,userId,locality,city,state)
  if(document!=null)
    res.status(200).json({"message":"Address Changed Successfully"})
  else
    res.status(500).json({"message":"Server Error, Please try again later"})
}

const upload_image_controller = async (req, res) => {
  if (req.file.path != null) {
    const userId=res.locals['user']
    const updatedUser=await upload_image_service(req.file.path,userId);
    if(updatedUser!=null){
      res.status(200)
      res.json({
        "image": "Image added successfully",
        "status": 200
      })
    }
    else{
      res.status(500)
      res.json({
        "image": "Error registering image",
        "status": 500
      })
    }
  } else {
    res.status(500)
    res.json({
      "image": "Error registering image",
      "status": 500
    })
  }
}

module.exports = {
    "login_middleware": login_user_middleware,
    "login": login_controller,
    "signup": signup_controller,
    "get_user": get_user_controller,
    "get_all_users": get_all_user_controller,
    "update_user": update_user_controller,
    "update_user_details":update_user_details_controller,
    "registered_card_details":register_card_details_controller,
    "get_user_by_token":get_user_by_token_controller,
    "send_otp_controller":send_otp_controller,
    "verify_otp_controller":verify_otp_controller,
    "send_verification_email":send_verification_email_controller,
    "verify_email":verify_email_controller,
    "change_password_route":change_password_controller,
    "upload_image":upload_image_controller,
    "verify_otp_forgot_password": verify_otp_forgot_password_controller,
    "change_email": change_email_controller,
    "change_mobile": change_mobile_controller,
    "change_address": change_address_controller
}