const {
  get_all_logs,
  get_gym_log,
  get_access_card_log,
  get_user_log,
  get_admin_logs
} = require('../services/logs.service')

const get_all_logs_controller = async (req, res, next) => {
    const logs = await get_all_logs()
    res.json(logs)
} 

const get_admin_logs_controller = async (req, res, next) => {
    const logs = await get_admin_logs()
    res.json(logs)
} 

const get_gym_logs_controller = async (req, res, next) => {
    const gymId = req.params["gymId"]
    const logs = await get_gym_log(gymId)
    res.json(logs)
} 

const get_access_card_logs_controller = async (req, res, next) => {
    const accessCard = req.body["accesscard"]
    const logs = await get_access_card_log(accessCard)
    res.json(logs)
}

const get_user_logs_controller = async (req, res, next) => {
    const userId = res.locals["user"]
    const logs = await get_user_log(userId)
    res.json(logs)
}

const get_user_logs_controller_for_admin = async (req, res, next) => {
    const userId = req.body["uId"]
    const logs = await get_user_log(userId)
    res.json(logs)
}

module.exports = {
    "get_all_logs": get_all_logs_controller,
    "get_admin_logs": get_admin_logs_controller,
    "get_gym_log" : get_gym_logs_controller,
    "get_access_card_log" : get_access_card_logs_controller,
    "get_user_log" : get_user_logs_controller,
    "get_user_log_for_admin" : get_user_logs_controller_for_admin
}