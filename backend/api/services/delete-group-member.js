const calendar = require('../../db/models/calendar')
const group = require('../../db/models/group')

module.exports = function(req, res) {
    const groupID = req.body.groupID 
    const userID = req.body.userID

    // delete user, group from calendar membership
    calendar.deleteCalendarMembership(groupID, userID)

    // delete user calendars, group from group connection
    group.deleteGroupConnection(groupID, userID)

    res.sendStatus(200)
}