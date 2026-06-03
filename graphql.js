"use strict";
//
// Node.js script - GraphQL interface based in Express
//
// Castellon.CH - 2019-2026 (c)
// Author: Antonio Castellon - antonio@castellon.ch
//

const express     = require('express');
const graphqlHTTP = require('express-graphql');
const fs          = require('fs');
const https       = require('https');
const helmet      = require('helmet');
const hpp         = require('hpp');
const cookieParser = require('cookie-parser');

/**
 * GraphQL server factory.
 * @param {object} _SERVER - {PORT, CERTIFICATION_PATH, WHITELIST, STATIC_PATH, SCHEMA_PATH}
 * @param {object} _AUTH
 */
module.exports = function(_SERVER, _AUTH) {

  const model = {};

  const API       = require('./api.js')(_SERVER.SCHEMA_PATH);
  const cors      = require('@acastellon/cors')(_SERVER.WHITELIST);
  const auth      = require('@acastellon/auth')(_AUTH);

  const app   = express();
  const os    = require('os');
  const HOST  = os.hostname();

  const PORT  = process.env.PORT || _SERVER.PORT;

  app.use(helmet());
  app.use(hpp());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());

  cors.enableCORS(app);

  if (_AUTH.AUTH_TYPE == 'NTLM') auth.setNTLMAuth(app);
  else if (_AUTH.AUTH_TYPE == 'JWT' ) auth.validateToken(app);

  if (_SERVER.STATIC_PATH != null) {
    console.log(' ... WARNING: static path activated : ' +   process.cwd() + _SERVER.STATIC_PATH );
    app.use( '/static', express.static(  process.cwd() + _SERVER.STATIC_PATH ) );
  }

  app.use('/',  graphqlHTTP({
    schema: API.schema,
    rootValue: API.resolvers,
    graphiql: true
  }));

  const options = {
    key: fs.readFileSync(_SERVER.CERTIFICATION_PATH + '/privateKey.pem'),
    cert: fs.readFileSync(_SERVER.CERTIFICATION_PATH + '/publicCert.pem'),
    requestCert:true,
    rejectUnauthorized: false,
    passphrase: fs.readFileSync(_SERVER.CERTIFICATION_PATH + '/passphrase', 'utf8').trim(),
    agent: false
  };

  model.run = run;

  function run(cb) {
    const server = https.createServer( options, app )
      .listen( PORT, function () {
        console.log( 'Running a GraphQL API server at  %s listening at %s ', HOST, PORT );
        if (cb) cb();
      } );

    server.on( 'error', (e) => {
      if (e.code == 'EADDRINUSE') {
        console.log( 'Address in use, retrying...' );
        setTimeout( () => {
          server.close();
          server.listen( PORT, HOST );
        }, 2000 );
      }
    } );
  }

  return model;
};
