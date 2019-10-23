const fs = require('fs')
const {google} = require('googleapis')

const eventDB = require('../../db/models/event')

function createTokenJsonStr(userGoogleInfo) {
  return `{"access_token":"${userGoogleInfo.accessToken}","refresh_token":"${userGoogleInfo.refreshToken}","scope":"https://www.googleapis.com/auth/calendar.readonly","token_type":"Bearer","expiry_date":${userGoogleInfo.tokenExpiryDate}}`
}

function getNextWeek(){
  var today = new Date();
  var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
  return nextweek;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, calendarName, nextWeekDate) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    tokenJsonStr = createTokenJsonStr(userGoogleInfo);
    oAuth2Client.setCredentials(JSON.parse(tokenJsonStr));
    callback(oAuth2Client, calendarName, nextWeekDate)
  }

function listEvents(auth, calendarName, nextWeekDate) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: calendarName,
      timeMin: (new Date()).toISOString(),
      timeMax: nextWeekDate,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        events.map(event => {
          const eventName = event.summary;
          const start = event.start.dateTime || event.start.date;
          const end = event.end.dateTime || event.end.date;
          eventDB.insert_events(calendarName, eventName, start, end)
          // console.log(`${start} - ${end}: ${event.summary}`);
        });
      }
    });
}

function updateCalendarEvents(calendarName) {
  nextWeekDate = getNextWeek()

  // Load client secrets from a local file.
  fs.readFile('backend/api/google-calendar-integration/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), listEvents, calendarName, nextWeekDate);
  });
}

module.exports = updateCalendarEvents;