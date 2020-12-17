'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Image.init({
    title: {
      allowNull: false,
      type : DataTypes.STRING,
      validate : {
        notNull : {
          args : true,
          msg : "Title is required"
        }
      }
    },
    img_url: {
      allowNull : false,
      type : DataTypes.TEXT,
      validate : {
        notNull : {
          args : true,
          msg : 'Image is required'
        }
      }
    },
    price: {
      allowNull : false,
      type : DataTypes.INTEGER,
      validate : {
        notNull : {
          args : true,
          msg : "Price is required"
        }
      }
    },
    describe: {
      allowNull : false,
      type : DataTypes.TEXT,
      validate : {
        notNull : {
          args : true,
          msg : 'Describe is required'
        }
      }
    },
    tag: {
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        notNull : {
          args : true,
          msg : "Tag is required"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};