const pg = require('../pg')
const joinjs = require('join-js').default
const schemas = require('../schemas')
const debug = require('debug')('cal:db:session')

const session = {}

/**
 * Validate that a session is valid (not expired)
 *
 * Returns:
 *  - Session object with an associated user property
 */
session.validate = async (id)=>{
  // Construct query (using db parameterization to mitigate SQL injection)
  const query = {
    text: 'select * from session_validate($1)',
    values: [
      id
    ]
  }

  // Log the query for debugging
  debug(query)

  // Execute query
  const result = await pg.query(query)

  // Convert the row result into an object using join-js
  // and the schemas defined in the other folder
  //
  // Note: JoinJS by default returns an array - because we're expecting
  // one result from the stored procedure we can safely access [0] and either
  // get that result or undefined.
  return joinjs.map(result.rows, schemas, 'sessionMap', 'session_')[0]
}

/**
 * Update a session's last active time to now
 */
session.update = async (id)=>{
  const query = {
    text: 'select * from session_update_last_active($1)',
    values: [
      id
    ]
  }

  debug(query)

  const result = await pg.query(query)
  return joinjs.map(result.rows, schemas, 'sessionMap', 'session_')[0]

}

/**
 * Create a new session for a particular user
 */
session.create = async (user_id, timeout_length) => {
  const query = {
    text: 'select * from session_create($1,$2)',
    values: [
      timeout_length,
      user_id
    ]
  }

  debug(query)

  const result = await pg.query(query)
  return joinjs.map(result.rows, schemas, 'sessionMap', 'session_')[0]
}

module.exports = session;
