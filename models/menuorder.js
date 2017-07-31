'use strict';
module.exports = function(sequelize, DataTypes) {
  var MenuOrder = sequelize.define('MenuOrder', {
    id_order: DataTypes.INTEGER,
    id_menu: DataTypes.INTEGER,
    qty_item: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    note: DataTypes.STRING
  });
  return MenuOrder;
};