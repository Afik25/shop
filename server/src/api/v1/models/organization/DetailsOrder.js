const { Model, DataTypes } = require("sequelize");

class DetailsOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: DataTypes.INTEGER,
        article_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "detailsOrders",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "detailsOrder_order",
      allowNull: false,
    });
    this.belongsTo(models.Article, {
      foreignKey: "article_id",
      as: "detailsOrder_article",
      allowNull: false,
    });
    this.hasMany(models.StockMovement, {
      foreignKey: "detailsOrder_id",
      as: "detailsOrder_stockMovement",
      allowNull: false,
    });
  }
}
module.exports = DetailsOrder;
