const group = require('../../db/models/group')

module.exports = async function (req, res) {
    console.log("In get group calendar service")
    const result = await group.getGroupCalendars(req.query.userID)
    if(result)
    {
        res.send(result)
    }

}