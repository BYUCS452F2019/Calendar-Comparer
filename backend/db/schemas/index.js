/**
 * These schema files are used to tell the join-js library how
 * to transform row results into nested objects.  This allows us
 * to have much more control over our database views and procedures
 * without needing to manually parse the joins ourselves
 *
 * Documentation: https://github.com/archfirst/joinjs
 */

module.exports = [
  ...require('./user-session'),
  ...require('./calendar-members')
]
