#### USIU HCKS - USIU hackathon 2015 14th May

USIU hackathon registration and information page. Feel free to Fork, Contribute or Create
an issue.


###### How to run USIU HCKS:

- Install node.js
- Install rethinkDB
- Install npm

then run:
```bash
npm install .
```


###### Create a .env file - at the root of the project. Here's a sample.

```bash
RETHINKDB_PORT=<rethinkDB_port>
RETHINKDB_HOST=localhost
RETHINKDB_AUTH_KEY=<rethinkDB_auth_key>
```

This sets up environment variables that are accessed within node:
```javascript
process.env.VAR
```

Finally launch the app using:
```javascript
node app.js
```

