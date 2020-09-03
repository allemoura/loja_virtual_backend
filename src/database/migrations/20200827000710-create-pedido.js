'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_produtos: {
        type: Sequelize.INTEGER
      },
      total_preco: {
        type: Sequelize.FLOAT
      },
      pagamento: {
        type: Sequelize.JSONB
      },
      endereco: {
        type: Sequelize.JSONB
      },
      frete: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ABERTO, EM TRANSITO, ENTREGUE']
      },
      clienteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'clientes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Pedidos');
  }
};