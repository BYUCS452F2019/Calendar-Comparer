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

group.editName = async (groupID, NewGroupName) => {
    console.log("editing group: " + groupID + " name to: " + NewGroupName);

    const query1 = {
        text: 'update group_calendar gc set group_calendar_name = $1 where group_calendar_id = $2',
        values: [
            NewGroupName,
            groupID
        ]
    }

    debug(query1)

    const result = await pg.query(query1)

    return result;
}

group.getAvailabilityCalendars = async (groupID) => {
    console.log("getting Availability Calender for group: " + groupID);
    if (groupID == "test") {
        console.log("getting test Availability Calendar")
        return group.getTestAvailabilityCalendar();
    }
    

}

group.getTestAvailabilityCalendar = function () {

    let total = 29;

    let week = new Array();
    for (let i = 0; i < 7; i++) {
        let day = new Array();
        for (let k = 0; k < 24; k++) {
            
            let percent = ((i + k) / total).toFixed(2);
            day[k] = percent;
        }
        week[i] = day;
    }

    return week;
}

module.exports = group;