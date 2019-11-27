//
// test module
//

const SERVER = require('./config.server.js');
const AUTH = require('./config.auth.js');

const graphql = require('./graphql.js')(SERVER, AUTH);
graphql.run(() => { console.log(' ... call back function , server is running ')});
