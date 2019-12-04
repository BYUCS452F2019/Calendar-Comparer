const {OAuth2Client} = require('google-auth-library')

const CLIENT_ID = '527738104479-b7jsh44hks41f8689otjraeinv7mj9im.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID)

module.exports = async function verify(token) {
  ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,  
  });
  
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const userEmail = payload['email']
  const name = payload['name']
  
  return {
    userid: userid, 
    userEmail: userEmail,
    name: name,
    idToken: token
  }
}