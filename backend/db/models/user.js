const pg = require('../pg')
const schemas = require('../schemas')
const debug = require('debug')('cal:db:user')

const user = {}

user.get = async (userId) => {
    const query = {
        text: 'select user_google_refresh_token, user_google_access_token, user_google_token_expiry_date from "user" where user_id=$1',
        values: [
            userId
        ]
    }

    debug(query)

    const result = await pg.query(query)
    return {
        refreshToken: result.rows[0].user_google_refresh_token, 
        accessToken: result.rows[0].user_google_access_token, 
        tokenExpiryDate: result.rows[0].user_google_token_expiry_date
    }
}

user.create = async (email, googleIDToken, googleRefreshToken, googleAccessToken) => {
    const query = {
        text: 'insert into "user" (user_email, user_google_id_token, user_google_refresh_token, user_google_access_token) values ($1,$2,$3,$4)',
        values: [
            email, 
            googleIDToken, 
            googleRefreshToken,
            googleAccessToken
        ]
    }

    debug(query)

    const result = await pg.query(query)
    return true;
}

module.exports = user;