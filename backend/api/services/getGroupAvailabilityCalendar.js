const cache = require('../../cache')

module.exports = async function (req, res) {
    console.log("In get group availability calendar service")
    const result = await cache.getCalendar(req.query.groupID)
    if (result) {
        res.json(result)
    }
}
