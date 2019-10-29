const pg = require('../pg')

const calendar = {}

calendar.get = async (ownerId) => {
    const query = {
        text: 'select personal_calendar_google_calendar_id from personal_calendar where owner_id = $1',
        values: [
            ownerId
        ]
    }

    const result = await pg.query(query)
    return result.rows.map(row => {
        return row.personal_calendar_google_calendar_id
    })
}

calendar.insert_calendars = async (calendarIds, userId) => {
    const selectQueries = calendarIds.map(calId => {
        return {
            text: 'select personal_calendar_id from personal_calendar where personal_calendar_google_calendar_id = $1 and owner_id = $2',
            values: [
                calId,
                userId
            ]
        }
    })

    const insertQueries = calendarIds.map(calId => {
        return {
            text: 'insert into personal_calendar (personal_calendar_google_calendar_id, owner_id) values ($1, $2)',
            values: [
                calId,
                userId
            ]
        }
    })

    for (i = 0; i < insertQueries.length; i++) {
        const selectResult = await pg.query(selectQueries[i])

        if (!selectResult.rows.length) {
            await pg.query(insertQueries[i])
        }
    }  
}

calendar.insertCalendarMembership = async (groupID, userEmail) => {
    const query = {
        text: `insert into calendar_membership (calendar_membership_group_calendar_id, calendar_membership_user_id)
        values ($1, (select user_id from "user" where user_email = $2))`,
        values: [
            groupID, 
            userEmail
        ]
    }

    await pg.query(query)
}

module.exports = calendar;