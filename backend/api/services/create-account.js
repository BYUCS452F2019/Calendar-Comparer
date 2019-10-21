const user = require('../../db/models/user')

module.exports = async function(req, res) {
    const result = await user.create('test@email.com', 'googleRefresh', 'googleAccess', '1571265206530', 'Test Name')
    if (result)
        res.send({userAdded: true})
}