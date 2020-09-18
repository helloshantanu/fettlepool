const Users = require('../models/users.model')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var unirest = require("unirest");
const axios = require("axios");
var querystring = require("querystring")

const SALT_ROUNDS = 10

const create_user = async (first_name, email, mobile, password) => {
    const updated_password = bcrypt.hashSync(password, SALT_ROUNDS)
    const new_user_document = new Users({
        firstName: first_name,
        email: email,
        password: updated_password,
        mobile: mobile,
    })
    const new_user = await new_user_document.save()
    return new_user
}

const update_user = async (userId, firstName, lastName, latitude, longitude, city, locality, address, edited_by) => {
    const updated_user = await Users.findOneAndUpdate({
        "_id": userId,
    }, {
        $set: {
            "firstName": firstName,
            "lastName": lastName,
            "location": {
                "latitude": latitude,
                "longitude" : longitude
            },
            "locality": locality,
            "city": city,
            "address": address,
            "lastEdited": {
                "edited_by": edited_by,
                "edited_at": new Date()
            }
        }
    })
    return updated_user
}
const update_user_details = async (userId,dob,gender) => {
    const updated_user = await Users.findOneAndUpdate({
        "_id": userId,
    }, {
        $set: {
            "dob": dob,
            "gender": gender,
            "lastEdited": {
                "edited_by": userId,
                "edited_at": new Date()
            }
        }
    })
    return updated_user
}

const register_card_details_service = async (adminId,userId, locality, city, state) => {
    const updated_user = await Users.findOneAndUpdate({
        "_id": userId,
    }, {
        $set: {
            "locality": locality,
            "city": city,
            "state": state,
            "lastEdited": {
                "edited_by": adminId,
                "edited_at": new Date()
            }
        }
    })
    return updated_user
}

const delete_user = async (user_id, deleted_by) => {
    const deleted_user = await Users.findOneAndUpdate({
        "_id": user_id
    }, {
        $set: {
            "isDeleted": {
                "deleted_by": deleted_by,
                "deleted_at": new Date()
            }
        }
    }, {
        new: true
    })
    return deleted_user
}

const login_user = async (email, password) => {
    const user = await Users.findOne({
        "email": email
    })
    if(user != null){
        if(bcrypt.compareSync(password, user["password"]) && !user["hasBeenDeactivated"]){
            return true
        } 
        return false
    }
    return false
}

const get_user = async (user_id) => {
    const user = await Users.findOne({
        "_id": user_id
    }, {
        "created_at": 0,
        "lastEdited": 0,
        "isDeleted": 0,
        "isEmailVerified": 0,
        "isMobileVerified": 0,
        "hasBeenDeactivated": 0,
        "password": 0
    })
    return user
}

const get_user_by_email = async (email) => {
    const user = await Users.findOne({
        "email": email
    }, {
        "created_at": 0,
        "lastEdited": 0,
        "isDeleted": 0,
        "isEmailVerified": 0,
        "hasBeenDeactivated": 0,
        "password": 0
    })
    return user
}

const get_user_by_mobile = async (mobile) => {
    const user = await Users.findOne({
        "mobile": mobile
    }, {
        "created_at": 0,
        "lastEdited": 0,
        "isDeleted": 0,
        "isEmailVerified": 0,
        "isMobileVerified": 0,
        "hasBeenDeactivated": 0,
        "password": 0
    })
    return user
}

const get_user_by_details = async (email, mobileNo) => {
    const user = await Users.findOne({
        $or: [ //new
            {
                "email": email
            },
            {
                "mobile": mobileNo
            }
        ]
    }, {
        "created_at": 0,
        "lastEdited": 0,
        "isDeleted": 0,
        "isEmailVerified": 0,
        "isMobileVerified": 0,
        "hasBeenDeactivated": 0,
        "password": 0
    })
    return user
}


const get_all_users = async () => {
    return await Users.find({},{
        "password": 0
    })
}

const change_password = async (userId, password) => {

    const updated_password = bcrypt.hashSync(password, SALT_ROUNDS)
    const user = await Users.findOneAndUpdate({
        "_id": userId
    }, {
        $set: {
            "password":updated_password
        }
    }, {
        new: true
    })
    return user
}

const change_email_service = async (adminId, userId, oldEmail, newEmail) => {

    const user = await Users.findOneAndUpdate(
    {        
        $and: [
                {
                    "_id": userId
                },
                {
                    "email": oldEmail
                }
            ]
    }, {
        $set: {
            "email":newEmail,
            "isEmailVerified":true,
            "lastEdited": {
                "edited_by": adminId,
                "edited_at": new Date()
            }
        }
    }, {
        new: true
    })
    return user
}

const change_mobile_service = async (adminId, userId, oldMobile, newMobile) => {

    const user = await Users.findOneAndUpdate(
    {        
        $and: [
                {
                    "_id": userId
                },
                {
                    "mobile": oldMobile
                }
            ]
    }, {
        $set: {
            "mobile":newMobile,
            "isMobileVerified":true,
            "lastEdited": {
                "edited_by": adminId,
                "edited_at": new Date()
            }
        }
    }, {
        new: true
    })
    return user
}

const change_address_service = async (adminId, userId, locality, city, state) => {

    const user = await Users.findOneAndUpdate(
    {  
        "_id": userId
    }, {
        $set: {
            "locality":locality,
            "city":city,
            "state":state,
            "lastEdited": {
                "edited_by": adminId,
                "edited_at": new Date()
            } 
        }
    }, {
        new: true
    })
    return user
}

const send_verification_email_service = async (email) => {
    var token = jwt.sign({ email: email },'FP@SML.2019Sm');
    if(token!=null){
        
        var transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers: 'SSLv3'
            },
            requireTLS: true,
            port: 465,
            debug: true,
            auth: {
                user: 'contact@fettlepool.in',
                pass: 'fettlepool@2011'
            }
        });

        var mailOptions = {
            from: 'contact@fettlepool.in',
            to: email,
            subject: 'Verify email account.',
            html: `<h1>Hi this is an Email Verification from Fettle Pool.</h1><p>Please click on the link below to verify your email address.</p><p>http://api.fettlepool.in/api/accounts/users/email/verifyemail/${token}</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return null
            } else {
                
                return(info.response)
            }
        });
    }
}

const verify_email_service = async (token) => {
    var email;
   jwt.verify(token, 'FP@SML.2019Sm', function (err, decoded) {
        if (err) {
            email=null;
        }
        else{
            email=decoded['email']
        }
    });
    
    if(email!=null){
        const updated_user = await Users.findOneAndUpdate({
            "email":email,
        }, {
            $set: {
                "isEmailVerified": true
            }
        })
        
        return updated_user
    }
    else
        return null
    
}
const verify_mobile_service = async (uId) => {
    
    if(uId!=null){
        const updated_user = await Users.findOneAndUpdate({
            "_id":uId,
        }, {
            $set: {
                "isMobileVerified": true
            }
        })
        return updated_user
    }
    else
        return null
    
}

const verify_otp_service = async (mobile,otp) => {
    
        try {
            const userName = process.env.OTP_GATEWAY_ID
            const password = process.env.OTP_GATEWAY_PASSWORD

            // var req =  await axios({
            //     method: 'post',
            //     url: 'https://www.smsgateway.center/OTPApi/send',
            //     data: {
            //         "userId": userName,
            //         "password": password,
            //         "mobile": mobile,
            //         "otp": otp,
            //         "sendMethod": 'verify',
            //         "format": 'json'
            //     },
            //     headers: {
            //     "cache-control": "no-cache",
            //     "content-type": "application/x-www-form-urlencoded"
            //     }
            // });

            var req = await axios.post('https://www.smsgateway.center/OTPApi/send',
            
                querystring.stringify({
                    "userId": userName,
                    "password": password,
                    "mobile": mobile,
                    "otp": otp,
                    "sendMethod": 'verify',
                    "format": 'json'
                }),{
                    headers: {
                        "cache-control": "no-cache",
                        "content-type": "application/x-www-form-urlencoded"
                    }
                }
                )
                if(req.data.status == 'success')
                return true
                else
                return false

            // var req = unirest("POST", "https://www.smsgateway.center/OTPApi/send");
            
            // const userName = process.env.OTP_GATEWAY_ID
            // const password = process.env.OTP_GATEWAY_PASSWORD
            
            // req.headers({
            //     "cache-control": "no-cache",
            //     "content-type": "application/x-www-form-urlencoded"
            // });

            // req.form({
            //     "userId": userName,
            //     "password": password,
            //     "mobile": mobile,
            //     "otp": otp,
            //     "sendMethod": 'verify',
            //     "format": 'json'
            // });

            // req.end(function (res) {
            //     console.log(res.body.status)
            //     if (res.error) throw new Error(res.error);

            //     if (res.body.status == 'success')
            //         return (true)
            //     else
            //         return (false)
            // });

        }
        catch (err) {
            console.log(err)
        }
    
    
}

const upload_image_service = async (image,userId) => {
   
    const updated_user = await Users.findOneAndUpdate({
        "_id": userId
    }, {
        $set: {
            "image":image
        }
    }, {
        new: true
    })
    return updated_user
}

module.exports = {
    create_user,
    update_user,
    update_user_details,
    delete_user,
    login_user,
    get_all_users,
    get_user,
    get_user_by_email,
    get_user_by_details,
    register_card_details_service,
    send_verification_email_service,
    verify_email_service,
    change_password,
    upload_image_service,
    get_user_by_mobile,
    change_email_service,
    change_mobile_service,
    change_address_service,
    verify_mobile_service,
    verify_otp_service,
}