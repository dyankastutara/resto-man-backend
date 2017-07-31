'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    type: DataTypes.STRING
  });

  Role.associate = (models)=>{
    Role.hasMany(models.Employee, {foreignKey: 'id_role'})
  }
  return Role;
};