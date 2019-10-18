const user = require('../../db/models/user')
const getGoogleCalendars = require('../google-calendar-integration/get-google-calendars')

module.exports = async function(req, res) {
    res.send('testing - Success!')

    // get user id
    // userId = req.body.userId
    userId = '16cd1c6d-964b-4e2d-9385-2ddfcc9a955e'

    // get user google info from db
    userGoogleInfo = await user.get(userId)

    // call google calendar api to populate the personal calendar and event tables
    getGoogleCalendars(userGoogleInfo)

    // put user's calendars into db
}