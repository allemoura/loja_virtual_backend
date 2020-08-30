'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estoque.hasMany(models.Produto, {
        foreignKey: 'produtoId'
      });
    }
  };
  Estoque.init({
    quantidade: DataTypes.INTEGER,
    cores: DataTypes.ARRAY(DataTypes.STRING),
    tamanhos: DataTypes.ENUM('P', 'M', 'G', 'GG', 'ÚNICO')
  }, {
    sequelize,
    modelName: 'Estoque',
  });
  return Estoque;
};