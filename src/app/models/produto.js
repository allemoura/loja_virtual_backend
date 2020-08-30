'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.belongsTo(models.Estoque);
    }
  };
  Produto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    categoria: DataTypes.ENUM('VESTIDO','CALÇA','BLUSA','CASACO','SAIA'),
    preco: DataTypes.FLOAT,
    desconto: DataTypes.INTEGER,
    avaliacao: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};