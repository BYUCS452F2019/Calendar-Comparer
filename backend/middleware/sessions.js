const db = require('../db')

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
