const express = require('express')
const router = express.Router()
const {
  create_admin_token,
  create_token,
  validate_token_on_request
} = require('../controllers/token.controller')


router.route('/admin/create').post(create_admin_token)
router.route('/create').post(create_token)
router.route('/validate').get(validate_token_on_request)

module.exports = router