const cacheItem = require('./mongo')
const debug = require('debug')('cal:cache')
const sleep = t=>new Promise(res=>setTimeout(res, t))
const { performance } = require('perf_hooks');

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

// This is our export library we attach functions to
const cache = module.exports = {}

// Because of recursive imports we need to do this require AFTER node has resolved
// all of the others.  Puthing all this in a setImmediate is a dumb way to solve
// that, but it works.
setImmediate(()=>{
    const group = require('../db/models/group')

    cache.getCalendar = async function(groupID) {
        const start = performance.now()
        const cached = await cacheItem.findOne({uuid: groupID})
        const end = performance.now()

        if(cached) {
            console.log(`Retrieved calendar from cache in ${(end - start)}ms`)
            return cached.days.toObject()
        }

        return await cache._computeCalendar(groupID)
    }

    cache.invalidateCalendar = async function(groupID) {
        await cacheItem.findOneAndDelete({uuid: groupID})
    }

    cache._computeCalendar = async function(groupID){
        // If we're currently in process of computing this calendar, wait 100ms and try again
        if(current[groupID]){
            await sleep(100)
            return await this.getCalendar(groupID)
        }

        // Otherwise make a new promise we can start computation in
        current[groupID] = new Promise((resolve, reject)=>{
            group.getAvailabilityCalendars(groupID)
                .then(days=>{
                    const cached = new cacheItem({
                        uuid: groupID,
                        days
                    })

                    return cached.save()
                })
                .then(resolve)
                .catch(reject)
                .finally(()=>{
                    current[groupID] = null
                })
        })

        // Wait for that promise to resolve, clear it out of our current object, and return
        const start = performance.now()
        const result = await current[groupID]
        const end = performance.now()
        current[groupID] = null

        console.log(`Computed group calendar in ${(end - start)}ms`)
        return result.days.toObject()
    }
})
