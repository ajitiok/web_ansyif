'use strict';
const {
  Model
} = require('sequelize');
const { hassPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'Invalid Email Format'
        },
        notNull : {
          args : true,
          msg : 'Email is Required'
        },
        notEmpty : {
          args : true,
          msg : 'Email is Required'
        } 
      }
    },
    password: {
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Password is Required'
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      defaultValue : 'customer'
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : ( user , opt ) => {
        user.password = hassPass( user.password )
      }
    }
  });
  return User;
};