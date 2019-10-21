const fs = require('fs');
const {google} = require('googleapis');

const user = require('../../db/models/user')

function createTokenJsonStr(userGoogleInfo) {
    return `{"access_token":"${userGoogleInfo.accessToken}","refresh_token":"${userGoogleInfo.refreshToken}","scope":"https://www.googleapis.com/auth/calendar.readonly","token_type":"Bearer","expiry_date":${userGoogleInfo.tokenExpiryDate}}`
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(userGoogleInfo, credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    tokenJsonStr = createTokenJsonStr(userGoogleInfo);
    oAuth2Client.setCredentials(JSON.parse(tokenJsonStr));
    callback(oAuth2Client, userGoogleInfo.userId);
}

function listCalendars(auth, userId) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.calendarList.list({
        maxResults: 10
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const calendars = res.data.items;
        if (calendars.length) {
            const calendarIds = calendars.map(calendar => calendar.id);
            user.insert_calendars(calendarIds, userId)
        } else {
            console.log('No calendars found.');
        }
    })
}

function getGoogleCalendars(userGoogleInfo) {
    // Load client secrets from a local file.
    fs.readFile('backend/api/google-calendar-integration/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(userGoogleInfo, JSON.parse(content), listCalendars);
    });
}

module.exports = getGoogleCalendars;