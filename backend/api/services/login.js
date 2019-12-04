const verifier = require('../google-calendar-integration/verify-google')
const user = require('../../db/models/user')
const calendar = require('../../db/models/calendar')
const updateGoogleCalendars = require('../google-calendar-integration/update-google-calendars')
const updateCalendarEvents = require('../google-calendar-integration/update-calendar-events')

module.exports = async function(req, res) {
    // get google token
    const token = req.body.authorization
    if(!token) {
        res.status(401).json({error: 'Missing Credentials'})
        return
    }

    // get user info from Google
    let currUser
    try {
        currUser = await verifier(token)
    } catch (err) {
        res.status(401).json({message: "Invalid auth token provided."})
        return 
    }

    // get user refresh token from db
    userGoogleInfo = await user.get(currUser.userEmail)

    // call google calendar api to populate the personal calendar and event tables
    updateGoogleCalendars(userGoogleInfo)

    // get user calendars from db
    userCalendars = await calendar.get(userGoogleInfo.userId)

    // update events for each calendar
    userCalendars.forEach(userCalendar => {
        updateCalendarEvents(userCalendar)
    })

    res.send({userId: userGoogleInfo.userId})
}