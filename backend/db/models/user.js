const pg = require('../pg')
const schemas = require('../schemas')
const debug = require('debug')('cal:db:user')

const user = {}

user.get = async (userEmail) => {
    const query = {
        text: 'select user_id, user_google_refresh_token, user_google_access_token, user_google_token_expiry_date from "user" where user_email=$1',
        values: [
            userEmail
        ]
    }

    // debug(query)

    const result = await pg.query(query)
    return {
        userId: result.rows[0].user_id,
        refreshToken: result.rows[0].user_google_refresh_token,
        accessToken: result.rows[0].user_google_access_token,
        tokenExpiryDate: result.rows[0].user_google_token_expiry_date
    }
}

user.create = async (email, userName, googleRefreshToken, googleAccessToken, googleTokenExpiryDate) => {
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

    const result = await pg.query(query)
    return result.rowCount == 1
}

module.exports = user;
