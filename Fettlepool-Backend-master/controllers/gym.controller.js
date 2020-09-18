const {
  create_gym,
  disable_gym,
  get_gym,
  get_gyms,
  change_gym_contact
} = require('../services/gym.service')

const create_gym_controller = async(req, res, next) => {
    const created_by = res.locals["user"]
    const name = req.body["name"]
    const locality = req.body["locality"]
    const city = req.body["city"]
    const state = req.body["state"]
    const gymNo = req.body["gymNo"]
    
    const new_gym = await create_gym(name,locality, city,state, gymNo,created_by)
    if(new_gym != null){
        res.json({
            "message": "Gym created successfully",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Unable to create gym",
            "status": 500
        })
    }
}

const disable_gym_controller = async(req, res, next) => {
    const gym = req.params["gymId"]
    const disabled_by = res.locals["user"]
    const disabled_gym = await disable_gym(disabled_by, gym)
    if(disabled_gym != null){
        res.json({
            "message": "Gym disabled successfully",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Unable to disable gym",
            "status": 500
        })
    }
}

const change_gym_contact_controller = async(req, res, next) => {
    const gym = req.params["gymId"]
    const contact = req.params["contact"]
    const edited_by = res.locals["user"]
    const edited_gym = await change_gym_contact(gym,contact,edited_by)
    if (edited_gym != null){
        res.json({
            "message": "Gym Edited successfully",
            "status": 200
        })
    } else {
        res.status(500)
        res.json({
            "message": "Unable to edit gym",
            "status": 500
        })
    }
}

const get_gym_controller = async(req, res, next) => {
    const gym = req.params["gymID"]
    const gym_details = await get_gym(gym)
    res.json(gym_details)
}

const get_gyms_controller = async(req, res, next) => {
    const gyms_details = await get_gyms()
    res.json(gyms_details)
}

module.exports = {
    create_gym: create_gym_controller,
    disable_gym: disable_gym_controller,
    get_gym: get_gym_controller,
    get_gyms: get_gyms_controller,
    change_gym_contact_route:change_gym_contact_controller
}