const express = require('express')
const router = express.Router()
const {
  create_admin,
  login_admin,
  update_admin,
  get_admin,
  create_super_user,
  unverified_admins,
  verify_admin
} = require('../controllers/admin.controller')

router.route('/signup').post(create_admin)
router.route('/signin').post(login_admin)
router.route('/superuser').post(create_super_user)
router.route('/verifyAdmin').post(verify_admin)
router.route('/:adminId').get(get_admin)
router.route('/unverifiedadmin/:email').get(unverified_admins)

module.exports = router