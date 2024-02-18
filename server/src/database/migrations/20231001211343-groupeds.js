"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("groupeds", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      entity_id: {
        type: Sequelize.INTEGER,
        references: { model: "entities", key: "id" },
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "categories", key: "id" },
        allowNull: true,
      },
      compartiment_id: {
        type: Sequelize.INTEGER,
        references: { model: "compartiments", key: "id" },
        allowNull: true,
      },
      article_id: {
        type: Sequelize.INTEGER,
        references: { model: "articles", key: "id" },
        allowNull: true,
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
    await queryInterface.dropTable("groupeds");
  },
};
