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

    return true;
}

module.exports = group;