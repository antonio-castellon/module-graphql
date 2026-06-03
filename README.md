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
