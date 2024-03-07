const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "categories",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Grouped, {
      foreignKey: "category_id",
      as: "category_grouped",
      allowNull: false,
    });
  }
}
module.exports = Category;
