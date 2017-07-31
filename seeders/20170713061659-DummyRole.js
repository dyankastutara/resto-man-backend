'use strict';
const models = require('../models');
const fs = require('fs')

let readFile = fs.readFileSync('dummy-data/roleDummy.json').toString()
let roleJson = JSON.parse(readFile)
module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Role.find({})
    .then((roles) => {
      if (roles == null) {
        return queryInterface.bulkInsert('Roles', roleJson)
      }else {
        queryInterface.bulkDelete('Roles', null, {});
        return queryInterface.bulkInsert('Roles', roleJson, {})
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
