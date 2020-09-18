const Gyms = require('../models/gym.model')

const create_gym = async (name, locality, city,state, gymNo,created_by) => {
    const new_gym_document = new Gyms({
        name: name,
        locality: locality,
        city: city,
        state: state,
        gymNo: gymNo,
        createdBy: created_by        
    })
    const new_gym = await new_gym_document.save()
    return new_gym
}

const disable_gym = async (disabled_by, gymId) => {
    const disabled_gym = await Gyms.findOneAndUpdate({
        "_id": gymId
    }, {
        $set: {
            "isDeleted": {
                "deletedBy": disabled_by,
                "deletedAt": new Date()
            }
        }
    }, {
        new: true
    })
    return disabled_gym
}

const get_gym = async (gymId) => {
    return await Gyms.findOne({
        "_id": gymId
    }, {
        "createdAt": 0,
        "isDeleted": 0,
        "isEdited": 0,
        "createdBy": 0
    })
}
const get_gym_by_name = async (gym) => {
    return await Gyms.findOne({
        "name": gym
    }, {
        "createdAt": 0,
        "isDeleted": 0,
        "isEdited": 0,
        "createdBy": 0
    })
}

const get_gyms = async () => {
    return await Gyms.find({
        $and:[
            {'isDeleted':null}
        ]}, {
        "createdAt": 0,
        "isDeleted": 0,
        "isEdited": 0,
        "createdBy": 0
    })
}

const change_gym_contact = async (gymId,contact,editedBy) => {
    var response = await Gyms.findOneAndUpdate({
        "_id": gymId
    }, {
        $set: {
            "gymNo": contact,
            "isEdited": {
                "editedBy": editedBy,
                "editedAt": new Date()
            }
        }

    })
    return response;
}

module.exports = {
    create_gym,
    disable_gym,
    get_gym,
    get_gyms,
    get_gym_by_name,
    change_gym_contact
}