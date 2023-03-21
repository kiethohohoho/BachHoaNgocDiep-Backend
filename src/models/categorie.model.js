const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Categorie = sequelize.define('user', {
  CategoryID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Categorie.sync({ force: true })
  .then(() => {
    loggers.info('Categorie table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Categorie table:', err);
  });

module.exports = Categorie;
