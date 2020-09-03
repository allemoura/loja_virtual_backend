'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gerentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        validate: {
          is: ["^[a-z]+$",'i'],
          notEmpty: {msg: "Campo 'nome' é obrigatório."},
          min: 3, max: 30
        },
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        validate: {
          isEmail: {msg: "Informe um email válido."},
          notEmpty: {msg: "Campo 'email' é obrigatório."}
        },
        type: Sequelize.STRING
      },
      senha: {
        allowNull: false,
        validate: {
          notEmpty: {msg: "Campo 'senha' é obrigatório."},
          min: 8, max: 8
        },
        type: Sequelize.STRING
      },
      chave: {
        type: Sequelize.BOOLEAN
      },
      lojaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'lojas', key: 'id' }
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
    await queryInterface.dropTable('Gerentes');
  }
};