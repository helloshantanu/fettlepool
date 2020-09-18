const Cards = require('../models/card.model')
const NumberGenerator = require("creditcard-generator")

const create_card = async (userId, balance, rfid, gymId, created_by) => {
    const cardId = NumberGenerator.GenCC().toString();
    const new_card_document = new Cards({
        userId: userId,
        balance: balance,
        rfid: rfid,
        cardNo: cardId,
        gymId: gymId,
        created_at: new Date(),
        created_by: created_by
    })
    const new_card = await new_card_document.save()
    return new_card
}

const block_card = async (userId, cardNo, blocked_by) => {
    const blocked_card = await Cards.findOneAndUpdate({
        "userId": userId,
        "cardNo": cardNo
    }, {
        $set: {
            isBlocked: true,
            blockedBy: blocked_by
        }
    })
    return blocked_card
}

const validate_card = async (rfid) => {
    const card = await Cards.findOne({
        "rfid": rfid,
        "isBlocked": false
    }, {
        "blockedBy": 0
    })
    return card
}

const get_card = async (userId) => {
    const Card = await Cards.findOne({
        "userId": userId,
        "isBlocked": false,
    }, {
        "blockedBy": 0,
        "rfid": 0,
        "gymId": 0,
        "created_at": 0,
        "created_by": 0
    })
    return Card
}

module.exports = {
    create_card,
    block_card,
    validate_card,
    get_card
}