'use strict';
module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    urlImg: DataTypes.STRING,
    id_category: DataTypes.INTEGER
  });

  Menu.associate = (models)=>{
    Menu.belongsTo(models.Category, {foreignKey: 'id_category'})
    Menu.belongsToMany(models.Order, {
      through: {
        model: models.MenuOrder,
        unique: false
      },
      foreignKey: 'id_menu',
      constraints: false
    })

  }
  return Menu;
};