'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.ENUM,
        values: ['VESTIDO','CALÇA','BLUSA','CASACO','SAIA']
      },
      preco: {
        type: Sequelize.FLOAT
      },
      desconto: {
        type: Sequelize.INTEGER
      },
      avaliacao: {
        type: Sequelize.FLOAT
      },
      estoqueId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'estoques', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('Produtos');
  }
};