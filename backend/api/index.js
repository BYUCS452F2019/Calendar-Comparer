const router = require('express-promise-router')();
const debug = require('debug')('cal:api:index');
const services = require('./services')
const pg = require('../db/pg')

router.get('/', async (req, res, next)=>{
  res.json({api: true})
})

router.get('/getGroupCalendars', async (req, res, next) => {
  console.log("In getGroupCalendars");
  await services.getGroupCalendars(req, res);
})

router.get('/getGroupAvailabilityCalendar', async (req, res, next) => {
  console.log("In getGroupAvailabilityCalendar");
  await services.getGroupAvailabilityCalendar(req, res);
})

router.post('/create-account', async (req, res, next) => {
  await services.createAccount(req, res)
})

//eventually req.body needs userID
router.post('/create-group', async (req, res, next) => {
  console.log("In create group")
  await services.createGroup(req, res)
})

router.post('/addCalendarToGroup', async (req, res, next) => {
  console.log("In addCalendarToGroup");
  await services.addCalendarToGroup(req, res);
})

router.post('/login', async (req, res, next) => {
  await services.login(req, res)
})

router.post('/editGroupName', async (req, res, next) => {
  await services.editGroupName(req, res);
})

router.post('/add-group-member', async (req, res, next) => {
  await services.addGroupMember(req, res)
})

// Switching to POST because DELETE can't carry a request body (~cole)
router.post('/delete-group-member', async (req, res, next) => {
  await services.deleteGroupMember(req, res)
})

// For auto-suggest
router.get('/users', async (req, res) => {
  const {rows} = await pg.query(`select user_email from "user"`)
  res.json(rows.map(u=>u.user_email))
})

// API 404 handler
router.use((req,res,next)=>{
  let error = new Error("Not found");
  error.status = 404;
  return next(error);
})

// API error handler
router.use(function(err, req, res, next){
  // Log the error
  debug('API Error: ' + err.message)
  debug(err)

  // Make a new clean error object that can be json-ified
  let error = {
    error: err.message,
    status: err.status
  }

  // Potentially add the stack trace to it
  if(process.env.NODE_ENV === 'development'){
    error.trace = err.stack;
  }

  // Set status and send it back
  res.status(err.status || 500);
  res.json(error);
})



module.exports = router;
