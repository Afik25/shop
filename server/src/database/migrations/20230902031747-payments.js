"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: { model: "organizations", key: "id" },
        allowNull: false,
      },
      dates_sub: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      type_sub: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      package_sub: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reference_transaction: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pay_method: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      end_sub: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");
  },
};
