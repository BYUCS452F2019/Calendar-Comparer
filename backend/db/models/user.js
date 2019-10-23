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

    // debug(query)

    const result = await pg.query(query)
    return {
        userId,
        refreshToken: result.rows[0].user_google_refresh_token, 
        accessToken: result.rows[0].user_google_access_token, 
        tokenExpiryDate: result.rows[0].user_google_token_expiry_date
    }
}

user.create = async (email, googleRefreshToken, googleAccessToken, googleTokenExpiryDate, userName=null) => {
    const query = {
        text: 'insert into "user" (user_email, calendar_user_name, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date) values ($1,$2,$3,$4,$5)',
        values: [
            email, 
            userName,
            googleRefreshToken,
            googleAccessToken,
            googleTokenExpiryDate
        ]
    }

    // debug(query)

    await pg.query(query)
}

module.exports = user;