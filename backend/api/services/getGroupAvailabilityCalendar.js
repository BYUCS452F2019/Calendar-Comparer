const group = require('../../db/models/group')

module.exports = async function (req, res) {
    console.log("In get group availability calendar service")
    const result = await group.getAvailabilityCalendars(req.query.groupID, req.query.startDate, req.query.endDate, req.query.minuteInterval)
    if (result) {
        res.json(result)
    }

}