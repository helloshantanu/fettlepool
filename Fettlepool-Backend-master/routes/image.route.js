const express = require('express')
const router = express.Router()

const {
    imageStore
} = require('../helpers/imageStore.helper')
const {
    validate_admin_token_form_data
} = require('../controllers/token.controller')
const {
    upload_cafe_image
} = require("../controllers/cafe.controller")

router.use(validate_admin_token_form_data).route('/uploadCafeImage').post(imageStore('./images/cafe/').single('image'), upload_cafe_image)


module.exports = router
