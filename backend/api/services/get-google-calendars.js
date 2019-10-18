const express = require('express')
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    token = '{"access_token":"ya29.Il-bB1sI9YE-98-120wzrsHMCbi6kGm57o-BOyasGj6bidnPkYzFPUZmozPFrTWYmmwNre_2LZwcNdCXVH1YMaQ0iF6lcV_OENh0ohuncEzzVeizOb5IrX3qvzLNDZkx4Q","refresh_token":"1/-YJWR8JuUGq00AcoRoHK3ialSQ5g-CLZwIiR64r2bydP3NdVWZZHJEJLV-lg-1oQ","scope":"https://www.googleapis.com/auth/calendar.readonly","token_type":"Bearer","expiry_date":1571265206530}'
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
    // fs.readFile('jared-token.json', (err, token) => {
    //   if (err) return getAccessToken(oAuth2Client, callback);
    //   oAuth2Client.setCredentials(JSON.parse(token));
    //   callback(oAuth2Client);
    // });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
}

function listCalendars(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.calendarList.list({
        maxResults: 10
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const calendars = res.data.items;
        if (calendars.length) {
            calendarIds = calendars.map(calendar => calendar.id);
            console.log(calendarIds)
        } else {
            console.log('No calendars found.');
        }
    })
}

function getGoogleCalendars(userAccessToken, userRefreshToken, userTokenExpiryDate) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), listCalendars);
    });
}