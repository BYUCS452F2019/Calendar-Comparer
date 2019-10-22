const pg = require('../pg')
const schemas = require('../schemas')
const debug = require('debug')('cal:db:group')

const group = {}

group.create = async (userID, groupName) => {
    console.log("creating group: " + groupName + " for: " + userID)
    const query1 = {
        text: 'insert into group_calendar (group_calendar_name) values ($1) RETURNING group_calendar_id',
        values: [
            groupName
        ]
    }

    debug(query1)

    const result = await pg.query(query1)




    let groupID = result.rows[0].group_calendar_id
    const query2 = {
        text: 'insert into calendar_membership (calendar_membership_group_calendar_id, calendar_membership_user_id) values ($1,$2)',
        values: [
            groupID,
            userID
        ]
    }

    debug(query2)

    const result2 = await pg.query(query2)

    return groupID;
}

group.addCalendar = async (groupID, calendarID) => {
    console.log("adding calendar: " + calendarID + " into group: " + groupID);

    const query1 = {
        text: 'insert into group_connection (personal_calendar_id, group_calendar_id) values ($1,$2)',
        values: [
            calendarID,
            groupID
        ]
    }

    debug(query1)

    const result = await pg.query(query1)

    return true;
}

group.getGroupCalendars = async (userID) => {
    console.log("getting user: " + userID + " group calendars");

    const query1 = {
        text: 'select * from group_calendar gc join calendar_membership cm on cm.calendar_membership_group_calendar_id = gc.group_calendar_id where cm.calendar_membership_user_id = $1',
        values: [
            userID
        ]
    }

    debug(query1)

    const result = await pg.query(query1)
 
    return result;
}



module.exports = group;