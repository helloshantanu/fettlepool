const express = require('express')
const router = express.Router()

const {
    validate_admin_token
} = require('../controllers/token.controller')
const {
    dashboard_analytics,
    weekly_analytics,
    get_analytics
} = require('../controllers/analytics.controller')

router.use(validate_admin_token).route('/dashboardAnalytics').post(dashboard_analytics)
router.use(validate_admin_token).route('/getAnalytics').post(get_analytics)
router.use(validate_admin_token).route('/weeklyAnalytics').post(weekly_analytics)

module.exports = router