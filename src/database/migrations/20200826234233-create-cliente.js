'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        validate: {
          isEmail: {msg: "Email inválido."},
          notEmpty: {msg: "O campo 'email' é obrigatório."},
        },
        type: Sequelize.STRING
      },
      senha: {
        allowNull: false,
        validate: {
          notEmpty: {msg: "O campo 'senha' é obrigatório."},
          min: 8, max: 8
        },
        type: Sequelize.STRING
      },
      nome: {
        validate: {
          is: ["^[a-z]+$",'i'],
          notEmpty: {msg: "O campo 'nome' é obrigatório."},
          min: 3, max: 20,
        },
        allowNull: false,
        type: Sequelize.STRING
      },
      cpf: {
        allowNull: false,
        validate: {
          min: 11, max: 11,
        },
        type: Sequelize.STRING
      },
      data_nasc: {
        allowNull: false,
        validate: {
          isAfter: "2001-12-31"
        },
        type: Sequelize.DATE
      },
      telefone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clientes');
  }
};