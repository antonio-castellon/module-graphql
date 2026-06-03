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

## License

MIT
