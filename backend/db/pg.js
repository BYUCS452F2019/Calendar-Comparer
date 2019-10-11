const { Pool } = require('pg');
const debug = require('debug')('cal:db:pg');

const config = require('../loadConfig');

const pool = new Pool({
  max: 20,
  ...config.db
});

pool.on('error', err=>debug(err));

debug("Database ready");

module.exports = pool;