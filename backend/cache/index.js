const group = require('../db/models/group')
/**
 * This is a cache layer that makes use of MongoDB to cache
 * combined calendars (because computing those calendars takes
 * a nontrivial amount of time)
 * 
 * Functions:
 * 
 *  - getCalendar(groupID) - Computes (or retrieves cached) the group
 *    availability calendar for a particular group ID.  This function
 *    is asynchronous, and will return a promise that resolves with
 *    the computed calendar
 * 
 *  - invalidateCalendar(groupID) - Removes a calendar from the cache
 *    and causes it to be recomputed when it is next requested
 */

// Keep track of group calendars we're _currently_ computing
const current = {}

// Helper func
const awaitPromise = async function(promise){
    await promise.then(a=>a)
}

// This is our export library we attach functions to
module.exports = {
    getCalendar: async function(groupID) {
        // If we already have a promise in our cache, just attach to that one
        // (no sense in computing a calendar twice at the same time)
        if(current[groupID]) {
            return await new Promise((res, rej)=>{
                current[groupID]
                    .then(res)
                    .catch(rej)
            })
        }

        // We don't already have a promise for computing the calendar, create one
        current[groupID] = new Promise((res, rej)=>{
            group.getAvailabilityCalendars(groupID)
                .then(res)
                .catch(rej)
        })
    },

    invalidateCalendar: async function(groupID) {

    }
}