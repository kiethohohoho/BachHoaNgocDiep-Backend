const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const Product = require('./Products.model');

const Image = sequelize.define(
  'Images',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ProductId: {
      type: DataTypes.UUID,
    },
    CloudinaryPublicId: {
      type: DataTypes.TEXT('long'),
    },
    FileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FileSize: {
      type: DataTypes.INTEGER,
    },
    FileType: {
      type: DataTypes.STRING,
    },
    OriginalImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SmallImageUrl: {
      type: DataTypes.STRING,
    },
    MediumImageUrl: {
      type: DataTypes.STRING,
    },
    BigImageUrl: {
      type: DataTypes.STRING,
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

Image.belongsTo(Product, {
  foreignKey: 'ProductId',
  targetKey: 'Id',
});

// Image.prototype.getUrlWithCloudinary = function () {
//   return `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/upload/${
//     this.CloudinaryPublicId
//   }`;
// };

Image.sync({ force: false })
  .then(() => {
    loggers.info('Image table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Image table:', err);
  });

module.exports = Image;
