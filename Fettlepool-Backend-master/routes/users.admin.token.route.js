const express = require('express')
const router = express.Router()

const {
    registered_card_details,
    change_email,
    change_address,
    change_mobile
} = require("../controllers/user.controller")
const {
    register_admin_card
} = require("../controllers/admin.controller")
const {
    validate_admin_token
} = require('../controllers/token.controller')
const {
    get_all_logs,
    get_user_log_for_admin,
    get_admin_logs
} = require('../controllers/logs.controller')
const {
    get_all_users
} = require("../controllers/user.controller")
const {
    get_all_user_transactions,
    get_all_transactions
} = require("../controllers/transaction.controller")
const {
    create_category_route,
    add_item_route,
    get_all_categories_route,
    delete_item_route,
    add_bestseller_route,
    remove_bestseller_route,
    edit_price_route,
    change_image_route
} = require("../controllers/cafe.controller")
const {
    block_card,
    get_card
} = require('../controllers/card.controller')


router.use(validate_admin_token).route('/getAdminCardDetails').post(get_card)
router.use(validate_admin_token).route('/registercard').patch(registered_card_details)
router.use(validate_admin_token).route('/registerAdminCard').patch(register_admin_card)
router.use(validate_admin_token).route('/logs').post(get_all_logs)
router.use(validate_admin_token).route('/adminLogs').post(get_admin_logs)
router.use(validate_admin_token).route('/allUsers').post(get_all_users)
router.use(validate_admin_token).route('/allTransactions').post(get_all_transactions)
router.use(validate_admin_token).route('/getUserLog').post(get_user_log_for_admin)
router.use(validate_admin_token).route('/getUserTransactions').post(get_all_user_transactions)
router.use(validate_admin_token).route('/createCategory').post(create_category_route)
router.use(validate_admin_token).route('/addMenuItems').post(add_item_route)
router.use(validate_admin_token).route('/deleteItems').delete(delete_item_route)
router.use(validate_admin_token).route('/getAllCategories').post(get_all_categories_route)
router.use(validate_admin_token).route('/blockCard').post(block_card)
router.use(validate_admin_token).route('/addbestseller').patch(add_bestseller_route)
router.use(validate_admin_token).route('/editpriceshakes').patch(edit_price_route)
router.use(validate_admin_token).route('/changeimageshakes').patch(change_image_route)
router.use(validate_admin_token).route('/removebestseller').patch(remove_bestseller_route)
router.use(validate_admin_token).route('/changeEmail').patch(change_email)
router.use(validate_admin_token).route('/changeAddress').patch(change_address)
router.use(validate_admin_token).route('/changeMobile').patch(change_mobile)





module.exports = router