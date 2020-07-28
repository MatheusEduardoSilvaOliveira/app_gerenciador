const Sequelize = require("sequelize");
const connection = require("./database");

const Cantor = connection.define('cantor', {
  cantor_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  cantor_nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cantor_palco: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cantor_ordem: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cantor_data: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  cantor_url_img: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  cantor_img: {
    type: Sequelize.BLOB('long'),
    allowNull: true
  }
}, { freezeTableName: true })

Cantor.sync({ force: false }).then(() => {
  console.log("Tabela CANTOR criada")
}) //sincronizar aqui com o que está no bd

module.exports = Cantor;