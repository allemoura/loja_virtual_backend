'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lojas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_loja: {
        allowNull: false,
        validate: {
          is: ["^[a-z]+$",'i'],
          min: 5, max: 30,
          notEmpty: {msg: "Campo 'nome' é obrigatório."}
        },
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        validate: {
          isEmail: { msg: "Informe um email válido." },
          notEmpty: {msg: "Campo 'email' é obrigatório."},
          min: 5, max: 30
        },
        type: Sequelize.STRING
      },
      senha: {
        allowNull: false,
        validate: {
          min: 8, max: 8,
          notEmpty: {msg: "O campo 'senha' é obrigatório."},
        },
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.ARRAY
      },
      contato: {
        allowNull: false,
        validate: {
          notEmpty: {msg: "O campo 'contato' é obrigatório."}
        },
        type: Sequelize.STRING
      },
      ehLojaMatriz: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Lojas');
  }
};