'use strict';
const { hassPasword } = require('../helpers/bcrypt')

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email : "ansyif@gmail.com",
        password : hassPasword("admin"),
        role : "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ],{})
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users,null',{})
  }
};
