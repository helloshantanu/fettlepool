const Admins = require('../models/admin.model')
const bcrypt = require("bcrypt")

const create_admin = async (name, email, password, mobile) => {
    const hashed_password = bcrypt.hashSync(password, 10)
    const new_admin_document = new Admins({
        name: name,
        email: email,
        password: hashed_password,
        mobile: mobile
    })
    const new_admin = await new_admin_document.save()
    return new_admin
}

const login_admin = async (email, password) => {
    const user = await Admins.findOne({
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

const disable_admin = async (admin_id, deleted_by) => {
    const deleted_admin = await Admins.findOneAndUpdate({
        "_id": admin_id
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
    return deleted_admin
}

const get_admin = async (adminId) => {
    return await Admins.findOne({
        "_id": adminId
    }, {
        "isDeleted": 0,
        "created_at": 0,
        "lastEdited": 0
    })
}

const verify_admin = async (adminId) => {
    var verification=false
    await Admins.findOneAndUpdate({
        "_id": adminId
    }, {
        $set: {
            "isConfirmed": true
        }
    }, {
        new: true
    },
    (err,doc)=>{
        if(err)
            verification=false
        else
            verification = true
    })
    return verification
}

const get_admin_by_email = async (email) => {
    const admin = await Admins.findOne({
        "email": [email]
    })
    return admin
}

const get_admin_by_details = async (email, mobile) => {
    const admin = await Admins.findOne({
        $or: [
            {
                "email": [email]
            },
            {
                "mobile": [mobile]
            }
        ]
    })
    return admin
}

const is_super_user = async (email) => {
    const admin = await Admins.findOne({
        $and: [
            {
                "email": email
            },
            {
                "isSuperUser": true
            }
        ]
    })
    return admin
}


const create_super_user = async (name, email, password, mobile) => {
    const hashed_password = bcrypt.hashSync(password, 10)
    const new_admin_document = new Admins({
        name: name,
        email: email,
        password: hashed_password,
        mobile: mobile,
        isEmailVerified:true,
        isMobileVerified:true,
        isConfirmed:true,
        isSuperUser:true
    })
    const new_admin = await new_admin_document.save()
    return new_admin
}

const get_unverified_admins = async () => {
    return await Admins.find({ "isConfirmed": false,"isSuperUser":false}, {
        "password": 0,
        "gymId": 0,
        "isEmailVerified": 0,
        "isMobileVerified": 0,
        "lastEdited": 0,
        "created_at": 0,
        "hasBeenDeactivated": 0,
        "isDeleted": 0,
        "isSuperUser": 0,
        "isConfirmed":0,
        "_id":0

    })
}

module.exports = {
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
}

