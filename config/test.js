module.exports = {
    rethinkdb: {
        host: "localhost",
        port: 28015,
        authKey: "",
        db: "test"
    },
    elasticsearch: {
      host: 'localhost:9200',
      type: 'file',
      log: ['error', 'trace'],
      path: '/var/log/hackathon.log',
      keepAlive: true,
      sniffOnStart: true,
      sniffInterval: 60000
	}
};
