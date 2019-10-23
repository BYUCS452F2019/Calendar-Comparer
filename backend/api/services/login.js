const user = require('../../db/models/user')
const calendar = require('../../db/models/calendar')
const updateGoogleCalendars = require('../google-calendar-integration/update-google-calendars')
const updateCalendarEvents = require('../google-calendar-integration/update-calendar-events')

module.exports = async function(req, res) {
    // get user id
    userId = req.body.userId

    // get user google info from db
    userGoogleInfo = await user.get(userId)

    // call google calendar api to populate the personal calendar and event tables
    updateGoogleCalendars(userGoogleInfo)

    // get user calendars from db
    userCalendars = await calendar.get(userId)

    // update events for each calendar
    userCalendars.forEach(userCalendar => {
        updateCalendarEvents(userCalendar)
    })

    res.send({loggedIn: true})
}