var config = require('../config/database');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.postgres);


var Attendees = sequelize.define('Attendees', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  date_registered: { Sequelize.DATE, defaultValue: new Date() },
  idea: Sequelize.TEXT,
  phone_number: Sequelize.INTEGER,
  github_username: Sequelize.STRING
});

module.exports = Attendees;
