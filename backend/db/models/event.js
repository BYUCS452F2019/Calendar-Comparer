const pg = require('../pg')

const event = {}

event.insert_events = async (calendarName, eventName, eventStart, eventEnd) => {
    const query = {
        text: 'insert into event (event_personal_calendar_id, event_name, event_start, event_end) values ((select personal_calendar_id from personal_calendar where personal_calendar_google_calendar_id=$1),$2, $3, $4)',
        values: [
            calendarName, 
            eventName, 
            eventStart, 
            eventEnd
        ]
    } 

    await pg.query(query)
}

module.exports = event;