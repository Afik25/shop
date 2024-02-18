const { Model, DataTypes } = require("sequelize");

class Grouped extends Model {
  static init(sequelize) {
    super.init(
      {
        entity_id: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER,
        compartiment_id: DataTypes.INTEGER,
        article_id: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "groupeds",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Entity, {
      foreignKey: "entity_id",
      as: "grouped_entity",
      allowNull: false,
    });
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "grouped_category",
      allowNull: false,
    });
    this.belongsTo(models.Compartiment, {
      foreignKey: "compartiment_id",
      as: "grouped_compartiment",
      allowNull: false,
    });
    this.belongsTo(models.Article, {
      foreignKey: "article_id",
      as: "article_grouped",
      allowNull: false,
    });
  }
}
module.exports = Grouped;
