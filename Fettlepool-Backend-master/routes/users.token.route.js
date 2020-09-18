const express = require('express')
const router = express.Router()
const {
    update_user_details,
    get_user_by_token,
    send_otp_controller,
    verify_otp_controller,
    change_password_route
} = require("../controllers/user.controller")
const {
    validate_token
} = require('../controllers/token.controller')
const {
    get_card
} = require('../controllers/card.controller')
const {
    create_transactions,
    get_all_user_transactions,
    get_all_transactions_for_users
} = require('../controllers/transaction.controller')
const {
    get_user_log
} = require('../controllers/logs.controller')
const {
    get_all_categories_route,
} = require("../controllers/cafe.controller")
const {
    block_card_by_user
} = require('../controllers/card.controller')
const {
    imageStore
} = require('../helpers/imageStore.helper')

router.use(validate_token).route('/getCardDetails').post(get_card)
router.use(validate_token).route('/getUserDetails').post(get_user_by_token)
router.use(validate_token).route('/createTransaction').post(create_transactions)
router.use(validate_token).route('/getTransactions').post(get_all_transactions_for_users)
router.use(validate_token).route('/getLogs').post(get_user_log)
router.use(validate_token).route('/updatedetails').patch(update_user_details)
router.use(validate_token).route('/getMenu').post(get_all_categories_route)
router.use(validate_token).route('/blockCardByUser').post(block_card_by_user)
router.use(validate_token).route('/sendotp').post(send_otp_controller)
router.use(validate_token).route('/verifyotp').post(verify_otp_controller)
router.use(validate_token).route('/changepassword').post(change_password_route)





module.exports = router