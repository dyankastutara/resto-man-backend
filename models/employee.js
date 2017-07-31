'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    id_role: DataTypes.INTEGER
  });

  Employee.associate = (models)=>{
    Employee.belongsTo(models.Role, {foreignKey: 'id_role'})
    Employee.hasMany(models.Order, {foreignKey:'id_employee'})
  }
  return Employee;
};