const db = require('../db')

/**
 * This piece of middleware makes use of the `req.session` object
 * provided by `cookie-session` and looks up the associated user in
 * the database.
 *
 * Depends on:
 *  - A validation function (`db.session.validate` here) that takes
 *    a session ID and returns the database session object (preferably with
 *    the associated user so it's 1 round trip to the database)
 *  - A session update function (`db.session.update` here) that updates
 *    the session's last active time (so it doesn't expire)
 *
 * Provides:
 *  - If the user has an active session, it attaches `req.user` to the
 *    request object - this can be checked in later API routes to validate
 *    who a user is, what their permissions are, etc.
 */
const sessionMiddleware = (req, res, next)=>{
  (async ()=>{
    // Look up session by ID
    let session = await db.session.validate(req.session.uuid);

    if(!session) return;

    // Update last active
    session = await db.session.update(req.session.uuid);

    // Attach updated session object to request
    req.sessionObj = session;

    // Attach session's user object
    if(session && session.user)
      req.user = session.user;
  })()
  .then(next).catch(next);
}

module.exports = sessionMiddleware;
