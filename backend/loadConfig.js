// This file loads a config file specified by the environment variable
// CAL_CONFIG, or just config.json if that isn't specified

// All server files should load the config via this wrapper file so the
// config can be swapped out dynamically for testing.
module.exports = require(process.env.CAL_CONFIG || '../config.json')
