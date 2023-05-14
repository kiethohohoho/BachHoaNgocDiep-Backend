const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Banner = sequelize.define(
  'Banners',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT('long'),
    },
    ImageURL: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    RedirectUrl: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  },
  {
    timestamps: {
      CreatedAt: 'created_date',
      UpdatedAt: 'updated_at',
      DeletedAt: 'deleted_at',
    },
    underscored: false,
    paranoid: true,
  }
);

Banner.sync({ force: false })
  .then(() => {
    loggers.info('Banner table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Banner table:', err);
  });

module.exports = Banner;
