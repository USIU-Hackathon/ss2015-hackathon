module.exports = {
    rethinkdb: {
        host: "localhost",
        port: process.env.RETHINKDB_PORT,
        authKey: process.env.RETHINKDB_AUTH_KEY,
        db: "hackathon"
    },
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
      pass: ''
    }
};
