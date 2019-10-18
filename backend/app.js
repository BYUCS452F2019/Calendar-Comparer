const path = require('path')
const express = require("express");
const config = require('./loadConfig')
const cookieSession = require('cookie-session')

var app = express();

// Serve app resources at root (/)
app.use(express.static(path.join(__dirname, '../build/')))

/**
 * Sessions and Cookies:
 *
 * Express's cookie-session middleware (https://github.com/expressjs/cookie-session)
 * attaches a session object to each request.  It manages encrypting this session object,
 * storing it in a cookie, and then retrieving it on later requests.  In other express functions
 * attached after this one, you can access this object at `req.session` and any properties assigned
 * to this object will be stored in this encrypted session cookie.
 *
 * Requirements: config.json must have a `sessions.cookie.secret` property to encrypt the cookies
 * with.
 *
 * Provides: A `req.session` object that persists from request to request so long as the user has
 * cookies enabled.
 */
app.use(cookieSession(config.sessions.cookie))

/**
 * This middleware makes use of the `req.session` object provided by `cookie-session` and
 * uses it to look up users in the database.  Check `backend/middleware/sessions.js` for
 * more details.
 *
 * Requirements: The `req.session` object exists and is persisted between requests
 *
 * Provides: Looks up the associated DB session object and user, and attaches the
 * user to the request object at `req.user`
 */
app.use(require('./middleware/sessions'))

// Serve APIs
app.use('/api', require('./api'));

// Serve app HTML file at all other paths (/tasks, /users, etc)
app.use((_, res)=>res.sendFile(path.join(__dirname, '../build/index.html')))

// error handler
app.use(function(err, req, res, next) {
  // Make a new clean error object that can be json-ified
  let error = {
    error: err.message,
    status: err.status
  };

  // Potentially add the stack trace to it
  if (process.env.NODE_ENV === "development") {
    error.trace = err.stack;
  }

  // Set status and send it back
  res.status(err.status || 500);
  res.json(error);
});

module.exports = app;

process.on("uncaughtException", err => {
  const timestamp = (new Date()).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  console.log(`Uncaught exception: (${timestamp})`)
  console.log(err);
  console.error(err.stack);
  process.exit(1);
});
