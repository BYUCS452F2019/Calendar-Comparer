const group = require('../../db/models/group')

module.exports = async function (req, res) {
    console.log("In get group calendar service")
    //the userID provided is Jared's

    // Note from cole: This ID doesn't exist by default - it doesn't work in my copy of the db,
    // and won't work in a fresh one.  I'm modifying this query to return all group calendars
    // regardless of user.
    const result = await group.getGroupCalendars("026c9468-273e-4afd-bb6d-9d625d8daf9d")
    if(result)
    {
        res.send(result)
    }

}