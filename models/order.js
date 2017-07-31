'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    id_employee: DataTypes.INTEGER,
    no_meja: DataTypes.STRING,
    total_price: DataTypes.INTEGER
  });

  Order.associate = (models)=>{
    Order.belongsToMany(models.Menu, {
      through: {
        model: models.MenuOrder,
        unique: false,
      },
      foreignKey: 'id_order',
      constraints: false
    })

    Order.hasOne(models.Transaction, {foreignKey:'id_order'})
    Order.belongsTo(models.Employee, {foreignKey:'id_employee'})
  }
  return Order;
};