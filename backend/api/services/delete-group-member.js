const calendar = require('../../db/models/calendar')
const group = require('../../db/models/group')

module.exports = async function(req, res) {
    const groupID = req.body.groupID
    const userID = req.body.userID

    // delete user, group from calendar membership
    await calendar.deleteCalendarMembership(groupID, userID)

    // delete user calendars, group from group connection
    await group.deleteGroupConnection(groupID, userID)

    res.sendStatus(200)
}
