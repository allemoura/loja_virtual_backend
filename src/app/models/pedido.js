'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.Cliente);
    }
  };
  Pedido.init({
    total_produtos: DataTypes.INTEGER,
    total_preco: DataTypes.FLOAT,
    pagamento: DataTypes.JSONB,
    endereco: DataTypes.JSONB,
    frete: DataTypes.FLOAT,
    status: DataTypes.ENUM('ABERTO, EM TRANSITO, ENTREGUE')
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};