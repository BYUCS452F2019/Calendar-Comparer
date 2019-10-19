const group = require('../../db/models/group')

module.exports = async function (req, res) {
    console.log("In create group service")
    //the userID provided is Jared's
    const result = await group.create("026c9468-273e-4afd-bb6d-9d625d8daf9d", "groupName")
    if (result)
        res.send({ groupCreated: true })
}