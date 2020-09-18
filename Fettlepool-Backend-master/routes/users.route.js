const express = require('express')
const router = express.Router()
const {
    login,
    signup,
    send_otp_controller,
    verify_otp_controller,
    get_all_users,
    send_verification_email,
    verify_email,
    change_password_route,
    upload_image,
    verify_otp_forgot_password
} = require("../controllers/user.controller")
const {
    imageStore
} = require('../helpers/imageStore.helper')
const {
    validate_token_form_data
} = require('../controllers/token.controller')

router.route('/signin').post(login)
router.route('/signup').post(signup)
router.route('/sendotp').post(send_otp_controller)
router.route('/verifyotp').post(verify_otp_controller)
router.route('/verifyotpfgtpswd').post(verify_otp_forgot_password)
router.route('/sendverificationemail/:email').get(send_verification_email)
router.route('/users/email/verifyemail/:token').get(verify_email)
router.use(validate_token_form_data).route('/uploadImage').post(imageStore('./images/users/').single('image'), upload_image)


module.exports = router