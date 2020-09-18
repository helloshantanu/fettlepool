const express = require('express')
const router = express.Router()
const {
  create_gym,
  disable_gym,
  change_gym_contact_route,
  get_gym,
  get_gyms
} = require('../controllers/gym.controller')
const {
  validate_token,
  validate_admin_token
} = require('../controllers/token.controller')

router.use(validate_admin_token).route('/gyms').post(get_gyms)
router.use(validate_admin_token).route('/create').post(create_gym)
router.use(validate_admin_token).route('/:gymId/disable').patch(disable_gym)
router.use(validate_admin_token).route('/:gymId/:contact/changecontact').patch(change_gym_contact_route)
router.use(validate_token).route('/:gymId').get(get_gym)

module.exports = router