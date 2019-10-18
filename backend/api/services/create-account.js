const user = require('../../db/models/user')

module.exports = async function(req, res) {
    const result = await user.create('test@email.com', 'googleIDToken', 'googleRefresh', 'googleAccess')
    if (result)
        res.send({userAdded: true})
}