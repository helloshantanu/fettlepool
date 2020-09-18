const {
  create_card,
  block_card,
  validate_card,
  get_card
} = require('../services/card.service')
const {
  base64decode,
  base64encode,
  create_S256_ecryption
} = require('../helpers/utils.helper')
const crypto = require("crypto")

// const create_card_controller = async (req, res, next) => {
//     const rfid_header = req.headers["x-mazon-device-auth"]
//     const rfid = base64decode(rfid_header)
//     const encrypted_rfid = crypto.createHash("sha256").update(rfid).digest("hex")
//     const encoded_rfid = base64encode(encrypted_rfid)
//     console.log(encrypted_rfid)
//     console.log(encoded_rfid)
//     const user = req.body["userId"]
//     const balance = req.body["balance"]
//     const gym = req.body["gymID"]
//     const current_user = res.locals["user"]
//     const new_card = await create_card(user, balance, encoded_rfid, gym, current_user)
//     if(new_card != null){
//         res.json({
//             "message": "Card created successfuly",
//             "user": user,
//             "status": 200
//         })
//     } else {
//         res.status(500)
//         res.json({
//             "message": "Error registering card",
//             "status": 500
//         })
//     }
// }

const get_card_controller = async (req, res, next) => {
    try {
        const user = res.locals["user"]
        const card = await get_card(user)
        if(card != null){
            res.json(card)
        } else {
            res.status(404)
            res.json({
                "message": "Unable to find card associated with the user",
                "status": 404
            })
        }
    } catch (MISSING_USER_ERROR) {
        console.log(MISSING_USER_ERROR) // Remove
        res.status(401)
        res.json({
            "message": "Unauthorized",
            "status": 401
        })
    }
}

const block_card_controller = async (req, res, next) => {
    const user = res.locals["user"]
    const uid = req.body["userID"]
    var userID =''
    

    if(uid=='')
        userID =user
    else
        userID =uid

    const card = await get_card(userID)
    if(card!=null)
    {
        const cardNo = card['cardNo']
        const blocked_card = await block_card(userID, cardNo, user)
        if (blocked_card != null) {
            res.status(200).json({
                "status": 200,
                "message": `Card ${card} blocked successfully. Contact the administrator for reactivation`
            })
        } else {
            res.status(500).json({
                "message": "Unable to block card associated with the user",
                "status": 500
            })
        }
    }
    else{
        res.status(500).json({
            "message": "No card Registered with this user",
            "status": 500
        })
    }
    
}


const block_card_by_user_controller = async (req, res, next) => {
    const user = res.locals["user"]
    const card = await get_card(user)
    if(card!=null)
    {
        const cardNo = card['cardNo']
        const blocked_card = await block_card(user, cardNo, user)
        if (blocked_card != null) {
            res.status(200).json({
                "status": 200,
                "message": `Card ${card} blocked successfully. Contact the administrator for reactivation`
            })
        } else {
            res.status(500).json({
                "message": "Unable to block card associated with the user",
                "status": 500
            })
        }
    }
    else{
        res.status(500).json({
            "message": "No card Registered with this user",
            "status": 500
        })
    }
    
}

const validate_card_controller = async (req, res, next) => {
    try{
        const rfid = req.headers["x-fettlepool-device-auth"]
        // const decoded_rfid = base64decode(rfid)
        const encrypted_rfid = crypto.createHash("sha256").update(rfid).digest("hex")

        const validated_card = await validate_card(encrypted_rfid)
        if(validated_card != null){
            res.locals['cardNo']=validated_card['cardNo']
            res.locals['userId']=validated_card['userId']
            res.locals['balance']=validated_card['balance']
            res.locals['created_by']=validated_card['created_by']
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Invalid card or card may be blocked",
                "status": 401
            })
        }
    } catch(MISSING_RFID_ERROR){
        console.log(MISSING_RFID_ERROR)
        res.status(403)
        res.json({
            "message": "Invalid card. Forbidden",
            "status": 403
        })
    }
}

module.exports = {
    // create_card: create_card_controller,
    get_card: get_card_controller,
    block_card: block_card_controller,
    block_card_by_user: block_card_by_user_controller,
    validate_card: validate_card_controller
}