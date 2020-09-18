const Logs = require('../models/logs.model')
const AdminLogs = require('../models/adminLog.model')

const create_log = async (userId, gymId, accessCard,name,email,mobile) => {
    const new_log = new Logs({
        userId: userId,
        gymId: gymId,
        accessCard: accessCard,
        name:name,
        email:email,
        mobile:mobile,
        entryTime: new Date()
    })
    const log = await new_log.save()
    return log
}

const create_admin_log = async (userId, gymId, accessCard,name,email,mobile) => {
    const new_log = new AdminLogs({
        userId: userId,
        gymId: gymId,
        accessCard: accessCard,
        name:name,
        email:email,
        mobile:mobile,
        entryTime: new Date()
    })
    const log = await new_log.save()
    return log
}

const get_user_log = async (userId) => {
    const logs = await Logs.find({
        "userId": userId
    }).sort({ "entryTime": -1 })
    return logs
}

const get_all_logs = async () => {
    const logs = await Logs.find({}).sort({ "entryTime": -1 })
    return logs
}


const get_admin_logs = async () => {
    const logs = await AdminLogs.find({}).sort({ "entryTime": -1 })
    return logs
}

const get_gym_log = async (gymId) => {
    const logs = await Logs.find({
        "gymId": gymId
    }).sort({ "entryTime": -1 })
    return logs
}

const get_access_card_log = async (accessCard) => {
    const logs = await Logs.find({
        "accessCard": accessCard
    }).sort({ "entryTime": -1 })
    return logs
}

module.exports = {
    create_log,
    create_admin_log,
    get_all_logs,
    get_admin_logs,
    get_user_log,
    get_gym_log,
    get_access_card_log
}