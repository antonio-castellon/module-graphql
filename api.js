"use strict";
//
// API - GraphQL
//
// Castellon.CH - 2019-2026 (c)
// Author: Antonio Castellon - antonio@castellon.ch
//

const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');

module.exports = function(SCHEMA_PATH) {

  const model = {};

  if(!SCHEMA_PATH || SCHEMA_PATH == null) console.log('... schema path not found in config.server.js file.');
  else console.log(' \n ... loading schemas from : ' + SCHEMA_PATH + '\n');

  const typeDefs = readAllSchemas( SCHEMA_PATH );
  const resolvers = readAllResolvers( SCHEMA_PATH );

  const _schema = makeExecutableSchema( {typeDefs} );

  model.schema = _schema;
  model.resolvers = resolvers;

  function readAllSchemas(directory) {
    console.log( ' ... LOADING schemas ');
    let content = fs.readFileSync( path.resolve(__dirname, '_.graphql') , 'utf8' ) + '\n';
    fs.readdirSync( directory ).sort().forEach( file => {
      if (file.endsWith( '.graphql' )) {
        console.log( ' >> ' + file);
        content += fs.readFileSync( path.join( directory, file ), 'utf8' ) + '\n';
      }
    });
    return content;
  }

  function readAllResolvers(directory) {
    console.log( ' ... LOADING resolvers ');
    let content = require('./_.resolvers.js');
    fs.readdirSync( directory ).sort().forEach( file => {
      if (file.endsWith( '.resolvers.js' )) {
        console.log( ' >> ' + file );
        content = Object.assign( content, require( path.join( directory, file ) ) );
      }
    });
    return content;
  }

  return model;
};
