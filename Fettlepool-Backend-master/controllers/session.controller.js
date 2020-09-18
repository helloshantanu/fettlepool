const {
    createSession,
    // get_session_service
} = require('../services/session.service')

const {
    get_gym_by_name
} = require('../services/gym.service')

const {
    get_user
} = require('../services/users.service')

const {
    get_admin
} = require('../services/admin.service')


const {
    create_admin_log
} = require('../services/logs.service')

const create_session_controller = async (req, res, next) => {
    const gym = req.headers["x-fettlepool-gym-auth"]
    const gymData = await get_gym_by_name(gym)
    const gymId=gymData['_id']

    if(gymId){
        const cardNo = res.locals['cardNo']
        const userId = res.locals['userId']
        const balance = res.locals['balance']
        const created_by = res.locals['created_by']
        if (userId == created_by) {
            const user= await get_admin(userId)
            const name = user['name']
            const email = user['email']
            const mobile = user['mobile']

            const log = await create_admin_log(userId, gymId, cardNo, name, email, mobile)

            if (log)
                res.status(200).json({ "message": "Admin Session registered successfully." })
            else
                res.status(500).json({ "message": "Server Error, Please Try Again" })

        } 
        if (userId != created_by) {
            const user = await get_user(userId)
            const name = user['firstName']
            const email = user['email']
            const mobile = user['mobile']
            const session = await createSession(gymId, cardNo, userId, balance, name, email, mobile)
            if (session)
                res.status(200).json({ "message": "Session registered successfully." })
            else
                res.status(500).json({ "message": "Server Error, Please Try Again" })
        }
        
    }
    else
    {
        res.status(401).json({"message":"Unauthorized Access"})
    }

}
// const get_session_controller = async (req, res, next) => {
//     const session = await get_session_service(req.body['cardNo'])
//     res.json(session)
// }


module.exports = {
    create_session:create_session_controller,
    // get_session:get_session_controller,
}