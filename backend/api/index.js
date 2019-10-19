const router = require('express-promise-router')();
const debug = require('debug')('cal:api:index');
const services = require('./services')

router.get('/', async (req, res, next)=>{
  res.json({api: true})
})

router.post('/create-account', async (req, res, next) => {
  services.createAccount(req, res)
})

//eventually req.body needs userID
router.post('/create-group', async (req, res, next) => {
    console.log("In create group")
    services.createGroup(req, res)
})

router.post('/login', async (req, res, next) => {
  services.login(req, res)
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
