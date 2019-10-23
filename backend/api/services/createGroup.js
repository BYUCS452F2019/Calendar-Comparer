const group = require('../../db/models/group')

module.exports = async function (req, res) {
    console.log("In create group service")
    //the userID provided is Jared's
    const result = await group.create(req.body.userID, req.body.groupName)
    if (result)
        res.send({ groupID: result })
}