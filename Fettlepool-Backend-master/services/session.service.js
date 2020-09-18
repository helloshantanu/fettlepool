const Cards = require('../models/card.model')

const {
    create_log
} = require('../services/logs.service')
const Logs = require('../models/logs.model')
const moment = require("moment");


const createSession = async (gymId, cardNo, userId, balance,name,email,mobile) => {

    try{

        const oldSession = await Logs.find({
            "accessCard": cardNo
        }).sort({ "entryTime": -1 }).limit(1)
        
        if (oldSession.length>0) {
            var start_date = moment(oldSession[0]['entryTime'].toISOString(), 'YYYY-MM-DD HH:mm:ss');
            var end_date = moment(moment().toISOString(), 'YYYY-MM-DD HH:mm:ss');
            var duration = moment.duration(end_date.diff(start_date));
            var minutes = duration.asMinutes();
            if (minutes > 120) {
                if (balance > 100) {
                    const session = await Cards.findOneAndUpdate({
                        "cardNo": cardNo
                    }, {
                        $inc: {
                            balance: -50
                        }
                    })

                    if (session) {
                        const log = await create_log(userId, gymId, cardNo, name, email, mobile)
                        if (log)
                            return log
                        else
                            return null
                    }
                    else {
                        return null
                    }
                }
                else {
                    return null
                }
            }
            else if (minutes < 120 && minutes > 0) {
                const log = {"message":"No amount dedcuted"}
                if (log)
                    return log
                else
                    return null
            }
            else
                return null
        } 
        else {
                if (balance > 100) {
                    const session = await Cards.findOneAndUpdate({
                        "cardNo": cardNo
                    }, {
                        $inc: {
                            balance: -50
                        }
                    })

                    if (session) {
                        const log = await create_log(userId, gymId, cardNo, name, email, mobile)
                        if (log)
                            return log
                        else
                            return null
                    }
                    else {
                        return null
                    }
                }
                else {
                    return null
                }
        }
        
    }catch(err){
        console.log(err)
    }
      
}

// const get_session_service = async (cardNo) => {
//     const session = await Logs.find({
//         "accessCard": cardNo
//     }).sort({ "entryTime": -1 }).limit(1)

//     var start_date = moment(session[0]['entryTime'].toISOString(), 'YYYY-MM-DD HH:mm:ss');
//     var end_date = moment(moment(), 'YYYY-MM-DD HH:mm:ss');
//     var duration = moment.duration(end_date.diff(start_date));
//     var hours = duration.asMinutes();       

//     return hours
// }

module.exports = {
    createSession,
    // get_session_service
}