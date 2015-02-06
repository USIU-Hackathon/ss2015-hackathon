var config = require('../config/database');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');


var Attendees = sequelize.define('Attendees', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  date_registered: Sequelize.DATE,
  idea: Sequelize.TEXT,
  phone_number: Sequelize.INTEGER,
  github_username: Sequelize.STRING
});

module.exports = Attendees;
