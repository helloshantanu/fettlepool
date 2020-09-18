const mongoose = require("mongoose")
const {
    resources
} = require("../helpers/db.helper")

const GymSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // location: {
    //     latitude: {
    //         type: Number
    //     },
    //     longitude: {
    //         type: Number
    //     }
    // },
    locality: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    gymNo: {
        type: String,
        required: true
    },
    // cafe: {
    //     name: {
    //         type: String
    //     },
    //     chefName: {
    //         type: String
    //     },
    //     chefEmail: {
    //         type: String
    //     },
    //     chefMobile: {
    //         type: String
    //     },
    //     menu: [
    //         {
    //             cName:{
    //                 type: String
    //             },
    //             items: [
    //                 {
    //                     fName: {
    //                         type: String
    //                     },
    //                     fImages: {
    //                         type: [String],
    //                         default: []
    //                     },
    //                     fPrice: {
    //                         type: String
    //                     },
    //                     fCalories: {
    //                         type: String
    //                     },
    //                     fDescription: {
    //                         type: String
    //                     },
    //                     fIngredients: {
    //                         type: [String],
    //                         default: []
    //                     },
    //                     created_at: {
    //                         type: Date,
    //                         default: new Date()
    //                     },
    //                     isAvailable: {
    //                         type: Boolean,
    //                         default: true
    //                     },
    //                     isVeg: {
    //                         type: Boolean,
    //                         default: true
    //                     }
                        
    //                 }
    //             ]
    //         }
    //     ]
    // },
    createdBy: {
        type: String,
        required: true
    },
    isEdited: {
        editedBy: {
            type: String
        },
        editedAt: {
            type: Date,
            default: new Date()
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isDeleted: {
        deletedBy: {
            type: String
        },
        deletedAt: {
            type: Date,
        }
    }
})

const Gym = resources.model("Gym", GymSchema)
module.exports = Gym