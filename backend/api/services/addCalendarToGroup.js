const group = require('../../db/models/group')

module.exports = async function (req, res) {
    console.log("In add calendar service")
    //the userID provided is Jared's
    const result = await group.addCalendar(req.body.grouID, req.body.calendarID)
    if (result)
        res.send({ calendarAdded: true })
}