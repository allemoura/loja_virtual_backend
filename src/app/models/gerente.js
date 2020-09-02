'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gerente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gerente.belongsTo(models.Loja);
    }
  };
  Gerente.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    chave: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Gerente',
  });
  return Gerente;
};