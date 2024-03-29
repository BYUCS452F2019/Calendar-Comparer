const pg = require('../pg')
const schemas = require('../schemas')
const debug = require('debug')('cal:db:group')
const moment = require('moment')
const cache = require('../../cache')
const joinjs = require('join-js').default

const yieldAsync = ()=>new Promise(res=>setImmediate(res))

const group = {}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addMinutes = function (mins) {
    var date = new Date(this.valueOf());
    date.setMinutes(date.getMinutes() + mins);
    return date;
}

Date.prototype.setToValidInterval = function (interval) {
    let validInterval = 0;
    var date = new Date(this.valueOf());
    while (date.getMinutes() > validInterval) {
        validInterval += interval
    }
    if (validInterval != 0) {
        validInterval -= interval;
    }
    date.setMinutes(validInterval);
    return date;
}

group.create = async (userID, groupName) => {
    //console.log("creating group: " + groupName + " for: " + userID)
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
    await cache.invalidateCalendar(groupID)

    return groupID;
}

group.addCalendar = async (groupID, calendarID) => {
    //console.log("adding calendar: " + calendarID + " into group: " + groupID);

    const query1 = {
        text: 'insert into group_connection (personal_calendar_id, group_calendar_id) values ($1,$2)',
        values: [
            calendarID,
            groupID
        ]
    }

    debug(query1)

    const result = await pg.query(query1)
    await cache.invalidateCalendar(groupID)

    return true;
}

group.getGroupCalendars = async (userID) => {
    //console.log("getting user: " + userID + " group calendars");

    const query1 = {
        // Modified by Cole to return all group calendars so he could test the frontend
        text: 'select distinct * from group_calendar gc left join calendar_membership cm on cm.calendar_membership_group_calendar_id = gc.group_calendar_id',// where cm.calendar_membership_user_id = $1',
        values: [
            // userID
        ]
    }

    debug(query1)

    const result = await pg.query(query1)

    return joinjs.map(result.rows, schemas, 'calendarMap', 'group_calendar_')
}

group.editName = async (groupID, NewGroupName) => {
    //console.log("editing group: " + groupID + " name to: " + NewGroupName);

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

// This function has a caching version in the /cache/ folder - please
// be sure to use that instead of calling this directly (although don't remove
// this either: the caching version calls this one)

// Note: This function has also been modified to yield control every once in
// a while to prevent server blocking.  This makes it take _slightly_ longer to
// finish, but means shorter requests can be handled without delay while it works.
group.getAvailabilityCalendars = async (groupID) => {
    // Hard coded for demonstration
    const startDate = moment('2019-10-23').startOf('week').format('YYYY/MM/D')
    const endDate = moment('2019-10-23').endOf('week').add(1, 'days').format('YYYY/MM/D')

    //console.log("getting Availability Calender for group: " + groupID);
    if (groupID == "test") {
        //console.log("getting test Availability Calendar")
        return group.getTestAvailabilityCalendar();
    }

    let userAmount = await group.getUserAmount(groupID);
    //console.log("user amount: " + userAmount);

    let start;
    let end;
    if (startDate != null) {
        start = new Date(startDate);
    }
    else {
        start = new Date();
    }
    if (endDate != null) {
        end = new Date(endDate)
    }
    else {
        end = start.addDays(7);
    }



    let eventList = await group.getGroupEventsOrderByUserID(groupID, start, end, minuteInterval = 30);

    let eventAmount = eventList.rowCount;
    //console.log("got events, rowAmount: " + eventAmount);

    let dayAmount = end.getDate() - start.getDate();
    let avaibleCalendar = group.avaibleCalendarInit(dayAmount, minuteInterval);
    //console.log("Initialized avaibleCalendar: colAmount: " + avaibleCalendar.length + " rowAmount: " + avaibleCalendar[0].length);
    //does not handle if one users has events that overlap
    //events expanding into two days doesn't work either
    for (let i = 0; i < eventAmount; i++) {
        //console.log("flag-13240987: " + i)

        let eventMarker = new Date(eventList.rows[i].event_start);
        eventMarker.setToValidInterval(minuteInterval);
        let eventEnd = new Date(eventList.rows[i].event_end);

        while (eventMarker < eventEnd) {

            let hourOffset = eventMarker.getHours() * 60 / minuteInterval
            let markCell = hourOffset + eventMarker.getMinutes() / minuteInterval
            let day = eventMarker.getDate() - start.getDate()

            //console.log("flag-801836 eventMarkerDate:" + eventMarker.getDate() + " start " + start.getDate() + " day: " + day + " markCell: " + markCell)
            avaibleCalendar[day][markCell]++;
            //console.log(eventMarker.getMinutes())
            eventMarker = eventMarker.addMinutes(minuteInterval);
            //console.log("added minutes: " + minuteInterval)
            //console.log(eventMarker.getMinutes())

            await yieldAsync()
        }
    }
    //console.log("filled availbeCalendar with userMarks")
    for (let i = 0; i < avaibleCalendar.length; i++) {
        for (let k = 0; k < avaibleCalendar[i].length; k++) {
            avaibleCalendar[i][k] = 1 - avaibleCalendar[i][k] / userAmount;
        }
    }
    //console.log("calculated percentages for availbe Calendar")
    return convertToSaneDataFormat(avaibleCalendar);
}

const convertToSaneDataFormat = function(calendarArray){
	const days = calendarArray.map(day=>{
		return {
			'8:00am': day[16],
			'8:30am': day[17],
			'9:00am': day[18],
			'9:30am': day[19],
			'10:00am': day[20],
			'10:30am': day[21],
			'11:00am': day[22],
			'11:30am': day[23],
			'12:00pm': day[24],
			'12:30pm': day[25],
			'1:00pm': day[26],
			'1:30pm': day[27],
			'2:00pm': day[28],
			'2:30pm': day[29],
			'3:00pm': day[30],
			'3:30pm': day[31],
			'4:00pm': day[32],
			'4:30pm': day[33],
			'5:00pm': day[34],
			'5:30pm': day[35],
			'6:00pm': day[36],
			'6:30pm': day[37],
			'7:00pm': day[38],
			'7:30pm': day[39],
			'8:00pm': day[40],
			'8:30pm': day[41],
		}
	})

	return {
		'sunday': days[0],
		'monday': days[1],
		'tuesday': days[2],
		'wednesday': days[3],
		'thursday': days[4],
		'friday': days[5],
		'saturday': days[6]
	}
}


group.avaibleCalendarInit = function (dayAmount, minuteInterval) {
    //[day][hour][minute]
    let avaibleCalendar = [];
    let hourSplit = parseInt(60 / minuteInterval)
    let cellAmount = 24 * hourSplit;

    for (let i = 0; i < dayAmount; i++) {
        let day = [];
        for (let k = 0; k < cellAmount; k++) {
            day[k] = 0;
        }
        avaibleCalendar[i] = day;
    }

    return avaibleCalendar;
}

group.getGroupEventsOrderByUserID = async function (groupID, startDate, endDate) {



    const query1 = {
        text: `select owner_id, event_start, event_end
     from Event e
    join personal_calendar pc on pc.personal_calendar_id = e.event_personal_calendar_id
    join group_connection gcon on gcon.personal_calendar_id = pc.personal_calendar_id
    where group_calendar_id = $1
    and event_start > $2
    and event_end < $3
    order by owner_id`,
        values: [
            groupID,
            startDate,
            endDate
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
        text: `select distinct count(calendar_membership_user_id)
            from calendar_membership
            where calendar_membership_group_calendar_id = $1`,
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
    await cache.invalidateCalendar(groupID)
}

group.deleteGroupConnection = async (groupID, userID) => {
    const query = {
        text: `delete from group_connection
        where group_calendar_id = $1
        and personal_calendar_id in (select personal_calendar_id from personal_calendar where owner_id = $2)`,
        values: [
            groupID,
            userID
        ]
    }

    await pg.query(query)
    await cache.invalidateCalendar(groupID)
}

module.exports = group;
