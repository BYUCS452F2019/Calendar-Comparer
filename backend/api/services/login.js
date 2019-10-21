const user = require('../../db/models/user')
const getGoogleCalendars = require('../google-calendar-integration/get-google-calendars')

module.exports = async function(req, res) {
    // get user id
    // userId = req.body.userId
    userId = 'a89b31c5-47ca-43bf-b667-c016eb607573'

    // get user google info from db
    userGoogleInfo = await user.get(userId)

    // call google calendar api to populate the personal calendar and event tables
    getGoogleCalendars(userGoogleInfo)

    res.send({loggedIn: true})
}