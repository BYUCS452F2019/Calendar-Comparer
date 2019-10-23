const group = require('../../db/models/group')

module.exports = async function (req, res) {
    console.log("In add calendar service")
    //groupID, newGroupName
    const result = await group.editName(req.body.groupID, req.body.newGroupName)
    if (result)
        res.send({ NameChanged: true })
}