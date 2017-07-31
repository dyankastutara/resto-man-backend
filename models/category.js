'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });

  Category.associate = (models)=>{
    Category.hasMany(models.Menu, {foreignKey: 'id_category'})
  }
  return Category;
};