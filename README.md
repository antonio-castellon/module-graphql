# @acastellon/graphql

GraphQL (HTTPS) interface based in Express + express-graphql + @graphql-tools/schema.

**Note:** `express-graphql` is deprecated (last release 0.12). Consider migrating to `graphql-http` or Yoga in future updates for this module. The schema loading supports a directory of .graphql + .resolvers.js files plus base _.* files.

See config templates for SERVER and AUTH setup (requires certs for HTTPS).

## Usage

```js
const SERVER = require('./config.server.js');
const AUTH = require('./config.auth.js');
const graphql = require('@acastellon/graphql')(SERVER, AUTH);
graphql.run(() => { console.log('GraphQL server running'); });
```

## API / Module surface

Constructor returns `{ run(cb?) }`.

- `run(cb)`: Starts the HTTPS server (assumes CERTIFICATION_PATH). Listens on SERVER.PORT or process.env.PORT.

Internally loads schemas via `./api.js` (merges base _.graphql + directory *.graphql + corresponding * .resolvers.js using Object.assign).

The returned model from api.js is `{ schema, resolvers }` passed to graphqlHTTP.

**Minimal example (self-contained):**

```js
const SERVER = {
  CERTIFICATION_PATH: '/path/to/certs',
  PORT: 4000,
  WHITELIST: './whitelist',
  SCHEMA_PATH: './schema'  // directory with .graphql + .resolvers.js
};

const AUTH = require('./config.auth.js');

const graphql = require('@acastellon/graphql')(SERVER, AUTH);

graphql.run(() => {
  console.log('GraphQL server is running at https://localhost:4000');
});
```

## License

MIT

## Notice and Disclaimer

NOTICE AND DISCLAIMER: This software automatically retrieves, accesses or interacts with external materials. Those retrieved materials are not distributed with this software and are governed solely by separate terms, conditions and licenses. You are solely responsible for finding, reviewing and complying with all applicable terms, conditions, and licenses, and for verifying the security, integrity and suitability of any retrieved materials for your specific use case. This software is provided "AS IS", without warranty of any kind. The author makes no representations or warranties regarding any retrieved materials, and assumes no liability for any losses, damages, liabilities or legal consequences from your use or inability to use this software or any retrieved materials. Use this software and the retrieved materials at your own risk.

External materials module-graphql interacts with at run time:

- The data sources and services you connect to it, under your agreements for those systems.
