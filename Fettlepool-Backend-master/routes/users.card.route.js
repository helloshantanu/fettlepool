const express = require('express')
const router = express.Router()

const {
    validate_card
} = require('../controllers/card.controller')
const {
    create_session,
    // get_session
} = require('../controllers/session.controller')

// router.route('/getsession').post(get_session)
router.use(validate_card).route('/createSession').post(create_session)

module.exports = router