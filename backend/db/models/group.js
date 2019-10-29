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

group.getAvailabilityCalendars = async (groupID, startDate) => {
    console.log("getting Availability Calender for group: " + groupID);
    if (groupID == "test") {
        console.log("getting test Availability Calendar")
        return group.getTestAvailabilityCalendar();
    }

    //let userAmount = group.getUserAmount(groupID);

    //let eventList = group.getAllGroupEventsOrderByUserID(groupID);

    //let eventAmount = eventList.rowCount();
    //let starOfWeekDate = getStartOfWeek().getDate();
    //let week = [[], [], [], [], [], [], []];
    ////issue for week that have two months
    //for (let i = 0; i < eventAmount; i++) {
        
    //    eventList.rows[i];
    //    let eventDate = 24;
    //    week[eventDate - starOfWeekDate]
    //}

    

    //select e.*
    //    from Event e
    //join personal_calendar pc on pc.personal_calendar_id = e.event_personal_calendar_id

}

group.getGroupWeeksEventsOrderByUserID = async function (groupID) {

    let startOfWeek = getStartOfWeek();
    let endOfWeek = getEndOfWeek

    const query1 = {
        text: `select owner_id, event_start, event_end
     from Event e
    join personal_calendar pc on pc.personal_calendar_id = e.event_personal_calendar_id
    join group_connection gcon on gcon.personal_calendar_id = pc.personal_calendar_id
    where group_calendar_id = '$1'
    and event_start > '$2' 
    and event_end < '$3'
    order by owner_id`,
        values: [
            groupID,
            startOfWeek,
            endOfWeek
        ]
    }

    debug(query1)

    const result = await pg.query(query1)
    return result;
}

function getStartOfWeek() {
    var today = new Date();
    var dayOfTheWeekNum = today.getDay();
    var dateNum = today.getDate();
    var startOfWeekDateNum = dateNum - dayOfTheWeekNum

    var startOfWeekDate = new Date(today.getFullYear, today.getMonth, startOfWeekDateNum);
    return startOfWeekDate;
}

function getEndOfWeek() {
    var today = new Date();
    var dayOfTheWeekNum = today.getDay();
    var dateNum = today.getDate();
    var lastDayOfWeekNum = 6;
    var endOfWeekDateNum = (lastDayOfWeekNum - dayOfTheWeekNum) + dateNum;

    var endOfWeekDate = new Date(today.getFullYear, today.getMonth, endOfWeekDateNum);
    return endOfWeekDate;
}

group.getUserAmount = async function (groupID) {
    const query1 = {
        text: 'select distinct count(calendar_membership_user_id) ' +
            'from calendar_membership ' +
            'where calendar_membership_group_calendar_id = "$1"',
        values: [
            groupID
        ]
    }

    debug(query1)

    const result = await pg.query(query1)
    let UserAmount = result.rows[0].count;
    return UserAmount;
}

group.getTestAvailabilityCalendar = async function () {

    let total = 53;

    let week = new Array();
    for (let i = 0; i < 7; i++) {
        let day = new Array();
        for (let k = 0; k < 48; k++) {
            
            let percent = ((i + k) / total).toFixed(2);
            day[k] = percent;
        }
        week[i] = day;
    }

    return week;
}

group.insertGroupConnection = async (groupID, userEmail) => {
    const query = {
        text: `insert into group_connection (personal_calendar_id, group_calendar_id)
        select personal_calendar_id, $1 as group_calendar_id
        from personal_calendar 
        where owner_id = (select user_id from "user" where user_email = $2)`,
        values: [
            groupID, 
            userEmail
        ]
    }

    await pg.query(query)
}

module.exports = group;