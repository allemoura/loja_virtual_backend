'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Loja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Loja.hasOne(models.Gerente, {
        foreignKey: 'lojaId'
      });
      Loja.hasMany(models.Estoque, {
        foreignKey: 'lojaId'
      });
    }
  };
  Loja.init({
    nome_loja: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    endereco: DataTypes.ARRAY(DataTypes.STRING),
    contato: DataTypes.STRING,
    ehLojaMatriz: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Loja',
  });
  return Loja;
};