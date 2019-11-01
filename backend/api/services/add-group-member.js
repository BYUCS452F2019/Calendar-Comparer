const calendar = require('../../db/models/calendar')
const group = require('../../db/models/group')

module.exports = async function(req, res) {
    const groupID = req.body.groupID
    const newMemberEmail = req.body.newMemberEmail

    // add user, group to calendar membership
    await calendar.insertCalendarMembership(groupID, newMemberEmail)

    // add user calendars, group to group connection
    group.insertGroupConnection(groupID, newMemberEmail)

    res.sendStatus(200)
}
