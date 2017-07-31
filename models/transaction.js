'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    id_order: DataTypes.INTEGER,
    pay: DataTypes.INTEGER,
    refund: DataTypes.INTEGER
  });

  Transaction.associate = (models)=>{
    Transaction.belongsTo(models.Order, {foreignKey:'id_order'})
  }
  return Transaction;
};