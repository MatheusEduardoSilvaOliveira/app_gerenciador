const Sequelize = require("sequelize");

const connection = new Sequelize('dbI9V284', 'dbI9V284a1', 'DqoB2F}=Br7C', {
  host: 'dbI9V284.mysql57.corphost.com.br',
  dialect: 'mysql'
});

module.exports = connection;