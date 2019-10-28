const user = require('../../db/models/user')

module.exports = function(req, res) {
    const userEmail = req.body.email
    const userName = req.body.userName
    const googleRefreshToken = req.body.googleRefreshToken ? req.body.googleRefreshToken : null
    const googleAccessToken = req.body.googleAccessToken ? req.body.googleAccessToken : null
    const googleTokenExpiration = req.body.googleTokenExpiration ? req.body.googleTokenExpiration : null

    const userCreated = user.create(userEmail, userName, googleRefreshToken, googleAccessToken, googleTokenExpiration)
    if (userCreated)
        res.send({userCreated: true})
}