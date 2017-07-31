'use strict';
const models = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Employee.find({})
    .then((employees) => {
      if (employees == null) {
        return queryInterface.bulkInsert('Employees', [
          {
            "username":"admin",
            "password":bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
            "id_role":1, 
            "createdAt":new Date(),
            "updatedAt":new Date()
          },
          {
            "username":"waiters",
            "password":bcrypt.hashSync("waiters", bcrypt.genSaltSync(10)),
            "id_role":2, 
            "createdAt":new Date(),
            "updatedAt":new Date()
          }, 
          {
            "username":"cashier",
            "password":bcrypt.hashSync("cashier", bcrypt.genSaltSync(10)),
            "id_role":3, 
            "createdAt":new Date(),
            "updatedAt":new Date()
          }
        ])
      }else {
        queryInterface.bulkDelete('Employees', null, {});
          return queryInterface.bulkInsert('Employees', [
          {
            "username":"admin",
            "password":bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
            "id_role":1, 
            "createdAt":new Date(),
            "updatedAt":new Date()
          },
          {
            "username":"waiters",
            "password":bcrypt.hashSync("waiters", bcrypt.genSaltSync(10)),
            "id_role":2, 
            "createdAt":new Date(),
            "updatedAt":new Date()
          }, 
          {
            "username":"cashier",
            "password":bcrypt.hashSync("cashier", bcrypt.genSaltSync(10)),
            "id_role":3, 
            "createdAt":new Date(),
            "updatedAt":new Date()
          }
        ])
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
